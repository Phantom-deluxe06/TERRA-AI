"use client";

import React, { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { Leaf, ArrowRight, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { ImageUpload } from '@/components/ai/image-upload';
import { VerificationResultDisplay } from '@/components/ai/verification-result';
import { verifyEcoAction, VerificationResult } from '@/lib/ai/verify';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function VerifyPage() {
    const { isConnected } = useAccount();
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<VerificationResult | null>(null);

    const handleImageLoad = useCallback(async (image: HTMLImageElement) => {
        setIsProcessing(true);
        setResult(null);

        try {
            const verificationResult = await verifyEcoAction(image);
            setResult(verificationResult);

            if (verificationResult.isVerified) {
                toast.success(`Verified! You earned ${verificationResult.tokensEarned} TERRA tokens`);
            } else {
                toast.error('No eco-action detected. Try another image.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast.error('Verification failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const handleClaimTokens = async () => {
        if (!result?.isVerified) return;

        toast.info('Token claiming will be enabled after contract deployment');
        // TODO: Call smart contract to mint tokens
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-carbon-dark">
                <Navbar />

                <main className="max-w-4xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-green/10 border border-earth-green/30 mb-6">
                            <Leaf className="w-4 h-4 text-earth-green" />
                            <span className="text-sm text-earth-green font-medium">AI-Powered Verification</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Verify Your Eco-Action
                        </h1>
                        <p className="text-lg text-slate-gray max-w-2xl mx-auto">
                            Upload a photo of your environmental action. Our AI will verify it
                            and reward you with TERRA tokens on the blockchain.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Upload Section */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Upload Image</h2>
                                <ImageUpload
                                    onImageLoad={handleImageLoad}
                                    isProcessing={isProcessing}
                                />
                            </Card>

                            {/* What we detect */}
                            <Card className="p-6 bg-white/5">
                                <h3 className="text-sm font-semibold text-slate-gray uppercase tracking-wide mb-3">
                                    Detectable Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {[
                                        { label: 'Tree Planting', reward: 10 },
                                        { label: 'Solar Panels', reward: 25 },
                                        { label: 'EV Chargers', reward: 15 },
                                        { label: 'Recycling Bins', reward: 5 },
                                        { label: 'Bicycles', reward: 3 },
                                        { label: 'Reusable Bags', reward: 2 },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between p-2 rounded bg-white/5">
                                            <span className="text-slate-gray">{item.label}</span>
                                            <span className="text-earth-green font-medium">+{item.reward}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Results Section */}
                        <div className="space-y-6">
                            {result ? (
                                <>
                                    <VerificationResultDisplay result={result} />

                                    {result.isVerified && (
                                        <div className="space-y-4">
                                            {isConnected ? (
                                                <Button
                                                    onClick={handleClaimTokens}
                                                    className="w-full bg-earth-green hover:bg-earth-green/90 text-carbon-dark font-semibold"
                                                    size="lg"
                                                >
                                                    Claim {result.tokensEarned} TERRA Tokens
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            ) : (
                                                <Card className="p-6 border-dashed border-2 border-white/20">
                                                    <div className="text-center">
                                                        <Wallet className="w-8 h-8 text-slate-gray mx-auto mb-3" />
                                                        <p className="text-slate-gray mb-4">Connect your wallet to claim tokens</p>
                                                        <ConnectButton />
                                                    </div>
                                                </Card>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Card className="p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                                    <div className="p-4 rounded-full bg-white/5 mb-4">
                                        <Leaf className="w-8 h-8 text-slate-gray" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Ready to Verify
                                    </h3>
                                    <p className="text-slate-gray max-w-xs">
                                        Upload an image of your eco-action to get started with AI verification
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
