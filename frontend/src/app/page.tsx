"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/navbar";
import { Leaf, ShieldCheck, Zap, Link2, ArrowRight, Sparkles, Trees, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";

export default function Home() {
    const { user } = useAuth();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen bg-carbon-dark">
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col items-center px-4 pt-24 text-center sm:pt-32">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-earth-green/10 text-earth-green shadow-glow-green"
                >
                    <Leaf size={40} />
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
                    Upload photos of your eco-actions and earn TERRA tokens.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {user ? (
                        <Link href="/dashboard">
                            <Button size="lg" className="px-10 bg-earth-green hover:bg-earth-green/90 text-carbon-dark font-semibold">
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/signup">
                                <Button size="lg" className="px-10 bg-earth-green hover:bg-earth-green/90 text-carbon-dark font-semibold">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-10">
                                    Sign In
                                </Button>
                            </Link>
                        </>
                    )}
                </motion.div>
            </section>

            {/* How It Works */}
            <Container className="mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-slate-gray max-w-xl mx-auto">
                        Three simple steps to verify your eco-actions and earn rewards
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Sparkles, title: "1. Upload Photo", desc: "Take a photo of your eco-action like tree planting or solar panel installation" },
                        { icon: Zap, title: "2. AI Verifies", desc: "Our YOLOv8 AI analyzes your image and verifies the environmental action" },
                        { icon: Coins, title: "3. Earn Tokens", desc: "Verified actions mint TERRA tokens directly to your wallet" },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-earth-green/10">
                                <step.icon className="h-8 w-8 text-earth-green" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-slate-gray">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>

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
                        <Card className="hover:border-earth-green/30 transition-all duration-300 h-full">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-ocean-blue">
                                    <Zap size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">AI Verification</h3>
                                <p className="text-slate-gray">
                                    YOLOv8 detects trees, solar panels, EV chargers, and more with 80%+ confidence.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="hover:border-earth-green/30 transition-all duration-300 h-full">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-earth-green">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Blockchain Secured</h3>
                                <p className="text-slate-gray">
                                    Verified actions mint TERRA tokens on Polygon - transparent and immutable.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="hover:border-earth-green/30 transition-all duration-300 h-full">
                            <CardContent className="pt-6">
                                <div className="mb-4 text-teal-glow">
                                    <Trees size={32} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Real Impact</h3>
                                <p className="text-slate-gray">
                                    Track your CO2 offset and see your contribution to global climate action.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </Container>

            {/* CTA Section */}
            {!user && (
                <section className="bg-earth-green/5 border-t border-earth-green/20 py-20">
                    <Container>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make an Impact?</h2>
                            <p className="text-slate-gray mb-8 max-w-xl mx-auto">
                                Join thousands of eco-warriors verifying their climate actions
                            </p>
                            <Link href="/signup">
                                <Button size="lg" className="px-12 bg-earth-green hover:bg-earth-green/90 text-carbon-dark font-semibold">
                                    Create Free Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-white/10 py-8">
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-5 w-5 text-earth-green" />
                            <span className="font-semibold text-white">TERRA AI</span>
                        </div>
                        <p className="text-sm text-slate-gray">© 2026 TERRA AI. Decentralized Climate Verification.</p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
