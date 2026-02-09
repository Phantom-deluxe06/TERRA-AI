"use client";

import React from 'react';
import { CheckCircle, XCircle, Leaf, Zap, Car, Recycle, Bike, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DetectionResult, VerificationResult } from '@/lib/ai/verify';
import { getTokenRewardInfo } from '@/lib/ai/verify';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ICON_MAP: Record<string, React.ElementType> = {
    tree: Leaf,
    solar_panel: Zap,
    ev_charger: Car,
    recycling_bin: Recycle,
    bicycle: Bike,
    reusable_bag: ShoppingBag,
};

interface VerificationResultDisplayProps {
    result: VerificationResult;
    className?: string;
}

export function VerificationResultDisplay({ result, className }: VerificationResultDisplayProps) {
    const { isVerified, score, detections, tokensEarned, actionType } = result;

    return (
        <div className={cn("space-y-6", className)}>
            {/* Status Card */}
            <Card className={cn(
                "p-8 border-4 border-black shadow-brutal",
                isVerified
                    ? "bg-neo-lime"
                    : "bg-neo-orange"
            )}>
                <div className="flex items-center gap-6">
                    {isVerified ? (
                        <div className="bg-white border-3 border-black p-3 shadow-[4px_4px_0_#000]">
                            <CheckCircle className="w-12 h-12 text-black" />
                        </div>
                    ) : (
                        <div className="bg-white border-3 border-black p-3 shadow-[4px_4px_0_#000]">
                            <XCircle className="w-12 h-12 text-black" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-black italic">
                            {isVerified ? "Verified!" : "Action Not Found"}
                        </h3>
                        <p className="text-black font-bold text-lg leading-tight mt-1">
                            {isVerified
                                ? `Eco-asset detected with ${(score * 100).toFixed(1)}% confidence score.`
                                : "AI could not verify a valid environmental action in this scan."
                            }
                        </p>
                    </div>
                </div>
            </Card>

            {/* Token Reward */}
            {isVerified && (
                <Card className="p-8 bg-neo-pink border-4 border-black shadow-brutal text-white overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                        {actionType && ICON_MAP[actionType] && React.createElement(ICON_MAP[actionType], { size: 120 })}
                    </div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-xl font-black uppercase tracking-widest text-white/80">Claimable Reward</p>
                            <p className="text-6xl font-black italic drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">+{tokensEarned} TERRA</p>
                        </div>
                        {actionType && ICON_MAP[actionType] && (
                            <div className="h-20 w-20 border-4 border-black bg-white flex items-center justify-center shadow-[6px_6px_0_#000]">
                                {React.createElement(ICON_MAP[actionType], { className: "w-12 h-12 text-black" })}
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Detections List */}
            {detections.length > 0 && (
                <Card className="p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Detected Objects</h4>
                    <div className="space-y-3">
                        {detections.map((det, idx) => (
                            <DetectionItem key={idx} detection={det} />
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}

function DetectionItem({ detection }: { detection: DetectionResult }) {
    const { label, confidence } = detection;
    const { reward } = getTokenRewardInfo(label);
    const confPercent = confidence * 100;
    const Icon = ICON_MAP[label] || Leaf;

    return (
        <div className="flex items-center gap-6 p-4 border-3 border-black bg-white shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="h-14 w-14 border-2 border-black bg-neo-lime flex items-center justify-center shadow-[3px_3px_0_#000]">
                <Icon className="w-8 h-8 text-black" strokeWidth={3} />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-black uppercase tracking-tighter text-black italic">{label.replace('_', ' ')}</span>
                    <Badge variant="secondary" className="scale-110 shadow-[3px_3px_0_#000]">+{reward} TERRA</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex-1 h-4 border-2 border-black bg-white p-[2px]">
                        <div
                            className="h-full bg-neo-pink border-r-2 border-black"
                            style={{ width: `${confPercent}%` }}
                        />
                    </div>
                    <span className="text-lg font-black text-black w-14">{confPercent.toFixed(0)}%</span>
                </div>
            </div>
        </div>
    );
}
