"use client";

import { useEffect, useRef, useState } from "react";

type CanvasMode = "nebula" | "matrix" | "warp";

const CANVAS_MODE_CONFIG: Record<CanvasMode, { label: string; desc: string }> = {
  nebula: { label: "NEBULA MESH", desc: "Cosmic interactive particle constellation" },
  matrix: { label: "MATRIX RAIN", desc: "Digital binary & code streams" },
  warp: { label: "WARP SPEED", desc: "Hyperspace 3D starfield acceleration" },
};

export default function InteractiveCyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<CanvasMode>("nebula");

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

    // Nebula Particle Pool
    const particleCount = window.innerWidth < 768 ? 50 : 120;
    const nebulaParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.8 + 1.2,
      color: Math.random() > 0.4 ? "#00D9FF" : "#A78BFA",
    }));

    // Matrix Rain Columns Setup
    const matrixFontSize = 16;
    let matrixColumns = Math.floor(width / matrixFontSize);
    let matrixDrops = Array.from({ length: matrixColumns }, () => Math.floor(Math.random() * -50));
    const matrixChars = "01010101<>/{};:=+*&%#@$!_~FlutterDartNodeAI";

    // Warp Stars Pool
    const warpCount = window.innerWidth < 768 ? 100 : 250;
    const warpStars = Array.from({ length: warpCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      prevZ: Math.random() * width,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      matrixColumns = Math.floor(width / matrixFontSize);
      matrixDrops = Array.from({ length: matrixColumns }, () => Math.floor(Math.random() * -50));
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

    const render = () => {
      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      /* ========================================================
         MODE EXECUTION VIA SWITCH STATEMENT
         ======================================================== */
      switch (activeMode) {
        case "matrix": {
          // High opacity trail for distinct rain effect
          ctx.fillStyle = "rgba(10, 10, 15, 0.18)";
          ctx.fillRect(0, 0, width, height);

          ctx.font = `${matrixFontSize}px "JetBrains Mono", monospace`;

          for (let i = 0; i < matrixDrops.length; i++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * matrixFontSize;
            const y = matrixDrops[i] * matrixFontSize;

            // Interactive cursor disruption
            const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
            if (distToMouse < 90) {
              ctx.fillStyle = "#00D9FF"; // Bright cyan glitch near cursor
              ctx.shadowColor = "#00D9FF";
              ctx.shadowBlur = 12;
            } else {
              // Matrix neon green & emerald gradient
              ctx.fillStyle = matrixDrops[i] % 4 === 0 ? "#E0F2FE" : "#10B981";
              ctx.shadowColor = "#10B981";
              ctx.shadowBlur = 6;
            }

            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;

            if (y > height && Math.random() > 0.975) {
              matrixDrops[i] = 0;
            }
            matrixDrops[i]++;
          }
          break;
        }

        case "warp": {
          ctx.fillStyle = "rgba(10, 10, 15, 0.35)";
          ctx.fillRect(0, 0, width, height);

          const cx = mouse.x;
          const cy = mouse.y;
          const speed = mouse.isDown ? 35 : 18;

          for (let i = 0; i < warpStars.length; i++) {
            const s = warpStars[i];
            s.prevZ = s.z;
            s.z -= speed;

            if (s.z <= 0) {
              s.z = width;
              s.prevZ = width;
              s.x = (Math.random() - 0.5) * width * 2;
              s.y = (Math.random() - 0.5) * height * 2;
            }

            const k = 280 / s.z;
            const px = s.x * k + cx;
            const py = s.y * k + cy;

            const prevK = 280 / s.prevZ;
            const ppx = s.x * prevK + cx;
            const ppy = s.y * prevK + cy;

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
              const alpha = Math.min(1, (1 - s.z / width) * 1.5);
              ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
              ctx.lineWidth = Math.max(1, (1 - s.z / width) * 3);
              ctx.beginPath();
              ctx.moveTo(ppx, ppy);
              ctx.lineTo(px, py);
              ctx.stroke();
            }
          }
          break;
        }

        case "nebula":
        default: {
          ctx.fillStyle = "rgba(10, 10, 15, 0.45)";
          ctx.fillRect(0, 0, width, height);

          // Cyber Grid Underlay
          ctx.strokeStyle = "rgba(124, 58, 237, 0.05)";
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

          // Spotlight behind cursor
          const spot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.isDown ? 360 : 240);
          spot.addColorStop(0, mouse.isDown ? "rgba(0, 217, 255, 0.22)" : "rgba(124, 58, 237, 0.16)");
          spot.addColorStop(0.6, "rgba(0, 217, 255, 0.04)");
          spot.addColorStop(1, "transparent");
          ctx.fillStyle = spot;
          ctx.fillRect(0, 0, width, height);

          // Update & Render Particles
          for (let i = 0; i < particleCount; i++) {
            const p = nebulaParticles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius) * (mouse.isDown ? -8 : 4);
              p.x -= (dx / dist) * force;
              p.y -= (dy / dist) * force;
            }

            // Connect adjacent particles
            for (let j = i + 1; j < particleCount; j++) {
              const p2 = nebulaParticles[j];
              const connDist = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (connDist < 120) {
                const alpha = (1 - connDist / 120) * 0.35;
                ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }

            // Render glowing particle node
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          break;
        }
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
      {/* HUD Mode Switcher */}
      <div className="canvas-hud animate-on-scroll animated">
        <span className="hud-label">CANVAS MODE:</span>
        {(Object.keys(CANVAS_MODE_CONFIG) as CanvasMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            className={`hud-pill ${activeMode === mode ? "active" : ""}`}
            onClick={() => setActiveMode(mode)}
            title={CANVAS_MODE_CONFIG[mode].desc}
          >
            {CANVAS_MODE_CONFIG[mode].label}
          </button>
        ))}
      </div>
    </>
  );
}
