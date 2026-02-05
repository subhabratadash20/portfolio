import type { Metadata } from "next";
import type { ReactNode, CSSProperties } from "react";
import profilePhoto from "../../1770286377375(1).png";
import LegacyCanvas from "@/components/LegacyCanvas";
import LegacyInteractions from "@/components/LegacyInteractions";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Subhabrata Das | Flutter Developer & AI Specialist",
  description: "Portfolio of Subhabrata Das, a specialized Flutter Developer and AI Engineer building scalable cross-platform applications.",
};

const projectCardFeatures: Record<string, string[]> = {
  konnectax: [
    "Multi-platform simulcasting via Mux",
    "Unified live comments system",
    "OAuth social platform integration",
  ],
  plugg: [
    "AI-powered matchmaking algorithm",
    "Real-time chat with rich media",
    "RevenueCat subscription system",
  ],
  "nora-ai": [
    "Dual TTS (OpenAI & ElevenLabs)",
    "Smart alarm & calendar integration",
    "Offline-first architecture",
  ],
  "diy-marketplace": [
    "Dual-role marketplace",
    "Arabic & English (RTL support)",
    "Seller analytics dashboard",
  ],
  stylaa: [
    "Dual-platform (users & businesses)",
    "Real-time appointment scheduling",
    "AI-based service recommendations",
  ],
  groundmetrx: [
    "Real-time asset tracking",
    "Optimized delivery routes",
    "Functional offline mode",
  ],
};

const projectPlaceholders: Record<string, ReactNode> = {
  konnectax: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  plugg: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  "nora-ai": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
      <circle cx="7.5" cy="14.5" r="1.5"></circle>
      <circle cx="16.5" cy="14.5" r="1.5"></circle>
    </svg>
  ),
  "diy-marketplace": (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  stylaa: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  ),
  groundmetrx: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
};

type LogoNode = {
  key: string;
  label: string;
  icon: string;
  angle: string;
  delay: number;
  duration: number;
  reverse?: boolean;
};

const orbitStyle = (angle: string, duration: number) =>
  ({ "--angle": angle, "--spin-duration": `${duration}s` } as CSSProperties);
const iconify = (icon: string) =>
  `https://api.iconify.design/${icon}.svg?color=%23ffffff`;

const logoNodesOuter: LogoNode[] = [
  { key: "flutter", label: "Flutter", icon: iconify("simple-icons:flutter"), angle: "-90deg", delay: 0, duration: 38 },
  { key: "dart", label: "Dart", icon: iconify("simple-icons:dart"), angle: "-60deg", delay: 150, duration: 34, reverse: true },
  { key: "firebase", label: "Firebase", icon: iconify("simple-icons:firebase"), angle: "-30deg", delay: 300, duration: 42 },
  { key: "google-cloud", label: "Google Cloud", icon: iconify("simple-icons:googlecloud"), angle: "0deg", delay: 450, duration: 36, reverse: true },
  { key: "openai", label: "OpenAI", icon: iconify("simple-icons:openai"), angle: "30deg", delay: 600, duration: 40 },
  { key: "gemini", label: "Gemini", icon: iconify("simple-icons:googlegemini"), angle: "60deg", delay: 750, duration: 32, reverse: true },
  { key: "claude", label: "Claude", icon: iconify("simple-icons:anthropic"), angle: "90deg", delay: 900, duration: 44 },
  { key: "google-maps", label: "Google Maps", icon: iconify("simple-icons:googlemaps"), angle: "120deg", delay: 1050, duration: 35, reverse: true },
  { key: "git", label: "Git", icon: iconify("simple-icons:git"), angle: "150deg", delay: 1200, duration: 39 },
  { key: "python", label: "Python", icon: iconify("simple-icons:python"), angle: "180deg", delay: 1350, duration: 33, reverse: true },
  { key: "java", label: "Java", icon: iconify("simple-icons:java"), angle: "210deg", delay: 1500, duration: 41 },
  { key: "c", label: "C", icon: iconify("simple-icons:c"), angle: "240deg", delay: 1650, duration: 37, reverse: true },
];

