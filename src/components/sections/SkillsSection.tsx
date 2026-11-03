import SkillsInteractiveGrid from "@/components/SkillsInteractiveGrid";

export default function SkillsSection() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <span className="section-number">03.</span>
          Technical Proficiencies &amp; Architecture Stack
        </h2>
        <SkillsInteractiveGrid />
      </div>
    </section>
  );
}
