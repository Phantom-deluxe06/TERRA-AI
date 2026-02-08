"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Leaf, ShieldCheck, Zap, BarChart3, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    return (
        <PageLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard Oversight</h1>
                    <p className="text-slate-gray">Monitor your verified climate actions and impact.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-gray">Total TERRA Earned</CardTitle>
                            <Zap className="h-4 w-4 text-earth-green" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,248.50</div>
                            <p className="text-xs text-earth-green flex items-center gap-1 mt-1">
                                <TrendingUp size={12} />
                                +12.5% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-gray">Verified Actions</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-ocean-blue" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">42</div>
                            <p className="text-xs text-slate-gray mt-1">
                                3 pending verification
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-gray">CO2 Offset (tCO2e)</CardTitle>
                            <Leaf className="h-4 w-4 text-teal-glow" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8.42</div>
                            <p className="text-xs text-teal-glow flex items-center gap-1 mt-1">
                                <TrendingUp size={12} />
                                +2.1 this week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-gray">Platform Impact</CardTitle>
                            <BarChart3 className="h-4 w-4 text-slate-gray" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">TOP 5%</div>
                            <p className="text-xs text-slate-gray mt-1">
                                Global Verifier Rank
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-earth-green/10 flex items-center justify-center text-earth-green">
                                                <Leaf size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">Reforestation Proof</p>
                                                <p className="text-sm text-slate-gray">Amazon Basin, Brazil</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-white">+50 TERRA</p>
                                            <p className="text-xs text-slate-gray">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Verification Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <BarChart3 size={48} className="text-slate-800 mb-4" />
                            <p className="text-slate-gray text-center max-w-[200px]">
                                Connect your account to track verification history.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}
