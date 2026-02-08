import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Web3Provider } from "@/components/providers/web3-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "TERRA AI | Decentralized Climate Verification",
    description: "Verify your climate actions with AI and earn blockchain rewards.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    inter.variable,
                    jetbrainsMono.variable,
                    "min-h-screen bg-carbon-dark antialiased"
                )}
            >
                <AuthProvider>
                    <Web3Provider>
                        <main>{children}</main>
                        <Toaster position="top-right" richColors />
                    </Web3Provider>
                </AuthProvider>
            </body>
        </html>
    );
}

