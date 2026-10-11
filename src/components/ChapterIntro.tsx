"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";

const roles = ["AI Engineer", "RAG Builder", "Agent Architect", "Product Leader"];

const FLOAT_CHIPS = [
    { label: "LangGraph", className: "top-[18%] left-[6%] md:left-[12%] animate-float" },
    { label: "RAG", className: "top-[28%] right-[8%] md:right-[14%] animate-float-delayed" },
    { label: "Q by EQS", className: "bottom-[30%] left-[8%] md:left-[16%] animate-float-slow" },
    { label: "Python", className: "bottom-[22%] right-[10%] md:right-[18%] animate-float" },
    { label: "40+ Led", className: "top-[42%] left-[2%] md:left-[6%] hidden sm:block animate-float-delayed" },
    { label: "3 Patents", className: "top-[48%] right-[2%] md:right-[7%] hidden sm:block animate-float-slow" },
];

function KineticWord({ word, delay = 0 }: { word: string; delay?: number }) {
    return (
        <span className="inline-flex">
            {word.split("").map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 40, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                        delay: delay + i * 0.035,
                    }}
                    className="inline-block origin-bottom cursor-grow hover:-translate-y-1 hover:text-solar transition-colors duration-200"
                    style={{ display: "inline-block" }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

const ChapterIntro = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(
                () => {
                    setDisplayText(
                        isDeleting
                            ? currentRole.slice(0, displayText.length - 1)
                            : currentRole.slice(0, displayText.length + 1)
                    );
                },
                isDeleting ? 30 : 70
            );
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <section
            id="intro"
            ref={ref}
            className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[min(92vw,820px)] h-[min(92vw,820px)] rounded-full border border-dashed border-white/[0.04] animate-orbit" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(68vw,580px)] h-[min(68vw,580px)] rounded-full border border-solar/[0.1] animate-orbit-reverse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(42vw,340px)] h-[min(42vw,340px)] rounded-full border border-play/[0.12] animate-orbit-slow" />

                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(61,184,160,0.18) 0%, rgba(184,148,58,0.12) 40%, transparent 70%)",
                        }}
                        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {FLOAT_CHIPS.map((chip) => (
                    <div key={chip.label} className={`chip-float ${chip.className}`}>
                        {chip.label}
                    </div>
                ))}

                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f7f5f0] dark:from-[#05040f] to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-24 pb-28 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 12 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="section-label mb-8"
                >
                    <Sparkles size={12} className="text-play" />
                    <span className="w-1.5 h-1.5 rounded-full bg-play animate-pulse" />
                    Building AI at EQS · Open to collabs
                </motion.div>

                <h1 className="font-display font-bold tracking-tight text-white leading-[0.9] mb-6">
                    <span className="block text-[clamp(3.2rem,11vw,7.2rem)]">
                        <KineticWord word="AADISH" />
                    </span>
                    <span className="block text-[clamp(2.2rem,7.5vw,4.8rem)] text-gradient-play mt-2">
                        <KineticWord word="PARASHAR" delay={0.25} />
                    </span>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 }}
                    className="h-9 mb-6 flex items-center justify-center"
                >
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-base md:text-lg text-muted font-light tracking-wide">
                        {displayText}
                        <span className="inline-block w-[2px] h-4 bg-play ml-1 animate-pulse align-middle" />
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.65 }}
                    className="text-base md:text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed"
                >
                    I design{" "}
                    <span className="text-white font-medium">RAG pipelines</span>, agentic
                    systems, and products that feel smart — currently shipping{" "}
                    <span className="text-play font-medium">Q by EQS</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.75 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <Magnetic>
                        <a href="#projects" className="btn-primary cursor-grow">
                            Explore Projects
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="#experience" className="btn-ghost cursor-grow">
                            See Journey
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-subtle tracking-[0.22em] uppercase">
                    Scroll to play
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={15} className="text-play/80" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ChapterIntro;
