"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    baseOpacity: number;
    color: string;
    twinkleSpeed: number;
    twinkleOffset: number;
}

interface OrbitRing {
    centerXRatio: number;
    centerYRatio: number;
    radiusX: number;
    radiusY: number;
    rotation: number;
    speed: number;
    opacity: number;
}

const STAR_COLORS = [
    "210, 210, 220",
    "180, 190, 220",
    "220, 205, 175",
    "165, 175, 210",
    "184, 148, 58",
];

const GalaxyBackground = () => {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number>(0);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const setCanvasSize = () => {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        setCanvasSize();
        mouseRef.current = { x: width / 2, y: height / 2 };

        const starCount = Math.min(350, Math.floor((width * height) / 5500));
        const stars: Star[] = [];

        for (let i = 0; i < starCount; i++) {
            const isGold = Math.random() < 0.04;
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 3 + 0.5,
                size: isGold ? Math.random() * 1.4 + 0.8 : Math.random() * 1.1 + 0.15,
                baseOpacity: Math.random() * 0.6 + 0.15,
                color: isGold ? STAR_COLORS[4] : STAR_COLORS[Math.floor(Math.random() * 4)],
                twinkleSpeed: Math.random() * 0.015 + 0.004,
                twinkleOffset: Math.random() * Math.PI * 2,
            });
        }

        const orbits: OrbitRing[] = [
            { centerXRatio: 0.3, centerYRatio: 0.35, radiusX: 220, radiusY: 110, rotation: 0, speed: 0.00018, opacity: 0.035 },
            { centerXRatio: 0.72, centerYRatio: 0.28, radiusX: 320, radiusY: 160, rotation: 0.3, speed: -0.00012, opacity: 0.025 },
            { centerXRatio: 0.5, centerYRatio: 0.6, radiusX: 420, radiusY: 190, rotation: -0.2, speed: 0.00008, opacity: 0.02 },
            { centerXRatio: 0.15, centerYRatio: 0.75, radiusX: 260, radiusY: 130, rotation: 0.5, speed: 0.00015, opacity: 0.025 },
        ];

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 1;

            const cx = width / 2;
            const cy = height / 2;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            orbits.forEach((ring) => {
                ring.rotation += ring.speed;
                ctx.save();
                ctx.translate(ring.centerXRatio * width, ring.centerYRatio * height);
                ctx.rotate(ring.rotation);
                ctx.beginPath();
                ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(212, 175, 55, ${ring.opacity})`;
                ctx.lineWidth = 0.5;
                ctx.setLineDash([4, 8]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            });

            stars.forEach((star) => {
                const px = (mx - cx) * 0.025 * star.z;
                const py = (my - cy) * 0.025 * star.z;

                let x = star.x - px;
                let y = star.y - py;

                if (x < -10) x += width + 20;
                if (x > width + 10) x -= width + 20;
                if (y < -10) y += height + 20;
                if (y > height + 10) y -= height + 20;

                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
                const opacity = star.baseOpacity * (0.5 + twinkle * 0.5);

                ctx.beginPath();
                ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fill();

                const dx = x - mx;
                const dy = y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const intensity = 1 - dist / 130;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${intensity * 0.12})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(x, y);
                    ctx.lineTo(mx, my);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(212, 175, 55, ${intensity * 0.35})`;
                    ctx.arc(x, y, star.size + 1.5 * intensity, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            setCanvasSize();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    useEffect(() => {
        if (theme !== "dark") return;
        const cleanup = init();
        return cleanup;
    }, [init, theme]);

    if (theme === "light") {
        return (
            <div
                className="fixed inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(165deg, #f5f2ea 0%, #f3f1eb 28%, #eeebe3 55%, #e8ecf2 100%)",
                }}
            >
                <div
                    className="absolute top-[-18%] right-[-12%] w-[720px] h-[720px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(184,148,58,0.07), transparent 62%)",
                    }}
                />
                <div
                    className="absolute bottom-[-14%] left-[-10%] w-[620px] h-[620px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(74,115,196,0.04), transparent 62%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.28] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #b8b0a0 0.55px, transparent 0.55px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-0"
            style={{
                background:
                    "linear-gradient(180deg, #05040f 0%, #08071a 42%, #060514 72%, #05040f 100%)",
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            <div
                className="absolute top-[8%] left-[18%] w-[620px] h-[620px] rounded-full opacity-[0.02] pointer-events-none"
                style={{ background: "radial-gradient(circle, #6558B8, transparent 70%)" }}
            />
            <div
                className="absolute bottom-[18%] right-[12%] w-[780px] h-[780px] rounded-full opacity-[0.015] pointer-events-none"
                style={{ background: "radial-gradient(circle, #4A73C4, transparent 70%)" }}
            />
            <div
                className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-[0.02] pointer-events-none"
                style={{ background: "radial-gradient(circle, #B8943A, transparent 70%)" }}
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 38%, #05040f 100%)",
                }}
            />
        </div>
    );
};

export default GalaxyBackground;
