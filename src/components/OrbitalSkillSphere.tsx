"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

type SkillNodeDef = {
  key: string;
  label: string;
  icon: string;
  speed: number;
  reverse?: boolean;
  rx: number;
  ry: number;
  rz: number;
  radius: number;
};

const SKILL_NODES: SkillNodeDef[] = [
  // Outer Orbit Nodes
  { key: "flutter", label: "Flutter", icon: "/icons/flutter.svg", speed: 0.7, rx: 75, ry: 0, rz: 0, radius: 230 },
  { key: "dart", label: "Dart", icon: "/icons/dart.svg", speed: 0.8, reverse: true, rx: 70, ry: 30, rz: 15, radius: 240 },
  { key: "firebase", label: "Firebase", icon: "/icons/firebase.svg", speed: 0.65, rx: 65, ry: 60, rz: 0, radius: 225 },
  { key: "google-cloud", label: "Google Cloud", icon: "/icons/google-cloud.svg", speed: 0.75, reverse: true, rx: 75, ry: 90, rz: 10, radius: 235 },
  { key: "openai", label: "OpenAI", icon: "/icons/openai.svg", speed: 0.6, rx: 60, ry: 120, rz: 20, radius: 228 },
  { key: "gemini", label: "Gemini", icon: "/icons/gemini.svg", speed: 0.7, reverse: true, rx: 70, ry: 150, rz: 5, radius: 238 },
  { key: "claude", label: "Claude", icon: "/icons/claude.svg", speed: 0.55, rx: 65, ry: 180, rz: 25, radius: 232 },
  { key: "google-maps", label: "Google Maps", icon: "/icons/google-maps.svg", speed: 0.68, reverse: true, rx: 75, ry: 210, rz: 0, radius: 222 },
  { key: "git", label: "Git", icon: "/icons/git.svg", speed: 0.62, rx: 70, ry: 240, rz: 15, radius: 242 },
  { key: "python", label: "Python", icon: "/icons/python.svg", speed: 0.8, reverse: true, rx: 60, ry: 270, rz: 10, radius: 230 },
  { key: "java", label: "Java", icon: "/icons/java.svg", speed: 0.58, rx: 75, ry: 300, rz: 20, radius: 235 },
  { key: "c", label: "C", icon: "/icons/c.svg", speed: 0.72, reverse: true, rx: 65, ry: 330, rz: 5, radius: 228 },

  // Inner Orbit Nodes
  { key: "getx", label: "GetX", icon: "/icons/getx.svg", speed: 0.85, rx: 80, ry: 15, rz: 30, radius: 170 },
  { key: "provider", label: "Provider", icon: "/icons/provider.svg", speed: 0.9, reverse: true, rx: 70, ry: 55, rz: 45, radius: 175 },
  { key: "riverpod", label: "Riverpod", icon: "/icons/riverpod.svg", speed: 0.78, rx: 75, ry: 95, rz: 15, radius: 165 },
  { key: "hive", label: "Hive", icon: "/icons/hive.svg", speed: 0.88, reverse: true, rx: 65, ry: 135, rz: 60, radius: 180 },
  { key: "nosql", label: "NoSQL", icon: "/icons/nosql.svg", speed: 0.72, rx: 80, ry: 175, rz: 25, radius: 172 },
  { key: "rest", label: "REST APIs", icon: "/icons/rest.svg", speed: 0.84, reverse: true, rx: 70, ry: 215, rz: 40, radius: 178 },
  { key: "geofencing", label: "Geofencing", icon: "/icons/geofencing.svg", speed: 0.8, rx: 75, ry: 255, rz: 10, radius: 168 },
  { key: "cicd", label: "CI/CD", icon: "/icons/cicd.svg", speed: 0.95, reverse: true, rx: 65, ry: 295, rz: 55, radius: 182 },
  { key: "agile", label: "Agile", icon: "/icons/agile.svg", speed: 0.75, rx: 80, ry: 335, rz: 20, radius: 170 },
];

interface OrbitalSkillSphereProps {
  profilePhoto: StaticImageData;
}

