"use client";

import { useEffect, useRef } from "react";

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

        // Reduced settings for mobile
        const mouse = { x: null as number | null, y: null as number | null, radius: isMobile ? 0 : 150 };
        let particleCount = isMobile ? 25 : 80;
        const connectionDistance = isMobile ? 80 : 120;
        const maxParticles = isMobile ? 30 : 100;
        const minParticles = isMobile ? 15 : 40;
        
        // Frame skipping for mobile performance
        let frameCount = 0;
        const frameSkip = isMobile ? 2 : 1; // Skip every other frame on mobile

        const colors = {
            particle: "rgba(124, 58, 237, 0.8)",
        };

        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }[] = [];

        const resize = () => {
            // Use device pixel ratio for sharper canvas, but cap it on mobile
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            
            const area = window.innerWidth * window.innerHeight;
            particleCount = Math.floor(area / (isMobile ? 30000 : 15000));
            particleCount = Math.min(Math.max(particleCount, minParticles), maxParticles);
        };

        const createParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
                    vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
                    size: Math.random() * (isMobile ? 1.5 : 2) + 1,
                });
            }
        };

        const drawParticle = (p: { x: number; y: number; size: number }) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.particle;
            ctx.fill();
        };

        const drawConnections = () => {
            // Use spatial partitioning concept - limit connection checks on mobile
            const maxChecks = isMobile ? Math.min(particles.length, 15) : particles.length;
            
            for (let i = 0; i < maxChecks; i++) {
                // Limit inner loop on mobile
                const innerMax = isMobile ? Math.min(i + 8, particles.length) : particles.length;
                
                for (let j = i + 1; j < innerMax; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    
                    // Early exit if clearly too far (avoid sqrt)
                    if (Math.abs(dx) > connectionDistance || Math.abs(dy) > connectionDistance) continue;
                    
                    const distSq = dx * dx + dy * dy;
                    const connDistSq = connectionDistance * connectionDistance;

                    if (distSq < connDistSq) {
                        const opacity = 1 - Math.sqrt(distSq) / connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Skip mouse interactions on mobile
                if (!isMobile && mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = mouse.radius * mouse.radius;

                    if (distSq < radiusSq) {
                        const distance = Math.sqrt(distSq);
                        const opacity = 1 - distance / mouse.radius;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.5})`;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const updateParticles = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Skip mouse interactions on mobile
                if (!isMobile && mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = mouse.radius * mouse.radius;

                    if (distSq < radiusSq) {
                        const distance = Math.sqrt(distSq);
                        const force = (mouse.radius - distance) / mouse.radius;
                        p.x += (dx / distance) * force * 2;
                        p.y += (dy / distance) * force * 2;
                    }
                }
            }
        };

        const animate = () => {
            frameCount++;
            
            // Skip frames on mobile for better performance
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

        // Debounced resize handler
        let resizeTimeout: number | null = null;
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                resize();
                createParticles();
            }, 150);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        resize();
        createParticles();
        animate();

        window.addEventListener("resize", handleResize, { passive: true });
        
        // Only add mouse listeners on desktop
        if (!isMobile) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
            window.addEventListener("mouseout", handleMouseOut, { passive: true });
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (!isMobile) {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseout", handleMouseOut);
            }
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    }, []);

    return <canvas id="particle-canvas" ref={canvasRef} />;
}
