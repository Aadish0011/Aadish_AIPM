"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

const chapters = [
    { id: "intro", label: "Home" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "achievements", label: "Achievements" },
];

const ChapterNav = () => {
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const isDark = theme === "dark";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        chapters.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4"
            >
                <div
                    className={`max-w-6xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-4 transition-all duration-500 ${
                        isScrolled
                            ? "py-2.5 rounded-2xl border backdrop-blur-2xl"
                            : "py-2 border border-transparent"
                    }`}
                    style={
                        isScrolled
                            ? {
                                  backgroundColor: isDark
                                      ? "rgba(8, 7, 22, 0.72)"
                                      : "rgba(255, 255, 255, 0.78)",
                                  borderColor: isDark
                                      ? "rgba(255,255,255,0.08)"
                                      : "rgba(15,23,42,0.08)",
                                  boxShadow: isDark
                                      ? "0 10px 40px rgba(0,0,0,0.35)"
                                      : "0 10px 40px rgba(15,23,42,0.08)",
                              }
                            : undefined
                    }
                >
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-solar via-solar-bright to-solar-dim" />
                            <div className="relative w-full h-full flex items-center justify-center font-display font-bold text-sm text-void">
                                AP
                            </div>
                        </div>
                        <span className="text-[15px] font-display font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block group-hover:text-solar transition-colors duration-300">
                            AADISH
                        </span>
                    </Link>

                    <div
                        className={`hidden lg:flex items-center gap-0.5 px-1.5 py-1 rounded-full ${
                            isScrolled
                                ? ""
                                : isDark
                                  ? "bg-white/[0.03] border border-white/[0.06]"
                                  : "bg-white/60 border border-slate-200/80 shadow-sm"
                        }`}
                    >
                        {chapters.map((chapter) => (
                            <Link
                                key={chapter.id}
                                href={`#${chapter.id}`}
                                className={`relative px-3.5 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-300 rounded-full ${
                                    activeSection === chapter.id
                                        ? "text-void"
                                        : "text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                {activeSection === chapter.id && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 rounded-full bg-solar"
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 32,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{chapter.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        <ThemeToggle />
                        <Link
                            href="#closing"
                            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-solar text-void font-display font-bold text-[13px] tracking-wide hover:bg-solar-bright transition-all duration-300"
                        >
                            Let&apos;s Talk
                            <ArrowUpRight size={13} />
                        </Link>

                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="lg:hidden p-2 text-slate-700 dark:text-white hover:text-solar transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{
                            backgroundColor: isDark
                                ? "rgba(5, 4, 15, 0.96)"
                                : "rgba(247, 245, 240, 0.98)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-7 px-6">
                            {chapters.map((chapter, i) => (
                                <motion.div
                                    key={chapter.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={`#${chapter.id}`}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`text-3xl font-display font-bold tracking-tight transition-colors duration-300 ${
                                            activeSection === chapter.id
                                                ? "text-solar"
                                                : "text-slate-900 dark:text-white hover:text-solar"
                                        }`}
                                    >
                                        {chapter.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <Link
                                    href="#closing"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="mt-4 inline-flex px-8 py-3 bg-solar text-void font-display font-bold text-lg rounded-xl"
                                >
                                    Let&apos;s Talk
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChapterNav;
