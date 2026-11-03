"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Printer, Copy, Check, Download, ExternalLink, Sparkles, Phone, Mail, MapPin } from "lucide-react";

interface RealtimeResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RealtimeResumeModal({ isOpen, onClose }: RealtimeResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Generate dynamic formatted current date when modal opens
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, [isOpen]);

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
Flutter Developer | AI-Powered Application Specialist
Kolkata, India | Phone: +91 6294321171 | Email: subhabratadash1@gmail.com
LinkedIn: https://linkedin.com/in/subhabratadash | GitHub: https://github.com/subhabratadash20 | Portfolio: https://subhabratadash20.github.io

PROFESSIONAL SUMMARY
Results-driven Flutter Developer and AI-Powered Application Specialist with over 3 years of professional experience in mobile application engineering and systems architecture. Specialized in architecting high-performance cross-platform applications, integrating advanced AI models (OpenAI GPT, Gemini 3.8 Flash, Claude, LangGraph), establishing agentic workflows, and implementing complex geolocation/geofencing systems. Proven track record of delivering scalable apps using Flutter, Dart, Firebase, and REST APIs following Clean Architecture principles.

TECHNICAL SKILLS
• Mobile Development: Flutter, Dart, GetX, Provider, RiverPod 3.3, Bloc, Clean Architecture, AutoRoute, GoRouter
• AI & Cloud Technologies: OpenAI GPT & Realtime WebRTC, Gemini 3.8 Flash, Claude, LangGraph, FastAPI, Agentic AI, Prompt Engineering, Google Cloud Run
• Backend & Databases: Firebase, Hive (Local-First), PostgreSQL (Neon / Cloud SQL), MongoDB Atlas, Redis, MySQL, NoSQL, REST APIs, Microservices, Node.js 22 LTS
• Geolocation & Mapping: Google Maps API, Geofencing Radar, Real-Time Asset Tracking, Sub-Meter GPS Telemetry
• Hardware Bridges & Media: iOS AlarmKit & EventKit (DND Bypass), Android AlarmManager Foreground Services, Agora WebRTC, Socket.IO, RTMP Simulcasting (Mux)
• AI IDEs & Developer Tools: Cursor, Antigravity, Windsurf, Claude Code, Git, GitHub, CI/CD, Postman
• Programming Languages: Dart, Python, Java, C, PHP, TypeScript, SQL

PROFESSIONAL EXPERIENCE
Software Developer | Weavers-web Solutions Pvt. Ltd.
January 2023 – Present | Kolkata, India
• Engineered and maintained production-grade cross-platform mobile applications for diverse industry sectors.
• Integrated AI features utilizing OpenAI, Gemini, and LangGraph platforms to deliver intelligent, user-aware capabilities.
• Implemented real-time asset tracking and geofencing capabilities for logistics-focused and on-demand dispatch applications.
• Applied Multi-Threading concepts, isolate concurrency, and state management optimizations, reducing overall application load times by 30%.
• Collaborated closely with UI/UX designers and backend teams to enhance user engagement and interface fluidity (60 FPS GPU rendering).

FEATURED PRODUCTION APPLICATIONS & ARCHITECTURE
1. Nora AI (naipa.ai) — Architect & Lead Developer
• Full-stack autonomous AI assistant built with Flutter, FastAPI, and LangGraph.
• Features LangGraph supervisor intent router (graph_routing.py) with dynamic tool palette pruning to minimize latency and token bloat.
• Built native OS hardware bridges (iOS AlarmKit for DND bypass, Android AlarmManager exact alarms) and duplex Socket.IO streaming.
• Dual-database persistence: PostgreSQL (Neon) for LangGraph checkpoints and MongoDB Atlas for user data.

2. BluFix AI (ai.blufix) — Smart Home AI Diagnostics & Dispatch (App Store & Play Store)
• Engineered two-stage multimodal diagnostic pipeline analyzing photo and acoustic spectrograms to classify HVAC/appliance faults.
• Architected real-time Provider Radar matching certified technicians via live GPS proximity algorithms and Firestore event streams.
• Implemented Node.js 22 LTS microservices with Redis concurrency locks and idempotent Stripe Connect split payouts.

3. Etana Oroko (com.etanaoroko.app / myetana.com) — Dual-Layer Social RTC (App Store & Play Store)
• Dual-identity architecture: Firebase Data Connect (Cloud SQL PostgreSQL) for relational operations + Firestore for real-time presence.
• Built Agora WebRTC multi-party voice/video rooms with dynamic token rotation and low-latency broadcast overlays.
• Implemented Gemini 3.8 Flash automated content moderation and vector-based community recommendation engine.

