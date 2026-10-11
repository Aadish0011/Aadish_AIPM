"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Zap, Github, ExternalLink, Layers } from "lucide-react";
import TiltCard from "./TiltCard";
import Magnetic from "./Magnetic";

const projects = [
    {
        title: "Injury Assessment AI",
        tagline: "Diagnostic Intelligence",
        story:
            "An autonomous system that reasons over raw health data — evaluates risk, triages in real time, and guides users with medical precision.",
        impact: [
            { icon: Target, label: "Users Analyzed", value: "2K+" },
            { icon: Zap, label: "Accuracy", value: "80%" },
            { icon: Shield, label: "Mode", value: "Live" },
        ],
        tech: ["TinyLLaMA", "FastAPI", "Python", "Health-AI"],
        accent: "#3DB8A0",
        github:
            "https://github.com/Aadish0011/Injury_Assessment-with-LLM-Generated-suggestions.git",
    },
    {
        title: "Face Recognition & Anti-Spoofing",
        tagline: "Biometric Security",
        story:
            "A defense layer against digital impersonation. Custom CNNs that tell living subjects from deepfakes in milliseconds.",
        impact: [
            { icon: Shield, label: "Fraud Block", value: "90%" },
            { icon: Zap, label: "Latency", value: "<1s" },
            { icon: Target, label: "Liveness", value: "Live" },
        ],
        tech: ["TensorFlow", "OpenCV", "Conv-Nets", "Security"],
        accent: "#B8943A",
        github: "https://github.com/Aadish0011/Face_Recognition_Anti-spoof.git",
    },
];

const ChapterProjects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="section-shell">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="text-center mb-16"
                >
                    <div className="section-label mb-6">
                        <Layers size={14} />
                        Playground
                    </div>
                    <h2 className="section-heading mb-5">
                        Things I{" "}
                        <span className="text-gradient-play">built</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        Real AI systems — not demos. Hover the cards for a little tilt magic.
                    </p>
                </motion.div>

                <div className="space-y-8" style={{ perspective: 1200 }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                                delay: index * 0.08,
                            }}
                        >
                            <TiltCard className="group">
                                <article className="glass rounded-3xl overflow-hidden border border-white/[0.07]">
                                    <div
                                        className="h-1.5 w-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                                        }}
                                    />
                                    <div className="grid lg:grid-cols-5 gap-0">
                                        <div className="lg:col-span-3 p-8 lg:p-10 space-y-5">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-play">
                                                <Shield size={11} />
                                                {project.tagline}
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight group-hover:text-gradient-play transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="text-muted leading-relaxed">
                                                {project.story}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="cursor-grow px-3 py-1 text-[11px] font-semibold rounded-full bg-white/[0.04] text-muted border border-white/[0.07] hover:border-play/30 hover:text-play transition-colors"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-3 pt-1">
                                                <Magnetic strength={0.25}>
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary !px-5 !py-2.5 !text-xs cursor-grow"
                                                    >
                                                        <Github size={14} />
                                                        Source
                                                    </a>
                                                </Magnetic>
                                                <Magnetic strength={0.25}>
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-ghost !px-5 !py-2.5 !text-xs cursor-grow"
                                                    >
                                                        <ExternalLink size={14} />
                                                        Details
                                                    </a>
                                                </Magnetic>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-2 bg-white/[0.015] border-t lg:border-t-0 lg:border-l border-white/[0.06] p-8 lg:p-10 flex flex-col justify-center">
                                            <div className="text-[11px] font-display font-bold text-subtle uppercase tracking-[0.18em] mb-6">
                                                Impact
                                            </div>
                                            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                                                {project.impact.map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-play/20 transition-colors"
                                                    >
                                                        <div
                                                            className="p-2 rounded-xl"
                                                            style={{
                                                                backgroundColor: `${project.accent}18`,
                                                                color: project.accent,
                                                            }}
                                                        >
                                                            <item.icon size={16} />
                                                        </div>
                                                        <div className="text-center lg:text-left">
                                                            <div className="text-xl font-display font-bold text-white">
                                                                {item.value}
                                                            </div>
                                                            <div className="text-[11px] text-subtle">
                                                                {item.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChapterProjects;
