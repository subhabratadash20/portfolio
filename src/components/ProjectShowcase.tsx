"use client";

import { useState, useMemo, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { projects, type Project, type ProjectCategory } from "@/data/projects";

const projectCardFeatures: Record<string, string[]> = {
  konnectax: [
    "Multi-platform simulcasting via Mux",
    "Unified live comments system",
    "OAuth social platform integration",
  ],
  plugg: [
    "AI-powered matchmaking algorithm",
    "Real-time chat with rich media",
    "RevenueCat subscription system",
  ],
  "nora-ai": [
    "Dual TTS (OpenAI & ElevenLabs)",
    "Smart alarm & calendar integration",
    "Offline-first architecture",
  ],
  "diy-marketplace": [
    "Dual-role marketplace",
    "Arabic & English (RTL support)",
    "Seller analytics dashboard",
  ],
  stylaa: [
    "Dual-platform (users & businesses)",
    "Real-time appointment scheduling",
    "AI-based service recommendations",
  ],
  groundmetrx: [
    "Real-time asset tracking",
    "Optimized delivery routes",
    "Functional offline mode",
  ],
  blufix: [
    "Two-stage multi-agent AI diagnostic engine",
    "Real-time geospatial provider dispatch radar",
    "Idempotent Stripe Connect & Paystack payouts",
  ],
  "rent-roll": [
    "Automated institutional valuation calculation",
    "State-specific regional market benchmarking",
    "Client-ready PDF valuation report generator",
  ],
  "oroko-community": [
    "Dual-identity (PostgreSQL + Firestore) architecture",
    "Ultra-low latency Agora WebRTC voice/video",
    "Gemini 3.8 Flash multimodal moderation",
  ],
  flinki: [
    "Interactive athlete & club matchmaking",
    "Event scheduling with live RSVP tracking",
    "Peer-to-peer sports equipment marketplace",
  ],
};

const projectPlaceholders: Record<string, ReactNode> = {
  konnectax: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  plugg: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  "nora-ai": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
      <circle cx="7.5" cy="14.5" r="1.5"></circle>
      <circle cx="16.5" cy="14.5" r="1.5"></circle>
    </svg>
  ),
  "diy-marketplace": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  stylaa: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  ),
  groundmetrx: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  blufix: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    </svg>
  ),
  "rent-roll": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  "oroko-community": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  flinki: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  ),
};

const filterTabs: { label: string; value: "All" | ProjectCategory }[] = [
  { label: "All Projects", value: "All" },
  { label: "AI & Systems", value: "AI & Systems" },
  { label: "Mobile & Flutter", value: "Mobile & Flutter" },
  { label: "FinTech & Cloud", value: "FinTech & Cloud" },
];

export default function ProjectShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projects;
    return projects.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: projects.length,
      "AI & Systems": 0,
      "Mobile & Flutter": 0,
      "FinTech & Cloud": 0,
    };
    projects.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Re-bind tilt effect when filtered projects change
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cards = document.querySelectorAll<HTMLElement>(".projects-grid .project-card[data-tilt]");
    const cleanups: Array<() => void> = [];

    cards.forEach((el) => {
      let rotation = { x: 0, y: 0 };
      let translation = { y: 0 };
      let target = { x: 0, y: 0, yTrans: 0 };
      let animationId: number | null = null;
      let isHovering = false;
      const lerpFactor = 0.1;

      const lerp = (start: number, end: number, factor: number) =>
        start + (end - start) * factor;

      const updateTilt = () => {
        rotation.x = lerp(rotation.x, target.x, lerpFactor);
        rotation.y = lerp(rotation.y, target.y, lerpFactor);
        translation.y = lerp(translation.y, target.yTrans, lerpFactor);

        el.style.transform = `perspective(1000px) rotateX(${rotation.x.toFixed(
          2
        )}deg) rotateY(${rotation.y.toFixed(2)}deg) translateY(${translation.y.toFixed(2)}px)`;

        const isSettled =
          Math.abs(target.x - rotation.x) < 0.05 &&
          Math.abs(target.y - rotation.y) < 0.05 &&
          Math.abs(target.yTrans - translation.y) < 0.05;

        if (isHovering || !isSettled) {
          animationId = requestAnimationFrame(updateTilt);
        } else {
          animationId = null;
          if (!isHovering) {
            el.style.transform =
              "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
          }
        }
      };

      const startAnimation = () => {
        if (!animationId) {
          animationId = requestAnimationFrame(updateTilt);
        }
      };

      const handleMouseEnter = () => {
        isHovering = true;
        target.yTrans = -10;
        el.style.transition = "none";
        startAnimation();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        target.x = (y - centerY) / 10;
        target.y = (centerX - x) / 10;
      };

      const handleMouseLeave = () => {
        isHovering = false;
        target = { x: 0, y: 0, yTrans: 0 };
      };

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
        if (animationId) cancelAnimationFrame(animationId);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [filteredProjects]);

  return (
    <div className="project-showcase-container">
      {/* Category filter tabs */}
      <div className="project-filter-bar animate-on-scroll">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              className={`filter-btn ${isActive ? "active" : ""}`}
              onClick={() => setSelectedFilter(tab.value)}
              aria-pressed={isActive}
            >
              <span>{tab.label}</span>
              <span className="filter-count">{categoryCounts[tab.value]}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project: Project) => (
          <article
            key={project.slug}
            className="project-card glass-card animate-on-scroll reveal-card"
            data-tilt="true"
            data-slug={project.slug}
          >
            <div className="project-image">
              {/* Animated gradient mesh background */}
              <div className="project-image-mesh" />
              <div className="project-overlay"></div>

              {/* Live badge if live */}
              {project.isLive && (
                <div className="project-live-badge">
                  <span className="project-live-dot" />
                  <span>Production Live</span>
                </div>
              )}

              {/* Floating icon placeholder */}
              <div className="project-placeholder">
                {projectPlaceholders[project.slug] || (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                )}
              </div>

              {/* Subtitle label at bottom of image */}
              <div className="project-image-label">
                <span className="project-image-label-emoji">{project.emoji}</span>
                <span className="project-image-label-text">{project.subtitle}</span>
              </div>
            </div>

            <div className="project-content">
              {project.metrics && (
                <div className="project-metric-pill">
                  <span>⚡ {project.metrics}</span>
                </div>
              )}

              <div className="project-tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="project-title">
                {project.emoji} {project.title}
              </h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>

              <ul className="project-features">
                {(projectCardFeatures[project.slug] || project.features.flatMap((f) => f.items).slice(0, 3)).map(
                  (feature) => (
                    <li key={feature}>{feature}</li>
                  )
                )}
              </ul>

              <div className="project-links">
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-link project-link--details"
                  title="View Technical Details"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Details
                </Link>

                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--demo"
                    title="Live Endpoint / Demo"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                    <span>Live</span>
                  </a>
                )}

                {project.links.appStore && project.links.appStore !== "#" ? (
                  <a
                    href={project.links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    title="App Store"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"></path>
                      <path d="M12 8v8m-4-4h8"></path>
                    </svg>
                  </a>
                ) : (
                  <span
                    className="project-link project-link--disabled"
                    title="App Store (Enterprise/Production Build)"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"></path>
                      <path d="M12 8v8m-4-4h8"></path>
                    </svg>
                  </span>
                )}

                {project.links.playStore && project.links.playStore !== "#" ? (
                  <a
                    href={project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    title="Google Play"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </a>
                ) : (
                  <span
                    className="project-link project-link--disabled"
                    title="Google Play (Production Release)"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