4. Rent Roll Pulse (com.rentroll.app) — Real Estate Valuation FinTech (App Store & Play Store)
• Developed automated valuation recalculation engine executing Annual Management Income (AMI) and AAMI multiplier formulas.
• Created instantaneous, high-DPI vector PDF financial audit report generator with custom financial charts directly on device.

5. Konnectax (com.konnectax.app) — Multi-Platform RTMP Simulcasting (App Store & Play Store)
• Engineered simultaneous live broadcasting to YouTube, Facebook, and TikTok from a single mobile feed via Mux.
• Built unified cross-platform live comments overlay consolidating YouTube Live Chat and Facebook Comments.

6. Plugg AI (plugg.social) — Lead Mobile Developer
• Engineered an AI-driven social networking and dating platform leveraging Clean Architecture, Get-it (DI), Hive (Local-First), and GetX.
• Integrated Socket.IO real-time chat, AI compatibility matchmaking algorithms, and RevenueCat in-app subscriptions.

7. Stylaa — Mobile App Developer
• Developed a dual-platform scheduling system for customers and business owners featuring real-time appointment booking and payment gateway integrations.
• Enhanced user retention through AI-driven service recommendations and live calendar availability tracking.

8. Flinki — Mobile App Developer
• Built a sports social media platform and marketplace enabling direct athlete matchmaking, tournament RSVP scheduling, team chats, and safe P2P gear trade.

9. Groundmetrx — Mobile App Developer
• Implemented real-time fleet and asset tracking using polygon geofencing technology and Google Maps API route optimization with offline synchronization.

10. Additional Commercial Applications:
• DIY Marketplace: Bilingual Arabic/English RTL mobile marketplace connecting crafters with buyers via Moyasar payments.
• Family Bond: Private family connection app with encrypted group messaging and AI recommendations.
• TradeMaza: Educational stock trading platform featuring real-time market data feeds and interactive modules.
• MOTQAN / Time Piece Gentleman: E-commerce platform for luxury watch retail with real-time inventory management.

EDUCATION
• M.C.A. (Master of Computer Applications) — Swami Vivekananda University (SVU) | 2026 | Completed
• B.C.A. (Bachelor of Computer Applications) — Contai College of Learning & Management Science (MAKAUT) | 2023 | 8.99 CGPA
• Higher Secondary (10+2 Science) — Kishorenagar Sachindra Sikhyasadan (WBCHSE) | 2020 | 81.0%
• Secondary Examination (10th) — Kishorenagar Sachindra Sikhyasadan (WBBSE) | 2018 | 86.0%

PERSONAL DETAILS
• Father's Name: Rajat Kanti Das
• Date of Birth: October 23, 2002
• Gender: Male | Nationality: Indian
• Languages Known: Bengali (Native/Fluent), English (Read, Write, Speak), Hindi (Read, Speak)

