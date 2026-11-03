"use client";

import { useEffect, useState } from "react";
import { X, Printer, Copy, Check, Download, ExternalLink, Sparkles } from "lucide-react";

interface RealtimeResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RealtimeResumeModal({ isOpen, onClose }: RealtimeResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const resumeText = `SUBHABRATA DAS
Senior Flutter Developer & AI-Powered Systems Architect
Kolkata, India | subhabratadash1@gmail.com
LinkedIn: https://linkedin.com/in/subhabratadash | GitHub: https://github.com/subhabratadash20 | Portfolio: https://subhabratadash20.github.io

PROFESSIONAL SUMMARY
Senior Mobile & AI Systems Architect with 3+ years of production experience architecting high-throughput Flutter applications, LangGraph multi-agent orchestration frameworks, and real-time distributed backends. Pioneer of native hardware bridge protocols (iOS AlarmKit, Android AlarmManager) and dual-identity database infrastructures (Firebase Data Connect PostgreSQL + Cloud Firestore RTC). Published author of multiple commercial apps across Google Play Store and Apple App Store.

TECHNICAL COMPETENCIES
• Mobile Frontend: Flutter 3.11+, Dart 3 (Sealed Classes, Records, Pattern Matching), Riverpod 3.3, GetX, AutoRoute, GoRouter, Custom Render Objects.
• AI & Multi-Agent Frameworks: LangGraph Supervisor Agents, Tool-Palette Routing, OpenAI SDK, Gemini 3.8 Flash, Tavily Search, Python FastAPI.
• Backend & Cloud: Node.js 22 LTS, Express 5, TypeScript 5.9, Docker, Google Cloud Run, Cloudflare Workers, Firebase Cloud Functions.
• Databases & Caching: PostgreSQL (Neon, Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, Redis (Geospatial/Rate-limiting), MongoDB Atlas.
• Hardware Bridges & Real-Time: iOS AlarmKit & EventKit, Android AlarmManager & Wake-Lock Services, Agora WebRTC, Socket.IO, RTMP Simulcasting (Mux).
• Payments & Security: Stripe Connect (Idempotent Split Payouts), Paystack, RevenueCat, Moyasar, OAuth 2.0.

PRODUCTION APPLICATIONS & ARCHITECTURAL HIGHLIGHTS
1. Nora AI (naipa.ai) - Autonomous Executive Assistant Ecosystem
• Architected LangGraph supervisor router classifying user intents into structured tasks and dynamic tool palettes.
• Built native OS hardware bridges (iOS AlarmKit for DND bypass, Android AlarmManager foreground services).
• Implemented duplex Socket.IO + FastAPI handshake for sub-second token streaming and ElevenLabs emotive voice synthesis.
• Deployed dual-database state engine: PostgreSQL (Neon) for LangGraph checkpoints and MongoDB Atlas for user data.

2. BluFix AI (ai.blufix) - On-Demand AI Diagnostics & Dispatch (App Store & Play Store)
• Engineered two-stage multi-agent diagnostic pipeline analyzing photo and acoustic spectrogram inputs to diagnose appliance failures.
• Built real-time Provider Radar dispatch engine calculating GPS proximity with live Firestore event streaming.
• Integrated Node.js 22 LTS backend with Redis locking and idempotent Stripe Connect split payouts for technician wallets.

3. Etana Oroko (com.etanaoroko.app / myetana.com) - Dual-Layer Social RTC Platform (App Store & Play Store)
• Designed dual-identity architecture: Firebase Data Connect (managed PostgreSQL) for relational operations and Cloud Firestore for real-time presence.
• Integrated low-latency Agora WebRTC engine for multi-party live video broadcasts and dynamic token rotations.
• Built Gemini 3.8 Flash multimodal content moderation and vector-based community recommendation feed.

4. Rent Roll Pulse (com.rentroll.app) - Commercial Real Estate Valuation Engine (App Store & Play Store)
• Developed automated valuation recalculation engine executing AAMI and AMI multiplier formulas.
• Created instantaneous, high-DPI vector PDF financial audit report generator with custom financial charts.
• Managed reactive state pipeline with GetX and integrated Stripe subscription tiering.

5. Konnectax (com.konnectax.app) - Multi-Platform Live Streaming SaaS (App Store & Play Store)
• Engineered simultaneous RTMP live streaming to YouTube, Facebook, and TikTok from a single mobile camera feed via Mux.
• Built unified cross-platform live comments overlay consolidating YouTube Live Chat and Facebook Comments.

Additional Production Apps: Plugg (AI Matchmaking), Flinki (Sports Q-Commerce & Video), Stylaa (Salon Booking), Groundmetrx (LiDAR Fleet Tracking), DIY Marketplace (Bilingual Arabic RTL Marketplace).

EDUCATION
Bachelor of Computer Applications (BCA) — CGPA: 8.99 / 10.0 (2020 – 2023)`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0d14] border border-[#00D9FF]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121320] no-print">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-black font-bold text-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Realtime ATS Resume Preview
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Data
                </span>
              </h2>
              <p className="text-xs text-gray-400">Generated dynamically from Subhabrata&apos;s verified production achievements</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-semibold text-xs hover:bg-[#00D9FF]/90 transition"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
              title="Copy plaintext to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Text"}</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 printable-resume bg-[#0d0e17] text-gray-200">
          {/* Header */}
          <div className="border-b border-white/15 pb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SUBHABRATA DAS</h1>
            <p className="text-sm sm:text-base font-semibold text-[#00D9FF] mt-1">
              Senior Flutter Developer & AI-Powered Systems Architect
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-y-1 gap-x-4 mt-2 text-xs text-gray-400">
              <span>📍 Kolkata, India (Open to Remote Worldwide)</span>
              <span>•</span>
              <a href="mailto:subhabratadash1@gmail.com" className="text-gray-300 hover:text-[#00D9FF] underline">
                subhabratadash1@gmail.com
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/subhabratadash" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00D9FF] underline flex items-center gap-1">
                LinkedIn <ExternalLink size={10} />
              </a>
              <span>•</span>
              <a href="https://github.com/subhabratadash20" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00D9FF] underline flex items-center gap-1">
                GitHub <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Senior Mobile & AI Systems Architect with <strong>3+ years</strong> of verified production experience architecting high-throughput Flutter applications, LangGraph multi-agent orchestration backends, and real-time distributed microservices. Pioneer of native mobile OS hardware bridges (iOS AlarmKit for DND bypass, Android AlarmManager foreground services) and dual-identity database infrastructures (Firebase Data Connect PostgreSQL + Cloud Firestore RTC). Published architect of multiple commercial mobile platforms deployed on the Apple App Store and Google Play Store.
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Mobile Architecture & Frontend</span>
                <span className="text-gray-400">Flutter 3.11+, Dart 3 (Sealed Classes, Pattern Matching), Riverpod 3.3, GetX, AutoRoute, GoRouter, Custom Painters.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">AI & Multi-Agent Frameworks</span>
                <span className="text-gray-400">LangGraph Supervisor Routing, Planned Tool Palettes, OpenAI SDK, Gemini 3.8 Flash, Tavily Search, Python FastAPI.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Backend & Cloud Microservices</span>
                <span className="text-gray-400">Node.js 22 LTS, Express 5, TypeScript 5.9, Docker, Google Cloud Run, Cloudflare Workers, Cloud Functions.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Databases & Checkpoint Persistence</span>
                <span className="text-gray-400">PostgreSQL (Neon, Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, Redis (Geospatial/Rate-limits), MongoDB Atlas.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Hardware Bridges & Real-Time RTC</span>
                <span className="text-gray-400">iOS AlarmKit & EventKit, Android AlarmManager Wake-Lock Services, Agora WebRTC, Socket.IO Duplex, Mux RTMP.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Monetization & Security</span>
                <span className="text-gray-400">Stripe Connect (Idempotent Split Payouts), Paystack, RevenueCat In-App Purchases, Moyasar, OAuth 2.0.</span>
              </div>
            </div>
          </div>

          {/* Production Engineering Experience */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-3">
              Production Applications & Architecture Portfolio
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Nora AI */}
              <div className="border-l-2 border-[#00D9FF] pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Nora AI (naipa.ai) — Autonomous Agentic Assistant</h4>
                  <span className="text-xs font-mono text-[#00D9FF]">Flutter • LangGraph • FastAPI • AlarmKit</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Orchestrated LangGraph supervisor routing (`graph_routing.py`) with dynamic tool palette pruning to minimize token overhead.</li>
                  <li>Engineered native mobile hardware bridges (iOS AlarmKit for critical DND bypass and Android AlarmManager wake-locks).</li>
                  <li>Built high-throughput Socket.IO duplex handshake with FastAPI for sub-second token streaming and ElevenLabs voice design.</li>
                  <li>Constructed dual-persistence layer using PostgreSQL (Neon) for LangGraph state checkpointing alongside MongoDB Atlas.</li>
                </ul>
              </div>

              {/* BluFix AI */}
              <div className="border-l-2 border-[#7C3AED] pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">BluFix AI (ai.blufix) — Smart Home AI Diagnostics & Dispatch</h4>
                  <span className="text-xs font-mono text-purple-400">Play Store & App Store • Node 22 • Redis</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Engineered two-stage multimodal diagnostic pipeline analyzing photo and acoustic spectrograms to classify HVAC/appliance faults.</li>
                  <li>Architected real-time Provider Radar matching certified technicians via GPS proximity algorithms and live Firestore events.</li>
                  <li>Implemented Node.js 22 LTS microservices with Redis concurrency locks and idempotent Stripe Connect split payouts.</li>
                </ul>
              </div>

              {/* Etana Oroko */}
              <div className="border-l-2 border-[#00D9FF] pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Etana Oroko (com.etanaoroko.app / myetana.com) — Dual-Layer Social RTC</h4>
                  <span className="text-xs font-mono text-[#00D9FF]">Play Store & App Store • PostgreSQL • Agora RTC</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Pioneered dual-identity architecture: Firebase Data Connect (Cloud SQL PostgreSQL) for relational operations + Firestore for RTC.</li>
                  <li>Built Agora WebRTC multi-party voice/video rooms with dynamic token rotation and low latency broadcast overlays.</li>
                  <li>Implemented Gemini 3.8 Flash automated content moderation and vector-based community recommendation engine.</li>
                </ul>
              </div>

              {/* Rent Roll Pulse */}
              <div className="border-l-2 border-emerald-400 pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Rent Roll Pulse (com.rentroll.app) — Real Estate Valuation FinTech</h4>
                  <span className="text-xs font-mono text-emerald-400">App Store & Play Store • GetX • PDF Engine</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Built financial valuation recalculation engine computing Annual Management Income (AMI) and AAMI multipliers.</li>
                  <li>Created dynamic client-facing vector PDF financial audit generator rendering institutional charts directly on device.</li>
                </ul>
              </div>

              {/* Konnectax */}
              <div className="border-l-2 border-amber-400 pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Konnectax (com.konnectax.app) — Multi-Platform RTMP Simulcasting</h4>
                  <span className="text-xs font-mono text-amber-400">App Store & Play Store • Mux • RTMP</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Engineered simultaneous live broadcasting to YouTube, Facebook, and TikTok from a single mobile feed via Mux.</li>
                  <li>Built unified live comments overlay consolidating YouTube Live Chat and Facebook Comments in real time.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Education
            </h3>
            <div className="flex justify-between items-start text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-white">Bachelor of Computer Applications (BCA)</h4>
                <p className="text-gray-400 text-xs">Graduated with High Academic Honors • 2020 – 2023</p>
              </div>
              <span className="font-mono text-[#00D9FF] font-semibold text-xs bg-[#00D9FF]/10 px-2.5 py-1 rounded-md border border-[#00D9FF]/30">
                CGPA: 8.99 / 10.0
              </span>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-[#121320] text-xs text-gray-400 no-print">
          <span>Official ATS-Optimized Document • Ready for direct recruiter import</span>
          <button
            onClick={handlePrint}
            type="button"
            className="text-[#00D9FF] hover:underline flex items-center gap-1 font-semibold"
          >
            <Download size={13} />
            Download Printable PDF
          </button>
        </div>
      </div>
    </div>
  );
}
