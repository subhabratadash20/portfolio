"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top of the page
      if (currentScrollY < 80) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Only update if mobile menu is closed
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current) {
          setVisible(false); // Scrolling down -> hide
        } else {
          setVisible(true); // Scrolling up -> show
        }
      }
      lastScrollY.current = currentScrollY;

      // Sonic Lamb Scroll Synchronization for 4-Mode Telemetry Dial
      if (currentScrollY < 180) {
        setActiveMode(0);
      } else {
        const archSections = [
          { mode: 3, id: "experience" },
          { mode: 0, id: "skills" },
          { mode: 1, id: "architecture" },
          { mode: 2, id: "cockpit" },
        ];
        for (const sec of archSections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 350 && rect.bottom >= 100) {
              setActiveMode(sec.mode);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Force navbar visible when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setVisible(true);
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleModeClick = (mode: number, targetId: string) => {
    setActiveMode(mode);
    const el = document.querySelector(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 80;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile menu backdrop */}
      <div
        className={`nav-backdrop ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Main navigation */}
      <nav
        className="nav"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="nav-container">
          <Link href="#hero" className="nav-logo flex items-center gap-3">
            <div
              className="relative flex items-center justify-center shrink-0"
              style={{ width: "40px", height: "40px" }}
            >
              <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full animate-pulse" />
              <img
                src="/logo.png"
                alt="SD Logo"
                className="relative w-full h-full object-contain rounded-lg"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <span className="hidden sm:inline-block">
              <span className="logo-bracket">&lt;</span>SD
              <span className="logo-bracket">/&gt;</span>
            </span>
          </Link>

          {/* 4-Mode Engineering Telemetry Dial (Sonic Lamb Multimode Dial) */}
          <div className="telemetry-dial-container" title="4-Mode Architectural Telemetry Dial">
            <div
              className="telemetry-rotary-dial"
              style={{ transform: `rotate(${activeMode * 90}deg)` }}
              onClick={() => {
                const nextMode = (activeMode + 1) % 4;
                const targets = ["#skills", "#architecture", "#cockpit", "#experience"];
                handleModeClick(nextMode, targets[nextMode]);
              }}
              title="Click dial to rotate architectural mode"
            >
              <div className="telemetry-dial-notch" />
            </div>
            <div className="telemetry-dial-modes">
              <button
                type="button"
                className={`telemetry-mode-pill ${activeMode === 0 ? "active-mode-1" : ""}`}
                onClick={() => handleModeClick(0, "#skills")}
                title="Mode 01: Flutter 60-120 FPS UI, Custom Renderers, Local-First DB"
              >
                01 // FLUTTER
              </button>
              <button
                type="button"
                className={`telemetry-mode-pill ${activeMode === 1 ? "active-mode-2" : ""}`}
                onClick={() => handleModeClick(1, "#architecture")}
                title="Mode 02: Python Agentic AI, Multi-Agent Supervisors, WebRTC Voice"
              >
                02 // AGENTIC AI
              </button>
              <button
                type="button"
                className={`telemetry-mode-pill ${activeMode === 2 ? "active-mode-3" : ""}`}
                onClick={() => handleModeClick(2, "#cockpit")}
                title="Mode 03: Node.js 22 LTS, Neon PostgreSQL, Idempotent Stripe APIs"
              >
                03 // NODE.JS 22
              </button>
              <button
                type="button"
                className={`telemetry-mode-pill ${activeMode === 3 ? "active-mode-4" : ""}`}
                onClick={() => handleModeClick(3, "#experience")}
                title="Mode 04: Bare-Metal & Telemetry, iOS AlarmKit DND bypass, Agora RTC"
              >
                04 // BARE-METAL
              </button>
            </div>
          </div>

          <button
            className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span
              style={{
                transform: isMobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span
              style={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <li><Link href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li><Link href="#experience" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experience</Link></li>
            <li><Link href="#skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link></li>
            <li><Link href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
            <li><Link href="#architecture" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Architecture</Link></li>
            <li><Link href="#cockpit" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Console</Link></li>
            <li><Link href="#contact" className="nav-link nav-link--cta" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}
