"use client";

import * as ort from 'onnxruntime-web';

// Initialize WASM paths for browser
if (typeof window !== 'undefined') {
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.3/dist/';
}

// ============================================
// TYPES
// ============================================

export interface DetectionResult {
    label: string;
    confidence: number;
    boundingBox: { x: number; y: number; width: number; height: number };
}

export interface VerificationResult {
    isVerified: boolean;
    score: number;
    detections: DetectionResult[];
    tokensEarned: number;
    actionType: string | null;
}

// ============================================
// CONSTANTS
// ============================================

const MODEL_PATH = '/models/yolov8n-eco.onnx';
const INPUT_SIZE = 640;

// Token rewards per action type (from TECH_RULES.md)
const TOKEN_REWARDS: Record<string, { reward: number; minConfidence: number }> = {
    tree: { reward: 10, minConfidence: 0.80 },
    solar_panel: { reward: 25, minConfidence: 0.85 },
    ev_charger: { reward: 15, minConfidence: 0.80 },
    recycling_bin: { reward: 5, minConfidence: 0.75 },
    bicycle: { reward: 3, minConfidence: 0.75 },
    reusable_bag: { reward: 2, minConfidence: 0.75 },
};

const CLASS_LABELS = Object.keys(TOKEN_REWARDS);

// ============================================
// MODEL SESSION SINGLETON
// ============================================

let modelSession: ort.InferenceSession | null = null;

async function getModelSession(): Promise<ort.InferenceSession> {
    if (modelSession) return modelSession;

    try {
        console.log('[AI] Loading YOLOv8 model...');
        modelSession = await ort.InferenceSession.create(MODEL_PATH, {
            executionProviders: ['wasm'],
            graphOptimizationLevel: 'all',
        });
        console.log('[AI] Model loaded successfully');
        return modelSession;
    } catch (error) {
        console.error('[AI] Failed to load model:', error);
        throw new Error('Failed to load AI verification model');
    }
}

// ============================================
// IMAGE PREPROCESSING
// ============================================

function preprocessImage(imageElement: HTMLImageElement): Float32Array {
    const canvas = document.createElement('canvas');
    canvas.width = INPUT_SIZE;
    canvas.height = INPUT_SIZE;
    const ctx = canvas.getContext('2d')!;

    // Draw and resize image
    ctx.drawImage(imageElement, 0, 0, INPUT_SIZE, INPUT_SIZE);
    const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
    const { data } = imageData;

    // Convert to CHW format and normalize to [0, 1]
    const float32Data = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
    const pixelCount = INPUT_SIZE * INPUT_SIZE;

    for (let i = 0; i < pixelCount; i++) {
        const j = i * 4;
        float32Data[i] = data[j] / 255.0; // R channel
        float32Data[i + pixelCount] = data[j + 1] / 255.0; // G channel
        float32Data[i + 2 * pixelCount] = data[j + 2] / 255.0; // B channel
    }

    return float32Data;
}

// ============================================
// POST-PROCESSING (NMS)
// ============================================

interface RawDetection {
    x: number;
    y: number;
    width: number;
    height: number;
    classId: number;
    confidence: number;
}

