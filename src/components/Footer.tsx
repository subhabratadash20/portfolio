import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-white/5 bg-background-secondary text-center">
            <div className="container mx-auto px-6">
                <Link href="/" className="font-mono text-xl font-bold tracking-tighter inline-block mb-4">
                    <span className="text-accent">&lt;</span>SD
                    <span className="text-accent">/&gt;</span>
                </Link>

                <p className="text-text-tertiary text-sm mb-4">
                    Built with Next.js, Tailwind CSS & Flutter love.
                </p>

                <div className="flex justify-center gap-6 mb-8">
                    {/* Add Social Icons Here if needed, using text for now */}
                    <a href="https://github.com/subhabratadash20" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">LinkedIn</a>
                    <a href="mailto:subhabratadash007@gmail.com" className="text-text-secondary hover:text-accent transition-colors">Email</a>
                </div>

                <p className="text-text-tertiary text-xs">
                    © {currentYear} Subhabrata Das. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