const logoNodesInner: LogoNode[] = [
  { key: "getx", label: "GetX", icon: iconify("simple-icons:getx"), angle: "-80deg", delay: 100, duration: 26 },
  { key: "provider", label: "Provider", icon: iconify("tabler:layers"), angle: "-40deg", delay: 250, duration: 24, reverse: true },
  { key: "riverpod", label: "Riverpod", icon: "https://riverpod.dev/img/logo.svg", angle: "0deg", delay: 400, duration: 28 },
  { key: "hive", label: "Hive", icon: iconify("simple-icons:apachehive"), angle: "40deg", delay: 550, duration: 22, reverse: true },
  { key: "nosql", label: "NoSQL", icon: iconify("tabler:database"), angle: "80deg", delay: 700, duration: 30 },
  { key: "rest", label: "REST APIs", icon: iconify("tabler:api"), angle: "120deg", delay: 850, duration: 23, reverse: true },
  { key: "geofencing", label: "Geofencing", icon: iconify("tabler:map-pin"), angle: "160deg", delay: 1000, duration: 27 },
  { key: "cicd", label: "CI/CD", icon: iconify("tabler:git-merge"), angle: "200deg", delay: 1150, duration: 25, reverse: true },
  { key: "agile", label: "Agile", icon: iconify("tabler:repeat"), angle: "240deg", delay: 1300, duration: 29 },
];