function processOutput(
    output: ort.Tensor,
    imgWidth: number,
    imgHeight: number
): DetectionResult[] {
    const data = output.data as Float32Array;
    const [, numClasses, numBoxes] = output.dims; // [1, classes+4, boxes]

    const detections: RawDetection[] = [];
    const scaleX = imgWidth / INPUT_SIZE;
    const scaleY = imgHeight / INPUT_SIZE;

    for (let i = 0; i < numBoxes; i++) {
        // YOLOv8 output format: [x_center, y_center, width, height, class_scores...]
        const xCenter = data[i];
        const yCenter = data[numBoxes + i];
        const width = data[2 * numBoxes + i];
        const height = data[3 * numBoxes + i];

        // Find best class
        let maxScore = 0;
        let classId = 0;
        for (let c = 0; c < numClasses - 4; c++) {
            const score = data[(4 + c) * numBoxes + i];
            if (score > maxScore) {
                maxScore = score;
                classId = c;
            }
        }

        const label = CLASS_LABELS[classId];
        const minConf = TOKEN_REWARDS[label]?.minConfidence ?? 0.75;

        if (maxScore >= minConf) {
            detections.push({
                x: (xCenter - width / 2) * scaleX,
                y: (yCenter - height / 2) * scaleY,
                width: width * scaleX,
                height: height * scaleY,
                classId,
                confidence: maxScore,
            });
        }
    }

    // Simple NMS (Non-Maximum Suppression)
    const nmsThreshold = 0.5;
    const filtered: DetectionResult[] = [];

    detections.sort((a, b) => b.confidence - a.confidence);

    for (const det of detections) {
        let dominated = false;
        for (const kept of filtered) {
            if (iou(det, kept) > nmsThreshold) {
                dominated = true;
                break;
            }
        }
        if (!dominated) {
            filtered.push({
                label: CLASS_LABELS[det.classId],
                confidence: det.confidence,
                boundingBox: {
                    x: det.x,
                    y: det.y,
                    width: det.width,
                    height: det.height,
                },
            });
        }
    }

    return filtered;
}

function iou(a: RawDetection, b: DetectionResult): number {
    const ax1 = a.x, ay1 = a.y, ax2 = a.x + a.width, ay2 = a.y + a.height;
    const bx1 = b.boundingBox.x, by1 = b.boundingBox.y;
    const bx2 = bx1 + b.boundingBox.width, by2 = by1 + b.boundingBox.height;

    const interX1 = Math.max(ax1, bx1);
    const interY1 = Math.max(ay1, by1);
    const interX2 = Math.min(ax2, bx2);
    const interY2 = Math.min(ay2, by2);

    const interArea = Math.max(0, interX2 - interX1) * Math.max(0, interY2 - interY1);
    const areaA = a.width * a.height;
    const areaB = b.boundingBox.width * b.boundingBox.height;

    return interArea / (areaA + areaB - interArea);
}

// ============================================
// MAIN VERIFICATION FUNCTION
// ============================================

export async function verifyEcoAction(
    imageElement: HTMLImageElement
): Promise<VerificationResult> {
    console.log('[AI] Starting eco-action verification...');

    try {
        const session = await getModelSession();

        // Preprocess image
        const inputTensor = new ort.Tensor(
            'float32',
            preprocessImage(imageElement),
            [1, 3, INPUT_SIZE, INPUT_SIZE]
        );

        // Run inference
        const feeds = { images: inputTensor };
        const results = await session.run(feeds);
        const output = results[Object.keys(results)[0]];

        // Post-process detections
        const detections = processOutput(
            output,
            imageElement.naturalWidth,
            imageElement.naturalHeight
        );

        console.log('[AI] Detections:', detections);

        // Calculate tokens and determine primary action
        let tokensEarned = 0;
        let primaryAction: string | null = null;
        let highestReward = 0;

        for (const det of detections) {
            const reward = TOKEN_REWARDS[det.label]?.reward ?? 0;
            tokensEarned += reward;
            if (reward > highestReward) {
                highestReward = reward;
                primaryAction = det.label;
            }
        }

        const isVerified = detections.length > 0;
        const avgScore = detections.length > 0
            ? detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length
            : 0;

        return {
            isVerified,
            score: avgScore,
            detections,
            tokensEarned,
            actionType: primaryAction,
        };
    } catch (error) {
        console.error('[AI] Verification failed:', error);
        return {
            isVerified: false,
            score: 0,
            detections: [],
            tokensEarned: 0,
            actionType: null,
        };
    }
}

// ============================================
// UTILITY: Get Token Reward Info
// ============================================

export function getTokenRewardInfo(label: string) {
    return TOKEN_REWARDS[label] ?? { reward: 0, minConfidence: 0.75 };
}

export function getAllDetectableLabels() {
    return CLASS_LABELS;
}
