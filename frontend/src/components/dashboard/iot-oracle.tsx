"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldCheck, MapPin, Cpu, RefreshCcw, AlertTriangle } from "lucide-react";
import { SensorData, getMockStream, detectTampering } from '@/lib/iot-logic';
import { cn } from '@/lib/utils';

export function IotOracle() {
    const [sensors, setSensors] = useState<SensorData[]>([]);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        const stopStream = getMockStream((data) => {
            setSensors(data);
            setAlert(detectTampering(data));
        });
        return () => stopStream();
    }, []);

    if (sensors.length === 0) return null;

    const mainSensor = sensors[0];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Health Card */}
                <Card className="border-4 border-black shadow-brutal bg-white overflow-hidden">
                    <CardHeader className="bg-neo-purple text-white border-b-4 border-black">
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2 uppercase font-black italic">
                                <Cpu className="w-5 h-5" />
                                Device Identity
                            </CardTitle>
                            <div className="px-3 py-1 bg-neo-lime text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0_#000]">
                                {mainSensor.status === 'online' ? 'LIVE' : 'ALERT'}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase text-black/50">Serial Number</p>
                                <p className="font-mono font-bold text-black">{mainSensor.serialNumber}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-black/50">Heartbeat Health</p>
                                <p className="font-bold text-black">{mainSensor.health}%</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] font-black uppercase text-black/50">GPS Coordinates</p>
                                <p className="font-mono text-sm font-bold text-black flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-neo-pink" />
                                    {mainSensor.gps.lat.toFixed(4)}, {mainSensor.gps.lng.toFixed(4)}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t-2 border-dashed border-black/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neo-lime bg-black px-4 py-2 border-2 border-black shadow-[4px_4px_0_#000]">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase">Verified on Polygon</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-black/40 uppercase italic">
                                    <RefreshCcw className="w-3 h-3 animate-spin" />
                                    Streaming Hashed Data
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Data Feed Gauge */}
                <Card className="border-4 border-black shadow-brutal bg-neo-yellow relative overflow-hidden">
                    <div className="absolute top-4 right-4 animate-pulse">
                        <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-black" />
                    </div>
                    <CardHeader className="border-b-4 border-black">
                        <CardTitle className="text-black uppercase font-black italic flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Live Oracle Feed
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="text-8xl font-black text-black tracking-tighter mb-2">
                                {mainSensor.co2.toFixed(1)}
                            </div>
                            <div className="absolute -top-4 -right-8 bg-black text-white px-2 py-1 border-2 border-white text-xs font-black rotate-12">
                                PPM
                            </div>
                        </div>
                        <p className="text-black font-black uppercase tracking-widest text-sm mt-4">Atmospheric CO2 Concentration</p>

                        <div className="w-full mt-8 h-6 bg-white border-4 border-black shadow-[4px_4px_0_#000] relative overflow-hidden">
                            <div
                                className="h-full bg-neo-purple transition-all duration-1000"
                                style={{ width: `${Math.min(100, (mainSensor.co2 / 600) * 100)}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Anti-Tamper Alerts */}
            {alert && (
                <div className={cn(
                    "p-6 border-4 border-black shadow-brutal flex items-center gap-6 animate-bounce",
                    alert.type === 'tamper' ? "bg-red-500 text-white" : "bg-neo-pink text-white"
                )}>
                    <AlertTriangle className="w-12 h-12 flex-shrink-0" strokeWidth={3} />
                    <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter italic shadow-black drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                            {alert.type === 'tamper' ? 'Security Breach Detected' : 'Data Integrity Discrepancy'}
                        </h4>
                        <p className="font-bold bg-black/20 p-1 inline-block mt-1">{alert.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
