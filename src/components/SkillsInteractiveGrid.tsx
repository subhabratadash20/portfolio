"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw } from "lucide-react";

interface SkillCardData {
  id: string;
  number: string;
  badge: string;
  badgeColor: string;
  title: string;
  iconColor: string;
  accentColor: string;
  flyDirection: "left" | "right" | "center";
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
    flyDirection: "left",
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Jump smoothly to a specific card via HUD navigation (center of card index)
  const scrollToCard = useCallback((cardIndex: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollableDist = rect.height - window.innerHeight;
    if (scrollableDist <= 0) return;
    // Card idx focal center is at s = 0.48 + idx * 1.0; total span is 7.0
    const targetP = Math.max(0, Math.min(1, (0.48 + cardIndex) / 7.0));
    const targetY = trackTop + targetP * scrollableDist;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const handleReplay = useCallback(() => {
    scrollToCard(0);
  }, [scrollToCard]);

  // 1:1 Mouse-Scroll-Driven Scrollytelling Engine
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isReducedMotion = false;
    if (typeof window !== "undefined") {
      isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const updateDeck = () => {
      const rect = track.getBoundingClientRect();
      const windowH = window.innerHeight;
      const windowW = window.innerWidth;
      const isMobile = windowW < 768;

      const scrollableDist = rect.height - windowH;
      if (scrollableDist <= 0) return;

      // Scrub progress in [0, 1] relative to the track
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDist));

      // Direct DOM update on bottom progress bar for 120 FPS response
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Map progress across 7 cards: span of 7.0 with centers at 0.48 + i * 1.0
      const totalSpan = 7.0;
      const s = progress * totalSpan;

      // Update active focal card index for HUD indicator (transitions at midpoints 0.98, 1.98, etc.)
      const currentActive = Math.max(
        0,
        Math.min(SKILL_CARDS.length - 1, Math.round((s - 0.48) / 1.0))
      );
      if (currentActive !== activeIndexRef.current) {
        activeIndexRef.current = currentActive;
        setActiveIndex(currentActive);
      }

      // Safe travel distances that guarantee cards fly completely off-screen
      const travelDistX = Math.round(windowW * 0.5 + (isMobile ? 240 : 420));

      // Scrub and position each card
      SKILL_CARDS.forEach((card, i) => {
        const cardEl = cardRefs.current[i];
        if (!cardEl) return;

        // Card i center is at 0.48 + i * 1.0
        const cardCenter = 0.48 + i * 1.0;
        const delta = s - cardCenter;

        // Cards outside active window [-0.50, +0.50] are completely hidden
        if (Math.abs(delta) >= 0.50) {
          cardEl.style.opacity = "0";
          cardEl.style.visibility = "hidden";
          cardEl.style.pointerEvents = "none";
          const offX = card.flyDirection === "left" ? -travelDistX : travelDistX;
          cardEl.style.transform = `translate3d(${offX}px, 0, 0) scale(0.88)`;
          return;
        }

        cardEl.style.visibility = "visible";
        cardEl.style.pointerEvents = Math.abs(delta) <= 0.18 ? "auto" : "none";

        if (isReducedMotion) {
          // Stationary crossfade for users with reduced motion
          const isCurrent = Math.abs(delta) <= 0.18;
          const opacity = Math.max(0, 1 - Math.abs(delta) * 2.2);
          cardEl.style.opacity = `${opacity.toFixed(3)}`;
          cardEl.style.transform = isCurrent ? "scale(1)" : "scale(0.96)";
          cardEl.style.filter = "none";
          return;
        }

        let tx = 0;
        let ty = 0;
        let opacity = 1;
        let blurPx = 0;

        // Configuration
        const dwellHalf = 0.12; // Centered focal window: [-0.12, +0.12]
        const minScale = 0.88;
        const restScale = 1.00;
        const maxScale = isMobile ? 1.07 : 1.14;
        const maxZ = isMobile ? 14 : 30;

        let scale = restScale;
        let focalFactor = 0;

        if (delta < -dwellHalf) {
          // === ENTRANCE PHASE (card flies in from outside of screen to center) ===
          // delta goes from -0.48 to -dwellHalf (-0.12)
          const t = Math.max(0, Math.min(1, (delta - (-0.48)) / (-dwellHalf - (-0.48))));
          const easeIn = 1 - Math.pow(1 - t, 2.5); // smooth deceleration into center
          tx = (card.flyDirection === "left" ? -travelDistX : travelDistX) * (1 - easeIn);
          ty = 0;
          scale = minScale + (restScale - minScale) * easeIn;
          opacity = Math.max(0, Math.min(1, easeIn * 1.4));
          blurPx = (1 - easeIn) * 4.5;
        } else if (delta <= dwellHalf) {
          // === CENTERED FOCAL DWELL ZONE (card is stationary horizontally, dynamically zooms) ===
          // delta goes from -dwellHalf to +dwellHalf, peaking exactly at delta = 0
          tx = 0;
          ty = 0;
          opacity = 1;
          blurPx = 0;

          // Continuous scroll-proportional focal curve peaking at delta = 0
          // Power 1.15 produces immediate tangible sensitivity to every tick of wheel/trackpad
          const normFocal = Math.abs(delta) / dwellHalf; // 0 at exact center, 1 at boundaries
          focalFactor = Math.max(0, 1 - Math.pow(normFocal, 1.15));
          scale = restScale + (maxScale - restScale) * focalFactor;
        } else {
          // === EXIT PHASE (card smoothly transitions out as user continues scrolling) ===
          // delta goes from +dwellHalf (+0.12) to +0.48
          const t = Math.max(0, Math.min(1, (delta - dwellHalf) / (0.48 - dwellHalf)));
          const easeOut = Math.pow(t, 2.2); // smooth acceleration departure
          tx = (card.flyDirection === "left" ? -travelDistX : travelDistX) * easeOut;
          ty = -35 * easeOut; // subtle cinematic upward lift
          scale = restScale - (restScale - minScale) * easeOut;
          opacity = Math.max(0, 1 - easeOut * 1.4);
          blurPx = easeOut * 4.5;
        }

        // Dynamic 3D elevation (translateZ: 0px to 30px) in 1:1 sync with centered focal zoom
        const tz = maxZ * focalFactor;

        // Dynamic Domain Neon Aura & Card Brightness peaking at delta = 0
        const glowBlur = Math.round(18 + 36 * focalFactor);
        const shadowY = Math.round(10 + 20 * focalFactor);
        const shadowBlur = Math.round(20 + 25 * focalFactor);
        const shadowAlpha = (0.45 + 0.35 * focalFactor).toFixed(2);
        const dynamicGlow = `0 0 ${glowBlur}px ${card.accentColor}, 0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`;
        const brightness = (0.96 + 0.14 * focalFactor).toFixed(2);

        // Apply 3D transforms, opacity, and filter to wrapper
        cardEl.style.opacity = `${opacity.toFixed(3)}`;
        cardEl.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        cardEl.style.filter = blurPx > 0.3
          ? `blur(${blurPx.toFixed(1)}px) brightness(${brightness})`
          : `brightness(${brightness})`;

        // Apply domain neon aura directly to wrapper CSS variable and inner card element
        cardEl.style.setProperty("--card-glow", dynamicGlow);
        const innerEl = cardEl.firstElementChild as HTMLElement | null;
        if (innerEl) {
          innerEl.style.boxShadow = dynamicGlow;
          innerEl.style.borderColor = Math.abs(delta) <= dwellHalf + 0.04
            ? card.badgeColor
            : "rgba(255, 255, 255, 0.12)";
        }
      });
    };

    const handleScroll = () => {
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(() => {
          updateDeck();
          animFrameRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateDeck();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const activeCard = SKILL_CARDS[activeIndex] || SKILL_CARDS[0];

  return (
    <div className="skills-scrolly-track" ref={trackRef}>
      {/* Sticky Pinned Viewport Stage */}
      <div className="skills-sticky-viewport">
        {/* Stage Header with Pinned Title & Cyber HUD */}
        <header className="skills-stage-header">
          <h2 className="section-title skills-scrolly-title">
            <span className="section-number">03.</span>
            Technical Proficiencies &amp; Architecture Stack
          </h2>

          {/* Scrollytelling HUD Bar */}
          <div
            className="skills-hud-bar"
            style={{
              borderColor: activeCard.badgeColor,
              boxShadow: `0 0 25px ${activeCard.accentColor}, 0 6px 20px rgba(0, 0, 0, 0.7)`,
            }}
          >
            <div className="skills-hud-info">
              <span
                className="skills-hud-pulse"
                style={{
                  backgroundColor: activeCard.badgeColor,
                  boxShadow: `0 0 10px ${activeCard.badgeColor}`,
                }}
              />
              <div className="skills-hud-counter">
                <span className="font-semibold text-white">
                  [{activeCard.number} / 07
                  <span className="skills-hud-card-name">
                    {" : "}
                    <strong style={{ color: activeCard.badgeColor }}>
                      {activeCard.title}
                    </strong>
                  </span>
                  ]
                </span>
              </div>
              <span
                className="skills-hud-badge"
                style={{
                  color: activeCard.badgeColor,
                  backgroundColor: `${activeCard.badgeColor}18`,
                  borderColor: `${activeCard.badgeColor}55`,
                }}
              >
                {activeCard.badge}
              </span>
            </div>

            <div className="skills-hud-actions">
              {/* 7 Segmented Step Pills */}
              <div
                className="skills-hud-steps"
                role="tablist"
                aria-label="Skill Deck Cards"
              >
                {SKILL_CARDS.map((card, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`skills-hud-step-btn ${isActive ? "active" : ""}`}
                      style={{
                        borderColor: isActive ? card.badgeColor : undefined,
                        boxShadow: isActive ? `0 0 12px ${card.accentColor}` : undefined,
                        backgroundColor: isActive ? card.badgeColor : undefined,
                      }}
                      onClick={() => scrollToCard(idx)}
                      title={`Jump to 0${idx + 1}: ${card.title}`}
                    >
                      <span className="sr-only">{card.title}</span>
                      <span>{card.number}</span>
                    </button>
                  );
                })}
              </div>

              {/* Replay Button */}
              <button
                type="button"
                className="skills-replay-btn"
                onClick={handleReplay}
                title="Scroll back to first skill card"
                aria-label="Replay skill deck sequence"
              >
                <RotateCcw size={12} />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </header>

        {/* Center Focal Deck Stage */}
        <div className="skills-cards-stage">
          {SKILL_CARDS.map((card, index) => {
            const isFocal = activeIndex === index;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="skill-scrolly-card-wrapper"
                aria-hidden={!isFocal}
              >
                <div
                  className="skill-category glass-card skill-thematic-card"
                  style={{
                    borderColor: isFocal ? card.badgeColor : undefined,
                  }}
                >
                  <div className="skill-category-header">
                    <div
                      className="skill-icon"
                      style={{
                        color: card.iconColor,
                        background: `linear-gradient(135deg, ${card.badgeColor}33, ${card.accentColor})`,
                        borderColor: card.badgeColor,
                      }}
                    >
                      {card.icon(card.iconColor)}
                    </div>
                    <div>
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider block font-mono"
                        style={{ color: card.badgeColor }}
                      >
                        {card.badge}
                      </span>
                      <h3 className="text-white text-xl font-bold">{card.title}</h3>
                    </div>
                    <span
                      className="skill-card-order-tag font-mono text-xs opacity-60 ml-auto"
                      style={{ color: card.badgeColor }}
                    >
                      #{card.number}
                    </span>
                  </div>

                  <div className="skill-tags">
                    {card.tags.map((tag) => (
                      <span
                        key={tag.text}
                        className={`skill-tag ${tag.highlight ? "skill-tag-highlight" : ""}`}
                        style={
                          tag.highlight
                            ? {
                                color: card.badgeColor,
                                borderColor: card.badgeColor,
                                backgroundColor: `${card.badgeColor}22`,
                                boxShadow: `0 0 12px ${card.accentColor}`,
                              }
                            : undefined
                        }
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Footer: Scrollytelling Hint & Scrub Progress Bar */}
        <footer className="skills-stage-footer">
          <div className="skills-scroll-hint">
            <span className="scroll-hint-arrow">↓</span>
            <span>
              SCROLL MOUSE / SWIPE TO CYCLE DECK [{activeCard.number} / 07]
            </span>
            <span className="scroll-hint-arrow">↓</span>
          </div>
          <div className="skills-scrub-track" aria-hidden="true">
            <div
              ref={progressBarRef}
              className="skills-scrub-bar"
              style={{
                backgroundColor: activeCard.badgeColor,
                boxShadow: `0 0 12px ${activeCard.badgeColor}`,
              }}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
