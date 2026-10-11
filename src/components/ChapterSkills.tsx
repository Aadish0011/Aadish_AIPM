"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Terminal, Database, Server, ChevronRight, Cpu } from "lucide-react";

const skillCategories = [
    {
        title: "AI & Machine Learning",
        icon: Brain,
        accent: "#3DB8A0",
        skills: [
            { name: "Large Language Models", detail: "Google T5, Qwen, TinyLLaMA, GenAI" },
            { name: "RAG Systems", detail: "Retrieval pipelines, embeddings, grounded enterprise AI" },
            { name: "Agentic AI & Automation", detail: "LangGraph, LangChain, Multi-Agent Systems, Tool-Calling" },
            { name: "Computer Vision", detail: "OpenCV, COCO-SSD, Object Detection" },
            { name: "Deep Learning", detail: "TensorFlow, PyTorch, Scikit-learn" },
            { name: "Prompt Engineering", detail: "Structured prompts, Context windows, LLM pipelines" },
            { name: "Data Labeling", detail: "LabelImg, Data Annotation, Big Data" },
        ],
    },
    {
        title: "Languages & Backend",
        icon: Terminal,
        accent: "#4A73C4",
        skills: [
            { name: "Python", detail: "Primary language for AI/ML development" },
            { name: "Java", detail: "Object-oriented programming" },
            { name: "FastAPI", detail: "High-performance Python APIs" },
            { name: "SQL & MySQL", detail: "Database design and queries" },
        ],
    },
    {
        title: "Data & Visualization",
        icon: Database,
        accent: "#B8943A",
        skills: [
            { name: "Pandas & NumPy", detail: "Data manipulation and analysis" },
            { name: "Power BI", detail: "Business intelligence dashboards" },
            { name: "Tableau", detail: "Interactive data visualization" },
            { name: "Excel", detail: "Advanced spreadsheet analysis" },
        ],
    },
    {
        title: "Product & Leadership",
        icon: Server,
        accent: "#6FD0BB",
        skills: [
            { name: "Project Management", detail: "Agile, Sprints, Roadmapping" },
            { name: "Team Leadership", detail: "40+ engineers, Cross-functional teams" },
            { name: "Technical Documentation", detail: "Specs, PRDs, Architecture docs" },
            { name: "Problem Solving", detail: "Innovation, Coordination, Delivery" },
        ],
    },
];

const ChapterSkills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIdx, setActiveIdx] = useState(0);

    const activeCategory = skillCategories[activeIdx];

    return (
        <section id="skills" className="section-shell">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mb-6">
                        <Cpu size={14} />
                        Toolkit
                    </div>
                    <h2 className="section-heading mb-6">
                        Skills that{" "}
                        <span className="text-gradient-play">ship</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        Tap a category — the stack animates in like a lab console.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {skillCategories.map((cat, index) => {
                            const Icon = cat.icon;
                            const isActive = activeIdx === index;
                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveIdx(index)}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`cursor-grow flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 shrink-0 border ${
                                        isActive
                                            ? "bg-white/[0.05] border-play/25 text-white"
                                            : "border-transparent text-muted hover:text-white hover:bg-white/[0.03]"
                                    }`}
                                >
                                    <div
                                        className="p-2.5 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: isActive
                                                ? `${cat.accent}22`
                                                : "rgba(255,255,255,0.03)",
                                            color: isActive ? cat.accent : undefined,
                                        }}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-sm font-display font-bold tracking-wide whitespace-nowrap">
                                        {cat.title}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                                className="glass rounded-3xl p-7 md:p-8 min-h-[420px]"
                            >
                                <div className="flex items-center gap-4 mb-7 pb-5 border-b border-white/[0.06]">
                                    <div
                                        className="p-3 rounded-2xl"
                                        style={{
                                            backgroundColor: `${activeCategory.accent}18`,
                                            color: activeCategory.accent,
                                        }}
                                    >
                                        {(() => {
                                            const Icon = activeCategory.icon;
                                            return <Icon size={22} />;
                                        })()}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                                        {activeCategory.title}
                                    </h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {activeCategory.skills.map((skill, i) => (
                                        <motion.div
                                            key={`${activeIdx}-${i}`}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 220,
                                                damping: 20,
                                                delay: i * 0.04,
                                            }}
                                            whileHover={{ y: -3, scale: 1.01 }}
                                            className="cursor-grow p-4 rounded-2xl bg-white/[0.025] border border-white/[0.05] hover:border-play/25 hover:bg-white/[0.045] transition-colors duration-300 group"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-display font-bold text-sm text-white group-hover:text-play transition-colors duration-300">
                                                    {skill.name}
                                                </span>
                                                <ChevronRight
                                                    size={14}
                                                    className="text-subtle group-hover:text-play group-hover:translate-x-0.5 transition-all duration-300"
                                                />
                                            </div>
                                            <span className="text-xs text-subtle leading-relaxed">
                                                {skill.detail}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChapterSkills;
