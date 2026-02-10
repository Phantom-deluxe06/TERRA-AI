"use client";

/**
 * TERRA AI - Satellite Image Analysis
 * 
 * Uses pixel-based green cover analysis for satellite imagery.
 * YOLO/object detection doesn't work well on overhead satellite views,
 * so we use color-space analysis to detect vegetation, solar panels,
 * and built environment changes.
 */

export interface SatelliteAnalysisResult {
    changeDetected: boolean;
    beforeStats: ImageStats;
    afterStats: ImageStats;
    changeSummary: string;
    activityType: string | null;
    tokensEarned: number;
    confidenceScore: number;
    greenCoverChange: number;      // percentage change in green cover
    builtAreaChange: number;       // percentage change in built-up area
}

export interface ImageStats {
    greenCover: number;     // 0-100 percentage of green pixels
    waterCover: number;     // 0-100 percentage of blue/water pixels  
    builtArea: number;      // 0-100 percentage of grey/built pixels
    bareLand: number;       // 0-100 percentage of brown/bare pixels
    totalPixels: number;
}

// Token rewards based on detected activity
const ACTIVITY_REWARDS: Record<string, number> = {
    reforestation: 50,
    solar_farm: 75,
    ev_infrastructure: 40,
    urban_green: 30,
};

/**
 * Analyze a satellite image for land cover classification
 * Uses RGB color-space thresholds (simplified NDVI-like approach)
 */
function analyzeImagePixels(imageElement: HTMLImageElement): ImageStats {
    const canvas = document.createElement('canvas');
    const size = 256; // Downsample for speed
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(imageElement, 0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    const pixels = imageData.data;
    const totalPixels = size * size;

    let greenPixels = 0;
    let waterPixels = 0;
    let builtPixels = 0;
    let barePixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Green vegetation: green channel dominant, not too bright
        if (g > r * 1.15 && g > b * 1.1 && g > 40 && g < 220) {
            greenPixels++;
        }
        // Water: blue dominant, low red
        else if (b > r * 1.2 && b > g * 1.1 && b > 60) {
            waterPixels++;
        }
        // Built-up / Solar panels: grey-ish, channels roughly equal, or very bright
        else if (Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r > 100 && r < 220) {
            builtPixels++;
        }
        // Bare land: reddish/brownish, red > green > blue
        else if (r > g && g > b && r > 80 && (r - b) > 20) {
            barePixels++;
        }
    }

    return {
        greenCover: (greenPixels / totalPixels) * 100,
        waterCover: (waterPixels / totalPixels) * 100,
        builtArea: (builtPixels / totalPixels) * 100,
        bareLand: (barePixels / totalPixels) * 100,
        totalPixels,
    };
}

/**
 * Compare before/after satellite images using pixel analysis
 */
export async function analyzeSatelliteComparison(
    beforeImage: HTMLImageElement,
    afterImage: HTMLImageElement,
    activityType: string
): Promise<SatelliteAnalysisResult> {
    console.log('[Satellite AI] Starting pixel-based comparison...');

    try {
        const beforeStats = analyzeImagePixels(beforeImage);
        const afterStats = analyzeImagePixels(afterImage);

        console.log('[Satellite AI] Before stats:', beforeStats);
        console.log('[Satellite AI] After stats:', afterStats);

        const greenChange = afterStats.greenCover - beforeStats.greenCover;
        const builtChange = afterStats.builtArea - beforeStats.builtArea;

        // Determine if eco-activity is detected based on activity type
        let changeDetected = false;
        let changeSummary = '';
        let confidenceScore = 0;

        switch (activityType) {
            case 'reforestation':
                // More green cover in after = reforestation confirmed
                changeDetected = afterStats.greenCover > 5 || greenChange > 0;
                confidenceScore = Math.min(0.95, 0.5 + (afterStats.greenCover / 100));
                if (changeDetected) {
                    changeSummary = `Vegetation detected: ${afterStats.greenCover.toFixed(1)}% green cover in current view. ${greenChange > 0 ? `+${greenChange.toFixed(1)}% increase detected.` : 'Baseline vegetation confirmed.'}`;
                } else {
                    changeSummary = 'Low vegetation coverage detected. Area may not have significant reforestation activity.';
                }
                break;

            case 'solar_farm':
                // More built/grey pixels in after = solar panels
                changeDetected = afterStats.builtArea > 10 || builtChange > 0;
                confidenceScore = Math.min(0.92, 0.5 + (afterStats.builtArea / 100));
                if (changeDetected) {
                    changeSummary = `Infrastructure detected: ${afterStats.builtArea.toFixed(1)}% built-up area in current view. ${builtChange > 0 ? `+${builtChange.toFixed(1)}% increase suggests new solar infrastructure.` : 'Existing infrastructure confirmed.'}`;
                } else {
                    changeSummary = 'Limited infrastructure detected in this area. Try a more specific location.';
                }
                break;

            case 'ev_infrastructure':
                changeDetected = afterStats.builtArea > 15;
                confidenceScore = Math.min(0.88, 0.45 + (afterStats.builtArea / 100));
                changeSummary = changeDetected
                    ? `Urban infrastructure detected: ${afterStats.builtArea.toFixed(1)}% built-up area compatible with EV charging stations.`
                    : 'Area does not show significant urban infrastructure for EV charging.';
                break;

            case 'urban_green':
                changeDetected = afterStats.greenCover > 3 && afterStats.builtArea > 10;
                confidenceScore = Math.min(0.90, 0.4 + ((afterStats.greenCover + afterStats.builtArea) / 200));
                changeSummary = changeDetected
                    ? `Urban green space detected: ${afterStats.greenCover.toFixed(1)}% vegetation within ${afterStats.builtArea.toFixed(1)}% urban area.`
                    : 'Limited urban-green mix detected. Try a park or city garden location.';
                break;

            default:
                changeDetected = afterStats.greenCover > 5 || afterStats.builtArea > 10;
                confidenceScore = 0.5;
                changeSummary = changeDetected ? 'Environmental features detected.' : 'No significant changes detected.';
        }

        // Calculate tokens
        const tokensEarned = changeDetected ? (ACTIVITY_REWARDS[activityType] || 25) : 0;

        return {
            changeDetected,
            beforeStats,
            afterStats,
            changeSummary,
            activityType: changeDetected ? activityType : null,
            tokensEarned,
            confidenceScore,
            greenCoverChange: greenChange,
            builtAreaChange: builtChange,
        };
    } catch (error) {
        console.error('[Satellite AI] Analysis error:', error);
        return {
            changeDetected: false,
            beforeStats: { greenCover: 0, waterCover: 0, builtArea: 0, bareLand: 0, totalPixels: 0 },
            afterStats: { greenCover: 0, waterCover: 0, builtArea: 0, bareLand: 0, totalPixels: 0 },
            changeSummary: 'Unable to analyze satellite imagery. The images may not have loaded correctly.',
            activityType: null,
            tokensEarned: 0,
            confidenceScore: 0,
            greenCoverChange: 0,
            builtAreaChange: 0,
        };
    }
}
