export default function AboutSection() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">01.</span>
          About Me
        </h2>
        <div className="about-content">
          <div className="about-text animate-on-scroll reveal-left">
            <p className="about-intro">
              I&apos;m a <span className="highlight">Flutter Developer &amp; AI-Powered Application Specialist</span>
              {" "}based in Kolkata, India, passionate about crafting exceptional mobile experiences.
            </p>
            <p>
              With expertise in creating cross-platform applications, I focus on seamless AI integration
              and robust backend solutions. I&apos;m dedicated to developing scalable and high-performance
              applications leveraging Flutter, Dart, Firebase, and REST APIs.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card glass-card animate-on-scroll stat-card-launch">
              <div className="stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <span className="stat-number" data-count="10">0</span><span className="stat-suffix">+</span>
              <span className="stat-label">Apps Deployed</span>
            </div>
            <div className="stat-card glass-card animate-on-scroll stat-card-launch">
              <div className="stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="stat-number" data-count="3">0</span><span className="stat-suffix">+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card glass-card animate-on-scroll stat-card-launch">
              <div className="stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="stat-number" data-count="8">0</span><span className="stat-suffix">.99</span>
              <span className="stat-label">CGPA (B.C.A.)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
