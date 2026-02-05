 "use client";
 
 import { useEffect, useRef } from "react";
 
 export default function LegacyCanvas() {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
     const animationRef = useRef<number | null>(null);
 
     useEffect(() => {
         const canvas = canvasRef.current;
         if (!canvas) return;
 
         const ctx = canvas.getContext("2d");
         if (!ctx) return;
 
         const mouse = { x: null as number | null, y: null as number | null, radius: 150 };
         let particleCount = 80;
         const connectionDistance = 120;
         const colors = {
             particle: "rgba(124, 58, 237, 0.8)",
             connection: "rgba(0, 217, 255, 0.15)",
             mouseConnection: "rgba(0, 217, 255, 0.4)",
         };
 
         const particles: {
             x: number;
             y: number;
             vx: number;
             vy: number;
             size: number;
         }[] = [];
 
         const resize = () => {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             particleCount = Math.floor((canvas.width * canvas.height) / 15000);
             particleCount = Math.min(Math.max(particleCount, 40), 100);
         };
 
         const createParticles = () => {
             particles.length = 0;
             for (let i = 0; i < particleCount; i++) {
                 particles.push({
                     x: Math.random() * canvas.width,
                     y: Math.random() * canvas.height,
                     vx: (Math.random() - 0.5) * 0.5,
                     vy: (Math.random() - 0.5) * 0.5,
                     size: Math.random() * 2 + 1,
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
             for (let i = 0; i < particles.length; i++) {
                 for (let j = i + 1; j < particles.length; j++) {
                     const dx = particles[i].x - particles[j].x;
                     const dy = particles[i].y - particles[j].y;
                     const distance = Math.sqrt(dx * dx + dy * dy);
 
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
 
         const updateParticles = () => {
             particles.forEach((p) => {
                 p.x += p.vx;
                 p.y += p.vy;
 
                 if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                 if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
 
                 if (mouse.x !== null && mouse.y !== null) {
                     const dx = p.x - mouse.x;
                     const dy = p.y - mouse.y;
                     const distance = Math.sqrt(dx * dx + dy * dy);
 
                     if (distance < mouse.radius) {
                         const force = (mouse.radius - distance) / mouse.radius;
                         p.x += (dx / distance) * force * 2;
                         p.y += (dy / distance) * force * 2;
                     }
                 }
             });
         };
 
         const animate = () => {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             updateParticles();
             drawConnections();
             particles.forEach((p) => drawParticle(p));
             animationRef.current = requestAnimationFrame(animate);
         };
 
         const handleResize = () => {
             resize();
         };
 
         const handleMouseMove = (e: MouseEvent) => {
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
 
         window.addEventListener("resize", handleResize);
         window.addEventListener("mousemove", handleMouseMove);
         window.addEventListener("mouseout", handleMouseOut);
 
         return () => {
             window.removeEventListener("resize", handleResize);
             window.removeEventListener("mousemove", handleMouseMove);
             window.removeEventListener("mouseout", handleMouseOut);
             if (animationRef.current) cancelAnimationFrame(animationRef.current);
         };
     }, []);
 
     return <canvas id="particle-canvas" ref={canvasRef} />;
 }
