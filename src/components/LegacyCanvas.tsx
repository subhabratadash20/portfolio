"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    originX: number;
    originY: number;
    size: number;
    alpha: number;
    hue: number;
    pulseSpeed: number;
    pulsePhase: number;
}

export default function LegacyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Detect mobile/touch devices
        const isMobile = window.matchMedia("(max-width: 768px)").matches ||
            window.matchMedia("(hover: none) and (pointer: coarse)").matches;

        // Interaction settings
        const mouse = {
            x: null as number | null,
            y: null as number | null,
            targetX: null as number | null,
            targetY: null as number | null,
            radius: isMobile ? 80 : 180,
            active: false
        };

        let particleCount = isMobile ? 35 : 95;
        const connectionDistance = isMobile ? 90 : 140;
        const maxParticles = isMobile ? 45 : 120;
        const minParticles = isMobile ? 20 : 50;

        let frameCount = 0;
        const frameSkip = isMobile ? 2 : 1;

        const particles: Particle[] = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);

            const area = width * height;
            particleCount = Math.floor(area / (isMobile ? 24000 : 12000));
            particleCount = Math.min(Math.max(particleCount, minParticles), maxParticles);
        };

        const createParticles = () => {
            particles.length = 0;
            const width = window.innerWidth;
            const height = window.innerHeight;

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                // Alternate between violet (#7C3AED / hue ~265) and cyan (#00D9FF / hue ~190)
                const isCyan = i % 3 === 0;
                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
                    vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
                    size: Math.random() * (isMobile ? 1.8 : 2.5) + 1,
                    alpha: Math.random() * 0.5 + 0.4,
                    hue: isCyan ? 190 : 265,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const drawParticle = (p: Particle) => {
            p.pulsePhase += p.pulseSpeed;
            const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.2;
            const size = p.size + Math.sin(p.pulsePhase) * 0.5;

            // Subtle outer glow for prominent nodes
            if (p.size > 2) {
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
                gradient.addColorStop(0, p.hue === 190 ? `rgba(0, 217, 255, ${currentAlpha * 0.4})` : `rgba(124, 58, 237, ${currentAlpha * 0.4})`);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, size), 0, Math.PI * 2);
            ctx.fillStyle = p.hue === 190
                ? `rgba(0, 217, 255, ${Math.min(1, Math.max(0, currentAlpha))})`
                : `rgba(167, 139, 250, ${Math.min(1, Math.max(0, currentAlpha))})`;
            ctx.fill();
        };

        const drawConnections = () => {
            const len = particles.length;
            const connDistSq = connectionDistance * connectionDistance;

            for (let i = 0; i < len; i++) {
                const pi = particles[i];

                for (let j = i + 1; j < len; j++) {
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;

                    if (Math.abs(dx) > connectionDistance || Math.abs(dy) > connectionDistance) continue;

                    const distSq = dx * dx + dy * dy;

                    if (distSq < connDistSq) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / connectionDistance) * 0.22;
                        
                        ctx.beginPath();
                        // Dynamic gradient line between the two nodes
                        const lineGrad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
                        lineGrad.addColorStop(0, pi.hue === 190 ? `rgba(0, 217, 255, ${opacity})` : `rgba(124, 58, 237, ${opacity})`);
                        lineGrad.addColorStop(1, pj.hue === 190 ? `rgba(0, 217, 255, ${opacity})` : `rgba(124, 58, 237, ${opacity})`);
                        
                        ctx.strokeStyle = lineGrad;
                        ctx.lineWidth = dist < connectionDistance * 0.4 ? 1.2 : 0.75;
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.stroke();
                    }
                }

                // Interactive cursor beam & constellation attraction
                if (mouse.x !== null && mouse.y !== null && mouse.active) {
                    const mdx = pi.x - mouse.x;
                    const mdy = pi.y - mouse.y;
                    const mDistSq = mdx * mdx + mdy * mdy;
                    const mRadiusSq = mouse.radius * mouse.radius;

                    if (mDistSq < mRadiusSq) {
                        const mDist = Math.sqrt(mDistSq);
                        const mOpacity = (1 - mDist / mouse.radius) * 0.45;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 217, 255, ${mOpacity})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const updateParticles = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Smooth cursor lerp
            if (mouse.targetX !== null && mouse.targetY !== null) {
                if (mouse.x === null || mouse.y === null) {
                    mouse.x = mouse.targetX;
                    mouse.y = mouse.targetY;
                } else {
                    mouse.x += (mouse.targetX - mouse.x) * 0.15;
                    mouse.y += (mouse.targetY - mouse.y) * 0.15;
                }
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce with gentle padding
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                else if (p.x > width) { p.x = width; p.vx *= -1; }

                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                else if (p.y > height) { p.y = height; p.vy *= -1; }

                // Elastic cursor interaction: repel smoothly
                if (mouse.x !== null && mouse.y !== null && mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = mouse.radius * mouse.radius;

                    if (distSq < radiusSq && distSq > 0.01) {
                        const distance = Math.sqrt(distSq);
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        
                        // Push outward
                        p.x += Math.cos(angle) * force * 3.5;
                        p.y += Math.sin(angle) * force * 3.5;
                    }
                }
            }
        };

        const animate = () => {
            frameCount++;

            if (frameCount % frameSkip === 0) {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                updateParticles();
                drawConnections();
                for (let i = 0; i < particles.length; i++) {
                    drawParticle(particles[i]);
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        let resizeTimeout: number | null = null;
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                resize();
                createParticles();
            }, 150);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.targetX = e.touches[0].clientX;
                mouse.targetY = e.touches[0].clientY;
                mouse.active = true;
            }
        };

        const handleTouchEnd = () => {
            mouse.active = false;
        };

        resize();
        createParticles();
        animate();

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseout", handleMouseLeave, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    }, []);

    return <canvas id="particle-canvas" ref={canvasRef} />;
}
