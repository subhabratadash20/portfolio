import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";

export default function Contact() {
    return (
        <SectionWrapper id="contact" className="py-24">
            <Reveal>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="font-mono text-lg text-accent font-medium">06.</span>
                    Get In Touch
                </h2>
            </Reveal>

            <Reveal delay={200}>
                <div className="max-w-4xl mx-auto text-center font-medium">
                    <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                        I'm currently open to freelance engagements and new opportunities.
                        Whether you have a project in mind or just want to say hi,
                        I'd love to hear from you!
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <a href="mailto:subhabratadash2@gmail.com" className="glass-card p-8 rounded-2xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-4 group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div>
                                <span className="block text-sm text-text-tertiary mb-1">Email</span>
                                <span className="text-white group-hover:text-accent transition-colors">subhabratadash2@gmail.com</span>
                            </div>
                        </a>

                        <a href="https://linkedin.com/in/subhabratadas" target="_blank" rel="noopener noreferrer" className="glass-card p-8 rounded-2xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-4 group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </div>
                            <div>
                                <span className="block text-sm text-text-tertiary mb-1">LinkedIn</span>
                                <span className="text-white group-hover:text-accent transition-colors">Connect with me</span>
                            </div>
                        </a>

                        <div className="glass-card p-8 rounded-2xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div>
                                <span className="block text-sm text-text-tertiary mb-1">Location</span>
                                <span className="text-white group-hover:text-accent transition-colors">Kolkata, India</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="mailto:subhabratadash2@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        <span>Say Hello</span>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>
                    </a>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
