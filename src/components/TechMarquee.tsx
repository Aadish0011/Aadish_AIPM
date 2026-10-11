"use client";

import { motion } from "framer-motion";

const ITEMS = [
    "RAG Systems",
    "Q by EQS",
    "LangGraph",
    "Agentic AI",
    "LLMs",
    "Python",
    "FastAPI",
    "Computer Vision",
    "Prompt Engineering",
    "Product Leadership",
    "40+ Engineers",
    "3 Patents",
];

export default function TechMarquee() {
    const row = [...ITEMS, ...ITEMS];

    return (
        <div className="relative py-5 overflow-hidden border-y border-white/[0.05] bg-white/[0.015]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#f7f5f0] dark:from-void to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#f7f5f0] dark:from-void to-transparent" />

            <motion.div
                className="flex w-max gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
                {row.map((item, i) => (
                    <span
                        key={`${item}-${i}`}
                        className="inline-flex items-center gap-3 text-sm font-display font-semibold tracking-wide text-muted/80"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-play/70" />
                        {item}
                        <span className="text-solar/50">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
