export default function WhyHireSection() {
  return (
    <section className="section why-hire" id="why-hire">
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">05.</span>
          Why Hire Me?
        </h2>
        <div className="hire-content">
          <div className="hire-grid">
            <div className="hire-card glass-card animate-on-scroll orbit-triad-card-1">
              <div className="hire-icon-wrapper">
                <div className="hire-orbit hire-orbit--1" />
                <div className="hire-orbit hire-orbit--2" />
                <div className="hire-orbit hire-orbit--3" />
                <div className="hire-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <h3>3+ Years Experience</h3>
              <p>Real-world Flutter development experience across diverse industry sectors</p>
            </div>
            <div className="hire-card glass-card animate-on-scroll orbit-triad-card-2">
              <div className="hire-icon-wrapper">
                <div className="hire-orbit hire-orbit--1" />
                <div className="hire-orbit hire-orbit--2" />
                <div className="hire-orbit hire-orbit--3" />
                <div className="hire-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <h3>Proven Track Record</h3>
              <p>Delivering high-quality apps published on App Store &amp; Play Store</p>
            </div>
            <div className="hire-card glass-card animate-on-scroll orbit-triad-card-3">
              <div className="hire-icon-wrapper">
                <div className="hire-orbit hire-orbit--1" />
                <div className="hire-orbit hire-orbit--2" />
                <div className="hire-orbit hire-orbit--3" />
                <div className="hire-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
              <h3>Deadline Committed</h3>
              <p>Client-oriented approach with strong commitment to timelines</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
