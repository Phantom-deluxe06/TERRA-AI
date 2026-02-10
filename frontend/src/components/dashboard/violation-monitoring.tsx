"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Droplets,
    Waves,
    Fingerprint,
    Ghost,
    Link2,
    AlertTriangle,
    ShieldAlert,
    Activity,
    Search,
    Globe,
    Info,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export const WaterStressView = () => (
    <div className="space-y-6">
        <div className="bg-neo-pink border-4 border-black p-6 shadow-brutal">
            <h2 className="text-3xl font-black uppercase text-white flex items-center gap-3">
                <Droplets size={32} />
                Water Stress Analysis
            </h2>
            <p className="mt-2 text-black font-bold bg-white/50 p-2 inline-block">DETECTION: "The Dying Wells" Problem</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-4 border-black shadow-brutal">
                <CardHeader>
                    <CardTitle className="uppercase font-black flex items-center gap-2">
                        <Activity className="text-neo-pink" /> Live Dataset
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 bg-carbon-dark/10 border-2 border-black rounded-sm">
                        <p className="text-sm text-slate-gray uppercase font-black mb-3">Groundwater Table Level (GRACE Satellite)</p>
                        <div className="h-4 w-full bg-carbon-dark border-2 border-black rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "22%" }}
                                className="h-full bg-red-500"
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <p className="text-lg font-black text-red-500">-78% Depletion</p>
                            <p className="text-lg font-black">CRITICAL</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                        <Info className="text-neo-pink" /> What is this?
                    </h3>
                    <p className="text-black font-bold leading-relaxed">
                        Tech and beverage companies often drain local groundwater, leaving nearby farmers and villages with dry wells.
                        This analysis uses <span className="text-neo-pink">GRACE satellite data</span> and multispectral imaging to detect
                        changes in local water table levels and vegetation health around industrial facilities.
                    </p>
                </div>
                <div className="bg-neo-lime border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black uppercase mb-2">Social Impact Alert</h3>
                    <p className="text-black font-bold">
                        If a factory claims to be "Water Neutral" but the surrounding area is turning into a desert,
                        the system flags a <span className="underline">Social Impact Violation</span> and halts token distribution.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export const MidnightPipeView = () => (
    <div className="space-y-6">
        <div className="bg-neo-purple border-4 border-black p-6 shadow-brutal">
            <h2 className="text-3xl font-black uppercase text-white flex items-center gap-3">
                <Waves size={32} />
                Midnight Pipe Monitor
            </h2>
            <p className="mt-2 text-white font-bold bg-black/30 p-2 inline-block">DETECTION: Illegal Night-Time Dumping</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-4 border-black shadow-brutal bg-carbon-dark/10">
                <CardHeader>
                    <CardTitle className="uppercase font-black flex items-center gap-2">
                        <Search className="text-neo-purple" /> Thermal Scan Feed
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="h-48 bg-black/80 border-4 border-black rounded-sm relative overflow-hidden flex items-end p-4 gap-2">
                        {[20, 25, 22, 18, 15, 85, 90, 25, 20, 18, 15, 75, 80, 20].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className={`flex-1 ${h > 50 ? 'bg-neo-pink animate-pulse' : 'bg-neo-purple/60'}`}
                            />
                        ))}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 p-2 border border-neo-pink">
                            <div className="h-2 w-2 bg-neo-pink rounded-full animate-ping" />
                            <span className="text-xs font-black text-neo-pink uppercase">Thermal Spike @ 02:00 AM</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 shadow-brutal text-black">
                    <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                        <Info className="text-neo-purple" /> What is this?
                    </h3>
                    <p className="font-bold leading-relaxed">
                        To save money, factories often dump toxic chemicals into rivers at night.
                        Toxic waste is usually a different temperature than river water.
                        We use <span className="text-neo-purple">Night-Vision Thermal Monitoring</span> placed downstream to detect "thermal spikes" during late hours.
                    </p>
                </div>
                <div className="bg-neo-pink border-4 border-black p-6 shadow-brutal text-white">
                    <h3 className="text-xl font-black uppercase mb-2 italic shadow-black drop-shadow-[2px_2px_0_#000]">Midnight Pipe Probabilty</h3>
                    <p className="font-black text-4xl">89.2%</p>
                    <p className="mt-2 font-bold opacity-80 uppercase text-xs">Based on thermal variance and river flow dynamics</p>
                </div>
            </div>
        </div>
    </div>
);

