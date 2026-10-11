import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
                display: ["var(--font-syne)", "system-ui", "sans-serif"],
            },
            colors: {
                void: "#05040f",
                surface: {
                    DEFAULT: "#0c0b1a",
                    light: "#141328",
                    lighter: "#1c1a36",
                },
                solar: {
                    DEFAULT: "#B8943A",
                    bright: "#C9A84A",
                    dim: "#7A6420",
                },
                nebula: {
                    blue: "#4A73C4",
                    purple: "#6558B8",
                },
                play: {
                    DEFAULT: "#3DB8A0",
                    soft: "#6FD0BB",
                    dim: "#2A8A76",
                },
                foreground: "#e4e2dc",
                muted: "#8a93a5",
                subtle: "#555e70",
            },
            animation: {
                orbit: "orbit 60s linear infinite",
                "orbit-reverse": "orbit 45s linear infinite reverse",
                "orbit-slow": "orbit 90s linear infinite",
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 8s ease-in-out 2s infinite",
                "float-slow": "float 10s ease-in-out 1s infinite",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                twinkle: "twinkle 4s ease-in-out infinite",
                "fade-up": "fade-up 0.8s ease-out both",
                wiggle: "wiggle 2.8s ease-in-out infinite",
            },
            keyframes: {
                orbit: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-16px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
                    "50%": { opacity: "1", transform: "scale(1.05)" },
                },
                twinkle: {
                    "0%, 100%": { opacity: "0.2" },
                    "50%": { opacity: "1" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-2deg)" },
                    "50%": { transform: "rotate(2deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
