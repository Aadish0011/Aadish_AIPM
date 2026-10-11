"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, FileText, Medal, Star, Crown } from "lucide-react";

const achievements = [
    {
        icon: FileText,
        title: "3 Patents Published",
        subtitle: "Including Govt. Funded 'Shoe Sole Innovation'",
        description:
            "Innovations in AI-powered assessment systems that are now protected intellectual property.",
        type: "Intellectual Property",
        gradient: "from-solar/20 to-solar-bright/20",
    },
    {
        icon: Medal,
        title: "Chess Excellence",
        subtitle: "IIT-Level Competition Medals",
        description:
            "Silver Medalist at IIT Mandi, Gold at JUIT, Bronze at IIT Ropar. Strategic thinking on 64 squares.",
        type: "Competitive",
        gradient: "from-nebula-purple/20 to-nebula-blue/20",
    },
    {
        icon: Star,
        title: "Technical Leadership",
        subtitle: "Project & Team Coordination",
        description:
            "Leading engineering teams, building communities, and turning student projects into real-world applications.",
        type: "Leadership",
        gradient: "from-nebula-blue/20 to-cyan-500/20",
    },
];

const medals = [
    { place: "Silver", event: "IIT Mandi", rank: "2nd", color: "#C0C0C0" },
    { place: "Gold", event: "JUIT", rank: "1st", color: "#D4AF37" },
    { place: "Bronze", event: "IIT Ropar", rank: "3rd", color: "#CD7F32" },
];

const traits = [
    { label: "Chess Strategist" },
    { label: "Ships Fast" },
    { label: "Data Driven" },
    { label: "Team Player" },
];

const ChapterAchievements = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="section-shell">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="section-label mb-6">
                        <Trophy size={14} />
                        Achievements
                    </div>
                    <h2 className="section-heading mb-6">
                        Honors &{" "}
                        <span className="text-gradient-solar">Distinctions</span>
                    </h2>
                </motion.div>

                {/* Achievement Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="glass glass-hover rounded-2xl p-7 group relative overflow-hidden"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                            />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] group-hover:bg-solar/10 group-hover:border-solar/20 group-hover:text-solar transition-all duration-500 text-subtle">
                                    <achievement.icon size={22} />
                                </div>

                                <span className="text-[10px] font-mono font-bold text-solar uppercase tracking-[0.15em] mb-3 block">
                                    {achievement.type}
                                </span>

                                <h3 className="text-lg font-display font-bold text-white mb-1.5 tracking-tight">
                                    {achievement.title}
                                </h3>
                                <p className="text-xs text-subtle font-mono mb-5 tracking-wide">
                                    {achievement.subtitle}
                                </p>
                                <p className="text-sm text-muted leading-relaxed border-t border-white/[0.06] pt-4">
                                    {achievement.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Chess Medals */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8 md:p-10 mb-10 relative overflow-hidden"
                >
                    <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none">
                        <Crown size={180} className="text-white" />
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-8 relative z-10">
                        <Crown className="text-solar" size={22} />
                        <h3 className="text-xl font-display font-bold text-white tracking-tight">
                            Tournament Results
                        </h3>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5 relative z-10">
                        {medals.map((medal, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                            >
                                <div
                                    className="text-4xl font-display font-bold mb-2"
                                    style={{ color: medal.color }}
                                >
                                    {medal.rank}
                                </div>
                                <p className="font-display font-bold text-white text-sm tracking-wide">
                                    {medal.place}
                                </p>
                                <p className="text-xs text-subtle mt-1.5 tracking-wider">
                                    at {medal.event}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Traits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    {traits.map((item, i) => (
                        <div
                            key={i}
                            className="glass rounded-xl py-4 flex items-center justify-center group hover:border-solar/15 transition-all duration-300"
                        >
                            <span className="text-xs font-display font-bold text-subtle uppercase tracking-[0.12em] group-hover:text-solar transition-colors duration-300">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ChapterAchievements;
