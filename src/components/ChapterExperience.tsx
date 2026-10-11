"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, Terminal, MapPin } from "lucide-react";

const experiences = [
    {
        role: "Working Student — Software Engineer",
        company: "EQS Group",
        period: "Mar 2026 — Present",
        location: "Germany · Hybrid",
        isActive: true,
        story:
            "Building enterprise AI for regulated compliance — contributing to RAG systems and Q by EQS, the platform's new AI intelligence layer.",
        highlights: [
            "Developing Retrieval-Augmented Generation (RAG) pipelines for grounded, context-aware AI answers over compliance data",
            "Contributing to Q by EQS — the AI-native layer inside the Compliance Cockpit for case intelligence and policy assistance",
            "Working with case data, policy libraries, disclosures, and workflow history under strict permission and audit controls",
            "Supporting AI capabilities for whistleblowing triage, case classification, and explainable recommendations",
            "Collaborating with product and engineering teams to ship governed AI features for enterprise customers",
        ],
        metrics: [
            { label: "Focus", value: "RAG" },
            { label: "Product", value: "Q by EQS" },
            { label: "Domain", value: "Compliance AI" },
        ],
    },
    {
        role: "Associate Project Manager & AI Engineer",
        company: "Heybobo.ai",
        period: "Jul 2025 — Mar 2026",
        location: "Bengaluru, India · On-site",
        isActive: false,
        story:
            "Leading cross-functional AI product development while contributing hands-on as an AI Engineer — building agentic, scalable AI systems from concept to production.",
        highlights: [
            "Managed and coordinated 40+ engineers across UI/UX, Frontend, Backend, AI/ML, and DevOps",
            "Architected intelligent AI modules: Health Intelligence, Adaptive Learning, and Grooming Personalization",
            "Designed agentic workflows using LangGraph for multi-step reasoning and decision orchestration",
            "Built LLM-powered pipelines with structured prompt engineering and contextual memory",
            "Developed autonomous AI agents with tool-calling capabilities",
            "Drove sprint planning, roadmap execution, release cycles, and cross-team alignment",
            "Delivered AI-first features end-to-end — from concept to production",
        ],
        metrics: [
            { label: "Team", value: "40+" },
            { label: "AI Modules", value: "3" },
            { label: "Focus", value: "Agentic AI" },
        ],
    },
    {
        role: "Engineering Coordinator / PM",
        company: "Shinkan Pvt. Ltd.",
        period: "Aug 2024 — July 2025",
        location: "India · Remote",
        isActive: false,
        story:
            "Learned that great AI isn't just about algorithms — it's about building systems that work reliably for real users, at scale.",
        highlights: [
            "Fine-tuned COCO-SSD model for proctored exam environment, improving accuracy",
            "Managed a team of 10+ engineers; improved scalability by 50% through resource optimization",
            "Collaborated with stakeholders to align technical goals with product delivery timelines",
            "Built infrastructure for real-time exam monitoring systems",
        ],
        metrics: [
            { label: "Team", value: "10+" },
            { label: "Scale", value: "+50%" },
            { label: "Focus", value: "Vision" },
        ],
    },
];

const ChapterExperience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="section-shell">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mb-6">
                        <Briefcase size={14} />
                        Experience
                    </div>
                    <h2 className="section-heading mb-6">
                        Work{" "}
                        <span className="text-gradient-solar">History</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        From leading 40+ engineers to shipping enterprise RAG and Q by EQS —
                        building AI that works in the real world.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-solar/30 via-white/10 to-transparent" />

                    <div className="space-y-14">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                className="relative pl-16 md:pl-20"
                            >
                                {/* Timeline node */}
                                <div className="absolute left-6 md:left-8 -translate-x-1/2 top-0">
                                    <div
                                        className={`w-3 h-3 rounded-full border-2 ${
                                            exp.isActive
                                                ? "bg-green-500 border-green-400 shadow-[0_0_12px_rgba(74,222,128,0.4)]"
                                                : "bg-void border-solar shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                                        }`}
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-3 mb-4">
                                    {exp.isActive && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Current
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5 text-xs font-mono text-subtle">
                                        <Calendar size={11} />
                                        {exp.period}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-1">
                                    {exp.role}
                                </h3>
                                <p className="text-lg text-solar font-medium mb-1">
                                    {exp.company}
                                </p>
                                {exp.location && (
                                    <p className="flex items-center gap-1.5 text-xs text-subtle mb-6">
                                        <MapPin size={11} />
                                        {exp.location}
                                    </p>
                                )}

                                <div className="glass rounded-xl p-7">
                                    <p className="text-muted italic border-l-2 border-solar/20 pl-4 mb-6 leading-relaxed">
                                        &ldquo;{exp.story}&rdquo;
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {exp.highlights.map((highlight, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 items-start group"
                                            >
                                                <Terminal
                                                    size={14}
                                                    className="text-solar/50 shrink-0 mt-1 group-hover:text-solar transition-colors duration-300"
                                                />
                                                <span className="text-sm text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                                                    {highlight}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                                        {exp.metrics.map((m, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 text-center py-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                                            >
                                                <div className="text-lg font-display font-bold text-white">
                                                    {m.value}
                                                </div>
                                                <div className="text-[10px] uppercase text-subtle tracking-wider">
                                                    {m.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChapterExperience;
