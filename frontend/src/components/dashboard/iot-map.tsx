"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon, Layers, Maximize2, MousePointer2, ShieldCheck, RefreshCcw } from "lucide-react";
import { cn } from '@/lib/utils';

export function IotMap() {
    const [viewMode, setViewMode] = useState<'iot' | 'satellite'>('iot');

    return (
        <Card className="border-4 border-black shadow-brutal bg-white overflow-hidden h-[500px] flex flex-col">
            <CardHeader className="bg-ocean-blue text-white border-b-4 border-black">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 uppercase font-black italic">
                        <MapIcon className="w-5 h-5" />
                        Asset Geolocation
                    </CardTitle>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('iot')}
                            className={cn(
                                "px-4 py-1 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1",
                                viewMode === 'iot' ? "bg-neo-lime text-black" : "bg-white text-black"
                            )}
                        >
                            IoT View
                        </button>
                        <button
                            onClick={() => setViewMode('satellite')}
                            className={cn(
                                "px-4 py-1 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1",
                                viewMode === 'satellite' ? "bg-neo-lime text-black" : "bg-white text-black"
                            )}
                        >
                            Satellite
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative bg-slate-200">
                {/* Simulated Map Interface */}
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        viewMode === 'satellite' ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=2000")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className={cn(
                    "absolute inset-0 p-8 grid grid-cols-12 grid-rows-12 gap-1 opacity-20 transition-opacity pointer-events-none",
                    viewMode === 'iot' ? "opacity-20" : "opacity-0"
                )}>
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border border-black/20" />
                    ))}
                </div>

                {/* Low Tree Density / Deforestation Hotspots */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full opacity-40">
                        {/* Deforestation Zone 1 */}
                        <circle cx="30%" cy="40%" r="40" fill="#FF4B4B" className="animate-pulse" />
                        <text x="30%" y="35%" fill="white" fontSize="10" fontWeight="bold" className="uppercase">Low Canopy Zone</text>

                        {/* Area Needing Restoration */}
                        <rect x="65%" y="60%" width="80" height="60" fill="none" stroke="#FF4B4B" strokeWidth="2" strokeDasharray="4" />
                        <text x="65%" y="58%" fill="white" fontSize="10" fontWeight="bold" className="uppercase">Critical Restoration Area</text>
                    </svg>
                </div>

                {/* Sensor Pins */}
                <div className="absolute top-[40%] left-[45%] group cursor-pointer">
                    <div className="relative">
                        <div className="w-6 h-6 bg-neo-lime border-3 border-black rounded-full animate-ping absolute inset-0" />
                        <div className="w-6 h-6 bg-neo-lime border-3 border-black rounded-full relative shadow-brutal flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block w-48 bg-black text-white p-3 border-2 border-white text-xs font-bold shadow-brutal z-50">
                            <p className="text-neo-lime uppercase font-black">CC-AMAZON-01</p>
                            <p className="mt-1">Status: Operational</p>
                            <p>Tree Density: <span className="text-red-500">LOW (22%)</span></p>
                            <p>Trust Score: 99.8%</p>
                            <div className="mt-2 pt-2 border-t border-white/20 text-[10px] italic">
                                Action Needed: Restoration Required
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[60%] left-[55%] group cursor-pointer">
                    <div className="relative">
                        <div className="w-6 h-6 bg-neo-pink border-3 border-black rounded-full relative shadow-brutal flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Map Controls Overlay */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                    <div className="bg-white border-2 border-black p-2 shadow-brutal">
                        <Maximize2 className="w-5 h-5 text-black" />
                    </div>
                    <div className="bg-white border-2 border-black p-2 shadow-brutal">
                        <Layers className="w-5 h-5 text-black" />
                    </div>
                </div>

                <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 border-2 border-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <MousePointer2 className="w-4 h-4 text-neo-lime" />
                    Scanning Orbital Feed...
                </div>

                <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-white border-3 border-black p-3 shadow-brutal">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-neo-lime border-2 border-black rounded-full" />
                        <span className="text-[10px] font-black uppercase">Low Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-neo-yellow border-2 border-black rounded-full" />
                        <span className="text-[10px] font-black uppercase">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 border-2 border-black rounded-full" />
                        <span className="text-[10px] font-black uppercase">Low Tree Density</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function TamperCenter() {
    return (
        <Card className="border-4 border-black shadow-brutal bg-white">
            <CardHeader className="bg-neo-pink text-white border-b-4 border-black">
                <CardTitle className="uppercase font-black italic flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    AI Compliance Agent
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-2 border-black bg-neo-lime/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neo-lime border-2 border-black">
                                <Maximize2 className="w-4 h-4 text-black" />
                            </div>
                            <div>
                                <h5 className="text-sm font-black uppercase">Redundancy Check</h5>
                                <p className="text-[10px] font-bold text-black/60 uppercase tracking-tighter italic">Comparison of adjacent sensors</p>
                            </div>
                        </div>
                        <span className="text-xs font-black text-neo-lime bg-black px-2 py-1">PASS</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border-2 border-black bg-neo-pink/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neo-pink border-2 border-black">
                                <Layers className="w-4 h-4 text-black" />
                            </div>
                            <div>
                                <h5 className="text-sm font-black uppercase">Outlier Detection</h5>
                                <p className="text-[10px] font-bold text-black/60 uppercase tracking-tighter italic">Flatline & spike analysis</p>
                            </div>
                        </div>
                        <span className="text-xs font-black text-neo-pink bg-black px-2 py-1">MONITORING</span>
                    </div>
                </div>

                <div className="pt-6 border-t-4 border-black border-dashed">
                    <h5 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        Maintenance & Calibration
                    </h5>
                    <div className="space-y-2">
                        {[
                            { id: 'SN-9982-X2', date: '2026-01-15', status: 'Optimal' },
                            { id: 'SN-9982-X5', date: '2026-01-20', status: 'Optimal' },
                            { id: 'SN-9982-X9', date: '2025-11-04', status: 'DRIFT WARNING' },
                        ].map((log) => (
                            <div key={log.id} className="flex justify-between items-center text-xs font-bold border-b border-black/5 pb-2">
                                <span className="font-mono">{log.id}</span>
                                <span className="text-black/40 uppercase">{log.date}</span>
                                <span className={cn(
                                    "uppercase px-2",
                                    log.status === 'Optimal' ? "text-neo-lime" : "text-neo-pink underline decoration-wavy"
                                )}>{log.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
