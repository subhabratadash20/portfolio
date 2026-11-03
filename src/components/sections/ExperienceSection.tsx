"use client";

import { useEffect, useRef, useState } from "react";

const PulseRings = () => (
  <><div className="timeline-pulse-ring" /><div className="timeline-pulse-ring" /></>
);

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const conduitRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNodes, setActiveNodes] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !conduitRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(Math.max((winH * 0.75 - rect.top) / (rect.height + winH * 0.2), 0), 1);
      const conduitPx = progress * rect.height;
      conduitRef.current.style.height = `${conduitPx}px`;

      const newActive: { [key: number]: boolean } = {};
      markerRefs.current.forEach((marker, idx) => {
        newActive[idx] = marker ? conduitPx >= marker.offsetTop + marker.offsetHeight * 0.5 : false;
      });
      setActiveNodes(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="section experience" id="experience" ref={containerRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">02.</span>
          Experience &amp; Education
        </h2>
        <div className="timeline animate-on-scroll" ref={timelineRef} style={{ position: "relative" }}>
          <div className="timeline-laser-conduit" ref={conduitRef} />

          {/* 1. Software Developer at Weavers-web */}
          <div className="timeline-item animate-on-scroll timeline-branch-left">
            <div className="timeline-marker" ref={(el) => { markerRefs.current[0] = el; }} style={{ position: "relative" }}>
              {activeNodes[0] && <PulseRings />}
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <h3>Software Developer</h3>
                <span className="timeline-company">Weavers-web Solutions Pvt. Ltd.</span>
              </div>
              <div className="timeline-meta">
                <span className="timeline-date">January 2023 – Present</span>
                <span className="timeline-location">Kolkata, India</span>
              </div>
              <ul className="timeline-details">
                <li>Development and maintenance of Flutter applications across diverse industry sectors</li>
                <li>Integrated AI-powered features utilizing OpenAI and Gemini platforms</li>
                <li>Implemented sophisticated geofencing solutions for logistics-focused applications</li>
                <li>Optimized app performance using Multi-Threading and Dart 3 Isolate concurrency</li>
                <li>Collaborated with UI/UX designers to enhance user engagement</li>
              </ul>
            </div>
          </div>

          {/* 2. M.C.A. (Master of Computer Applications) - 2024-2026 */}
          <div className="timeline-item animate-on-scroll timeline-branch-right">
            <div className="timeline-marker education" ref={(el) => { markerRefs.current[1] = el; }} style={{ position: "relative" }}>
              {activeNodes[1] && <PulseRings />}
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <h3>M.C.A. (Master of Computer Applications)</h3>
                <span className="timeline-company">Swami Vivekananda University</span>
              </div>
              <div className="timeline-meta">
                <span className="timeline-date">2024 – 2026 (Active)</span>
                <span className="timeline-badge" style={{ background: "rgba(168, 85, 247, 0.2)", borderColor: "rgba(168, 85, 247, 0.4)", color: "#C084FC" }}>
                  Postgraduate Degree
                </span>
              </div>
              <ul className="timeline-details">
                <li>Advanced software architecture, distributed databases, cloud systems, and AI/ML foundations</li>
              </ul>
            </div>
          </div>

          {/* 3. B.C.A. (Bachelor of Computer Applications) - 2023 */}
          <div className="timeline-item animate-on-scroll timeline-branch-left">
            <div className="timeline-marker education" ref={(el) => { markerRefs.current[2] = el; }} style={{ position: "relative" }}>
              {activeNodes[2] && <PulseRings />}
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <h3>B.C.A. (Bachelor of Computer Applications)</h3>
                <span className="timeline-company">Contai College of Learning &amp; Management Science</span>
              </div>
              <div className="timeline-meta">
                <span className="timeline-date">Graduated 2023</span>
                <span className="timeline-badge">8.99 CGPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
