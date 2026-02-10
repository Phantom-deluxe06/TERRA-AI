"use client";

import React, { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { Leaf, ArrowRight, Wallet, Camera, Satellite, Zap } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/ai/image-upload';
import { SatelliteLocationPicker } from '@/components/ai/satellite-location-picker';
import { VerificationResultDisplay } from '@/components/ai/verification-result';
import { SatelliteComparisonResultDisplay } from '@/components/ai/satellite-comparison-result';
import { verifyEcoAction, VerificationResult } from '@/lib/ai/verify';
import { analyzeSatelliteComparison, type SatelliteAnalysisResult } from '@/lib/ai/satellite-analysis';
import { loadImageFromUrl, type BeforeAfterImages } from '@/lib/satellite';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from '@/components/auth/protected-route';

type VerificationMode = 'photo' | 'satellite';

export default function VerifyPage() {
    const { isConnected } = useAccount();
    const [mode, setMode] = useState<VerificationMode>('photo');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [comparisonResult, setComparisonResult] = useState<SatelliteAnalysisResult | null>(null);
    const [beforeAfterImages, setBeforeAfterImages] = useState<BeforeAfterImages | null>(null);

    // Photo upload verification
    const handleImageLoad = useCallback(async (image: HTMLImageElement) => {
        setIsProcessing(true);
        setResult(null);
        setComparisonResult(null);

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

    // Satellite before/after comparison using pixel analysis
    const handleComparisonReady = useCallback(async (beforeAfter: BeforeAfterImages, activityType: string) => {
        setIsProcessing(true);
        setResult(null);
        setComparisonResult(null);
        setBeforeAfterImages(beforeAfter);

        try {
            toast.info('Loading satellite imagery...');

            // Load both images with error handling
            let beforeImg: HTMLImageElement;
            let afterImg: HTMLImageElement;

            try {
                [beforeImg, afterImg] = await Promise.all([
                    loadImageFromUrl(beforeAfter.before.imageUrl),
                    loadImageFromUrl(beforeAfter.after.imageUrl),
                ]);
            } catch (loadError) {
                console.error('Image load failed:', loadError);
                toast.error('Failed to load satellite images. Check your Google Maps API key and billing.');
                setIsProcessing(false);
                return;
            }

            toast.info('Running land-cover AI analysis...');

            // Run pixel-based satellite analysis
            const comparison = await analyzeSatelliteComparison(beforeImg, afterImg, activityType);
            setComparisonResult(comparison);

            if (comparison.changeDetected) {
                toast.success(`Eco-activity confirmed! You earned ${comparison.tokensEarned} TERRA tokens`);
            } else {
                toast.warning('No significant environmental changes detected at this location.');
            }
        } catch (error) {
            console.error('Satellite comparison error:', error);
            toast.error('Analysis failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const handleClaimTokens = async () => {
        const earned = result?.tokensEarned || comparisonResult?.tokensEarned || 0;
        if (!earned) return;

        toast.info('Token claiming will be enabled after contract deployment');
        // TODO: Call smart contract to mint tokens
    };

    const hasResult = result || comparisonResult;
    const isVerified = result?.isVerified || comparisonResult?.changeDetected;
    const tokensEarned = result?.tokensEarned || comparisonResult?.tokensEarned || 0;

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-white">
                <Navbar />

                <main className="max-w-5xl mx-auto px-4 py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-6 py-2 border-3 border-black bg-neo-yellow shadow-[4px_4px_0_#000] mb-8 transform -rotate-1">
                            <Leaf className="w-5 h-5 text-black" />
                            <span className="text-sm text-black font-black uppercase tracking-widest">AI Audit System v1.0</span>
                        </div>
                        <h1 className="text-6xl font-black text-black mb-6 uppercase tracking-tighter italic">
                            Verify <span className="bg-neo-lime px-4 border-4 border-black shadow-[6px_6px_0_#000]">Impact</span>
                        </h1>
                        <p className="text-xl text-black/70 font-bold max-w-2xl mx-auto uppercase">
                            Upload photos or scan satellite feeds. Our neural network verifies
                            environmental actions and mints TERRA assets directly to your wallet.
                        </p>
                    </div>

                    {/* Mode Tabs */}
                    <div className="flex justify-center gap-6 mb-12">
                        <Button
                            variant={mode === 'photo' ? 'primary' : 'outline'}
                            onClick={() => { setMode('photo'); setResult(null); setComparisonResult(null); }}
                            className={cn(
                                "flex items-center gap-3 text-lg h-14",
                                mode === 'photo' ? "bg-neo-pink text-white" : "bg-white"
                            )}
                        >
                            <Camera className="w-6 h-6" />
                            Ground Audit
                        </Button>
                        <Button
                            variant={mode === 'satellite' ? 'primary' : 'outline'}
                            onClick={() => { setMode('satellite'); setResult(null); setComparisonResult(null); }}
                            className={cn(
                                "flex items-center gap-3 text-lg h-14",
                                mode === 'satellite' ? "bg-neo-purple text-white" : "bg-white"
                            )}
                        >
                            <Satellite className="w-6 h-6" />
                            Satellite Scan
                        </Button>
                    </div>

                    {/* Main Content */}
                    {mode === 'photo' ? (
                        /* Photo Mode - Side by Side */
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="space-y-8">
                                <Card className="p-8 border-4 border-black shadow-brutal bg-white">
                                    <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter italic">Image Uplink</h2>
                                    <ImageUpload
                                        onImageLoad={handleImageLoad}
                                        isProcessing={isProcessing}
                                    />
                                </Card>

                                {/* Photo Asset Bounties */}
                                <Card className="p-8 border-4 border-black bg-neo-yellow shadow-brutal">
                                    <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                                        <Zap className="w-6 h-6" />
                                        Asset Bounties
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { label: 'Bicycles', reward: 3 },
                                            { label: 'Potted Plants', reward: 10 },
                                            { label: 'Trees', reward: 10 },
                                            { label: 'Solar Panels', reward: 25 },
                                            { label: 'EV Chargers', reward: 15 },
                                            { label: 'Recycling Bins', reward: 5 },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center justify-between p-4 border-2 border-black bg-white shadow-[4px_4px_0_#000]">
                                                <span className="text-black font-black uppercase tracking-tight">{item.label}</span>
                                                <span className="bg-neo-lime px-3 py-1 border-2 border-black font-black">+{item.reward} TERRA</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Photo Results */}
                            <div className="space-y-6">
                                {result ? (
                                    <>
                                        <VerificationResultDisplay result={result} />
                                        {result.isVerified && (
                                            <div className="space-y-4">
                                                {isConnected ? (
                                                    <Button
                                                        onClick={handleClaimTokens}
                                                        className="w-full bg-neo-lime hover:bg-neo-lime/90 text-black font-black py-8 text-2xl uppercase tracking-tighter border-4 border-black shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                                                        size="lg"
                                                    >
                                                        Claim Assets {result.tokensEarned} $TERRA
                                                        <ArrowRight className="w-8 h-8 ml-4 stroke-[3px]" />
                                                    </Button>
                                                ) : (
                                                    <Card className="p-10 border-4 border-dashed border-black bg-white shadow-brutal text-center">
                                                        <Wallet className="w-16 h-16 text-black mx-auto mb-6" />
                                                        <h3 className="text-2xl font-black uppercase mb-2">Wallet Disconnected</h3>
                                                        <p className="text-black/60 font-bold mb-8 uppercase text-sm">Auth required to mint verified tokens</p>
                                                        <div className="scale-125 flex justify-center py-4">
                                                            <ConnectButton />
                                                        </div>
                                                    </Card>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Card className="p-16 flex flex-col items-center justify-center text-center min-h-[400px] border-4 border-black bg-white shadow-brutal border-dashed">
                                        <div className="p-8 border-4 border-black bg-neo-lime shadow-[6px_6px_0_#000] mb-8 transform rotate-3">
                                            <Camera className="w-16 h-16 text-black" strokeWidth={3} />
                                        </div>
                                        <h3 className="text-4xl font-black text-black mb-4 uppercase tracking-tighter italic">
                                            System Ready
                                        </h3>
                                        <p className="text-lg text-black/60 font-bold max-w-xs uppercase leading-tight">
                                            Initiate ground audit by uploading high-resolution visual evidence.
                                        </p>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Satellite Mode - Full Width Flow */
                        <div className="space-y-8">
                            <SatelliteLocationPicker
                                onComparisonReady={handleComparisonReady}
                                onError={(err) => toast.error(err)}
                                isProcessing={isProcessing}
                            />

                            {/* Comparison Results */}
                            {comparisonResult && (
                                <div className="space-y-6">
                                    <SatelliteComparisonResultDisplay
                                        result={comparisonResult}
                                        beforeImageUrl={beforeAfterImages?.before.imageUrl}
                                        afterImageUrl={beforeAfterImages?.after.imageUrl}
                                    />

                                    {/* Geo Stamp */}
                                    {beforeAfterImages?.location && (
                                        <Card className="p-6 bg-neo-purple border-4 border-black shadow-brutal text-white">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white border-2 border-black">
                                                    <Satellite className="w-8 h-8 text-black" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase text-white/70">Geo-Verification Stamp</p>
                                                    <p className="text-lg font-black tracking-tight">
                                                        COORD: {beforeAfterImages.location.lat.toFixed(6)}, {beforeAfterImages.location.lng.toFixed(6)}
                                                    </p>
                                                    {beforeAfterImages.location.address && (
                                                        <p className="text-sm text-white/80 font-bold">{beforeAfterImages.location.address}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    )}

                                    {/* Claim Button */}
                                    {comparisonResult.changeDetected && comparisonResult.tokensEarned > 0 && (
                                        <div className="space-y-4">
                                            {isConnected ? (
                                                <Button
                                                    onClick={handleClaimTokens}
                                                    className="w-full bg-neo-lime hover:bg-neo-lime/90 text-black font-black py-8 text-2xl uppercase tracking-tighter border-4 border-black shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                                                    size="lg"
                                                >
                                                    Claim Assets {comparisonResult.tokensEarned} $TERRA
                                                    <ArrowRight className="w-8 h-8 ml-4 stroke-[3px]" />
                                                </Button>
                                            ) : (
                                                <Card className="p-10 border-4 border-dashed border-black bg-white shadow-brutal text-center">
                                                    <Wallet className="w-16 h-16 text-black mx-auto mb-6" />
                                                    <h3 className="text-2xl font-black uppercase mb-2">Wallet Disconnected</h3>
                                                    <p className="text-black/60 font-bold mb-8 uppercase text-sm">Connect wallet to claim TERRA tokens</p>
                                                    <div className="scale-125 flex justify-center py-4">
                                                        <ConnectButton />
                                                    </div>
                                                </Card>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Empty State - No Results Yet */}
                            {!comparisonResult && !isProcessing && (
                                <Card className="p-16 flex flex-col items-center justify-center text-center min-h-[300px] border-4 border-black bg-white shadow-brutal border-dashed">
                                    <div className="p-8 border-4 border-black bg-neo-purple shadow-[6px_6px_0_#000] mb-8 transform -rotate-3">
                                        <Satellite className="w-16 h-16 text-white" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-4xl font-black text-black mb-4 uppercase tracking-tighter italic">
                                        Awaiting Coordinates
                                    </h3>
                                    <p className="text-lg text-black/60 font-bold max-w-md uppercase leading-tight">
                                        Enter a location above to fetch before &amp; after satellite imagery.
                                        The AI will compare images and detect eco-activity changes.
                                    </p>
                                </Card>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
