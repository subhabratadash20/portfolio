"use client";

import { useState } from "react";
import { Terminal, ShieldCheck, Cpu, Database, Flame, Sparkles, Copy, Check } from "lucide-react";

export default function InteractiveDevConsole() {
  const [activeTab, setActiveTab] = useState<"terminal" | "telemetry" | "stack">("terminal");
  const [inputCmd, setInputCmd] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ cmd?: string; text: string; type?: string }>>([
    { text: "Antigravity DevEngine v5.2.0-LTS initialized [Node v22.14 / Dart 3.11]", type: "system" },
    { text: "Type 'help', 'apps', 'skills', or 'contact' for fast CLI inspection.", type: "system" },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputCmd.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands: 'apps' (list live apps), 'skills' (core stack), 'contact' (reach out), 'clear'";
        break;
      case "apps":
        response = "PRODUCTION RELEASES: BluFix AI (Smart Dispatch), Rent Roll Pulse (FinTech Valuation), Etana Oroko (RTC Social), Konnectax (Tax Compliance SaaS), Plugg (AI Matchmaking).";
        break;
      case "skills":
        response = "PRIMARY: Flutter, Dart, Riverpod, Node.js 22, PostgreSQL, Firebase Data Connect, WebRTC, Gemini AI.";
        break;
      case "contact":
        response = "DIRECT: subhabratadas2002@gmail.com | LinkedIn: /in/subhabratadash | GitHub: /subhabratadash20";
        break;
      case "clear":
        setHistory([]);
        setInputCmd("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: inputCmd, text: response }]);
    setInputCmd("");
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
            Directly probe production architecture metrics, test the developer CLI emulator, or explore backend systems.
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

          {/* Tab 1: Terminal */}
          {activeTab === "terminal" && (
            <div className="terminal-body">
              <div className="terminal-logs">
                {history.map((h, i) => (
                  <div key={i} className="log-line">
                    {h.cmd && (
                      <div className="log-prompt">
                        <span className="prompt-sym">❯</span>
                        <span className="prompt-cmd">{h.cmd}</span>
                      </div>
                    )}
                    <div className={`log-text ${h.type || ""}`}>{h.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommand} className="terminal-input-bar">
                <span className="prompt-sym">❯</span>
                <input
                  type="text"
                  value={inputCmd}
                  onChange={(e) => setInputCmd(e.target.value)}
                  placeholder="Type a command (try 'apps', 'skills', 'contact')..."
                  className="terminal-input"
                />
                <button type="submit" className="terminal-enter-btn">
                  EXECUTE
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
                <div className="metric-number">10+</div>
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
