"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, RotateCcw } from "lucide-react";

interface SkillCardData {
  id: string;
  number: string;
  badge: string;
  badgeColor: string;
  title: string;
  iconColor: string;
  accentColor: string;
  flyDirection: "left" | "right" | "center";
  delayMs: number;
  icon: (color: string) => React.ReactNode;
  tags: Array<{ text: string; highlight?: boolean }>;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: "flutter",
    number: "01",
    badge: "Primary Specialization",
    badgeColor: "#00D9FF",
    title: "Advanced Flutter & Dart 3",
    iconColor: "#00D9FF",
    accentColor: "rgba(0, 217, 255, 0.4)",
    flyDirection: "left",
    delayMs: 0,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    tags: [
      { text: "Flutter 3.11+", highlight: true },
      { text: "Dart 3 Patterns" },
      { text: "Riverpod 3.3" },
      { text: "BLoC / Cubit" },
      { text: "Clean Architecture & DDD" },
      { text: "Dart Isolates (compute)" },
      { text: "Custom RenderObjects" },
      { text: "60-120 FPS GPU Profiling" },
      { text: "Hive Local-First DB" },
    ],
  },
  {
    id: "python-ai",
    number: "02",
    badge: "Second Priority",
    badgeColor: "#C084FC",
    title: "Python & Agentic AI",
    iconColor: "#C084FC",
    accentColor: "rgba(192, 132, 252, 0.4)",
    flyDirection: "right",
    delayMs: 450,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <circle cx="7.5" cy="14.5" r="1.5" />
        <circle cx="16.5" cy="14.5" r="1.5" />
      </svg>
    ),
    tags: [
      { text: "FastAPI", highlight: true },
      { text: "LangGraph Supervisors" },
      { text: "Tool-Palette Pruning" },
      { text: "OpenAI Realtime WebRTC" },
      { text: "Gemini 3.8 Flash" },
      { text: "Claude" },
      { text: "Celery & Redis Queues" },
      { text: "Beanie ODM (MongoDB)" },
    ],
  },
  {
    id: "node-backend",
    number: "03",
    badge: "Third Priority",
    badgeColor: "#34D399",
    title: "Node.js 22 & Microservices",
    iconColor: "#34D399",
    accentColor: "rgba(52, 211, 153, 0.4)",
    flyDirection: "left",
    delayMs: 900,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="16,18 22,12 16,6" />
        <polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    tags: [
      { text: "Node.js 22 LTS", highlight: true },
      { text: "PostgreSQL (Neon)" },
      { text: "Firebase Data Connect" },
      { text: "Cloud Firestore" },
      { text: "Redis Concurrency Locks" },
      { text: "Stripe Connect Payouts" },
      { text: "Idempotent Webhooks" },
    ],
  },
  {
    id: "react-web",
    number: "04",
    badge: "Supporting Capability",
    badgeColor: "#FBBF24",
    title: "React & Modern Web",
    iconColor: "#FBBF24",
    accentColor: "rgba(251, 191, 36, 0.4)",
    flyDirection: "right",
    delayMs: 1350,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    tags: [
      { text: "React 18/19", highlight: true },
      { text: "Next.js App Router" },
      { text: "TypeScript" },
      { text: "Tailwind CSS" },
      { text: "Web Portals (myetana.com)" },
      { text: "Developer Dashboards" },
      { text: "REST & GraphQL Clients" },
    ],
  },
  {
    id: "hardware-bridges",
    number: "05",
    badge: "System Integration",
    badgeColor: "#60A5FA",
    title: "Hardware Bridges & Media",
    iconColor: "#60A5FA",
    accentColor: "rgba(96, 165, 250, 0.4)",
    flyDirection: "left",
    delayMs: 1800,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    tags: [
      { text: "iOS AlarmKit & EventKit", highlight: true },
      { text: "Android AlarmManager" },
      { text: "Agora WebRTC" },
      { text: "Mux RTMP Simulcast" },
      { text: "Socket.IO Duplex" },
      { text: "MethodChannels Interop" },
    ],
  },
  {
    id: "geolocation",
    number: "06",
    badge: "Spatial Computing",
    badgeColor: "#2DD4BF",
    title: "Geolocation & Radar",
    iconColor: "#2DD4BF",
    accentColor: "rgba(45, 212, 191, 0.4)",
    flyDirection: "right",
    delayMs: 2250,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    tags: [
      { text: "Google Maps API", highlight: true },
      { text: "Geofencing Radar" },
      { text: "Live Proximity Dispatch" },
      { text: "Sub-Meter Telemetry" },
      { text: "Offline Sync Buffering" },
    ],
  },
  {
    id: "devops",
    number: "07",
    badge: "Production Operations",
    badgeColor: "#FB7185",
    title: "Mobile Release & DevOps",
    iconColor: "#FB7185",
    accentColor: "rgba(251, 113, 133, 0.4)",
    flyDirection: "center",
    delayMs: 2700,
    icon: (color) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    tags: [
      { text: "iOS Xcode Deploy", highlight: true },
      { text: "Android Keystore" },
      { text: "App Store Connect" },
      { text: "Google Play Console" },
      { text: "TestFlight" },
      { text: "Git VCS" },
    ],
  },
];

export default function SkillsInteractiveGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setHasEntered(false);
    setTimeout(() => {
      setReplayKey((k) => k + 1);
      setHasEntered(true);
    }, 50);
  };

  return (
    <div
      ref={containerRef}
      className="skills-hyperspace-container"
      key={replayKey}
    >
      {/* Interactive Controls Bar */}
      <div className="skills-sequence-controls">
        <div className="skills-sequence-status">
          <span className="skills-status-indicator" />
          <span className="skills-status-text">
            {hasEntered ? "GPU HYPERSPACE SEQUENCE: ACTIVE" : "SCROLL TO INITIALIZE"}
          </span>
        </div>
        <button
          type="button"
          className="skills-replay-btn"
          onClick={handleReplay}
          title="Replay alternating fly-in and focal zoom sequence"
          aria-label="Replay fly-in sequence"
        >
          <RotateCcw size={13} className="replay-icon" />
          <span>Replay Fly-In Sequence</span>
        </button>
      </div>

      {/* Grid of 7 Curated Cards */}
      <div className="skills-grid skills-hyperspace-grid">
        {SKILL_CARDS.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;

          // Animation class determination
          let flyClass = "";
          if (card.flyDirection === "left") flyClass = "skill-fly-in-left";
          else if (card.flyDirection === "right") flyClass = "skill-fly-in-right";
          else flyClass = "skill-fly-in-center";

          return (
            <div
              key={card.id}
              className={`skill-category glass-card skill-thematic-card ${hasEntered ? flyClass : "skill-card-idle"} ${
                isHovered ? "skill-spotlight-active" : ""
              } ${isDimmed ? "skill-spotlight-dimmed" : ""}`}
              style={{
                animationDelay: `${card.delayMs}ms`,
                borderColor: isHovered ? card.badgeColor : undefined,
                boxShadow: isHovered ? `0 0 35px ${card.accentColor}` : undefined,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="skill-category-header">
                <div
                  className="skill-icon"
                  style={{ color: card.iconColor }}
                >
                  {card.icon(card.iconColor)}
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider block"
                    style={{ color: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                  <h3 className="text-white">{card.title}</h3>
                </div>
              </div>
              <div className="skill-tags">
                {card.tags.map((tag) => (
                  <span
                    key={tag.text}
                    className={`skill-tag ${tag.highlight ? "font-semibold" : ""}`}
                    style={tag.highlight ? { color: card.badgeColor } : undefined}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
