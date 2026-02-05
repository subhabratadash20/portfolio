import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";

export default function Experience() {
    return (
        <SectionWrapper id="experience" className="py-24">
            <Reveal>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="font-mono text-lg text-accent font-medium">02.</span>
                    Experience & Education
                </h2>
            </Reveal>

            <Reveal delay={200}>
                <div className="relative border-l border-white/10 ml-6 space-y-12">
                    {/* Job 1 */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-accent rounded-full ring-4 ring-background-primary group-hover:bg-primary transition-colors duration-300" />

                        <div className="glass-card p-8 rounded-2xl hover:border-accent/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Software Developer</h3>
                                    <span className="text-text-tertiary font-mono text-sm">Weavers-web Solutions Pvt. Ltd.</span>
                                </div>
                                <div className="flex flex-col items-start md:items-end text-sm text-text-tertiary gap-1">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        January 2023 – Present
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        Kolkata, India
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-2 list-disc list-inside text-text-secondary">
                                <li>Development and maintenance of Flutter applications across diverse industry sectors</li>
                                <li>Integrated AI-powered features utilizing OpenAI and Gemini platforms</li>
                                <li>Implemented sophisticated geofencing solutions for logistics-focused applications</li>
                                <li>Optimized app performance using Multi-Threading concepts</li>
                                <li>Collaborated with UI/UX designers to enhance user engagement</li>
                            </ul>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-text-tertiary rounded-full ring-4 ring-background-primary group-hover:bg-accent transition-colors duration-300" />

                        <div className="glass-card p-8 rounded-2xl hover:border-accent/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div>
                                    <h3 className="text-xl font-bold text-white">B.C.A. (Bachelor of Computer Applications)</h3>
                                    <span className="text-text-tertiary font-mono text-sm">Contai College of Learning & Management Science</span>
                                </div>
                                <div className="flex flex-col items-start md:items-end text-sm text-text-tertiary gap-1">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                                        Graduated 2023
                                    </span>
                                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-xs font-medium">8.99 CGPA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
