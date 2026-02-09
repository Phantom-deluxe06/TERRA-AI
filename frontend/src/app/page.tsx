"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/navbar";
import { Leaf, ShieldCheck, Zap, Link2, ArrowRight, Sparkles, Trees, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

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
        <div className="min-h-screen bg-neo-yellow/30 font-bold selection:bg-neo-pink selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col items-center px-4 pt-24 pb-16 text-center sm:pt-32 relative overflow-hidden bg-white border-b-4 border-black">
                {/* Background "Stickers" */}
                <div className="absolute top-10 left-10 h-24 w-24 bg-neo-pink border-3 border-black shadow-brutal rotate-12 hidden md:flex items-center justify-center">
                    <Sparkles className="text-black" size={48} />
                </div>
                <div className="absolute bottom-10 right-20 h-32 w-32 bg-neo-purple border-3 border-black shadow-brutal -rotate-6 hidden md:flex items-center justify-center">
                    <Zap className="text-black" size={64} />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex h-24 w-24 items-center justify-center border-4 border-black bg-neo-lime text-black shadow-brutal"
                >
                    <Leaf size={48} />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-5xl font-black tracking-tighter sm:text-8xl uppercase text-black"
                >
                    The Future of <br />
                    <span className="bg-neo-lime px-4 py-2 border-4 border-black inline-block transform -rotate-2">Climate</span> <span className="bg-neo-pink px-4 py-2 border-4 border-black inline-block transform rotate-1 text-white">Trust</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-10 max-w-2xl text-xl text-black sm:text-2xl font-black bg-white/50 backdrop-blur-sm border-2 border-black inline-block p-4"
                >
                    AI-verified. Blockchain-secured. Zero-trust environmental action.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    {user ? (
                        <Link href="/dashboard">
                            <Button variant="secondary" size="lg" className="px-12">
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/signup">
                                <Button size="lg" className="px-12 bg-neo-lime text-black">
                                    Join The Mission
                                    <ArrowRight className="ml-2 h-6 w-6" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-12">
                                    Sign In
                                </Button>
                            </Link>
                        </>
                    )}
                </motion.div>
            </section>

            {/* How It Works */}
            <div className="bg-neo-lime border-b-4 border-black py-24">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl sm:text-6xl font-black text-black mb-6 uppercase tracking-tighter italic shadow-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">How It Works</h2>
                        <p className="text-black max-w-xl mx-auto text-xl font-bold bg-white border-3 border-black p-4 shadow-brutal">
                            Three simple steps to verify your eco-actions and earn rewards
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Sparkles, title: "1. Upload Photo", desc: "Snap a photo of your reforestation or solar project", color: "bg-neo-pink" },
                            { icon: Zap, title: "2. AI Verifies", desc: "Our YOLOv8 AI analyzes images with 95%+ confidence", color: "bg-neo-purple" },
                            { icon: Coins, title: "3. Earn Tokens", desc: "Get TERRA tokens directly to your crypto wallet", color: "bg-white" },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn("p-8 border-4 border-black shadow-brutal transform transition-transform hover:-rotate-2", step.color)}
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center border-3 border-black bg-white shadow-brutal">
                                    <step.icon className="h-8 w-8 text-black" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-4 uppercase">{step.title}</h3>
                                <p className="text-black font-bold leading-tight">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Features Grid */}
            <div className="bg-white py-24">
                <Container>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-12 sm:grid-cols-3"
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white hover:bg-neo-lime/10 transition-colors">
                                <CardContent className="pt-8">
                                    <div className="mb-6 h-12 w-12 flex items-center justify-center bg-neo-lime border-3 border-black shadow-brutal">
                                        <Zap size={24} className="text-black" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-black uppercase">Edge AI Verify</h3>
                                    <p className="text-black font-bold">
                                        YOLOv8 detects environmental assets with extreme precision in-browser.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="bg-white hover:bg-neo-pink/10 transition-colors">
                                <CardContent className="pt-8">
                                    <div className="mb-6 h-12 w-12 flex items-center justify-center bg-neo-pink border-3 border-black shadow-brutal text-white">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-black uppercase">Polygon L2</h3>
                                    <p className="text-black font-bold">
                                        Immutable proof of action stored on the most carbon-negative network.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="bg-white hover:bg-neo-purple/10 transition-colors">
                                <CardContent className="pt-8">
                                    <div className="mb-6 h-12 w-12 flex items-center justify-center bg-neo-purple border-3 border-black shadow-brutal text-white">
                                        <Trees size={24} />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-black uppercase">Visual Proof</h3>
                                    <p className="text-black font-bold">
                                        Every claim includes satellite imagery and AI confidence overlays.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </Container>
            </div>

            {/* CTA Section */}
            {!user && (
                <section className="bg-neo-pink py-24 border-y-4 border-black">
                    <Container>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                            <div className="flex-1">
                                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Ready to Build a Greener Future?</h2>
                                <p className="text-black bg-white border-3 border-black p-4 inline-block text-xl font-bold shadow-brutal">
                                    Join the zero-trust climate movement today.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <Link href="/signup">
                                    <Button size="lg" variant="outline" className="px-16 py-8 text-2xl font-black uppercase h-auto bg-neo-lime hover:bg-neo-lime/90 shadow-[8px_8px_0_#000]">
                                        Create Account
                                        <ArrowRight className="ml-3 h-8 w-8" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-white py-12 border-t-4 border-black">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-neo-lime border-2 border-black p-2 shadow-brutal">
                                <Leaf className="h-6 w-6 text-black" />
                            </div>
                            <span className="text-2xl font-black text-black tracking-tighter uppercase">TERRA AI</span>
                        </div>
                        <p className="text-lg font-bold text-black border-b-2 border-neo-pink inline-block">
                            © 2026 TERRA AI. Building Trust in Climate Action.
                        </p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
