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
  layer: 1 | 2 | 3 | 4;
};

// Sonic Lamb 4-Layer Exploded Architecture Mapping
const ARCH_LAYERS = [
  { id: 1, label: "LAYER 01 // MOBILE CLIENT SHELL (FLUTTER 3.11)", color: "#00D9FF", border: "rgba(0, 217, 255, 0.6)", glow: "rgba(0, 217, 255, 0.35)" },
  { id: 2, label: "LAYER 02 // AGENTIC AI CORE (PYTHON / LANGGRAPH)", color: "#A855F7", border: "rgba(168, 85, 247, 0.6)", glow: "rgba(168, 85, 247, 0.35)" },
  { id: 3, label: "LAYER 03 // DISTRIBUTED DATA BUS (NODE.JS 22 / POSTGRESQL)", color: "#10B981", border: "rgba(16, 185, 129, 0.6)", glow: "rgba(16, 185, 129, 0.35)" },
  { id: 4, label: "LAYER 04 // BARE-METAL & BRIDGES (WEBRTC / GEOFENCING)", color: "#F59E0B", border: "rgba(245, 158, 11, 0.6)", glow: "rgba(245, 158, 11, 0.35)" },
];

const SKILL_NODES: SkillNodeDef[] = [
  // Layer 1: Mobile Client Shell (Flutter 3.11, Dart Isolates, Reactive State)
  { key: "flutter", label: "Flutter 3.11", icon: "/icons/flutter.svg", speed: 0.7, rx: 75, ry: 0, rz: 0, radius: 240, layer: 1 },
  { key: "dart", label: "Dart 3 Isolates", icon: "/icons/dart.svg", speed: 0.8, reverse: true, rx: 70, ry: 30, rz: 15, radius: 250, layer: 1 },
  { key: "riverpod", label: "Riverpod 3", icon: "/icons/riverpod.svg", speed: 0.85, rx: 80, ry: 15, rz: 30, radius: 175, layer: 1 },
  { key: "getx", label: "GetX State", icon: "/icons/getx.svg", speed: 0.9, reverse: true, rx: 70, ry: 45, rz: 45, radius: 180, layer: 1 },
  { key: "gorouter", label: "GoRouter Declarative", icon: "/icons/gorouter.svg", speed: 0.82, rx: 75, ry: 75, rz: 15, radius: 170, layer: 1 },
  { key: "provider", label: "Provider Architecture", icon: "/icons/provider.svg", speed: 0.88, rx: 75, ry: 195, rz: 10, radius: 168, layer: 1 },
  { key: "hive", label: "Hive Local DB", icon: "/icons/hive.svg", speed: 0.86, rx: 80, ry: 135, rz: 25, radius: 172, layer: 1 },

  // Layer 2: Agentic Orchestration Core (Python FastAPI, OpenAI, Gemini 3.8, Claude)
  { key: "python", label: "Python FastAPI", icon: "/icons/python.svg", speed: 0.84, reverse: true, rx: 65, ry: 345, rz: 50, radius: 180, layer: 2 },
  { key: "gemini", label: "Gemini 3.8 Flash", icon: "/icons/gemini.svg", speed: 0.7, reverse: true, rx: 65, ry: 175, rz: 5, radius: 242, layer: 2 },
  { key: "openai", label: "OpenAI GPT-4o", icon: "/icons/openai.svg", speed: 0.62, rx: 70, ry: 150, rz: 15, radius: 238, layer: 2 },
  { key: "claude", label: "Claude 3.5 Sonnet", icon: "/icons/claude.svg", speed: 0.7, reverse: true, rx: 65, ry: 225, rz: 55, radius: 182, layer: 2 },

  // Layer 3: Distributed Data Bus (Node.js 22 LTS, PostgreSQL ACID, Redis, Firebase)
  { key: "nodejs", label: "Node.js 22 LTS", icon: "/icons/nodejs.svg", speed: 0.65, reverse: true, rx: 70, ry: 225, rz: 15, radius: 235, layer: 3 },
  { key: "postgresql", label: "PostgreSQL ACID", icon: "/icons/postgresql.svg", speed: 0.65, rx: 65, ry: 50, rz: 0, radius: 245, layer: 3 },
  { key: "firebase", label: "Firebase Data Connect", icon: "/icons/firebase.svg", speed: 0.6, rx: 60, ry: 100, rz: 20, radius: 240, layer: 3 },
  { key: "redis", label: "Redis Locks", icon: "/icons/redis.svg", speed: 0.78, rx: 75, ry: 200, rz: 20, radius: 248, layer: 3 },
  { key: "docker", label: "Docker Containers", icon: "/icons/docker.svg", speed: 0.68, rx: 60, ry: 250, rz: 10, radius: 250, layer: 3 },
  { key: "nosql", label: "Cloud Firestore", icon: "/icons/nosql.svg", speed: 0.74, reverse: true, rx: 70, ry: 165, rz: 40, radius: 178, layer: 3 },
  { key: "idempotency", label: "Idempotent APIs", icon: "/icons/idempotency.svg", speed: 0.78, reverse: true, rx: 65, ry: 105, rz: 60, radius: 185, layer: 3 },

  // Layer 4: Bare-Metal & Device Bridges (iOS DND Bypass, Agora RTC, Geofencing, Stripe)
  { key: "webrtc", label: "Agora WebRTC", icon: "/icons/webrtc.svg", speed: 0.62, rx: 65, ry: 300, rz: 15, radius: 245, layer: 4 },
  { key: "geofencing", label: "Geofencing Radar", icon: "/icons/geofencing.svg", speed: 0.82, rx: 80, ry: 255, rz: 20, radius: 170, layer: 4 },
  { key: "stripe", label: "Stripe Connect", icon: "/icons/stripe.svg", speed: 0.74, reverse: true, rx: 75, ry: 275, rz: 25, radius: 240, layer: 4 },
  { key: "google-maps", label: "Google Maps Radar", icon: "/icons/google-maps.svg", speed: 0.78, rx: 80, ry: 20, rz: 25, radius: 168, layer: 4 },
  { key: "socketio", label: "Socket.IO Realtime", icon: "/icons/socketio.svg", speed: 0.8, reverse: true, rx: 70, ry: 325, rz: 10, radius: 238, layer: 4 },
  { key: "cicd", label: "CI/CD Pipelines", icon: "/icons/cicd.svg", speed: 0.92, reverse: true, rx: 70, ry: 285, rz: 35, radius: 176, layer: 4 },
  { key: "git", label: "Git VCS", icon: "/icons/git.svg", speed: 0.76, rx: 75, ry: 315, rz: 15, radius: 172, layer: 4 },
  { key: "rest", label: "REST Endpoints", icon: "/icons/rest.svg", speed: 0.86, reverse: true, rx: 70, ry: 50, rz: 30, radius: 174, layer: 4 },
  { key: "graphql", label: "GraphQL Gateway", icon: "/icons/graphql.svg", speed: 0.72, reverse: true, rx: 75, ry: 75, rz: 10, radius: 235, layer: 4 },
  { key: "google-cloud", label: "Google Cloud Engine", icon: "/icons/google-cloud.svg", speed: 0.75, reverse: true, rx: 75, ry: 125, rz: 10, radius: 255, layer: 4 },
];

