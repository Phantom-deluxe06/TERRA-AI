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
                "relative flex flex-col border-r border-white/5 bg-carbon-dark transition-all duration-300",
                isCollapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            <div className="flex h-16 items-center border-b border-white/5 px-4">
                {!isCollapsed && (
                    <span className="text-lg font-bold text-white">TERRA <span className="text-earth-green">AI</span></span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto rounded-md p-1.5 text-slate-gray hover:bg-slate-800 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 space-y-1 p-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-earth-green/10 text-earth-green border-l-2 border-earth-green"
                                    : "text-slate-gray hover:bg-slate-800/50 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-earth-green" : "text-slate-gray group-hover:text-white")} />
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/5 p-2 pb-6">
                {secondaryItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-gray hover:bg-slate-800/50 hover:text-white transition-all"
                    >
                        <item.icon size={20} />
                        {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                ))}
            </div>
        </aside>
    );
}
