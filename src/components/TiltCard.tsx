"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function TiltCard({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 180, damping: 18 });
    const sry = useSpring(ry, { stiffness: 180, damping: 18 });
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 45%)`;

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 10);
        rx.set((0.5 - py) * 8);
        glareX.set(px * 100);
        glareY.set(py * 100);
    };

    const onLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                rotateX: srx,
                rotateY: sry,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            <div className="relative overflow-hidden rounded-[inherit]">
                {children}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: glare }}
                />
            </div>
        </motion.div>
    );
}
