"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password);
            toast.success('Account created! Please check your email to verify.');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neo-pink flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-10 right-10 w-32 h-32 border-4 border-black bg-neo-lime rotate-12 shadow-[8px_8px_0_#000]" />
            <div className="absolute bottom-10 left-10 w-40 h-40 border-4 border-black bg-neo-yellow -rotate-6 shadow-[8px_8px_0_#000]" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex flex-col items-center gap-4">
                        <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000] -rotate-3">
                            <Leaf className="w-12 h-12 text-black" />
                        </div>
                        <span className="text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-[4px_4px_0_#000]">
                            TERRA <span className="text-neo-lime">AI</span>
                        </span>
                    </Link>
                    <p className="text-white font-black uppercase tracking-widest mt-4 text-sm bg-black inline-block px-4 py-1">Enlist Protocol</p>
                </div>

                {/* Signup Form */}
                <Card className="p-10 border-4 border-black shadow-[12px_12px_0_#000] bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xl font-black uppercase tracking-tighter text-black">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="USER@ECO.DOMAIN"
                                    className="pl-12 h-14 text-lg border-3 border-black bg-white placeholder:text-black/30 font-black uppercase"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xl font-black uppercase tracking-tighter text-black">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-12 h-14 text-lg border-3 border-black bg-white placeholder:text-black/30 font-black"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xl font-black uppercase tracking-tighter text-black">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-12 h-14 text-lg border-3 border-black bg-white placeholder:text-black/30 font-black"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-neo-lime hover:bg-neo-lime/90 text-black font-black py-8 text-2xl uppercase tracking-tighter border-4 border-black shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all mt-4"
                            size="lg"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 text-center border-t-2 border-black pt-8">
                        <p className="text-black font-bold uppercase text-sm">
                            Already Operational?{' '}
                            <Link href="/login" className="text-neo-pink hover:underline font-black">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
