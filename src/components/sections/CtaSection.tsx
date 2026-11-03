export default function CtaSection() {
  return (
    <section className="cta-banner animate-on-scroll cta-warp-banner">
      <div className="cta-banner-bg" />
      <div className="cta-banner-borders" />
      <div className="cta-banner-content">
        <div className="cta-banner-eyebrow animate-on-scroll">
          <span className="cta-banner-eyebrow-dot" />
          Open to Opportunities
        </div>
        <h2 className="animate-on-scroll">Let&apos;s Build Something Amazing</h2>
        <p className="animate-on-scroll">
          From AI-powered apps to real-time platforms — I bring ideas to life with precision,
          passion, and pixel-perfect attention to detail.
        </p>
        <div className="cta-banner-actions animate-on-scroll">
          <a href="mailto:subhabratadash1@gmail.com" className="btn btn-primary">
            <span>Start a Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </a>
          <a href="#projects" className="btn btn-secondary">
            <span>See My Work</span>
          </a>
        </div>
      </div>
    </section>
  );
}
