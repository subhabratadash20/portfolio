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
  { key: "flutter", label: "Flutter", icon: "/icons/flutter.svg", speed: 0.7, rx: 75, ry: 0, rz: 0, radius: 240 },
  { key: "dart", label: "Dart", icon: "/icons/dart.svg", speed: 0.8, reverse: true, rx: 70, ry: 30, rz: 15, radius: 250 },
  { key: "postgresql", label: "PostgreSQL", icon: "/icons/postgresql.svg", speed: 0.65, rx: 65, ry: 50, rz: 0, radius: 245 },
  { key: "graphql", label: "GraphQL", icon: "/icons/graphql.svg", speed: 0.72, reverse: true, rx: 75, ry: 75, rz: 10, radius: 235 },
  { key: "firebase", label: "Firebase Data Connect", icon: "/icons/firebase.svg", speed: 0.6, rx: 60, ry: 100, rz: 20, radius: 240 },
  { key: "google-cloud", label: "Google Cloud", icon: "/icons/google-cloud.svg", speed: 0.75, reverse: true, rx: 75, ry: 125, rz: 10, radius: 255 },
  { key: "openai", label: "OpenAI", icon: "/icons/openai.svg", speed: 0.62, rx: 70, ry: 150, rz: 15, radius: 238 },
  { key: "gemini", label: "Gemini AI", icon: "/icons/gemini.svg", speed: 0.7, reverse: true, rx: 65, ry: 175, rz: 5, radius: 242 },
  { key: "redis", label: "Redis Caching", icon: "/icons/redis.svg", speed: 0.78, rx: 75, ry: 200, rz: 20, radius: 248 },
  { key: "nodejs", label: "Node.js 22 LTS", icon: "/icons/nodejs.svg", speed: 0.65, reverse: true, rx: 70, ry: 225, rz: 15, radius: 235 },
  { key: "docker", label: "Docker", icon: "/icons/docker.svg", speed: 0.68, rx: 60, ry: 250, rz: 10, radius: 250 },
  { key: "stripe", label: "Stripe & Paystack", icon: "/icons/stripe.svg", speed: 0.74, reverse: true, rx: 75, ry: 275, rz: 25, radius: 240 },
  { key: "webrtc", label: "Agora WebRTC", icon: "/icons/webrtc.svg", speed: 0.62, rx: 65, ry: 300, rz: 15, radius: 245 },
  { key: "socketio", label: "Socket.IO", icon: "/icons/socketio.svg", speed: 0.8, reverse: true, rx: 70, ry: 325, rz: 10, radius: 238 },

  // Inner Orbit Nodes
  { key: "riverpod", label: "Riverpod 3", icon: "/icons/riverpod.svg", speed: 0.85, rx: 80, ry: 15, rz: 30, radius: 175 },
  { key: "getx", label: "GetX State", icon: "/icons/getx.svg", speed: 0.9, reverse: true, rx: 70, ry: 45, rz: 45, radius: 180 },
  { key: "gorouter", label: "GoRouter / AutoRoute", icon: "/icons/gorouter.svg", speed: 0.82, rx: 75, ry: 75, rz: 15, radius: 170 },
  { key: "idempotency", label: "Idempotent APIs", icon: "/icons/idempotency.svg", speed: 0.78, reverse: true, rx: 65, ry: 105, rz: 60, radius: 185 },
  { key: "hive", label: "Hive DB", icon: "/icons/hive.svg", speed: 0.86, rx: 80, ry: 135, rz: 25, radius: 172 },
  { key: "nosql", label: "Firestore / NoSQL", icon: "/icons/nosql.svg", speed: 0.74, reverse: true, rx: 70, ry: 165, rz: 40, radius: 178 },
  { key: "provider", label: "Provider", icon: "/icons/provider.svg", speed: 0.88, rx: 75, ry: 195, rz: 10, radius: 168 },
  { key: "claude", label: "Claude AI", icon: "/icons/claude.svg", speed: 0.7, reverse: true, rx: 65, ry: 225, rz: 55, radius: 182 },
  { key: "geofencing", label: "Geofencing Radar", icon: "/icons/geofencing.svg", speed: 0.82, rx: 80, ry: 255, rz: 20, radius: 170 },
  { key: "cicd", label: "CI/CD Pipelines", icon: "/icons/cicd.svg", speed: 0.92, reverse: true, rx: 70, ry: 285, rz: 35, radius: 176 },
  { key: "git", label: "Git VCS", icon: "/icons/git.svg", speed: 0.76, rx: 75, ry: 315, rz: 15, radius: 172 },
  { key: "python", label: "Python", icon: "/icons/python.svg", speed: 0.84, reverse: true, rx: 65, ry: 345, rz: 50, radius: 180 },
  { key: "google-maps", label: "Google Maps API", icon: "/icons/google-maps.svg", speed: 0.78, rx: 80, ry: 20, rz: 25, radius: 168 },
  { key: "rest", label: "RESTful APIs", icon: "/icons/rest.svg", speed: 0.86, reverse: true, rx: 70, ry: 50, rz: 30, radius: 174 },
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
      // Calculate true window scroll distance from top
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // When scrollY is 0-50px: Progress is 0 (Pure rotating 3D sphere)
      // When scrollY is 50px-350px: Smoothly interpolates from Sphere -> Grid
      // When scrollY >= 350px: Progress is 1 (Full structured grid)
      const start = 40;
      const end = 340;
      const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

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

      // Smoothly fade out scroll indicator as user scrolls down into grid
      const scrollIndicator = document.querySelector(".hero-scroll-indicator") as HTMLElement | null;
      if (scrollIndicator) {
        scrollIndicator.style.opacity = `${Math.max(0, 1 - p * 3)}`;
        scrollIndicator.style.pointerEvents = p > 0.15 ? "none" : "auto";
      }

      // Animate profile photo (subtle scale and elevation)
      if (centerPhotoRef.current) {
        const photoScale = 1 - p * 0.18;
        const photoY = p * -30;
        centerPhotoRef.current.style.transform = `translate(-50%, calc(-50% + ${photoY}px)) scale(${photoScale})`;
        centerPhotoRef.current.style.boxShadow = `0 0 ${40 + p * 30}px rgba(0, 217, 255, ${0.25 + p * 0.2})`;
      }

      // Responsive grid geometry spanning the available screen width
      const winW = window.innerWidth;
      let cols = 7;
      if (winW < 600) cols = 3;
      else if (winW < 900) cols = 4;
      else if (winW < 1200) cols = 6;
      else cols = 7;

      // Available container width clamped to responsive viewport margins
      const maxGridWidth = Math.min(winW - (isMobile ? 32 : 80), 1280);
      const colWidth = maxGridWidth / cols;
      const rowHeight = isMobile ? 85 : 105;
      const totalWidth = (cols - 1) * colWidth;
      const gridStartY = isMobile ? 150 : 160;

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

        // Scale node up in grid mode for high prominence and readability
        const nodeScale = (1 - ease) * (0.85 + (orbitZ / 300) * 0.25) + ease * 1.15;

        el.style.transform = `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) scale(${nodeScale})`;

        // Manage label visibility & card glow
        const labelEl = el.querySelector(".skill-node-label") as HTMLElement;
        if (labelEl) {
          labelEl.style.opacity = `${Math.min(1, ease * 1.5)}`;
          labelEl.style.transform = `translateY(${ease * 6}px)`;
        }

        const borderEl = el.querySelector(".logo-icon") as HTMLElement;
        if (borderEl) {
          borderEl.style.borderRadius = `${Math.max(14, 50 - ease * 36)}px`;
          borderEl.style.background = ease > 0.4
            ? "rgba(18, 18, 28, 0.92)"
            : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(124, 58, 237, 0.3))";
          borderEl.style.borderColor = ease > 0.4
            ? "rgba(0, 217, 255, 0.6)"
            : "rgba(0, 217, 255, 0.4)";
          borderEl.style.boxShadow = ease > 0.4
            ? "0 0 20px rgba(0, 217, 255, 0.35), 0 10px 25px rgba(0, 0, 0, 0.7)"
            : "0 0 12px rgba(0, 217, 255, 0.5), 0 0 25px rgba(124, 58, 237, 0.3)";
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
