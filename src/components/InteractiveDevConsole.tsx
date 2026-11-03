"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ShieldCheck, Cpu, Database, Flame, Sparkles, Copy, Check, Play, Eraser, Bot, Send, User, FileText } from "lucide-react";
import { askPortfolioAgent, ChatMessage, generateDynamicAgentGreeting } from "@/lib/openRouterAgent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import RealtimeResumeModal from "@/components/RealtimeResumeModal";

type LogEntry = {
  id: string;
  cmd?: string;
  text: string;
  type?: string;
  isStreaming?: boolean;
};

interface EmbeddedChatMessage extends ChatMessage {
  isStreaming?: boolean;
}

const SUGGESTED_COMMANDS = ["apps", "cv", "skills", "nora", "telemetry", "contact", "clear"];

const COPILOT_SUGGESTIONS = [
  "📄 Generate Realtime CV",
  "Overview of all 10 production apps",
  "How does BluFix's AI Analyzer work?",
  "Explain Etana's recommendation engine & moderator",
  "Explain Nora AI's supervisor agent & device bridges",
];

export default function InteractiveDevConsole() {
  const [activeTab, setActiveTab] = useState<"terminal" | "copilot" | "telemetry" | "stack">("terminal");
  const [inputCmd, setInputCmd] = useState("");
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  // Embedded Copilot State
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [hasStreamedCopilotGreeting, setHasStreamedCopilotGreeting] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState<EmbeddedChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Welcome to Subhabrata's **Senior Architecture Copilot**! Initializing real-time telemetry...",
    },
  ]);
  const copilotMessagesContainerRef = useRef<HTMLDivElement | null>(null);
  const copilotStreamTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: "init-1",
      text: "Antigravity DevEngine v5.2.0-LTS initialized [Node v22.14 / Dart 3.11]",
      type: "system",
    },
    {
      id: "init-2",
      text: "Interactive terminal active. Type or click suggestions below to inspect systems (supports natural AI queries).",
      type: "system",
    },
  ]);

  // Auto-scroll to bottom of logs on history update
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Safely auto-scroll ONLY the embedded messages container (never hijacking the browser window)
  useEffect(() => {
    if (copilotMessagesContainerRef.current) {
      copilotMessagesContainerRef.current.scrollTop = copilotMessagesContainerRef.current.scrollHeight;
    }
  }, [copilotMessages, copilotLoading]);

  // Stream dynamic greeting on first tab visit
  const streamCopilotGreeting = (fullGreeting: string) => {
    if (copilotStreamTimerRef.current) clearInterval(copilotStreamTimerRef.current);

    setCopilotMessages([
      { role: "assistant", content: "", isStreaming: true },
    ]);

    let charIdx = 0;
    const step = Math.max(2, Math.floor(fullGreeting.length / 65));

    copilotStreamTimerRef.current = setInterval(() => {
      charIdx += step;
      if (charIdx >= fullGreeting.length) {
        if (copilotStreamTimerRef.current) clearInterval(copilotStreamTimerRef.current);
        setCopilotMessages([
          { role: "assistant", content: fullGreeting, isStreaming: false },
        ]);
      } else {
        const chunk = fullGreeting.slice(0, charIdx);
        setCopilotMessages([
          { role: "assistant", content: chunk, isStreaming: true },
        ]);
      }
    }, 18);
  };

  useEffect(() => {
    if (activeTab === "copilot" && !hasStreamedCopilotGreeting) {
      setHasStreamedCopilotGreeting(true);
      const greeting = generateDynamicAgentGreeting();
      streamCopilotGreeting(greeting);
    }
  }, [activeTab, hasStreamedCopilotGreeting]);

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
    const speed = Math.max(8, Math.min(20, 1200 / responseText.length)); // dynamic typing speed

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

  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd || isTyping) return;

    setInputCmd("");

    if (cmd.toLowerCase() === "clear") {
      handleClear();
      return;
    }

    let response = "";
    switch (cmd.toLowerCase()) {
      case "help":
        response =
          "AVAILABLE COMMANDS:\n• 'apps'      : Production releases across 10 deployed applications\n• 'cv'        : Launch verified ATS resume & print-ready CV preview\n• 'skills'    : Complete mobile, backend & database tech stack\n• 'nora'      : Deep architectural overview of Nora AI agentic ecosystem\n• 'telemetry' : Real-time SLA, P95 latency and GPU target benchmarks\n• 'contact'   : Direct senior architect communication endpoints\n• 'clear'     : Wipe terminal buffer with clear animation\n• Or type any custom question to consult the AI Copilot directly!";
        break;
      case "cv":
      case "resume":
        setIsResumeModalOpen(true);
        response =
          "SUBHABRATA DAS — VERIFIED ATS RESUME\n• Role: Senior Flutter Developer & AI-Powered Systems Architect (3+ Years Experience)\n• Education: BCA with High Honors (8.99 CGPA, 2020-2023)\n• Production Systems: Nora AI, BluFix AI, Etana Oroko, Rent Roll Pulse, Konnectax (10 Apps Total)\n• Direct Email: subhabratadash1@gmail.com\n\n[Action Executed]: Opening print-ready ATS resume preview modal...";
        break;
      case "apps":
        response =
          "10 PRODUCTION SYSTEMS ARCHITECTED:\n[1] Nora AI           -> Autonomous Executive Assistant (LangGraph / FastAPI / Socket.IO / Device Bridges)\n[2] BluFix AI         -> Two-Stage Acoustic Fault Analyzer & Technician Radar Dispatch\n[3] Rent Roll Pulse   -> FinTech Real Estate Valuation & Automated AMI PDF Engine\n[4] Etana Oroko       -> Dual-Identity Social RTC & Gemini 3.8 Moderation & Agora WebRTC\n[5] Konnectax         -> Multi-Platform RTMP Live Streaming (YouTube, Facebook, TikTok via Mux)\n[6] Plugg             -> AI Matchmaking & Socket.IO Rich Media Chat\n[7] Flinki            -> Sports Q-Commerce, Tournament RSVP & In-App Video Player\n[8] Stylaa            -> Dual Customer/Merchant Salon Booking & AI Beauty Recommendations\n[9] Groundmetrx       -> Enterprise Fleet Telemetry & Automated Polygon Geofencing Alerts\n[10] DIY Marketplace  -> Bilingual Arabic RTL Crafters Marketplace & Moyasar Payments";
        break;
      case "skills":
        response =
          "TECHNICAL PROFICIENCIES & ARCHITECTURE STACK:\n" +
          "• #1 Top Priority — Advanced Flutter & Dart 3:\n" +
          "  Clean Architecture, DDD, Riverpod 3.3, BLoC, GetX, Dart Isolates (compute), Custom RenderObjects, 60-120 FPS GPU profiling, iOS AlarmKit & Android AlarmManager hardware bridges, Agora WebRTC, Mux RTMP, Sub-Meter GPS Geofencing, Hive Local-First DB\n" +
          "• #2 Priority — Python & Agentic AI:\n" +
          "  FastAPI async microservices, LangGraph Supervisor Agents, Dynamic Tool-Palette Pruning (PlannedToolLiteral), OpenAI GPT & Realtime WebRTC, Gemini 3.8 Flash, Claude, Celery & Redis task queues, MongoDB Atlas (Beanie ODM)\n" +
          "• #3 Priority — Node.js 22 LTS & Microservices:\n" +
          "  Node.js 22 LTS REST APIs, PostgreSQL (Neon / Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, Redis distributed locks, Idempotent Stripe Connect split payouts\n" +
          "• #4 Priority — React & Modern Web (Full-Stack Delivery):\n" +
          "  React 18/19, Next.js App Router, TypeScript, Tailwind CSS, SSR/SSG, web portals (myetana.com), responsive developer cockpits and client dashboards";
        break;
      case "telemetry":
        response =
          "LIVE PRODUCTION TELEMETRY:\n• SLA Uptime Target   : 99.98% High Availability\n• Mobile Frame Rate   : 60 FPS Smooth GPU Rendering\n• API P95 Response    : < 140ms Global Edge Routing\n• Production Release  : 15+ Apps & Systems Shipped";
        break;
      case "contact":
        response =
          "DIRECT CONTACT ENDPOINTS:\n• Email    : subhabratadash1@gmail.com\n• LinkedIn : https://linkedin.com/in/subhabratadash\n• GitHub   : https://github.com/subhabratadash20\n• Status   : Open to Senior Mobile & AI Systems Engineering Opportunities";
        break;
      default:
        // Automatically query AI Copilot for any natural language input!
        setIsTyping(true);
        setHistory((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            cmd: rawCmd,
            text: "Routing to AI Copilot Engine...",
            type: "system",
          },
        ]);

        try {
          response = await askPortfolioAgent(cmd, []);
          setHistory((prev) => prev.filter((item) => !item.id.startsWith("temp-")));
          streamResponse(rawCmd, response);
        } catch {
          setHistory((prev) => prev.filter((item) => !item.id.startsWith("temp-")));
          streamResponse(
            rawCmd,
            "Encountered temporary connection delay. You can reach Subhabrata directly at subhabratadash1@gmail.com."
          );
        }
        return;
    }

    streamResponse(rawCmd, response);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCmd);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("subhabratadash1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Embedded Copilot send handler
  const handleCopilotSend = async (queryText?: string) => {
    const text = (queryText || copilotInput).trim();
    if (!text || copilotLoading) return;

    if (text.toLowerCase().includes("generate realtime cv")) {
      setCopilotInput("");
      const newHistory: EmbeddedChatMessage[] = [
        ...copilotMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: "Generate Realtime CV" },
      ];
      setCopilotMessages(newHistory);
      setCopilotLoading(true);

      const localCv = await askPortfolioAgent("generate cv", newHistory);
      setCopilotLoading(false);

      if (copilotStreamTimerRef.current) clearInterval(copilotStreamTimerRef.current);
      setCopilotMessages((prev) => [
        ...prev,
        { role: "assistant", content: localCv, isStreaming: false },
      ]);
      return;
    }

    setCopilotInput("");
    const newHistory: EmbeddedChatMessage[] = [
      ...copilotMessages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: text },
    ];
    setCopilotMessages(newHistory);
    setCopilotLoading(true);

    try {
      const reply = await askPortfolioAgent(text, newHistory);
      setCopilotLoading(false);

      if (copilotStreamTimerRef.current) clearInterval(copilotStreamTimerRef.current);

      setCopilotMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", isStreaming: true },
      ]);

      let charIdx = 0;
      const step = Math.max(1, Math.floor(reply.length / 90));
      copilotStreamTimerRef.current = setInterval(() => {
        charIdx += step;
        if (charIdx >= reply.length) {
          if (copilotStreamTimerRef.current) clearInterval(copilotStreamTimerRef.current);
          setCopilotMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: reply,
              isStreaming: false,
            };
            return updated;
          });
        } else {
          const chunk = reply.slice(0, charIdx);
          setCopilotMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: chunk,
              isStreaming: true,
            };
            return updated;
          });
        }
      }, 16);
    } catch {
      setCopilotLoading(false);
      setCopilotMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary connection issue. You can reach Subhabrata directly at **subhabratadash1@gmail.com**!",
          isStreaming: false,
        },
      ]);
    }
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
            Directly probe production architecture metrics, consult the embedded AI Copilot, test the developer CLI emulator, or explore backend systems.
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
                className={`console-tab-btn ${activeTab === "copilot" ? "active" : ""}`}
                onClick={() => setActiveTab("copilot")}
              >
                <Bot size={14} color="#00D9FF" />
                <span>AI Architecture Copilot</span>
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
                  placeholder="Type a command or ask any question (e.g. 'nora', 'supervisor', 'apps')..."
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

          {/* Tab 2: Embedded AI Architecture Copilot Cockpit */}
          {activeTab === "copilot" && (
            <div className="embedded-copilot-container">
              {/* Messages Body */}
              <div
                className="embedded-copilot-messages"
                ref={copilotMessagesContainerRef}
              >
                {copilotMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`agent-message-wrapper ${m.role === "user" ? "user-side" : "bot-side"}`}
                  >
                    <div className="agent-message-avatar">
                      {m.role === "user" ? <User size={13} /> : <Bot size={13} color="#00D9FF" />}
                    </div>
                    <div className="agent-message-bubble">
                      <div className="agent-markdown-content">
                        <MarkdownRenderer
                          content={m.content}
                          isStreaming={m.isStreaming}
                          onAction={(action) => {
                            if (action === "DOWNLOAD_CV") {
                              setIsResumeModalOpen(true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {copilotLoading && (
                  <div className="agent-message-wrapper bot-side">
                    <div className="agent-message-avatar">
                      <Bot size={13} color="#00D9FF" />
                    </div>
                    <div className="agent-message-bubble typing-bubble">
                      <span className="dot-bounce" />
                      <span className="dot-bounce" />
                      <span className="dot-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Prompt Chips Tray (positioned right above input bar) */}
              <div className="agent-chips-tray">
                {COPILOT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="agent-chip"
                    onClick={() => handleCopilotSend(suggestion)}
                    disabled={copilotLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                className="agent-modal-footer"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCopilotSend();
                }}
              >
                <input
                  type="text"
                  placeholder="Ask about Nora AI, BluFix acoustic diagnostics, Etana WebRTC, or CV..."
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  className="agent-input-field"
                  disabled={copilotLoading}
                />
                <button
                  type="submit"
                  className="agent-send-btn"
                  disabled={!copilotInput.trim() || copilotLoading}
                  aria-label="Send query"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Telemetry & Metrics */}
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

          {/* Tab 4: Microservices Grid */}
          {activeTab === "stack" && (
            <div className="stack-grid">
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">Nora AI Multi-Agent & Bridges</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>LangGraph supervisor agent, iOS AlarmKit & Android AlarmManager bridges, FastAPI duplex Socket.IO streaming.</p>
              </div>
              <div className="stack-card">
                <div className="stack-head">
                  <span className="stack-name">BluFix Multi-Agent Pipeline</span>
                  <span className="badge-status">Active</span>
                </div>
                <p>Node.js 22 LTS, Redis Cache & Rate-limiter, OpenAI & Gemini 3.8 Flash fault prediction and technician radar.</p>
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
            </div>
          )}
        </div>
      </div>

      {/* Realtime ATS Resume Modal */}
      <RealtimeResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
