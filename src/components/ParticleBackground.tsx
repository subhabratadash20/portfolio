"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: null as number | null, y: null as number | null, radius: 150 };

        const colors = {
            particle: "rgba(124, 58, 237, 0.8)",
            connection: "rgba(0, 217, 255, 0.15)",
            mouseConnection: "rgba(0, 217, 255, 0.4)",
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            canvasWidth: number;
            canvasHeight: number;

            constructor(w: number, h: number) {
                this.canvasWidth = w;
                this.canvasHeight = h;
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
                if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;

                // Mouse repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 2;
                        this.y += Math.sin(angle) * force * 2;
                    }
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = colors.particle;
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            createParticles();
            animate();
        };

        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Responsive particle count
            const area = canvas.width * canvas.height;
            const count = Math.min(Math.max(Math.floor(area / 15000), 40), 100);

            // Re-create particles on resize to fit new bounds
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const createParticles = () => {
            // Initial creation handled by resize
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const connectionDistance = 120;

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse connections
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
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

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleResize = () => resize();
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseOut);

        init();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
