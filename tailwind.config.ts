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
                primary: {
                    DEFAULT: "#7C3AED",
                    light: "#A78BFA",
                    dark: "#5B21B6",
                },
                accent: {
                    DEFAULT: "#00D9FF",
                    glow: "rgba(0, 217, 255, 0.3)",
                },
                background: {
                    primary: "#0A0A0F",
                    secondary: "#12121A",
                    tertiary: "#1A1A2E",
                    card: "rgba(26, 26, 46, 0.6)",
                },
                text: {
                    primary: "#FFFFFF",
                    secondary: "rgba(255, 255, 255, 0.7)",
                    tertiary: "rgba(255, 255, 255, 0.5)",
                },
            },
            fontFamily: {
                sans: ["var(--font-space-grotesk)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #7C3AED 0%, #00D9FF 100%)",
                "gradient-bg": "linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 100%)",
                "gradient-card": "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(0, 217, 255, 0.05) 100%)",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                pulse: {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.5", transform: "scale(1.2)" },
                },
                scroll: {
                    "0%, 100%": { opacity: "1", transform: "translateX(-50%) translateY(0)" },
                    "50%": { opacity: "0.5", transform: "translateX(-50%) translateY(10px)" },
                },
                glow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 217, 255, 0.6)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.6s ease-in-out forwards",
                fadeInUp: "fadeInUp 0.6s ease-out forwards",
                float: "float 3s ease-in-out infinite",
                pulse: "pulse 2s infinite",
                scroll: "scroll 2s infinite",
                glow: "glow 2s infinite",
                blink: "blink 1s step-end infinite",
            },
        },
    },
    plugins: [],
};
export default config;
