import SectionWrapper from "./SectionWrapper";
import Reveal from "./Reveal";

interface SkillCategoryProps {
    title: string;
    skills: string[];
    icon: React.ReactNode;
}

function SkillCategory({ title, skills, icon }: SkillCategoryProps) {
    return (
        <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent">
                    {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-sm text-text-secondary rounded-lg transition-colors cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <SectionWrapper id="skills" className="py-24">
            <Reveal>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="font-mono text-lg text-accent font-medium">03.</span>
                    Technical Proficiencies
                </h2>
            </Reveal>

            <Reveal delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillCategory
                        title="Mobile Development"
                        skills={["Flutter", "Dart", "GetX", "Provider", "Riverpod"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        }
                    />
                    <SkillCategory
                        title="Backend & Database"
                        skills={["Firebase", "Hive", "NoSQL", "REST APIs", "Supabase"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                        }
                    />
                    <SkillCategory
                        title="AI & Cloud Services"
                        skills={["OpenAI", "Gemini", "Claude", "Google Cloud"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><circle cx="7.5" cy="14.5" r="1.5"></circle><circle cx="16.5" cy="14.5" r="1.5"></circle></svg>
                        }
                    />
                    <SkillCategory
                        title="Geolocation & Mapping"
                        skills={["Google Maps", "Geofencing", "Location Services"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        }
                    />
                    <SkillCategory
                        title="Other Technologies"
                        skills={["Python", "Java", "C", "CI/CD", "Git", "Agile"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,18 22,12 16,6"></polyline><polyline points="8,6 2,12 8,18"></polyline></svg>
                        }
                    />
                    <SkillCategory
                        title="Mobile & DevOps"
                        skills={["iOS Builds", "Android Builds", "App Store", "Play Store", "TestFlight"]}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        }
                    />
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
