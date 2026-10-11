"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Mail,
    Linkedin,
    Github,
    MessageCircle,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

const ChapterClosing = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="closing"
            className="relative min-h-screen py-32 flex flex-col justify-between overflow-hidden"
        >
            <div className="max-w-4xl mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="section-label mb-8">
                        <Sparkles size={14} />
                        Get in Touch
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.05] text-white tracking-tight">
                        Let&apos;s build{" "}
                        <span className="text-gradient-play">something fun</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-14 leading-relaxed font-light">
                        Let&apos;s build something scalable together. I&apos;m always
                        open to discussing AI, product strategy, or new opportunities.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a
                            href="mailto:aadishparashar001@gmail.com"
                            className="btn-primary w-full sm:w-auto !px-8 !py-4"
                        >
                            <Mail size={18} />
                            Send Email
                            <ArrowUpRight size={16} />
                        </a>
                        <a
                            href="https://wa.me/919588188463"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost w-full sm:w-auto !px-8 !py-4"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-6 mb-16">
                        {[
                            {
                                icon: Linkedin,
                                href: "https://linkedin.com/in/aadishparashar001",
                                label: "LinkedIn",
                            },
                            {
                                icon: Github,
                                href: "https://github.com/Aadish0011",
                                label: "GitHub",
                            },
                            {
                                icon: Mail,
                                href: "mailto:aadishparashar001@gmail.com",
                                label: "Email",
                            },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2.5"
                                aria-label={social.label}
                            >
                                <div className="w-14 h-14 rounded-xl border border-white/[0.08] flex items-center justify-center text-subtle group-hover:text-solar group-hover:border-solar/20 group-hover:bg-solar/[0.04] transition-all duration-300">
                                    <social.icon size={22} />
                                </div>
                                <span className="text-[10px] font-mono text-subtle group-hover:text-solar transition-colors duration-300 tracking-[0.15em] uppercase">
                                    {social.label}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-xl px-8 py-7 inline-block max-w-2xl"
                    >
                        <p className="text-lg italic text-muted font-light leading-relaxed">
                            &ldquo;The best systems are built by those who understand both
                            the code and the human at the end of the terminal.&rdquo;
                        </p>
                        <p className="mt-4 font-display font-bold text-solar text-sm tracking-[0.1em]">
                            — Aadish Parashar
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full border-t border-white/[0.06] pt-8 pb-6 mt-16">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-subtle">
                    <div className="font-mono tracking-wider">
                        &copy; {new Date().getFullYear()} Aadish Parashar
                    </div>
                    <div className="flex gap-8">
                        <a
                            href="#intro"
                            className="hover:text-solar transition-colors duration-300 font-medium"
                        >
                            Back to Top
                        </a>
                        <a
                            href="https://github.com/Aadish0011"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-solar transition-colors duration-300 font-medium"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default ChapterClosing;
