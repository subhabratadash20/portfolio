import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import LegacyCanvas from "@/components/LegacyCanvas";
import LegacyInteractions from "@/components/LegacyInteractions";

// This is required for static export to work with dynamic routes
interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Subhabrata Das`,
        description: project.description,
    };
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}


export default async function ProjectDetail({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="project-detail">
            <LegacyCanvas />

            <nav className="nav" id="nav">
                <div className="nav-container">
                    <a href="/" className="nav-logo">
                        <span className="logo-bracket">&lt;</span>SD<span className="logo-bracket">/&gt;</span>
                    </a>
                    <a href="/#projects" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Projects
                    </a>
                </div>
            </nav>

            <section className="project-hero">
                <div className="container">
                    <div className="project-hero-content animate-on-scroll">
                        <div className="project-emoji">{project.emoji}</div>
                        <h1 className="project-hero-title">{project.title}</h1>
                        <p className="project-hero-subtitle">{project.subtitle}</p>
                        <div className="project-hero-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <div className="project-hero-links">
                            <a href={project.links.appStore || "#"} className="btn btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"></path>
                                    <path d="M12 8v8m-4-4h8"></path>
                                </svg>
                                App Store
                            </a>
                            <a href={project.links.playStore || "#"} className="btn btn-secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Play Store
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="project-overview glass-card animate-on-scroll">
                        <h2>Overview</h2>
                        <p>{project.overview}</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title animate-on-scroll">Key Features</h2>

                    <div className="features-grid">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="feature-card glass-card animate-on-scroll">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <ul className="feature-list">
                                    {feature.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title animate-on-scroll">Tech Stack</h2>
                    <div className="tech-stack-grid animate-on-scroll">
                        {project.techStack.map((tech) => (
                            <div key={`${tech.category}-${tech.value}`} className="tech-item glass-card">
                                <span className="tech-category">{tech.category}</span>
                                <span className="tech-value">{tech.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {project.architecture && (
                <section className="section">
                    <div className="container">
                        <h2 className="section-title animate-on-scroll">Architecture Highlights</h2>
                        <div className="architecture-grid animate-on-scroll">
                            {project.architecture.map((arch) => (
                                <div key={arch.title} className="arch-card glass-card">
                                    <h4>{arch.title}</h4>
                                    <p>{arch.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <footer className="footer">
                <div className="container">
                    <a href="/#projects" className="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to All Projects
                    </a>
                </div>
            </footer>

            <LegacyInteractions />
        </main>
    );
}
