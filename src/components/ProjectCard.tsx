import Link from "next/link";

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    features: string[];
    links: {
        details?: string;
        appStore?: string;
        playStore?: string;
    };
    icon?: React.ReactNode;
}

export default function ProjectCard({
    title,
    subtitle,
    description,
    tags,
    features,
    links,
    icon,
}: ProjectCardProps) {
    return (
        <article className="glass-card rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 group">
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="text-secondary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform">
                    {icon || (
                        <svg className="w-16 h-16 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent opacity-60" />
            </div>

            <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-accent border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{title}</h3>
                <p className="text-text-secondary font-medium mb-4">{subtitle}</p>
                <p className="text-text-tertiary text-sm leading-relaxed mb-6">
                    {description}
                </p>

                <ul className="mb-8 space-y-2">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4 mt-auto">
                    {links.details && (
                        <Link
                            href={links.details}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary-light font-medium hover:bg-primary hover:text-white transition-all shadow-glow hover:translate-y-[2px]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            Details
                        </Link>
                    )}
                    {/* Add other links if needed */}
                </div>
            </div>
        </article>
    );
}
