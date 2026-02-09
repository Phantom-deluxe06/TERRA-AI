"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CheckCircle2,
    Search,
    ShoppingBag,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    BarChart3
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Actions", href: "/dashboard/actions", icon: CheckCircle2 },
    { name: "Verify", href: "/verify", icon: Search },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Reports", href: "/reports", icon: BarChart3 },
];

const secondaryItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "relative flex flex-col border-r-4 border-black bg-white transition-all duration-300 shadow-[4px_0_0_0_#000]",
                isCollapsed ? "w-[80px]" : "w-[280px]"
            )}
        >
            <div className="flex h-20 items-center border-b-4 border-black px-4 bg-neo-lime">
                {!isCollapsed && (
                    <span className="text-xl font-black uppercase tracking-tighter text-black">TERRA <span className="text-neo-pink">AI</span></span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto border-2 border-black bg-white p-1.5 text-black hover:bg-neo-pink transition-all"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 space-y-2 p-3 pt-6">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 border-2 transition-all group px-3 py-3 text-sm font-black uppercase tracking-tight",
                                isActive
                                    ? "bg-neo-lime text-black border-black shadow-[4px_4px_0_#000] translate-x-[-2px] translate-y-[-2px]"
                                    : "text-black border-transparent hover:border-black hover:bg-neo-lime/10"
                            )}
                        >
                            <item.icon size={22} className="text-black" strokeWidth={isActive ? 3 : 2} />
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t-4 border-black p-3 pb-8">
                {secondaryItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 border-2 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-tight text-black hover:border-black hover:bg-neo-pink/10 transition-all"
                    >
                        <item.icon size={20} className="text-black" />
                        {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                ))}
            </div>
        </aside>
    );
}
