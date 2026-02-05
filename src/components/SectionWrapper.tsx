interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

export default function SectionWrapper({ id, className = "", children }: SectionProps) {
    return (
        <section id={id} className={`py-24 relative z-10 px-6 ${className}`}>
            <div className="max-w-[1200px] mx-auto w-full">
                {children}
            </div>
        </section>
    );
}
