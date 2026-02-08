"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/layout/page-layout";
import { Leaf, ShieldCheck, Zap, Link2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <PageLayout showSidebar={false}>
            {/* Hero Section */}
            <section className="flex flex-col items-center px-4 pt-20 text-center sm:pt-32">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-earth-green/10 text-earth-green shadow-glow-green"
                >
                    <Leaf size={32} />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl"
                >
                    The Future of <br />
                    <span className="bg-eco-gradient bg-clip-text text-transparent">Climate Accountability</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-10 max-w-2xl text-lg text-slate-gray sm:text-xl"
                >
                    AI-verified. Blockchain-secured. Zero-trust environmental action.
                    Join the revolution in transparent climate verification.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Button size="lg" className="px-10">Start Verifying</Button>
                    <Button variant="outline" size="lg" className="px-10">Learn More</Button>
                </motion.div>
            </section>

            {/* Features Grid */}
            <Container className="mt-32 pb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-3"
                >
                    <motion.div variants={itemVariants}>
                        <Card className="hover:border-earth-green/30 transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-ocean-blue">
                                    <Zap size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Truth Verification</h3>
                                <p className="text-slate-gray">
                                    Automated AI monitoring via satellite imagery and IoT sensors ensures every claim is accurate.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="hover:border-earth-green/30 transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-earth-green">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Immutable Ledger</h3>
                                <p className="text-slate-gray">
                                    Every verified action is minted as a tamper-proof certificate on the Polygon blockchain.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="hover:border-earth-green/30 transition-all duration-300">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-teal-glow">
                                    <Link2 size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Tradeable Credits</h3>
                                <p className="text-slate-gray">
                                    Verified actions generate high-quality carbon credits that can be traded on our open marketplace.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </Container>
        </PageLayout>
    );
}
