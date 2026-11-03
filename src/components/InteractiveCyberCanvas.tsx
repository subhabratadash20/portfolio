"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveCyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<"nebula" | "matrix" | "warp">("nebula");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 220,
      isDown: false,
    };

    // Particle pool
    const count = window.innerWidth < 768 ? 60 : 140;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      originX: Math.random() * width,
      originY: Math.random() * height,
      size: Math.random() * 2.5 + 1.2,
      color: Math.random() > 0.4 ? "#00D9FF" : "#A78BFA",
      pulse: Math.random() * Math.PI * 2,
      orbitR: Math.random() * 80 + 30,
      orbitAngle: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
    };
    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let frame = 0;

    const render = () => {
      frame++;
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Dark futuristic trail
      ctx.fillStyle = activeMode === "warp" ? "rgba(10, 10, 15, 0.25)" : "rgba(10, 10, 15, 0.45)";
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Underlay
      ctx.strokeStyle = "rgba(124, 58, 237, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offsetX = (mouse.x * 0.04) % gridSize;
      const offsetY = (mouse.y * 0.04) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Ambient Interactive Spotlight behind cursor
      const spotGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.isDown ? 380 : 250
      );
      spotGrad.addColorStop(0, mouse.isDown ? "rgba(0, 217, 255, 0.18)" : "rgba(124, 58, 237, 0.12)");
      spotGrad.addColorStop(0.5, "rgba(0, 217, 255, 0.04)");
      spotGrad.addColorStop(1, "transparent");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // Render & Interconnect Particles
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        if (activeMode === "warp") {
          // Warp drive towards cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          p.x += (dx / dist) * 4;
          p.y += (dy / dist) * 4;
          if (dist < 30) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
          }
        } else {
          // Standard physics with cursor repulsion / gravity
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * (mouse.isDown ? -8 : 3.5);
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Draw connections
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.28;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Floating Canvas Mode Switcher HUD */}
      <div className="canvas-hud animate-on-scroll animated">
        <span className="hud-label">CANVAS MATRIX:</span>
        {(["nebula", "matrix", "warp"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            className={`hud-pill ${activeMode === mode ? "active" : ""}`}
            onClick={() => setActiveMode(mode)}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
