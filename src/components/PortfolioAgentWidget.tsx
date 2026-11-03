"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, RefreshCw, Key, FileText } from "lucide-react";
import { askPortfolioAgent, ChatMessage, generateDynamicAgentGreeting } from "@/lib/openRouterAgent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import RealtimeResumeModal from "@/components/RealtimeResumeModal";

export interface ExtendedChatMessage extends ChatMessage {
  isStreaming?: boolean;
}

const PROMPT_SUGGESTIONS = [
  "📄 Generate Realtime CV",
  "Overview of all 10 production apps",
  "How does BluFix's AI Analyzer work?",
  "Explain Etana's recommendation engine & moderator",
  "Explain Nora AI's supervisor agent & device bridges",
  "How can I contact Subhabrata for a role?",
];

export default function PortfolioAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [hasStreamedGreeting, setHasStreamedGreeting] = useState(false);

  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    {
      role: "assistant",
      content: generateDynamicAgentGreeting(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for global CV modal trigger
  useEffect(() => {
    const handleOpenCvModal = () => setIsResumeModalOpen(true);
    window.addEventListener("open-cv-modal", handleOpenCvModal);
    return () => window.removeEventListener("open-cv-modal", handleOpenCvModal);
  }, []);

  // When widget is first opened by user, stream a fresh real-time dynamic greeting
  useEffect(() => {
    if (isOpen && !hasStreamedGreeting) {
      setHasStreamedGreeting(true);
      const greeting = generateDynamicAgentGreeting();
      streamGreeting(greeting);
    }
  }, [isOpen, hasStreamedGreeting]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  const streamGreeting = (fullGreeting: string) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    setMessages([
      { role: "assistant", content: "", isStreaming: true },
    ]);

    let charIdx = 0;
    const step = Math.max(2, Math.floor(fullGreeting.length / 70));

    streamTimerRef.current = setInterval(() => {
      charIdx += step;
      if (charIdx >= fullGreeting.length) {
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
        setMessages([
          { role: "assistant", content: fullGreeting, isStreaming: false },
        ]);
      } else {
        const chunk = fullGreeting.slice(0, charIdx);
        setMessages([
          { role: "assistant", content: chunk, isStreaming: true },
        ]);
      }
    }, 18);
  };

  const streamTextIntoMessages = (fullText: string) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isStreaming: true },
    ]);

    let charIdx = 0;
    const step = Math.max(1, Math.floor(fullText.length / 95));

    streamTimerRef.current = setInterval(() => {
      charIdx += step;
      if (charIdx >= fullText.length) {
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: fullText,
            isStreaming: false,
          };
          return updated;
        });
      } else {
        const chunk = fullText.slice(0, charIdx);
        setMessages((prev) => {
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
  };

  const handleSend = async (textToSend?: string) => {
    const userQuery = (textToSend || input).trim();
    if (!userQuery || loading) return;

    // Handle instant CV chip trigger
    if (userQuery.toLowerCase().includes("generate realtime cv")) {
      setInput("");
      const newHistory: ExtendedChatMessage[] = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: "Generate Realtime CV" },
      ];
      setMessages(newHistory);
      setLoading(true);

      const localCv = await askPortfolioAgent("generate cv", newHistory);
      setLoading(false);
      streamTextIntoMessages(localCv);
      return;
    }

    setInput("");
    const newHistory: ExtendedChatMessage[] = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userQuery },
    ];
    setMessages(newHistory);
    setLoading(true);

    try {
      const reply = await askPortfolioAgent(userQuery, newHistory, customKey);
      setLoading(false);
      streamTextIntoMessages(reply);
    } catch {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a temporary connection issue. You can contact Subhabrata directly at **subhabratadash1@gmail.com**!\n\n[[ACTION:DOWNLOAD_CV]]",
          isStreaming: false,
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Launcher Button at Bottom Left */}
      <div className="portfolio-agent-launcher no-print">
        <button
          type="button"
          className="agent-fab-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Subhabrata's AI Copilot"
        >
          <div className="agent-fab-inner">
            {isOpen ? <X size={20} /> : <Bot size={22} />}
            {!isOpen && <span className="agent-fab-pulse" />}
          </div>
          {!isOpen && (
            <span className="agent-fab-badge">
              <Sparkles size={11} />
              <span>AI Copilot</span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="portfolio-agent-modal glass-card no-print">
          {/* Header */}
          <div className="agent-modal-header">
            <div className="agent-header-info">
              <div className="agent-avatar">
                <Bot size={18} color="#00D9FF" />
              </div>
              <div>
                <h4 className="agent-title">Subhabrata AI Copilot</h4>
                <div className="agent-status">
                  <span className="agent-online-dot" />
                  <span>Online • 10 Systems & Realtime CV</span>
                </div>
              </div>
            </div>
            <div className="agent-header-actions">
              <button
                type="button"
                className="agent-header-btn"
                title="View Verified ATS Resume"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileText size={14} color="#00D9FF" />
              </button>
              <button
                type="button"
                className="agent-header-btn"
                title="Configure custom OpenRouter key"
                onClick={() => setShowKeyInput((prev) => !prev)}
              >
                <Key size={14} />
              </button>
              <button
                type="button"
                className="agent-header-btn"
                title="Reset conversation with fresh greeting"
                onClick={() => {
                  if (streamTimerRef.current) clearInterval(streamTimerRef.current);
                  const freshGreeting = generateDynamicAgentGreeting();
                  streamGreeting(freshGreeting);
                }}
              >
                <RefreshCw size={14} />
              </button>
              <button
                type="button"
                className="agent-header-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Optional OpenRouter Key Bar */}
          {showKeyInput && (
            <div className="agent-key-bar">
              <input
                type="password"
                placeholder="Paste OpenRouter Key (Optional for open models)"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="agent-key-input"
              />
            </div>
          )}

          {/* Messages Body with Rich Markdown & Streaming */}
          <div className="agent-modal-body">
            {messages.map((m, idx) => (
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

            {loading && (
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
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="agent-chips-tray">
            {PROMPT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="agent-chip"
                onClick={() => handleSend(suggestion)}
                disabled={loading}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            className="agent-modal-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about Subhabrata's stack & apps..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="agent-input-field"
              disabled={loading}
            />
            <button
              type="submit"
              className="agent-send-btn"
              disabled={!input.trim() || loading}
              aria-label="Send query"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Realtime ATS Resume Modal */}
      <RealtimeResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
}
