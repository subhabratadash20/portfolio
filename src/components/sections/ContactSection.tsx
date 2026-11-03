"use client";

import { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    let copySuccess = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("subhabratadash1@gmail.com");
        copySuccess = true;
      } else if (typeof document !== "undefined") {
        const input = document.createElement("input");
        input.value = "subhabratadash1@gmail.com";
        document.body.appendChild(input);
        input.select();
        copySuccess = document.execCommand("copy");
        document.body.removeChild(input);
      }
    } catch { copySuccess = false; }

    if (copySuccess) {
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">06.</span>
          Get In Touch
        </h2>
        <div className="contact-content">
          <p className="contact-intro animate-on-scroll reveal-left">
            I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to say hi, I&apos;d love to hear from you!
          </p>
          <div className="contact-links">
            <a
              href="mailto:subhabratadash1@gmail.com"
              onClick={handleCopyEmail}
              className="contact-card glass-card animate-on-scroll channel-lock-card"
              style={{ position: "relative" }}
              title="Click to copy email address"
            >
              <div className={`copy-tooltip ${copied ? "show" : ""}`}>
                ✓ Copied to clipboard!
              </div>
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="contact-label">Email {copied ? "(Copied!)" : "(1-Click Copy)"}</span>
              <span className="contact-value">subhabratadash1@gmail.com</span>
            </a>

            <a href="https://linkedin.com/in/subhabratadash" target="_blank" rel="noopener noreferrer" className="contact-card glass-card animate-on-scroll channel-lock-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">Connect with me</span>
            </a>

            <a href="https://github.com/subhabratadash20" target="_blank" rel="noopener noreferrer" className="contact-card glass-card contact-card--github animate-on-scroll channel-lock-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">View my code</span>
            </a>

            <a href="https://x.com/subhabrata91463" target="_blank" rel="noopener noreferrer" className="contact-card glass-card contact-card--twitter animate-on-scroll channel-lock-card">
              <div className="contact-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="contact-label">Twitter / X</span>
              <span className="contact-value">Follow me</span>
            </a>

            <div className="contact-card glass-card animate-on-scroll channel-lock-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="contact-label">Location</span>
              <span className="contact-value">Kolkata, India</span>
            </div>
          </div>
          <a href="mailto:subhabratadash1@gmail.com" className="btn btn-primary btn-large animate-on-scroll say-hello-magnetic">
            <span>Say Hello</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