export default function Home() {
  return (
    <main>
      <LegacyCanvas />
      <div className="scroll-progress" id="scrollProgress"></div>

      <nav className="nav" id="nav">
        <div className="nav-container">
          <a href="#hero" className="nav-logo">
            <span className="logo-bracket">&lt;</span>SD<span className="logo-bracket">/&gt;</span>
          </a>
          <button className="nav-toggle" id="navToggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-menu" id="navMenu">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#contact" className="nav-link nav-link--cta">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge animate-on-scroll">
            <span className="badge-dot"></span>
            Available for freelance & opportunities
          </div>
          <h1 className="hero-title animate-on-scroll">
            <span className="hero-greeting">Hi, I'm</span>
            <span className="hero-name">Subhabrata Das</span>
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            <span className="typewriter" id="typewriter"></span>
            <span className="cursor">|</span>
          </p>
          <p className="hero-description animate-on-scroll">
            A highly motivated Flutter Developer with 3+ years of experience
            creating cross-platform applications, seamless AI integration,
            and robust backend solutions.
          </p>
          <div className="hero-cta animate-on-scroll">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Get In Touch</span>
            </a>
          </div>
          <div className="pipeline-wrapper animate-on-scroll">
            <div className="pipeline-center sun-core">
              <img
                className="profile-photo"
                src={profilePhoto.src}
                alt="Subhabrata Das"
                width={220}
                height={220}
              />
            </div>
            <svg className="pipeline-lines" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pipeGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#00D9FF" />
                </linearGradient>
              </defs>
              <path className="pipeline-base" d="M500 300 m -260 0 a 260 260 0 1 0 520 0 a 260 260 0 1 0 -520 0" />
              <path className="pipeline-flow pipeline-flow--outer" d="M500 300 m -260 0 a 260 260 0 1 0 520 0 a 260 260 0 1 0 -520 0" />
              <path className="pipeline-base pipeline-base--inner" d="M500 300 m -190 0 a 190 190 0 1 0 380 0 a 190 190 0 1 0 -380 0" />
              <path className="pipeline-flow pipeline-flow--inner" d="M500 300 m -190 0 a 190 190 0 1 0 380 0 a 190 190 0 1 0 -380 0" />
            </svg>
            <div className="pipeline-orbit pipeline-orbit--outer">
              {logoNodesOuter.map((node) => (
                <div
                  key={node.key}
                  className={`pipeline-node ${node.reverse ? "orbit-reverse" : ""}`}
                  style={orbitStyle(node.angle, node.duration)}
                >
                  <button
                    type="button"
                    className="pipeline-node-inner"
                    data-label={node.label}
                    aria-label={node.label}
                    style={{ animationDelay: `${node.delay}ms` }}
                  >
                  <div className="logo-icon">
                    <img src={node.icon} alt={node.label} />
                  </div>
                  </button>
                </div>
              ))}
            </div>
            <div className="pipeline-orbit pipeline-orbit--inner">
              {logoNodesInner.map((node) => (
                <div
                  key={node.key}
                  className={`pipeline-node ${node.reverse ? "orbit-reverse" : ""}`}
                  style={orbitStyle(node.angle, node.duration)}
                >
                  <button
                    type="button"
                    className="pipeline-node-inner"
                    data-label={node.label}
                    aria-label={node.label}
                    style={{ animationDelay: `${node.delay}ms` }}
                  >
                  <div className="logo-icon">
                    <img src={node.icon} alt={node.label} />
                  </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">01.</span>
            About Me
          </h2>
          <div className="about-content">
            <div className="about-text animate-on-scroll">
              <p className="about-intro">
                I'm a <span className="highlight">Flutter Developer & AI-Powered Application Specialist</span>
                {" "}based in Kolkata, India, passionate about crafting exceptional mobile experiences.
              </p>
              <p>
                With expertise in creating cross-platform applications, I focus on seamless AI integration
                and robust backend solutions. I'm dedicated to developing scalable and high-performance
                applications leveraging Flutter, Dart, Firebase, and REST APIs.
              </p>
              <p>
                Available for <span className="highlight">freelance engagements</span> in mobile development,
                AI-driven solutions, and UI/UX design consultation.
              </p>
            </div>
            <div className="about-stats animate-on-scroll">
              <div className="stat-card glass-card">
                <span className="stat-number" data-count="10">0</span><span className="stat-suffix">+</span>
                <span className="stat-label">Apps Deployed</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-number" data-count="3">0</span><span className="stat-suffix">+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-number" data-count="8">0</span><span className="stat-suffix">.99</span>
                <span className="stat-label">CGPA (B.C.A.)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">02.</span>
            Experience & Education
          </h2>
          <div className="timeline">
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-marker"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <h3>Software Developer</h3>
                  <span className="timeline-company">Weavers-web Solutions Pvt. Ltd.</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    January 2023 – Present
                  </span>
                  <span className="timeline-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Kolkata, India
                  </span>
                </div>
                <ul className="timeline-details">
                  <li>Development and maintenance of Flutter applications across diverse industry sectors</li>
                  <li>Integrated AI-powered features utilizing OpenAI and Gemini platforms</li>
                  <li>Implemented sophisticated geofencing solutions for logistics-focused applications</li>
                  <li>Optimized app performance using Multi-Threading concepts</li>
                  <li>Collaborated with UI/UX designers to enhance user engagement</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item animate-on-scroll">
              <div className="timeline-marker education"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <h3>B.C.A. (Bachelor of Computer Applications)</h3>
                  <span className="timeline-company">Contai College of Learning & Management Science</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    Graduated 2023
                  </span>
                  <span className="timeline-badge">8.99 CGPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills" id="skills">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">03.</span>
            Technical Proficiencies
          </h2>
          <div className="skills-grid">
            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <h3>Mobile Development</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">Dart</span>
                <span className="skill-tag">GetX</span>
                <span className="skill-tag">Provider</span>
                <span className="skill-tag">Riverpod</span>
              </div>
            </div>

            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </div>
                <h3>Backend & Database</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">Hive</span>
                <span className="skill-tag">NoSQL</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">Supabase</span>
              </div>
            </div>

            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon ai-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                    <circle cx="7.5" cy="14.5" r="1.5"></circle>
                    <circle cx="16.5" cy="14.5" r="1.5"></circle>
                  </svg>
                </div>
                <h3>AI & Cloud Services</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">OpenAI</span>
                <span className="skill-tag">Gemini</span>
                <span className="skill-tag">Claude</span>
                <span className="skill-tag">Google Cloud</span>
              </div>
            </div>

            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3>Geolocation & Mapping</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Google Maps</span>
                <span className="skill-tag">Geofencing</span>
                <span className="skill-tag">Location Services</span>
              </div>
            </div>

            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16,18 22,12 16,6"></polyline>
                    <polyline points="8,6 2,12 8,18"></polyline>
                  </svg>
                </div>
                <h3>Other Technologies</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">CI/CD</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Agile</span>
              </div>
            </div>

            <div className="skill-category glass-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <h3>Mobile & DevOps</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">iOS Builds</span>
                <span className="skill-tag">Android Builds</span>
                <span className="skill-tag">App Store</span>
                <span className="skill-tag">Play Store</span>
                <span className="skill-tag">TestFlight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">04.</span>
            Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.slug} className="project-card glass-card animate-on-scroll" data-tilt="true">
                <div className="project-image">
                  <div className="project-overlay"></div>
                  <div className="project-placeholder">
                    {projectPlaceholders[project.slug]}
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.emoji} {project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-features">
                    {(projectCardFeatures[project.slug] || []).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <a href={`/projects/${project.slug}`} className="project-link project-link--details" title="View Details">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Details
                    </a>
                    <a href={project.links.appStore || "#"} target="_blank" rel="noopener noreferrer" className="project-link" title="App Store">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"></path>
                        <path d="M12 8v8m-4-4h8"></path>
                      </svg>
                    </a>
                    <a href={project.links.playStore || "#"} target="_blank" rel="noopener noreferrer" className="project-link" title="Google Play">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="projects-note animate-on-scroll">+ Additional projects including FLINKI, FAMILY BOND, and more</p>
        </div>
      </section>

      <section className="section why-hire" id="why-hire">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">05.</span>
            Why Hire Me?
          </h2>
          <div className="hire-grid">
            <div className="hire-card glass-card animate-on-scroll">
              <div className="hire-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>3+ Years Experience</h3>
              <p>Real-world Flutter development experience across diverse industry sectors</p>
            </div>
            <div className="hire-card glass-card animate-on-scroll">
              <div className="hire-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Proven Track Record</h3>
              <p>Delivering high-quality apps published on App Store & Play Store</p>
            </div>
            <div className="hire-card glass-card animate-on-scroll">
              <div className="hire-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Deadline Committed</h3>
              <p>Client-oriented approach with strong commitment to timelines</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="section-number">06.</span>
            Get In Touch
          </h2>
          <div className="contact-content">
            <p className="contact-intro animate-on-scroll">
              I'm currently open to freelance engagements and new opportunities.
              Whether you have a project in mind or just want to say hi,
              I'd love to hear from you!
            </p>
            <div className="contact-links animate-on-scroll">
              <a href="mailto:subhabratadash2@gmail.com" className="contact-card glass-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="contact-label">Email</span>
                <span className="contact-value">subhabratadash2@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/subhabratadas" target="_blank" rel="noopener" className="contact-card glass-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">Connect with me</span>
              </a>
              <a href="#" className="contact-card glass-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="contact-label">Location</span>
                <span className="contact-value">Kolkata, India</span>
              </a>
            </div>
            <a href="mailto:subhabratadash2@gmail.com" className="btn btn-primary btn-large animate-on-scroll">
              <span>Say Hello</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Designed & Built by <span className="highlight">Subhabrata Das</span>
          </p>
          <p className="footer-copyright">© 2026 All Rights Reserved</p>
        </div>
      </footer>

      <LegacyInteractions />
    </main>
  );
}
