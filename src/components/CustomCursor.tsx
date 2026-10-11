"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduce) return;

        setVisible(true);
        document.documentElement.classList.add("has-custom-cursor");

        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            const interactive = t?.closest(
                "a, button, [role='button'], input, textarea, .cursor-grow"
            );
            setHovering(!!interactive);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, [x, y]);

    if (!visible) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
                style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="rounded-full border border-white"
                    animate={{
                        width: hovering ? 44 : 18,
                        height: hovering ? 44 : 18,
                        opacity: hovering ? 0.9 : 0.7,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                />
            </motion.div>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
                style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            />
        </>
    );
}