interface OrbitalSkillSphereProps {
  profilePhoto: StaticImageData;
}

export default function OrbitalSkillSphere({ profilePhoto }: OrbitalSkillSphereProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringsRef = useRef<HTMLDivElement | null>(null);
  const centerPhotoRef = useRef<HTMLDivElement | null>(null);
  const layerBadgeRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress (0 = sphere, 1 = exploded structured grid)
  const scrollProgressRef = useRef(0);
  const timeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const [currentLayer, setCurrentLayer] = useState(ARCH_LAYERS[0]);
  const nodeSubElementsRef = useRef<{ label: HTMLElement | null; icon: HTMLElement | null }[]>([]);

  useEffect(() => {
    let isVisible = true;

    // Cache sub-elements to eliminate querySelector thrashing in 60 FPS animation loop
    nodeSubElementsRef.current = SKILL_NODES.map((_, i) => {
      const el = nodeRefs.current[i];
      return {
        label: el ? (el.querySelector(".skill-node-label") as HTMLElement) : null,
        icon: el ? (el.querySelector(".logo-icon") as HTMLElement) : null,
      };
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isMobile = window.innerWidth < 768;
      const sphereCenterY = isMobile ? 220 : 280;
      const sphereScreenY = rect.top + sphereCenterY;
      const screenCenter = windowHeight * 0.5;

      // Generous 450-550px scroll range for continuous 4-layer scrubbing
      const start = screenCenter + (isMobile ? 120 : 160);
      const end = screenCenter - (isMobile ? 260 : 340);

      const progress = Math.min(Math.max((start - sphereScreenY) / (start - end), 0), 1);
      scrollProgressRef.current = progress;

      // Update active architectural exploded layer
      const layerIdx = Math.min(3, Math.floor(progress * 4));
      setCurrentLayer(ARCH_LAYERS[layerIdx]);
    };

    const updateContainerBounds = () => {
      if (!containerRef.current) return;
      const winW = window.innerWidth;
      const isMobile = winW < 768;
      let cols = 7;
      if (winW < 400) cols = 2;
      else if (winW < 640) cols = 3;
      else if (winW < 900) cols = 4;
      else if (winW < 1200) cols = 6;
      else cols = 7;

      const rowHeight = isMobile ? (winW < 400 ? 92 : 105) : 148;
      const gridStartY = isMobile ? (winW < 400 ? 55 : 70) : 160;
      const rows = Math.ceil(SKILL_NODES.length / cols);
      const stageTop = isMobile ? (winW < 400 ? 160 : winW < 480 ? 180 : 220) : (winW < 900 ? 250 : 280);
      const requiredGridBottom = stageTop + gridStartY + (rows - 1) * rowHeight + (isMobile ? 130 : 170);
      containerRef.current.style.minHeight = `${Math.ceil(requiredGridBottom)}px`;
    };

    const handleResize = () => {
      updateContainerBounds();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateContainerBounds();
    handleScroll();

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }

      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      timeRef.current += dt;

      const p = scrollProgressRef.current; // 0 to 1
      const winW = window.innerWidth;
      const isMobile = winW < 768;

      // Scale orbit radius on mobile so 3D nodes never overflow the screen
      const radiusScale = isMobile
        ? Math.min(0.68, Math.max(0.40, (winW - 50) / 580))
        : 1;

      // Direct DOM animation for layer badge ref
      if (layerBadgeRef.current) {
        const badgeOpacity = Math.min(1, Math.max(0, (p - 0.04) * 6));
        const badgeTranslateY = Math.max(-10, -10 + p * 10);
        layerBadgeRef.current.style.opacity = `${badgeOpacity}`;
        layerBadgeRef.current.style.transform = `translateX(-50%) translateY(${badgeTranslateY}px)`;
      }

      // Fade out and scale orbital rings as user scrolls
      if (ringsRef.current) {
        ringsRef.current.style.opacity = `${Math.max(0, 1 - p * 2.2)}`;
        ringsRef.current.style.transform = `scale(${(1 - p * 0.15) * radiusScale})`;
      }

      // Smoothly fade out scroll indicator as user scrolls down into grid
      const scrollIndicator = document.querySelector(".hero-scroll-indicator") as HTMLElement | null;
      if (scrollIndicator) {
        scrollIndicator.style.opacity = `${Math.max(0, 1 - p * 3)}`;
        scrollIndicator.style.pointerEvents = p > 0.15 ? "none" : "auto";
      }

      // Animate profile photo: Zoom effect smoothly in sync with scroll progress p (1.0 -> 1.35)
      if (centerPhotoRef.current) {
        const photoZoom = isMobile ? (1 + p * 0.18) : (1 + p * 0.35);
        const photoY = p * (isMobile ? -105 : -190);
        centerPhotoRef.current.style.transform = `translate(-50%, calc(-50% + ${photoY}px)) scale(${photoZoom})`;
        centerPhotoRef.current.style.boxShadow = `0 0 ${isMobile ? 25 + p * 25 : 40 + p * 50}px rgba(0, 217, 255, ${0.25 + p * 0.35}), 0 0 ${isMobile ? 40 + p * 30 : 80 + p * 60}px rgba(124, 58, 237, ${0.2 + p * 0.3})`;
        centerPhotoRef.current.style.zIndex = "2";
      }

      // Responsive grid geometry spanning the available screen width
      let cols = 7;
      if (winW < 400) cols = 2;
      else if (winW < 640) cols = 3;
      else if (winW < 900) cols = 4;
      else if (winW < 1200) cols = 6;
      else cols = 7;

      const maxGridWidth = Math.min(winW - (isMobile ? 24 : 80), 1280);
      const colWidth = maxGridWidth / cols;
      const rowHeight = isMobile ? (winW < 400 ? 92 : 105) : 148;
      const totalWidth = (cols - 1) * colWidth;
      const gridStartY = isMobile ? (winW < 400 ? 55 : 70) : 160;

      // Update positions of each skill node with exploded anatomy
      SKILL_NODES.forEach((node, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;

        // 1. Orbital position math (spinning 3D ellipse)
        const direction = node.reverse ? -1 : 1;
        const angle = timeRef.current * node.speed * direction + (i * (Math.PI * 2)) / SKILL_NODES.length;

        // Exploded layer radial & Z displacement scaled for screen bounds
        const layerDisplacement = (node.layer - 1) * 36 * p * radiusScale;
        const layerZDisplacement = (node.layer - 1) * 45 * p * radiusScale;
        const effectiveRadius = (node.radius + layerDisplacement) * radiusScale;

        const bx = Math.cos(angle) * effectiveRadius;
        const by = Math.sin(angle) * effectiveRadius;

        const radX = (node.rx * Math.PI) / 180;
        const radY = (node.ry * Math.PI) / 180;

        const orbitX = bx * Math.cos(radY) - by * Math.sin(radY) * Math.sin(radX);
        const orbitY = by * Math.cos(radX);
        const orbitZ = bx * Math.sin(radY) + by * Math.cos(radY) * Math.sin(radX) + layerZDisplacement;

        // 2. Structured grid position math
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gridX = col * colWidth - totalWidth / 2;
        const gridY = gridStartY + row * rowHeight;

        // 3. Smooth blend between 3D Orbit and Clean Grid
        const ease = p * p * (3 - 2 * p); // smoothstep
        let currentX = (1 - ease) * orbitX + ease * gridX;
        let currentY = (1 - ease) * orbitY + ease * gridY;
        const currentZ = (1 - ease) * orbitZ;

        // Dynamic collision avoidance with profile photo
        if (ease > 0.15 && Math.abs(currentX) < 140) {
          const profileBottom = (isMobile ? -105 : -190) * p + 110 * (1 + p * 0.18) * 0.5;
          const minSafeY = profileBottom + 20;
          if (currentY < minSafeY) {
            currentY = (1 - ease) * currentY + ease * minSafeY;
          }
        }

        const nodeScale = (1 - ease) * (0.85 + (orbitZ / 300) * 0.25) + ease * 1.15;
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) scale(${nodeScale})`;

        // Manage label visibility & layer-specific color glow using cached sub-element refs
        const subEls = nodeSubElementsRef.current[i];
        if (subEls?.label) {
          subEls.label.style.opacity = `${Math.min(1, ease * 1.5)}`;
          subEls.label.style.transform = `translateY(${ease * 6}px)`;
        }

        if (subEls?.icon) {
          const layerConfig = ARCH_LAYERS[node.layer - 1];
          subEls.icon.style.borderRadius = `${Math.max(14, 50 - ease * 36)}px`;
          subEls.icon.style.background = ease > 0.4
            ? "rgba(18, 18, 28, 0.92)"
            : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(124, 58, 237, 0.3))";
          subEls.icon.style.borderColor = ease > 0.4 ? layerConfig.border : "rgba(0, 217, 255, 0.4)";
          subEls.icon.style.boxShadow = ease > 0.4
            ? `0 0 20px ${layerConfig.glow}, 0 10px 25px rgba(0, 0, 0, 0.7)`
            : "0 0 12px rgba(0, 217, 255, 0.5), 0 0 25px rgba(124, 58, 237, 0.3)";
        }
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    // Phase 4: IntersectionObserver to pause 60 FPS animation loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animFrameRef.current) {
            lastTime = performance.now();
            animFrameRef.current = requestAnimationFrame(loop);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="orbital-sphere-wrapper animate-on-scroll animated" ref={containerRef}>
      {/* Dynamic Sonic Lamb Exploded Architecture Badge */}
      <div
        className={`orbital-layer-indicator layer-${currentLayer.id}`}
        ref={layerBadgeRef}
      >
        <span className="orbital-layer-badge">{currentLayer.label}</span>
      </div>

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

      {/* Nodes Layer: Continuous exploded morph from Sphere to Structured Grid */}
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