export default function OrbitalSkillSphere({ profilePhoto }: OrbitalSkillSphereProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const centerPhotoRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress (0 = sphere, 1 = structured grid)
  const scrollProgressRef = useRef(0);
  const timeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start transition when container top reaches around 250px from top
      // Complete transition over 400px of scrolling
      const startTrigger = windowHeight * 0.25;
      const scrollDist = 420;
      const progress = Math.min(Math.max((startTrigger - rect.top) / scrollDist, 0), 1);

      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      timeRef.current += dt;

      const p = scrollProgressRef.current; // 0 to 1
      const isMobile = window.innerWidth < 768;

      // Fade out orbital rings as user scrolls
      if (ringsRef.current) {
        ringsRef.current.style.opacity = `${Math.max(0, 1 - p * 2.2)}`;
        ringsRef.current.style.transform = `scale(${1 - p * 0.15})`;
      }

      // Animate profile photo (subtle scale and elevation)
      if (centerPhotoRef.current) {
        const photoScale = 1 - p * 0.18;
        const photoY = p * -30;
        centerPhotoRef.current.style.transform = `translate(-50%, calc(-50% + ${photoY}px)) scale(${photoScale})`;
        centerPhotoRef.current.style.boxShadow = `0 0 ${40 + p * 30}px rgba(0, 217, 255, ${0.25 + p * 0.2})`;
      }

      // Grid geometry parameters
      const cols = isMobile ? 3 : 7;
      const colWidth = isMobile ? 95 : 120;
      const rowHeight = isMobile ? 70 : 85;
      const totalWidth = (cols - 1) * colWidth;
      const gridStartY = isMobile ? 220 : 240;

      // Update positions of each skill node
      SKILL_NODES.forEach((node, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;

        // 1. Orbital position math (spinning 3D ellipse)
        const direction = node.reverse ? -1 : 1;
        const angle = timeRef.current * node.speed * direction + (i * (Math.PI * 2)) / SKILL_NODES.length;

        // Base circular coordinate
        const bx = Math.cos(angle) * node.radius;
        const by = Math.sin(angle) * node.radius;

        // 3D Euler angles rotation
        const radX = (node.rx * Math.PI) / 180;
        const radY = (node.ry * Math.PI) / 180;

        const orbitX = bx * Math.cos(radY) - by * Math.sin(radY) * Math.sin(radX);
        const orbitY = by * Math.cos(radX);
        const orbitZ = bx * Math.sin(radY) + by * Math.cos(radY) * Math.sin(radX);

        // 2. Structured grid position math
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gridX = col * colWidth - totalWidth / 2;
        const gridY = gridStartY + row * rowHeight;

        // 3. Smooth blend between 3D Orbit and Clean Grid
        // Ease function for snapping into grid
        const ease = p * p * (3 - 2 * p); // smoothstep
        const currentX = (1 - ease) * orbitX + ease * gridX;
        const currentY = (1 - ease) * orbitY + ease * gridY;
        const currentZ = (1 - ease) * orbitZ;

        // Scale node slightly up in grid mode for better legibility
        const nodeScale = (1 - ease) * (0.85 + (orbitZ / 300) * 0.25) + ease * 1.05;

        el.style.transform = `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) scale(${nodeScale})`;

        // Manage label visibility & card glow
        const labelEl = el.querySelector(".skill-node-label") as HTMLElement;
        if (labelEl) {
          labelEl.style.opacity = `${Math.min(1, ease * 1.4)}`;
          labelEl.style.transform = `translateY(${ease * 4}px)`;
        }

        const borderEl = el.querySelector(".logo-icon") as HTMLElement;
        if (borderEl) {
          borderEl.style.borderRadius = `${Math.max(12, 50 - ease * 38)}px`;
          borderEl.style.background = ease > 0.5
            ? "rgba(18, 18, 26, 0.85)"
            : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(124, 58, 237, 0.3))";
        }
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="orbital-sphere-wrapper animate-on-scroll animated" ref={containerRef}>
      {/* Central profile photo core */}
      <div className="pipeline-center sun-core" ref={centerPhotoRef}>
        <Image
          className="profile-photo"
          src={profilePhoto}
          alt="Subhabrata Das"
          width={220}
          height={220}
          priority
        />
      </div>

      {/* 3D Orbit Track Rings (Fade on scroll) */}
      <div className="orbital-rings-overlay" ref={ringsRef}>
        {SKILL_NODES.slice(0, 10).map((node) => (
          <div
            key={`ring-${node.key}`}
            className="orbital-ring-line"
            style={{
              width: `${node.radius * 2}px`,
              height: `${node.radius * 2}px`,
              transform: `translate(-50%, -50%) rotateX(${node.rx}deg) rotateY(${node.ry}deg) rotateZ(${node.rz}deg)`,
            }}
          />
        ))}
      </div>

      {/* Nodes Layer: Continuous morph from Sphere to Structured Grid */}
      <div className="orbital-nodes-stage">
        {SKILL_NODES.map((node, idx) => (
          <div
            key={node.key}
            ref={(el) => {
              nodeRefs.current[idx] = el;
            }}
            className="orbital-node-entity"
          >
            <div className="orbital-card-shell" title={node.label}>
              <div className="logo-icon">
                <img
                  src={node.icon}
                  alt={node.label}
                  style={node.key === "riverpod" ? { filter: "brightness(0) invert(1)" } : undefined}
                />
              </div>
              <span className="skill-node-label">{node.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
