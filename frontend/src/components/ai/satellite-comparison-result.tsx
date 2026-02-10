"use client";

import React from 'react';
import { CheckCircle, XCircle, Leaf, Zap, Car, Recycle, TrendingUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SatelliteAnalysisResult } from '@/lib/ai/satellite-analysis';
import { Card } from '@/components/ui/card';

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
    reforestation: Leaf,
    solar_farm: Zap,
    ev_infrastructure: Car,
    urban_green: Recycle,
};

const ACTIVITY_LABELS: Record<string, string> = {
    reforestation: 'Reforestation',
    solar_farm: 'Solar Farm',
    ev_infrastructure: 'EV Infrastructure',
    urban_green: 'Urban Green',
};

interface Props {
    result: SatelliteAnalysisResult;
    beforeImageUrl?: string;
    afterImageUrl?: string;
    className?: string;
}

export function SatelliteComparisonResultDisplay({ result, beforeImageUrl, afterImageUrl, className }: Props) {
    const { changeDetected, beforeStats, afterStats, changeSummary, activityType, tokensEarned, confidenceScore, greenCoverChange, builtAreaChange } = result;

    const Icon = activityType ? ACTIVITY_ICONS[activityType] || Leaf : Leaf;

    return (
        <div className={cn("space-y-6", className)}>
            {/* Main Status */}
            <Card className={cn(
                "p-8 border-4 border-black shadow-brutal",
                changeDetected ? "bg-neo-lime" : "bg-neo-orange"
            )}>
                <div className="flex items-center gap-6">
                    <div className="bg-white border-3 border-black p-3 shadow-[4px_4px_0_#000]">
                        {changeDetected ? (
                            <CheckCircle className="w-12 h-12 text-black" />
                        ) : (
                            <XCircle className="w-12 h-12 text-black" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-black italic">
                            {changeDetected ? "Eco-Activity Confirmed!" : "No Change Detected"}
                        </h3>
                        <p className="text-black font-bold text-base leading-tight mt-1">
                            {changeSummary}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Before/After Images */}
            {(beforeImageUrl || afterImageUrl) && (
                <div className="grid grid-cols-2 gap-4">
                    {beforeImageUrl && (
                        <div className="space-y-2">
                            <span className="bg-gray-700 text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block">
                                Before — Area Baseline
                            </span>
                            <div className="border-4 border-black overflow-hidden">
                                <img src={beforeImageUrl} alt="Before" className="w-full h-auto grayscale sepia contrast-[0.9] brightness-[0.85]" />
                            </div>
                        </div>
                    )}
                    {afterImageUrl && (
                        <div className="space-y-2">
                            <span className="bg-neo-lime text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block">
                                After — Current State
                            </span>
                            <div className="border-4 border-black overflow-hidden">
                                <img src={afterImageUrl} alt="After" className="w-full h-auto contrast-[1.1]" />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Land Cover Analysis */}
            <Card className="p-6 border-4 border-black shadow-brutal bg-white">
                <h4 className="text-lg font-black uppercase text-black mb-4 tracking-tighter">Land Cover Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                    {/* Before Stats */}
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase text-black/50">Before (Baseline)</p>
                        <CoverBar label="Vegetation" value={beforeStats.greenCover} color="bg-green-500" />
                        <CoverBar label="Water" value={beforeStats.waterCover} color="bg-blue-500" />
                        <CoverBar label="Built-up" value={beforeStats.builtArea} color="bg-gray-500" />
                        <CoverBar label="Bare Land" value={beforeStats.bareLand} color="bg-amber-600" />
                    </div>
                    {/* After Stats */}
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase text-black/50">After (Current)</p>
                        <CoverBar label="Vegetation" value={afterStats.greenCover} color="bg-green-500" />
                        <CoverBar label="Water" value={afterStats.waterCover} color="bg-blue-500" />
                        <CoverBar label="Built-up" value={afterStats.builtArea} color="bg-gray-500" />
                        <CoverBar label="Bare Land" value={afterStats.bareLand} color="bg-amber-600" />
                    </div>
                </div>
            </Card>

            {/* Change Metrics */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-3 border-black text-center bg-white">
                    <p className={cn("text-2xl font-black", greenCoverChange >= 0 ? "text-green-600" : "text-red-500")}>
                        {greenCoverChange >= 0 ? '+' : ''}{greenCoverChange.toFixed(1)}%
                    </p>
                    <p className="text-xs font-bold uppercase text-black/60">Green Cover Δ</p>
                </Card>
                <Card className="p-4 border-3 border-black text-center bg-white">
                    <p className={cn("text-2xl font-black", builtAreaChange >= 0 ? "text-blue-600" : "text-red-500")}>
                        {builtAreaChange >= 0 ? '+' : ''}{builtAreaChange.toFixed(1)}%
                    </p>
                    <p className="text-xs font-bold uppercase text-black/60">Built Area Δ</p>
                </Card>
                <Card className={cn("p-4 border-3 border-black text-center", changeDetected ? "bg-neo-lime" : "bg-gray-100")}>
                    <p className="text-2xl font-black text-black">{(confidenceScore * 100).toFixed(0)}%</p>
                    <p className="text-xs font-bold uppercase text-black/60">AI Confidence</p>
                </Card>
            </div>

            {/* Token Reward */}
            {changeDetected && tokensEarned > 0 && (
                <Card className="p-8 bg-neo-pink border-4 border-black shadow-brutal text-white overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                        <Icon size={120} />
                    </div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-xl font-black uppercase tracking-widest text-white/80">Claimable Reward</p>
                            <p className="text-6xl font-black italic drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">+{tokensEarned} TERRA</p>
                            {activityType && (
                                <p className="text-lg font-bold mt-1 text-white/90">{ACTIVITY_LABELS[activityType] || activityType}</p>
                            )}
                        </div>
                        <div className="h-20 w-20 border-4 border-black bg-white flex items-center justify-center shadow-[6px_6px_0_#000]">
                            <Icon className="w-12 h-12 text-black" />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

function CoverBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-black w-16 truncate">{label}</span>
            <div className="flex-1 h-3 border border-black bg-white">
                <div className={cn("h-full", color)} style={{ width: `${Math.min(100, value)}%` }} />
            </div>
            <span className="text-xs font-black text-black w-10 text-right">{value.toFixed(0)}%</span>
        </div>
    );
}
