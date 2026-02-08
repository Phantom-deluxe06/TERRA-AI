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
        <div className={cn("space-y-4", className)}>
            {/* Status Card */}
            <Card className={cn(
                "p-6 border-2",
                isVerified
                    ? "border-earth-green/50 bg-earth-green/5"
                    : "border-alert-red/50 bg-alert-red/5"
            )}>
                <div className="flex items-center gap-4">
                    {isVerified ? (
                        <CheckCircle className="w-12 h-12 text-earth-green" />
                    ) : (
                        <XCircle className="w-12 h-12 text-alert-red" />
                    )}
                    <div>
                        <h3 className={cn(
                            "text-2xl font-bold",
                            isVerified ? "text-earth-green" : "text-alert-red"
                        )}>
                            {isVerified ? "Verified!" : "Not Verified"}
                        </h3>
                        <p className="text-slate-gray">
                            {isVerified
                                ? `Eco-action detected with ${(score * 100).toFixed(1)}% confidence`
                                : "No valid eco-action detected in this image"
                            }
                        </p>
                    </div>
                </div>
            </Card>

            {/* Token Reward */}
            {isVerified && (
                <Card className="p-6 bg-gradient-to-r from-earth-green/20 to-transparent border-earth-green/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-gray uppercase tracking-wide">Tokens Earned</p>
                            <p className="text-4xl font-bold text-earth-green">+{tokensEarned} TERRA</p>
                        </div>
                        {actionType && ICON_MAP[actionType] && (
                            <div className="p-4 rounded-full bg-earth-green/20">
                                {React.createElement(ICON_MAP[actionType], { className: "w-10 h-10 text-earth-green" })}
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
    const { reward, minConfidence } = getTokenRewardInfo(label);
    const confPercent = confidence * 100;
    const Icon = ICON_MAP[label] || Leaf;

    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
            <div className="p-2 rounded-lg bg-earth-green/10">
                <Icon className="w-5 h-5 text-earth-green" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-white capitalize">{label.replace('_', ' ')}</span>
                    <Badge variant="secondary" className="text-xs">+{reward} TERRA</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <Progress value={confPercent} className="flex-1 h-2" />
                    <span className="text-sm text-slate-gray w-12">{confPercent.toFixed(0)}%</span>
                </div>
            </div>
        </div>
    );
}
