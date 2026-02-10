"use client";

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Leaf, ShieldCheck, Zap, BarChart3, TrendingUp, Clock, MapPin, Cpu } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/components/providers/auth-provider";
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { IotOracle } from "@/components/dashboard/iot-oracle";
import { IotMap, TamperCenter } from "@/components/dashboard/iot-map";

interface UserStats {
    total_tokens: number;
    total_co2_offset: number;
    verified_count: number;
}

interface ActivityItem {
    id: string;
    action_type: string;
    created_at: string;
    tokens_earned: number;
    location: any;
    verification_status: string;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const { address, isConnected } = useAccount();
    const [stats, setStats] = useState<UserStats>({
        total_tokens: 0,
        total_co2_offset: 0,
        verified_count: 0
    });
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address) return;

        async function fetchDashboardData() {
            setLoading(true);
            try {
                const { data: userData, error: userError } = await supabase
                    .from('Users')
                    .select('id, total_tokens, total_co2_offset')
                    .eq('wallet_address', (address as string).toLowerCase())
                    .single();

                if (userError && userError.code !== 'PGRST116') {
                    console.error('Error fetching user stats:', userError);
                }

                let verifiedCount = 0;
                let finalActions: ActivityItem[] = [];

                if (userData) {
                    const { data: userActions, count: userCount } = await supabase
                        .from('EcoActions')
                        .select('*', { count: 'exact' })
                        .eq('user_id', userData.id)
                        .order('created_at', { ascending: false })
                        .limit(5);

                    if (userActions) finalActions = userActions as ActivityItem[];
                    if (userCount !== null) verifiedCount = userCount;
                } else {
                    const { data: addressActions, count: addressCount } = await supabase
                        .from('EcoActions')
                        .select('*', { count: 'exact' })
                        .eq('wallet_address', (address as string).toLowerCase())
                        .order('created_at', { ascending: false })
                        .limit(5);

                    if (addressActions) finalActions = addressActions as ActivityItem[];
                    if (addressCount !== null) verifiedCount = addressCount;
                }

                setStats({
                    total_tokens: Number(userData?.total_tokens || 0),
                    total_co2_offset: Number(userData?.total_co2_offset || 0),
                    verified_count: verifiedCount
                });
                setActivities(finalActions);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, [address]);

    return (
        <ProtectedRoute>
            <PageLayout>
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Dashboard Oversight</h1>
                            <p className="text-slate-gray">Monitor your verified climate actions and impact.</p>
                        </div>
                        {isConnected && (
                            <div className="hidden md:block px-4 py-2 border border-white/10 bg-white/5 rounded-lg">
                                <p className="text-[10px] uppercase text-slate-gray font-bold tracking-widest mb-1">Active Wallet</p>
                                <p className="text-xs font-mono text-earth-green font-bold">
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-gray">Total TERRA Earned</CardTitle>
                                <Zap className="h-4 w-4 text-earth-green" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_tokens.toLocaleString()}</div>
                                <p className="text-xs text-earth-green flex items-center gap-1 mt-1">
                                    <TrendingUp size={12} />
                                    Active Balance
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-gray">Verified Actions</CardTitle>
                                <ShieldCheck className="h-4 w-4 text-ocean-blue" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.verified_count}</div>
                                <p className="text-xs text-slate-gray mt-1">
                                    Archive items
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-gray">CO2 Offset (tCO2e)</CardTitle>
                                <Leaf className="h-4 w-4 text-teal-glow" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_co2_offset.toFixed(2)}</div>
                                <p className="text-xs text-teal-glow flex items-center gap-1 mt-1">
                                    Total verified impact
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-gray">Platform Rank</CardTitle>
                                <BarChart3 className="h-4 w-4 text-slate-gray" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.verified_count > 10 ? 'ELITE' : 'CITIZEN'}
                                </div>
                                <p className="text-xs text-slate-gray mt-1">
                                    Verification Tier
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* IoT Control Center */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-neo-lime border-3 border-black shadow-brutal flex items-center justify-center text-black">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">IoT Control Center</h2>
                        </div>

                        <IotOracle />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <IotMap />
                            </div>
                            <div className="lg:col-span-1">
                                <TamperCenter />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {loading ? (
                                        <div className="py-10 text-center text-slate-gray animate-pulse">
                                            Loading historical records...
                                        </div>
                                    ) : activities.length > 0 ? (
                                        activities.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-earth-green/10 flex items-center justify-center text-earth-green">
                                                        <Leaf size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white capitalize">{item.action_type.replace('_', ' ')}</p>
                                                        <p className="text-sm text-slate-gray flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-earth-green">+{item.tokens_earned} TERRA</p>
                                                    <p className="text-[10px] text-slate-gray uppercase font-black">{item.verification_status}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-10 text-center text-slate-gray">
                                            <div className="mb-4 flex justify-center">
                                                <Zap className="h-10 w-10 opacity-20" />
                                            </div>
                                            <p>No actions verified yet.</p>
                                            <p className="text-xs mt-1 italic">Initiate an audit to earn rewards.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1 border-earth-green/20 bg-earth-green/5">
                            <CardHeader>
                                <CardTitle className="text-earth-green">Verification Insights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-4 bg-carbon-dark/50 rounded-lg border border-white/5">
                                    <p className="text-xs text-slate-gray font-bold uppercase mb-2">Impact Summary</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full border-2 border-earth-green flex items-center justify-center text-earth-green font-bold">
                                            {stats.verified_count > 0 ? Math.min(100, (stats.verified_count / 10) * 100).toFixed(0) : 0}%
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Next Tier Progress</p>
                                            <p className="text-xs text-slate-gray">{Math.max(0, 10 - (stats.verified_count % 10))} actions to LEVEL UP</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                        <MapPin size={14} className="text-ocean-blue" />
                                        Regional Influence
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 bg-white/5 rounded-md">
                                            <p className="text-[10px] text-slate-gray uppercase">Global Share</p>
                                            <p className="text-lg font-bold text-white">0.02%</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-md">
                                            <p className="text-[10px] text-slate-gray uppercase">Avg Reward</p>
                                            <p className="text-lg font-bold text-white">
                                                {activities.length > 0
                                                    ? (activities.reduce((a, b) => a + Number(b.tokens_earned), 0) / activities.length).toFixed(1)
                                                    : '0'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.location.href = '/verify'}
                                    className="w-full py-4 bg-earth-green text-carbon-dark font-black uppercase tracking-tighter rounded-sm hover:bg-earth-green/90 transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0_#111]"
                                >
                                    <Zap size={18} fill="currentColor" />
                                    New Verification
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </PageLayout>
        </ProtectedRoute>
    );
}