DECLARATION
I hereby declare that all the information provided above is true and authentic to the best of my knowledge and belief.
Date: ${currentDate || "Current Date"} | Place: Kolkata, India
Signature: Subhabrata Das`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-[#0c0d14] border border-[#00D9FF]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#121320] no-print shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-black font-bold text-sm shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Official ATS Resume Preview
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Signed & Verified
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-400">Generated dynamically • Updated with production projects & Weavers-web experience</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-semibold text-xs hover:bg-[#00D9FF]/90 transition cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition cursor-pointer"
              title="Copy plaintext to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Text"}</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="overflow-y-auto p-5 sm:p-10 space-y-5 sm:space-y-6 printable-resume bg-[#0d0e17] text-gray-200">
          {/* Header */}
          <div className="border-b border-white/15 pb-5 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SUBHABRATA DAS</h1>
            <p className="text-sm sm:text-base font-semibold text-[#00D9FF] mt-1">
              Flutter Developer | AI-Powered Application Specialist
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-y-1.5 gap-x-4 mt-2.5 text-xs text-gray-300">
              <span className="flex items-center gap-1 text-gray-300">
                <MapPin size={12} className="text-[#00D9FF]" /> Kolkata, India
              </span>
              <span>•</span>
              <a href="tel:+916294321171" className="flex items-center gap-1 text-gray-300 hover:text-[#00D9FF]">
                <Phone size={12} className="text-[#00D9FF]" /> +91 6294321171
              </a>
              <span>•</span>
              <a href="mailto:subhabratadash1@gmail.com" className="flex items-center gap-1 text-gray-300 hover:text-[#00D9FF]">
                <Mail size={12} className="text-[#00D9FF]" /> subhabratadash1@gmail.com
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

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Results-driven <strong>Flutter Developer and AI-Powered Application Specialist</strong> with over <strong>3 years</strong> of professional experience in mobile application engineering and distributed systems. Specialized in architecting high-performance cross-platform applications, integrating advanced AI models (OpenAI GPT, Gemini 3.8 Flash, Claude, LangGraph), establishing autonomous agentic workflows, and implementing complex geolocation/geofencing systems. Proven track record of delivering scalable apps using Flutter, Dart 3, Node.js 22 LTS, PostgreSQL, and Firebase following Clean Architecture principles.
            </p>
          </div>

          {/* Technical Skills Matrix */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Mobile Development & Architecture</span>
                <span className="text-gray-300">Flutter, Dart 3 (Sealed Classes, Records, Pattern Matching), GetX, Provider, RiverPod 3.3, Bloc, Clean Architecture, AutoRoute, GoRouter.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">AI & Agentic Frameworks</span>
                <span className="text-gray-300">OpenAI GPT & Realtime WebRTC, Gemini 3.8 Flash, Claude, LangGraph Supervisor Routing, Planned Tool Palettes, FastAPI, Prompt Engineering.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Backend, Microservices & Databases</span>
                <span className="text-gray-300">Node.js 22 LTS, FastAPI (Python), PostgreSQL (Neon, Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, MongoDB Atlas, Redis, Hive (Local-First).</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Geolocation, Mapping & Hardware Bridges</span>
                <span className="text-gray-300">Google Maps API, Geofencing Radar, Real-Time Asset Tracking, iOS AlarmKit & EventKit (DND Bypass), Android AlarmManager Foreground Services.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Media Streaming & Monetization</span>
                <span className="text-gray-300">Agora WebRTC (Live Broadcast & RTC Rooms), Socket.IO Duplex, Mux RTMP Simulcast, Stripe Connect (Split Payouts), Paystack, RevenueCat.</span>
              </div>
              <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Tools & Programming Languages</span>
                <span className="text-gray-300">Cursor, Antigravity, Windsurf, Claude Code, Git, GitHub, CI/CD, Postman. Languages: Dart, Python, Java, C, PHP, TypeScript, SQL.</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2.5">
              Professional Experience
            </h3>
            <div className="bg-white/[0.02] border-l-2 border-[#00D9FF] p-3 rounded-r-lg space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div>
                  <h4 className="font-bold text-white text-sm">Software Developer</h4>
                  <p className="text-xs text-[#00D9FF] font-semibold">Weavers-web Solutions Pvt. Ltd.</p>
                </div>
                <span className="text-xs font-mono text-gray-400">January 2023 – Present | Kolkata, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs mt-1">
                <li>Engineered and maintained production-grade cross-platform mobile applications for diverse industry sectors and international clients.</li>
                <li>Integrated generative AI features utilizing OpenAI, Gemini, and LangGraph platforms to deliver intelligent, user-aware capabilities.</li>
                <li>Implemented real-time asset tracking and geofencing capabilities for logistics-focused and on-demand dispatch applications.</li>
                <li>Applied Multi-Threading isolate concepts, memory profiling, and state management optimizations, reducing overall application load times by 30%.</li>
                <li>Collaborated closely with UI/UX designers and full-stack teams to enhance user engagement and achieve 60 FPS GPU frame stability.</li>
              </ul>
            </div>
          </div>

          {/* Featured Production Applications */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-3">
              Key Production Applications Portfolio
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm">
              {/* Nora AI */}
              <div className="border-l-2 border-[#00D9FF] pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Nora AI (naipa.ai) — Architect & Lead Developer</h4>
                  <span className="text-xs font-mono text-[#00D9FF]">Flutter • LangGraph • FastAPI • AlarmKit</span>
                </div>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300 text-xs">
                  <li>Built a full-stack personal AI assistant utilizing Flutter, FastAPI, and OpenAI GPT models with Socket.IO streaming.</li>
                  <li>Orchestrated LangGraph supervisor routing (`graph_routing.py`) with dynamic tool palette pruning to minimize latency and token bloat.</li>
                  <li>Engineered native OS hardware bridges (iOS AlarmKit for DND bypass, Android AlarmManager exact alarms, and foreground services).</li>
                  <li>Dual-database persistence: PostgreSQL (Neon) for LangGraph state checkpoints and MongoDB Atlas for user data via Beanie ODM.</li>
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
                  <li>Built Agora WebRTC multi-party voice/video rooms with dynamic token rotation and low-latency broadcast overlays.</li>
                  <li>Implemented Gemini 3.8 Flash automated content moderation, AI writing assistant, and vector-based community recommendation feed.</li>
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

              {/* Plugg AI & Other Apps */}
              <div className="border-l-2 border-pink-400 pl-3 py-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">Plugg AI (plugg.social) — Lead Mobile Developer</h4>
                  <span className="text-xs font-mono text-pink-400">Clean Architecture • GetX • Hive • Socket.IO</span>
                </div>
                <p className="text-gray-300 text-xs mt-1">
                  Engineered an AI-driven social and dating app with Get-it DI, Hive local-first storage, Socket.IO rich chat, smart compatibility scoring, and RevenueCat in-app subscriptions.
                </p>
              </div>

              {/* Additional Commercial Projects */}
              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5 text-xs text-gray-300 space-y-1">
                <span className="font-semibold text-white block">Additional Shipped Commercial Applications:</span>
                <p>• <strong>Stylaa</strong>: Dual-platform salon booking system with live calendar availability and AI beauty suggestions.</p>
                <p>• <strong>Flinki</strong>: Sports community platform with athlete matchmaking, tournament RSVP tracking, P2P equipment marketplace, and in-app video player.</p>
                <p>• <strong>Groundmetrx</strong>: Enterprise fleet tracking platform using polygon geofencing radar, Google Maps API, and offline sync.</p>
                <p>• <strong>DIY Marketplace</strong>: Bilingual Arabic/English RTL handmade goods commerce platform with Moyasar payments.</p>
                <p>• <strong>Family Bond</strong>: Private family connection app with encrypted group messaging and AI recommendations.</p>
                <p>• <strong>TradeMaza</strong>: Educational stock trading platform featuring real-time market data feeds and interactive modules.</p>
                <p>• <strong>MOTQAN / Time Piece Gentleman</strong>: Luxury watch retail e-commerce platform with inventory management.</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Education & Academic Credentials
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">M.C.A. (Master of Computer Applications)</h4>
                  <p className="text-gray-400 text-[11px]">Swami Vivekananda University (SVU)</p>
                </div>
                <span className="font-mono text-[#00D9FF] font-semibold text-xs bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/30">
                  2026 | Completed
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">B.C.A. (Bachelor of Computer Applications)</h4>
                  <p className="text-gray-400 text-[11px]">Contai College of Learning & Management Science (MAKAUT)</p>
                </div>
                <span className="font-mono text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  2023 | 8.99 CGPA
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">Higher Secondary (10+2 Science)</h4>
                  <p className="text-gray-400 text-[11px]">Kishorenagar Sachindra Sikhyasadan (WBCHSE)</p>
                </div>
                <span className="font-mono text-gray-300 font-medium text-xs bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  2020 | 81.0%
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">Secondary Examination (10th)</h4>
                  <p className="text-gray-400 text-[11px]">Kishorenagar Sachindra Sikhyasadan (WBBSE)</p>
                </div>
                <span className="font-mono text-gray-300 font-medium text-xs bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  2018 | 86.0%
                </span>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10 pb-1 mb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Father&apos;s Name</span>
                <span className="font-medium text-white">Rajat Kanti Das</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Date of Birth</span>
                <span className="font-medium text-white">October 23, 2002</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Nationality & Gender</span>
                <span className="font-medium text-white">Indian • Male</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Languages Known</span>
                <span className="font-medium text-white">Bengali, English, Hindi</span>
              </div>
            </div>
          </div>

          {/* Declaration & Signature Block */}
          <div className="border-t border-white/15 pt-4 mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Declaration
            </h3>
            <p className="text-xs text-gray-400 italic mb-4">
              I hereby declare that all the information provided above is true and authentic to the best of my knowledge and belief.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-gray-500">Date: </span>
                  <span className="text-white font-mono font-semibold">{currentDate || "Current Date"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Place: </span>
                  <span className="text-white font-semibold">Kolkata, India</span>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end">
                {/* Authentic Signature Box */}
                <div className="bg-white/95 p-1.5 rounded-lg shadow-md border border-white/20 mb-1.5 signature-box">
                  <Image
                    src="/signature.png"
                    alt="Subhabrata Das Signature"
                    width={220}
                    height={50}
                    className="h-10 w-auto object-contain signature-img"
                    priority
                  />
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-xs font-bold text-white block">SUBHABRATA DAS</span>
                  <span className="text-[10px] text-gray-400">Authorized Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/10 bg-[#121320] text-xs text-gray-400 no-print shrink-0">
          <span className="truncate">Official ATS Document • Generated: {currentDate || "Today"}</span>
          <button
            onClick={handlePrint}
            type="button"
            className="text-[#00D9FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer shrink-0 ml-2"
          >
            <Download size={13} />
            Download Printable PDF
          </button>
        </div>
      </div>
    </div>
  );
}
