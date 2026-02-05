import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import Reveal from "./Reveal";

export default function Projects() {
    return (
        <SectionWrapper id="projects" className="py-24">
            <Reveal>
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <span className="font-mono text-lg text-accent font-medium">04.</span>
                    Featured Projects
                </h2>
            </Reveal>

            <Reveal delay={200}>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            subtitle={project.subtitle}
                            description={project.description}
                            tags={project.tags}
                            features={project.features.flatMap(f => f.items).slice(0, 3)}
                            links={{
                                details: `/projects/${project.slug}`,
                                appStore: project.links.appStore,
                                playStore: project.links.playStore
                            }}
                            icon={<span className="text-5xl">{project.emoji}</span>}
                        />
                    ))}
                </div>
            </Reveal>

            <div className="text-center mt-12 text-text-tertiary">
                <p>+ Additional projects including FLINKI, FAMILY BOND, and more</p>
            </div>
        </SectionWrapper>
    );
}
