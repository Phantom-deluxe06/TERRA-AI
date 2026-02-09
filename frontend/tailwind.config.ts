import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "neo-lime": "#BFFF00",
                "neo-pink": "#FF6B9D",
                "neo-orange": "#FF6B35",
                "neo-purple": "#8B5CF6",
                "neo-yellow": "#FFE500",
                "neo-mint": "#98FF98",
                "neo-white": "#FFFFFF",
                "neo-black": "#000000",
                "earth-green": {
                    DEFAULT: "#10B981",
                    hover: "#059669",
                },
                "ocean-blue": "#0EA5E9",
                "carbon-dark": {
                    DEFAULT: "#0F172A",
                    depth: "#1E293B",
                },
                "forest-deep": "#059669",
                "teal-glow": "#14B8A6",
                "slate-gray": "#64748B",
                "ice-blue": "#E0F2FE",
                success: "#22C55E",
                warning: "#F59E0B",
                error: "#EF4444",
                info: "#3B82F6",
            },
            backgroundImage: {
                "neo-gradient": "linear-gradient(135deg, #BFFF00 0%, #FF6B9D 100%)",
                "eco-gradient": "linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)",
                "carbon-gradient": "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
                "verification-glow": "linear-gradient(90deg, #14B8A6 0%, #10B981 50%, #22C55E 100%)",
                "blockchain-accent": "linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)",
            },
            fontFamily: {
                primary: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            borderWidth: {
                '3': '3px',
                '4': '4px',
            },
            borderRadius: {
                none: "0px",
                sm: "2px",
                md: "4px",
                lg: "8px",
                xl: "12px",
            },
            boxShadow: {
                brutal: "4px 4px 0px #000000",
                "brutal-lg": "8px 8px 0px #000000",
                "brutal-xl": "8px 8px 0 #000000",
                sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
                md: "0 4px 6px rgba(0, 0, 0, 0.4)",
                lg: "0 10px 15px rgba(0, 0, 0, 0.5)",
                "glow-green": "0 0 20px rgba(16, 185, 129, 0.3)",
                "glow-blue": "0 0 20px rgba(14, 165, 233, 0.3)",
            },
        },
    },
    plugins: [],
};
export default config;