export const GreencrowdingView = () => (
    <div className="space-y-6">
        <div className="bg-neo-lime border-4 border-black p-6 shadow-brutal">
            <h2 className="text-3xl font-black uppercase text-black flex items-center gap-3">
                <Fingerprint size={32} />
                Network Accountability
            </h2>
            <p className="mt-2 text-black font-bold bg-white/50 p-2 inline-block">DETECTION: The "Safety in Numbers" Scam</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-4 border-black shadow-brutal">
                <CardHeader>
                    <CardTitle className="uppercase font-black flex items-center gap-2">
                        <Activity className="text-neo-lime" /> Alliance Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 py-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-black uppercase">
                                <span>Alliance Average</span>
                                <span className="text-neo-lime">92%</span>
                            </div>
                            <div className="h-4 w-full bg-carbon-dark border-2 border-black">
                                <div className="h-full bg-neo-lime w-[92%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-black uppercase">
                                <span>Company Actual</span>
                                <span className="text-neo-pink">34%</span>
                            </div>
                            <div className="h-6 w-full bg-carbon-dark border-2 border-black overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "34%" }}
                                    className="h-full bg-neo-pink"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 shadow-brutal text-black">
                    <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                        <Info className="text-neo-lime" /> What is this?
                    </h3>
                    <p className="font-bold leading-relaxed">
                        Companies join "Green Alliances" to look good, but hide behind the group and never actually change their practices.
                        Our <span className="text-neo-lime underline uppercase">Accountability AI</span> performs network analysis to overlay group pledges with actual individual emission data.
                    </p>
                </div>
                <div className="bg-black text-white border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black uppercase mb-2 text-neo-pink">Verdict: Passive Greenwasher</h3>
                    <p className="font-bold">
                        This entity is leveraging collective group status to obfuscate a 58% performance deficit. Automated warning issued.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export const MethaneView = () => (
    <div className="space-y-6">
        <div className="bg-teal-glow border-4 border-black p-6 shadow-brutal">
            <h2 className="text-3xl font-black uppercase text-black flex items-center gap-3">
                <Ghost size={32} />
                Methane Sentinel
            </h2>
            <p className="mt-2 text-black font-bold bg-white/50 p-2 inline-block">DETECTION: The Invisible Killer</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-4 border-black shadow-brutal bg-black">
                <CardHeader>
                    <CardTitle className="uppercase font-black text-white flex items-center gap-2">
                        <Globe className="text-neo-lime" /> Hotspot Mapper
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="h-64 bg-black/60 rounded-sm border-2 border-neo-lime relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-40 grayscale" />
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.7, 0.3],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-[40%] left-[30%] w-32 h-32 bg-neo-lime/50 rounded-full blur-3xl"
                        />
                        <div className="absolute top-4 left-4 bg-black/80 border border-neo-lime p-2 text-[10px] font-mono text-neo-lime uppercase">
                            SPECTRAL_CHANNEL: CH4_TROPOMI
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-neo-lime/10 p-4 border-2 border-neo-lime text-neo-lime">
                        <p className="font-black uppercase">Detection Concentration</p>
                        <p className="text-2xl font-black uppercase">1250ppb</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 shadow-brutal text-black">
                    <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                        <Info className="text-teal-glow" /> What is this?
                    </h3>
                    <p className="font-bold leading-relaxed">
                        Methane is much more dangerous than CO2, but it’s invisible to the eye. Oil and gas companies often ignore small leaks.
                        TROPOMI satellite data allows us to see <span className="text-teal-glow underline">Invisible Plumes</span> in real-time.
                    </p>
                </div>
                <button className="w-full py-6 bg-neo-lime text-black text-2xl font-black uppercase border-4 border-black shadow-brutal hover:bg-neo-lime/90 transition-all flex items-center justify-center gap-4">
                    <ShieldAlert size={32} />
                    Auto-Fine Smart Contract
                </button>
            </div>
        </div>
    </div>
);

