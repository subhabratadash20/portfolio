import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";

export default function About() {
    return (
        <SectionWrapper id="about" className="py-24">
            <Reveal>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="font-mono text-lg text-accent font-medium">01.</span>
                    About Me
                </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal delay={200}>
                    <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                        <p>
                            I'm a <span className="text-accent font-semibold">Flutter Developer & AI-Powered Application Specialist</span> based in Kolkata, India, passionate about crafting exceptional mobile experiences.
                        </p>
                        <p>
                            With expertise in creating cross-platform applications, I focus on seamless AI integration
                            and robust backend solutions. I'm dedicated to developing scalable and high-performance
                            applications leveraging Flutter, Dart, Firebase, and REST APIs.
                        </p>
                        <p>
                            Available for <span className="text-accent font-semibold">freelance engagements</span> in mobile development,
                            AI-driven solutions, and UI/UX design consultation.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={400}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300">
                            <span className="block text-4xl font-bold text-white mb-2 group-hover:text-accent transition-colors">10+</span>
                            <span className="text-sm text-text-tertiary">Apps Deployed</span>
                        </div>
                        <div className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300">
                            <span className="block text-4xl font-bold text-white mb-2 group-hover:text-accent transition-colors">3+</span>
                            <span className="text-sm text-text-tertiary">Years Experience</span>
                        </div>
                        <div className="glass-card p-6 rounded-xl text-center col-span-2 md:col-span-1 group hover:scale-105 transition-transform duration-300">
                            <span className="block text-4xl font-bold text-white mb-2 group-hover:text-accent transition-colors">8.99</span>
                            <span className="text-sm text-text-tertiary">CGPA (B.C.A.)</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </SectionWrapper>
    );
}
