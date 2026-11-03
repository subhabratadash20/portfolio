"use client";

import { useState } from "react";
import { Server, Smartphone, Cpu, Shield, ArrowRight, Zap, RefreshCw } from "lucide-react";

type ArchitectureFlow = {
  id: string;
  name: string;
  badge: string;
  description: string;
  layers: Array<{
    name: string;
    tech: string;
    detail: string;
  }>;
};

const flows: ArchitectureFlow[] = [
  {
    id: "ai-diagnostics",
    name: "BluFix: Multi-Agent AI Dispatch",
    badge: "AI & Microservices",
    description: "Two-stage multi-agent diagnostic pipeline analyzing photo/audio equipment failures and dispatching closest certified technicians with live radar telemetry.",
    layers: [
      { name: "Client Layer", tech: "Flutter 3.11 + Riverpod", detail: "Zero-jank UI, live GPS streaming, radar canvas rendering" },
      { name: "Orchestration API", tech: "Node.js 22 + Redis", detail: "Rate limiting, WebSocket channels, idempotent Stripe webhook handling" },
      { name: "AI Inference Engine", tech: "OpenAI + Multi-Agent LLMs", detail: "Audio spectrogram analysis, visual defect classification, cost modeling" },
      { name: "Database & Payouts", tech: "PostgreSQL + Stripe Connect", detail: "ACID transactions, contractor split payouts, audit logging" },
    ],
  },
  {
    id: "dual-layer-community",
    name: "Etana Oroko: Dual-Identity Social RTC",
    badge: "Full-Stack & WebRTC",
    description: "Hybrid data architecture marrying PostgreSQL relational graph integrity with Firestore sub-second presence and Agora WebRTC live broadcasting.",
    layers: [
      { name: "Mobile Client", tech: "Flutter + GoRouter", detail: "Deep linking, media pipelining, Agora RTC video surfaces" },
      { name: "Relational Core", tech: "Firebase Data Connect (PostgreSQL)", detail: "Multi-table joins, follower graphs, clubs, campaigns" },
      { name: "Real-Time Bus", tech: "Cloud Firestore + Cloud Functions", detail: "Sub-millisecond presence, live typing indicators, room negotiation" },
      { name: "AI Assistant", tech: "Gemini 3.8 Flash", detail: "Context-aware post formatting and automated community safety checks" },
    ],
  },
  {
    id: "fintech-valuation",
    name: "Rent Roll Pulse: Institutional Valuation",
    badge: "FinTech & Algorithms",
    description: "Real-time multifamily and commercial property valuation recalculator running AAMI and AMI financial algorithms with instantaneous PDF generation.",
    layers: [
      { name: "Financial Dashboard", tech: "Flutter + GetX", detail: "Radial condition health scorecards and target forecast graphing" },
      { name: "Analytical Engine", tech: "Dart Numerical Modules", detail: "Cap rate sensitivity, NOI indexing, regional market comparisons" },
      { name: "Document Compiler", tech: "High-DPI PDF Vector Pipeline", detail: "Instantaneous lender-ready PDF financial report exports" },
      { name: "Enterprise Auth", tech: "Firebase + Stripe Billing", detail: "Tiered subscription entitlements and encrypted tenant data storage" },
    ],
  },
];

export default function InteractiveSystemArchitecture() {
  const [selectedFlowId, setSelectedFlowId] = useState(flows[0].id);
  const [activeStep, setActiveStep] = useState(0);

  const activeFlow = flows.find((f) => f.id === selectedFlowId) || flows[0];

  return (
    <section className="section architecture-interactive-section" id="architecture">
      <div className="container">
        <div className="arch-header">
          <div className="cockpit-pill">
            <Zap size={13} className="text-accent" />
            <span>INTERACTIVE SYSTEM DESIGN EXPLORER</span>
          </div>
          <h2 className="arch-title">
            Enterprise Architecture & <span className="text-gradient">Data Flow Diagrams</span>
          </h2>
          <p className="arch-sub">
            Click through real system topologies designed and shipped to production for 100K+ users.
          </p>
        </div>

        {/* Top selector buttons */}
        <div className="arch-nav-tabs">
          {flows.map((flow) => {
            const isSelected = flow.id === selectedFlowId;
            return (
              <button
                key={flow.id}
                type="button"
                className={`arch-nav-btn ${isSelected ? "active" : ""}`}
                onClick={() => {
                  setSelectedFlowId(flow.id);
                  setActiveStep(0);
                }}
              >
                <div className="arch-nav-meta">
                  <span className="arch-nav-badge">{flow.badge}</span>
                  <span className="arch-nav-name">{flow.name.split(":")[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Diagram Interactive Viewer */}
        <div className="arch-board glass-card">
          <div className="arch-board-head">
            <div>
              <h3 className="arch-board-title">{activeFlow.name}</h3>
              <p className="arch-board-desc">{activeFlow.description}</p>
            </div>
            <button
              type="button"
              className="arch-step-advance-btn"
              onClick={() => setActiveStep((prev) => (prev + 1) % activeFlow.layers.length)}
            >
              <RefreshCw size={14} />
              <span>Simulate Flow (Layer {activeStep + 1}/{activeFlow.layers.length})</span>
            </button>
          </div>

          {/* Interactive Stepped Pipeline */}
          <div className="arch-pipeline-grid">
            {activeFlow.layers.map((layer, index) => {
              const isHighlight = index === activeStep;
              return (
                <div
                  key={layer.name}
                  className={`arch-layer-card ${isHighlight ? "active-layer" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="arch-layer-step-badge">
                    <span>STEP 0{index + 1}</span>
                    {isHighlight && <span className="layer-active-dot" />}
                  </div>
                  <h4 className="arch-layer-name">{layer.name}</h4>
                  <div className="arch-layer-tech">{layer.tech}</div>
                  <p className="arch-layer-detail">{layer.detail}</p>
                  {index < activeFlow.layers.length - 1 && (
                    <div className="arch-arrow-connector">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
