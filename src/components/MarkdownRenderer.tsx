"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export default function MarkdownRenderer({ content, isStreaming }: MarkdownRendererProps) {
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
