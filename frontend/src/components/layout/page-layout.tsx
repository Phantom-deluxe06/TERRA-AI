"use client";

import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface PageLayoutProps {
    children: React.ReactNode;
    showSidebar?: boolean;
}

export function PageLayout({ children, showSidebar = true }: PageLayoutProps) {
    return (
        <div className="flex min-h-screen bg-white">
            {showSidebar && <Sidebar />}
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
