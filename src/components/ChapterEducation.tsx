"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, TrendingUp } from "lucide-react";

const education = [
    {
        period: "Mar 2026 — Present",
        degree: "Master of Science (MS), Artificial Intelligence and Data Science",
        school: "Deggendorf Institute of Technology",
        location: "Germany",
        highlight:
            "Pursuing advanced studies in AI and data science at the intersection of research and industry.",
        score: "In Progress",
        tags: ["AI", "Data Science", "Research", "Europe"],
    },
    {
        period: "2021 — 2025",
        degree: "B.E. in Computer Science (AI)",
        school: "Chitkara University",
        location: "Punjab, India",
        highlight:
            "Where data science met deep learning, and curiosity became expertise.",
        score: "CGPA: 8.68 / 10",
        tags: ["Core CSE", "Machine Learning", "Deep Learning", "Computer Vision"],
    },
    {
        period: "2019 — 2021",
        degree: "Higher Secondary (12th — CBSE)",
        school: "Little Angels School",
        location: "India",
        highlight: "Building the foundation with science and mathematics.",
        score: "80.2%",
        tags: ["Science Stream", "CBSE Board"],
    },
    {
        period: "2017 — 2019",
        degree: "Secondary School (10th — CBSE)",
        school: "Little Angels School",
        location: "India",
        highlight: "Where the love for problem-solving began.",
        score: "88.2%",
        tags: ["CBSE Board", "Strong Foundation"],
    },
];

const ChapterEducation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="education" className="section-shell">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mb-6">
                        <GraduationCap size={14} />
                        Education
                    </div>
                    <h2 className="section-heading mb-6">
                        Academic{" "}
                        <span className="text-gradient-solar">Journey</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        My fascination with technology started in school, where numbers
                        became logic, and logic became magic.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-solar/30 via-white/10 to-transparent" />

                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -30 : 30,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className={`relative flex mb-16 last:mb-0 ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            }`}
                        >
                            {/* Timeline node */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                <div className="w-3 h-3 rounded-full bg-void border-2 border-solar shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                            </div>

                            {/* Card */}
                            <div
                                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                                    index % 2 === 0
                                        ? "md:pr-4 md:mr-auto"
                                        : "md:pl-4 md:ml-auto"
                                }`}
                            >
                                <div className="glass glass-hover rounded-xl p-7 group">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2 text-xs font-mono text-solar tracking-wider">
                                            <Calendar size={12} />
                                            {item.period}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-solar/[0.06] text-xs text-solar font-medium border border-solar/10">
                                            <TrendingUp size={11} />
                                            {item.score}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-display font-bold text-white mb-1.5 tracking-tight">
                                        {item.degree}
                                    </h3>
                                    <p className="text-muted mb-1">{item.school}</p>
                                    <div className="flex items-center gap-1.5 text-subtle text-xs mb-5">
                                        <MapPin size={11} />
                                        {item.location}
                                    </div>

                                    <p className="text-muted text-sm italic border-l-2 border-solar/20 pl-4 py-1 mb-5 leading-relaxed">
                                        &ldquo;{item.highlight}&rdquo;
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-muted border border-white/[0.06] hover:text-white hover:border-white/10 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChapterEducation;
