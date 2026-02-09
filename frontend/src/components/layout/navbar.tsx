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
        <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-neo-lime shadow-brutal">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-black text-black">
                        <div className="rounded-none border-2 border-black bg-white p-1 shadow-[2px_2px_0_#000]">
                            <Globe className="text-black" size={24} />
                        </div>
                        <span className="uppercase tracking-tighter">TERRA <span className="text-neo-pink">AI</span></span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    <Link href="/dashboard" className="text-sm font-black uppercase tracking-tight text-black hover:bg-white px-2 py-1 border-2 border-transparent hover:border-black transition-all">
                        Dashboard
                    </Link>
                    <Link href="/verify" className="text-sm font-black uppercase tracking-tight text-black hover:bg-white px-2 py-1 border-2 border-transparent hover:border-black transition-all">
                        Verify
                    </Link>
                    <Link href="/marketplace" className="text-sm font-black uppercase tracking-tight text-black hover:bg-white px-2 py-1 border-2 border-transparent hover:border-black transition-all">
                        Marketplace
                    </Link>
                    <div className="ml-4 scale-90">
                        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center border-2 border-black bg-white p-2 text-black hover:bg-neo-pink focus:outline-none transition-all"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={cn("md:hidden border-b-4 border-black bg-white", isOpen ? "block" : "hidden")}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-black uppercase text-black hover:bg-neo-lime"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/verify"
                        className="block px-3 py-2 text-base font-black uppercase text-black hover:bg-neo-lime"
                    >
                        Verify
                    </Link>
                    <Link
                        href="/marketplace"
                        className="block px-3 py-2 text-base font-black uppercase text-black hover:bg-neo-lime"
                    >
                        Marketplace
                    </Link>
                    <div className="mt-4 px-3 pb-2">
                        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
