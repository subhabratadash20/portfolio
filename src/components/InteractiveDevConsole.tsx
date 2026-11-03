"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ShieldCheck, Cpu, Database, Flame, Sparkles, Copy, Check, Play, Eraser } from "lucide-react";

type LogEntry = {
  id: string;
  cmd?: string;
  text: string;
  type?: string;
  isStreaming?: boolean;
};

const SUGGESTED_COMMANDS = ["apps", "skills", "telemetry", "contact", "clear"];

export default function InteractiveDevConsole() {
  const [activeTab, setActiveTab] = useState<"terminal" | "telemetry" | "stack">("terminal");
  const [inputCmd, setInputCmd] = useState("");
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: "init-1",
      text: "Antigravity DevEngine v5.2.0-LTS initialized [Node v22.14 / Dart 3.11]",
      type: "system",
    },
    {
      id: "init-2",
      text: "Interactive terminal active. Type or click suggestions below to inspect systems.",
      type: "system",
    },
  ]);

  // Auto-scroll to bottom of logs on history update
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Stream output with realistic character-by-character typewriter animation
  const streamResponse = (userCmd: string, responseText: string) => {
    const entryId = `entry-${Date.now()}`;
    setIsTyping(true);

    // Initial placeholder entry
    setHistory((prev) => [
      ...prev,
      { id: entryId, cmd: userCmd, text: "", type: "normal", isStreaming: true },
    ]);

    let charIdx = 0;
    const speed = Math.max(8, Math.min(22, 1200 / responseText.length)); // dynamic typing speed

    const interval = setInterval(() => {
      charIdx++;
      const currentChunk = responseText.slice(0, charIdx);

      setHistory((prev) =>
        prev.map((item) =>
          item.id === entryId
            ? {
                ...item,
                text: currentChunk,
                isStreaming: charIdx < responseText.length,
              }
            : item
        )
      );

      if (charIdx >= responseText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  // Perform clean wipe / clearing animation
  const handleClear = () => {
    setIsClearing(true);
    setTimeout(() => {
      setHistory([
        {
          id: `clear-${Date.now()}`,
          text: "Terminal buffer cleared. System ready.",
          type: "system",
        },
      ]);
      setIsClearing(false);
      setInputCmd("");
    }, 450);
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd || isTyping) return;

    setInputCmd("");

    if (cmd === "clear") {
      handleClear();
      return;
    }

    let response = "";
    switch (cmd) {
      case "help":
        response =
          "AVAILABLE COMMANDS:\n• 'apps'      : Production releases (BluFix AI, Rent Roll Pulse, Etana Oroko, Konnectax, Plugg)\n• 'skills'    : Complete mobile, backend & database tech stack\n• 'telemetry' : Real-time SLA, P95 latency and GPU target benchmarks\n• 'contact'   : Direct senior architect communication endpoints\n• 'clear'     : Wipe terminal buffer with clear animation";
        break;
      case "apps":
        response =
          "PRODUCTION SYSTEMS DEPLOYED:\n[1] BluFix AI         -> Multi-Agent Diagnostic Dispatch & Technician Radar (Node 22 / Postgres / Flutter)\n[2] Rent Roll Pulse   -> FinTech Real Estate Valuation & Automated AMI PDF Engine\n[3] Etana Oroko       -> Dual-Identity Social RTC & Agora WebRTC Live Broadcasts\n[4] Konnectax         -> Tax Compliance SaaS (Live on iOS App Store & Google Play)\n[5] Plugg             -> AI-Powered Realtime Matchmaking & Compatibility Graph";
        break;
      case "skills":
        response =
          "TECHNICAL PROFICIENCIES:\n• Mobile Architecture : Flutter, Dart, Riverpod 3, GetX, GoRouter, AutoRoute, Bloc\n• Databases & Realtime: PostgreSQL, GraphQL (Firebase Data Connect), Firestore, Redis, Hive DB\n• AI & Infra          : Multi-Agent LLMs, Gemini 3.8 Flash, Node.js 22 LTS, Docker, WebRTC, Idempotent APIs";
        break;
      case "telemetry":
        response =
          "LIVE PRODUCTION TELEMETRY:\n• SLA Uptime Target   : 99.98% High Availability\n• Mobile Frame Rate   : 60 FPS Smooth GPU Rendering\n• API P95 Response    : < 140ms Global Edge Routing\n• Production Release  : 15+ Apps & Systems Shipped";
        break;
      case "contact":
        response =
          "DIRECT CONTACT ENDPOINTS:\n• Email    : subhabratadas2002@gmail.com\n• LinkedIn : https://linkedin.com/in/subhabratadash\n• GitHub   : https://github.com/subhabratadash20\n• Status   : Open to Senior Mobile & AI Systems Engineering Opportunities";
        break;
      default:
        response = `Command '${cmd}' not recognized. Type 'help' or click one of the suggested commands.`;
        break;
    }

    streamResponse(rawCmd, response);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCmd);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("subhabratadas2002@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section dev-cockpit-section" id="cockpit">
      <div className="container">
        <div className="cockpit-header">
          <div className="cockpit-pill">
            <span className="live-pulse" />
            <span>INTERACTIVE DEVELOPER CONSOLE</span>
          </div>
          <h2 className="cockpit-title">
            Senior Architecture & <span className="text-gradient">Live Telemetry</span>
          </h2>
          <p className="cockpit-sub">
            Directly probe production architecture metrics, test the developer CLI emulator with streaming output, or explore backend systems.
          </p>
        </div>

        <div className="cockpit-wrapper glass-card">
          {/* Console Top Bar */}
          <div className="console-topbar">
            <div className="console-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="console-tabs">
              <button
                type="button"
                className={`console-tab-btn ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => setActiveTab("terminal")}
              >
                <Terminal size={14} />
                <span>CLI Terminal</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === "telemetry" ? "active" : ""}`}
                onClick={() => setActiveTab("telemetry")}
              >
                <Cpu size={14} />
                <span>Real-Time Benchmarks</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === "stack" ? "active" : ""}`}
                onClick={() => setActiveTab("stack")}
              >
                <Database size={14} />
                <span>Microservices Grid</span>
              </button>
            </div>
            <button type="button" className="copy-cli-btn" onClick={copyEmail} title="Copy email">
              {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copied ? "Copied Email!" : "Contact Direct"}</span>
            </button>
          </div>

          {/* Tab 1: Terminal with Typing & Clearing Animations */}
          {activeTab === "terminal" && (
            <div className="terminal-body">
              {/* Suggested quick buttons */}
              <div className="terminal-suggestions">
                <span className="sugg-label">QUICK COMMANDS:</span>
                {SUGGESTED_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    className="sugg-pill"
                    onClick={() => executeCommand(cmd)}
                    disabled={isTyping || isClearing}
                  >
                    {cmd === "clear" ? <Eraser size={11} /> : <Play size={10} />}
                    <span>{cmd}</span>
                  </button>
                ))}
              </div>

              {/* Logs Stream */}
              <div
                className={`terminal-logs ${isClearing ? "terminal-clearing-active" : ""}`}
                ref={logsContainerRef}
              >
                {history.map((h) => (
                  <div key={h.id} className="log-line animate-fade-in">
                    {h.cmd && (
                      <div className="log-prompt">
                        <span className="prompt-sym">❯</span>
                        <span className="prompt-cmd">{h.cmd}</span>
                      </div>
                    )}
                    <div className={`log-text ${h.type || ""}`}>
                      <pre className="terminal-pre">{h.text}</pre>
                      {h.isStreaming && <span className="typing-cursor-blink">▋</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleFormSubmit} className="terminal-input-bar">
                <span className="prompt-sym">❯</span>
                <input
                  type="text"
                  value={inputCmd}
                  onChange={(e) => setInputCmd(e.target.value)}
                  placeholder="Type a command (try 'apps', 'skills', 'telemetry', 'clear')..."
                  className="terminal-input"
                  disabled={isTyping || isClearing}
                />
                <button
                  type="submit"
                  className="terminal-enter-btn"
                  disabled={isTyping || isClearing}
                >
                  {isTyping ? "STREAMING..." : "EXECUTE"}
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Telemetry & Metrics */}
          {activeTab === "telemetry" && (
            <div className="telemetry-grid">
              <div className="metric-box">
                <div className="metric-icon">
                  <Flame size={20} color="#F59E0B" />
                </div>
                <div className="metric-number">99.98%</div>
                <div className="metric-label">Production SLA Uptime</div>
                <div className="metric-bar">
                  <div className="bar-fill" style={{ width: "99%" }} />
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-icon">
                  <Cpu size={20} color="#00D9FF" />
                </div>
                <div className="metric-number">60 FPS</div>
                <div className="metric-label">Flutter GPU Frame Target</div>
                <div className="metric-bar">
                  <div className="bar-fill" style={{ width: "95%" }} />
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-icon">
                  <ShieldCheck size={20} color="#10B981" />
                </div>
                <div className="metric-number">&lt; 140ms</div>
                <div className="metric-label">P95 Global API Response</div>
                <div className="metric-bar">
                  <div className="bar-fill" style={{ width: "92%" }} />
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-icon">
                  <Sparkles size={20} color="#A78BFA" />
                </div>
                <div className="metric-number">15+</div>
                <div className="metric-label">Production Systems Shipped</div>
                <div className="metric-bar">
                  <div className="bar-fill" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Microservices Grid */}
          {activeTab === "stack" && (
            <div className="stack-grid">
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">Multi-Agent AI Pipeline</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>Node.js 22 LTS, Redis Cache & Rate-limiter, OpenAI & Gemini 3.8 Flash orchestration engine.</p>
              </div>
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">Dual-Identity PostgreSQL</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>Firebase Data Connect GraphQL join engine coupled with Firestore sub-second presence tracking.</p>
              </div>
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">Low-Latency WebRTC</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>Agora RTC SDK integration with token rotation, video grid negotiation, and background push wakeups.</p>
              </div>
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">Automated Financial Engine</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>AAMI real estate algorithms, dynamic PDF vector report generation, and idempotent Stripe payouts.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
