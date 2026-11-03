import ProjectShowcase from "@/components/ProjectShowcase";

export default function ProjectsSection() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">04.</span>
          Featured Projects
        </h2>
        <ProjectShowcase />
        <p className="projects-note animate-on-scroll">
          + Additional client solutions, enterprise modules &amp; ongoing production releases
        </p>
      </div>
    </section>
  );
}
