"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, RefreshCw, Key } from "lucide-react";
import { askPortfolioAgent, ChatMessage } from "@/lib/openRouterAgent";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export interface ExtendedChatMessage extends ChatMessage {
  isStreaming?: boolean;
}

const PROMPT_SUGGESTIONS = [
  "Explain Nora AI's supervisor agent & device bridges",
  "Explain BluFix AI's multi-agent diagnostic pipeline",
  "How does Etana's PostgreSQL + Firestore architecture work?",
  "What Flutter state management libraries do you use?",
  "How can I contact Subhabrata for a role?",
];

export default function PortfolioAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Subhabrata's **AI Copilot**. Ask me anything about his production systems (**Nora AI**, **BluFix AI**, **Etana Oroko**, **Rent Roll Pulse**), supervisor agents, native device bridges, or technical architecture!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Clean up any streaming intervals on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  const streamTextIntoMessages = (fullText: string) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    // Initial placeholder message with isStreaming: true
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isStreaming: true },
    ]);

    let charIdx = 0;
    // Faster dynamic step for longer texts so it finishes within ~1.8 seconds
    const step = Math.max(1, Math.floor(fullText.length / 100));

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
    }, 18);
  };

  const handleSend = async (textToSend?: string) => {
    const userQuery = (textToSend || input).trim();
    if (!userQuery || loading) return;

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
            "I encountered a temporary connection issue. You can contact Subhabrata directly at **subhabratadash1@gmail.com**!",
          isStreaming: false,
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Launcher Button at Bottom Left */}
      <div className="portfolio-agent-launcher">
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
        <div className="portfolio-agent-modal glass-card">
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
                  <span>Online • Hybrid Cloudflare Edge Engine</span>
                </div>
              </div>
            </div>
            <div className="agent-header-actions">
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
                title="Reset conversation"
                onClick={() => {
                  if (streamTimerRef.current) clearInterval(streamTimerRef.current);
                  setMessages([
                    {
                      role: "assistant",
                      content:
                        "Conversation reset. What would you like to know about Subhabrata's systems, code, or background?",
                    },
                  ]);
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
                    <MarkdownRenderer content={m.content} isStreaming={m.isStreaming} />
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
    </>
  );
}
