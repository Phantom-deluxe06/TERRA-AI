"use client";

import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-carbon-dark/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
                        <div className="rounded-lg bg-earth-green/10 p-1">
                            <Globe className="text-earth-green" size={24} />
                        </div>
                        <span>TERRA <span className="text-earth-green">AI</span></span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    <Link href="/dashboard" className="text-sm font-medium text-slate-gray hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/verify" className="text-sm font-medium text-slate-gray hover:text-white transition-colors">
                        Verify
                    </Link>
                    <Link href="/marketplace" className="text-sm font-medium text-slate-gray hover:text-white transition-colors">
                        Marketplace
                    </Link>
                    <div className="ml-4">
                        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-gray hover:bg-slate-800 hover:text-white focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Link
                        href="/dashboard"
                        className="block rounded-md px-3 py-2 text-base font-medium text-slate-gray hover:bg-slate-800 hover:text-white"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/verify"
                        className="block rounded-md px-3 py-2 text-base font-medium text-slate-gray hover:bg-slate-800 hover:text-white"
                    >
                        Verify
                    </Link>
                    <Link
                        href="/marketplace"
                        className="block rounded-md px-3 py-2 text-base font-medium text-slate-gray hover:bg-slate-800 hover:text-white"
                    >
                        Marketplace
                    </Link>
                    <div className="mt-4 px-3">
                        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
