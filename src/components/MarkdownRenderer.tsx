"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
  onAction?: (action: string) => void;
}

export default function MarkdownRenderer({ content, isStreaming, onAction }: MarkdownRendererProps) {
  // Parse markdown lines into structured blocks
  const parseInline = (text: string): React.ReactNode[] => {
    // Regular expressions for bold, code, link, italic
    // Split by tokens: **bold**, `code`, [text](url), *italic*
    const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\)|\*.*?\*)/g);

    return tokens.map((token, i) => {
      if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
        return (
          <strong key={i} className="markdown-bold">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
        return (
          <code key={i} className="markdown-inline-code">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
        const match = token.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, label, url] = match;
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="markdown-link"
            >
              {label}
            </a>
          );
        }
      }
      if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
        return (
          <em key={i} className="markdown-italic">
            {token.slice(1, -1)}
          </em>
        );
      }
      return token;
    });
  };

  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];

  let currentList: React.ReactNode[] = [];
  let isNumberedList = false;

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumberedList) {
        renderedElements.push(
          <ol key={`ol-${renderedElements.length}`} className="markdown-ol">
            {currentList}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${renderedElements.length}`} className="markdown-ul">
            {currentList}
          </ul>
        );
      }
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Custom Action Token: [[ACTION:DOWNLOAD_CV]]
    if (trimmed.includes("[[ACTION:DOWNLOAD_CV]]")) {
      flushList();
      renderedElements.push(
        <div
          key={`action-cv-${i}`}
          className="my-3 p-3.5 rounded-xl border border-[#00D9FF]/40 bg-gradient-to-r from-[#00D9FF]/10 via-[#7C3AED]/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-black/40"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-lg bg-[#00D9FF]/20 border border-[#00D9FF]/40 flex items-center justify-center text-lg shrink-0">
              📄
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">Subhabrata Das — Official ATS Resume</div>
              <div className="text-[11px] text-gray-400">3+ Years Experience • All 10 Production Systems • Verified Signature</div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="/Subhabrata_Das_Resume.pdf"
              download="Subhabrata_Das_Resume.pdf"
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#00D9FF] text-black font-bold text-xs hover:bg-[#00D9FF]/90 transition shadow-md shadow-[#00D9FF]/25 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="Download signed ATS PDF file directly"
            >
              <span>📥 Download PDF</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (onAction) {
                  onAction("DOWNLOAD_CV");
                } else {
                  window.dispatchEvent(new CustomEvent("open-cv-modal"));
                }
              }}
              className="px-3 py-2 rounded-lg bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition flex items-center justify-center gap-1 cursor-pointer shrink-0"
              title="Preview ATS Resume in interactive modal"
            >
              <span>👁️ Preview</span>
            </button>
          </div>
        </div>
      );
      continue;
    }

    // Divider line
    if (trimmed === "---" || trimmed === "===" || trimmed === "---------------------") {
      flushList();
      renderedElements.push(<hr key={`hr-${i}`} className="markdown-hr" />);
      continue;
    }

    // Heading 1 (# ...)
    if (trimmed.startsWith("# ")) {
      flushList();
      renderedElements.push(
        <h4 key={`h1-${i}`} className="markdown-h1">
          {parseInline(trimmed.slice(2))}
        </h4>
      );
      continue;
    }

    // Heading 2 (## ...)
    if (trimmed.startsWith("## ")) {
      flushList();
      renderedElements.push(
        <h5 key={`h2-${i}`} className="markdown-h2">
          {parseInline(trimmed.slice(3))}
        </h5>
      );
      continue;
    }

    // Heading 3 (### ...)
    if (trimmed.startsWith("### ")) {
      flushList();
      renderedElements.push(
        <h6 key={`h3-${i}`} className="markdown-h3">
          {parseInline(trimmed.slice(4))}
        </h6>
      );
      continue;
    }

    // Bullet List Item (• , - , * )
    if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || (trimmed.startsWith("* ") && !trimmed.startsWith("**"))) {
      const bulletText = trimmed.startsWith("• ")
        ? trimmed.slice(2)
        : trimmed.startsWith("- ")
        ? trimmed.slice(2)
        : trimmed.slice(2);

      currentList.push(
        <li key={`li-${i}`} className="markdown-li">
          <span className="markdown-bullet">•</span>
          <span className="markdown-li-content">{parseInline(bulletText)}</span>
        </li>
      );
      isNumberedList = false;
      continue;
    }

    // Numbered List Item (1. , 2. )
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      const [, num, text] = numberedMatch;
      currentList.push(
        <li key={`num-li-${i}`} className="markdown-li numbered-li">
          <span className="markdown-number">{num}.</span>
          <span className="markdown-li-content">{parseInline(text)}</span>
        </li>
      );
      isNumberedList = true;
      continue;
    }

    // Normal Paragraph
    flushList();
    renderedElements.push(
      <p key={`p-${i}`} className="markdown-p">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();

  return (
    <div className="markdown-container">
      {renderedElements}
      {isStreaming && <span className="streaming-cursor">▊</span>}
    </div>
  );
}
