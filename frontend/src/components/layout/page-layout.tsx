"use client";

import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface PageLayoutProps {
    children: React.ReactNode;
    showSidebar?: boolean;
}

export function PageLayout({ children, showSidebar = true }: PageLayoutProps) {
    return (
        <div className="flex min-h-screen bg-carbon-dark">
            {showSidebar && <Sidebar />}
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