export const SupplyChainView = () => (
    <div className="space-y-6">
        <div className="bg-ocean-blue border-4 border-black p-6 shadow-brutal">
            <h2 className="text-3xl font-black uppercase text-white flex items-center gap-3">
                <Link2 size={32} />
                Supply Chain Traceability
            </h2>
            <p className="mt-2 text-white font-black bg-black/30 p-2 inline-block">DETECTION: The Indirect Deforestation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-4 border-black shadow-brutal">
                <CardHeader>
                    <CardTitle className="uppercase font-black flex items-center gap-2">
                        <Search className="text-ocean-blue" /> Web3 Ledger Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 py-8">
                    <div className="relative pl-12 space-y-12 border-l-4 border-ocean-blue/30 ml-4">
                        <div className="relative">
                            <div className="absolute -left-[54px] top-0 h-8 w-8 rounded-full bg-neo-lime border-4 border-black flex items-center justify-center text-black font-black">1</div>
                            <h4 className="text-lg font-black uppercase">Source: Amazon Farm #01</h4>
                            <p className="text-sm font-bold text-slate-gray font-mono">ID: 0x82...3f12 • Verified Clear-Cut Free</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[54px] top-0 h-8 w-8 rounded-full bg-red-500 border-4 border-black flex items-center justify-center text-white font-black animate-pulse">2</div>
                            <h4 className="text-lg font-black uppercase text-red-500">Logistics: High-Risk Port</h4>
                            <p className="text-sm font-bold text-slate-gray font-mono">ID: 0x14...a9c3 • ILLEGAL TIMBER RISK</p>
                            <p className="mt-2 p-2 bg-red-500/10 border border-red-500/20 text-xs font-black text-red-500 uppercase">Warning: Illegal biomass detected at origin</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[54px] top-0 h-8 w-8 rounded-full bg-white border-4 border-black flex items-center justify-center text-black font-black">3</div>
                            <h4 className="text-lg font-black uppercase">Final Product: Consumer Goods</h4>
                            <p className="text-sm font-bold text-slate-gray font-mono italic">Eco-Certification Suspended</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 shadow-brutal text-black">
                    <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                        <Info className="text-ocean-blue" /> What is this?
                    </h3>
                    <p className="font-bold leading-relaxed">
                        A company might be clean, but its suppliers may be burning rainforests.
                        Every raw material is given a <span className="text-ocean-blue underline">Blockchain Digital ID</span>.
                        If satellite AI detects deforestation at any supplier's GPS coordinates, the end-product automatically loses its "Eco-Friendly" seal.
                    </p>
                </div>
                <div className="bg-neo-purple border-4 border-black p-6 shadow-brutal text-white">
                    <h3 className="text-xl font-black uppercase mb-2">Immutable Audit Record</h3>
                    <p className="font-bold">
                        Source verification is recorded on Polygon L2. Total Supply Chain Transparency Score: <span className="text-neo-pink">12/100</span> (FAILED).
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export const ViolationMonitoring = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-neo-pink border-3 border-black shadow-brutal flex items-center justify-center text-white">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Fraud & Violation Oversight</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Water Exploitation (Dying Wells) */}
                <Card className="border-neo-pink/30 hover:border-neo-pink transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                                <Droplets className="text-ocean-blue" size={18} />
                                Water Stress Analysis
                            </CardTitle>
                            <span className="bg-red-500 text-white text-[10px] px-2 py-1 font-black uppercase">Social Risk: High</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[10px] text-slate-gray uppercase font-bold mb-1">Groundwater Table (vs 2024)</p>
                            <div className="h-2 w-full bg-carbon-dark rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "22%" }}
                                    className="h-full bg-red-500"
                                />
                            </div>
                            <p className="text-xs font-bold mt-1 text-red-500">-78% Critical Depletion</p>
                        </div>
                        <p className="text-xs text-slate-gray">
                            Satellite GRACE analysis detects severe aquifer stress relative to factory output. Dry well probability for nearby villages: <span className="text-white font-bold">94%</span>.
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Illegal Waste Dumping (Midnight Pipe) */}
                <Card className="border-neo-purple/30 hover:border-neo-purple transition-colors bg-carbon-dark/20">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                                <Waves className="text-neo-purple" size={18} />
                                Midnight Pipe Monitor
                            </CardTitle>
                            <span className="bg-neo-purple text-white text-[10px] px-2 py-1 font-black uppercase">Active Scan</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-24 bg-black/40 border border-neo-purple/20 rounded-sm relative overflow-hidden flex items-end p-2 gap-1">
                            {/* Thermal Spike Visualization */}
                            {[20, 25, 22, 18, 15, 80, 75, 20, 18].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className={`flex-1 ${h > 50 ? 'bg-neo-pink animate-pulse' : 'bg-neo-purple/40'}`}
                                />
                            ))}
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <Activity className="w-3 h-3 text-neo-pink" />
                                <span className="text-[10px] font-black text-neo-pink uppercase">Thermal Spike @ 02:14 AM</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-gray">
                            Downstream thermal sensors detected a 12°C temperature variance at low-light hours. High probability of untreated chemical discharge.
                        </p>
                    </CardContent>
                </Card>

                {/* 3. Greencrowding Score */}
                <Card className="border-neo-lime/30 hover:border-neo-lime transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                                <Fingerprint className="text-neo-lime" size={18} />
                                Individual Accountability
                            </CardTitle>
                            <span className="bg-neo-lime text-black text-[10px] px-2 py-1 font-black uppercase">AI Audited</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold">
                                <span className="text-slate-gray">Alliance Avg</span>
                                <span className="text-neo-lime">92% Green</span>
                            </div>
                            <div className="h-1 w-full bg-carbon-dark rounded-full">
                                <div className="h-full bg-neo-lime w-[92%]" />
                            </div>
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold pt-1">
                                <span className="text-slate-gray">Company Actual</span>
                                <span className="text-neo-pink text-xs">Passive Greenwasher</span>
                            </div>
                            <div className="h-2 w-full bg-carbon-dark rounded-full overflow-hidden border border-neo-pink/20">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "34%" }}
                                    className="h-full bg-neo-pink"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-gray">
                            Company hides behind "Climate Alliance" membership while individual performance lags 58% behind collective pledges.
                        </p>
                    </CardContent>
                </Card>

                {/* 4. Methane Sentinel */}
                <Card className="border-earth-green/30 hover:border-earth-green transition-colors lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                                <Ghost className="text-teal-glow" size={18} />
                                Methane Sentinel (TROPOMI Feed)
                            </CardTitle>
                            <div className="flex gap-2">
                                <div className="animate-ping h-2 w-2 rounded-full bg-neo-lime" />
                                <span className="text-[10px] font-black uppercase">Hotspot Detected</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-black/60 aspect-video rounded-sm border-2 border-black relative overflow-hidden shadow-brutal">
                                {/* Simulated Satellite View with Plume */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-50 grayscale" />
                                <motion.div
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-neo-lime/40 rounded-full blur-2xl"
                                />
                                <div className="absolute inset-0 border-[1px] border-neo-lime/20 flex flex-col justify-between p-2">
                                    <span className="text-[8px] font-mono text-neo-lime">PLUME_ID: #MET-X02</span>
                                    <span className="text-[8px] font-mono text-neo-lime self-end">LAT: -3.462 | LON: -62.218</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs text-slate-gray leading-tight">
                                    Spectral analysis identified invisible methane plumes at Pipeline Node 12. Concentration: <span className="text-white">1250ppb</span> above baseline.
                                </p>
                                <div className="p-2 border border-white/5 bg-white/5 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase text-slate-gray">Last Scan</span>
                                        <span className="text-[10px] font-mono">12m ago</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase text-slate-gray">Verification</span>
                                        <span className="text-[10px] text-neo-lime uppercase font-black">Satellite Verified</span>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-neo-lime text-black text-[10px] font-black uppercase shadow-[2px_2px_0_#000]">
                                    Issue Fine via Smart Contract
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Supply Chain (Web3 Traceability) */}
                <Card className="border-ocean-blue/30 hover:border-ocean-blue transition-colors">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                            <Link2 className="text-ocean-blue" size={18} />
                            Chain of Custody (Web3)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="relative pl-6 space-y-4 border-l-2 border-ocean-blue/30">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-neo-lime border-2 border-black" />
                                    <p className="text-[10px] font-black uppercase text-white">Source: Amazon Farm #01</p>
                                    <p className="text-[9px] font-mono text-slate-gray">0x82...3f12 • Verified Clear-Cut Free</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-red-500 border-2 border-black animate-pulse" />
                                    <p className="text-[10px] font-black uppercase text-red-500">Logistics: Trans-Congo Port</p>
                                    <p className="text-[9px] font-mono text-slate-gray">0x14...a9c3 • ILLEGAL TIMBER RISK</p>
                                </div>
                                <div className="relative opacity-50">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-carbon-dark border-2 border-black" />
                                    <p className="text-[10px] font-black uppercase text-white">End Product: Bio-Resin 12</p>
                                    <p className="text-[9px] font-mono text-slate-gray">Pending Origin Verification</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bg-red-500/10 border border-red-500/20 text-[10px] text-red-500 font-bold italic">
                            ALERT: Supply chain contains 12% untraceable biomass from high-risk deforestation zones.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
