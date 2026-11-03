import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import PortfolioAgentWidget from "@/components/PortfolioAgentWidget";
import LegacyInteractions from "@/components/LegacyInteractions";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import DevConsoleSection from "@/components/sections/DevConsoleSection";
import WhyHireSection from "@/components/sections/WhyHireSection";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Subhabrata Das | Flutter Developer & AI Specialist",
  description: "Portfolio of Subhabrata Das, an Enterprise Flutter Developer and AI Engineer building scalable cross-platform applications.",
};

export default function Home() {
  return (
    <main>
      <InteractiveCyberCanvas />
      <div className="scroll-progress" id="scrollProgress" />
      <Navbar />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ArchitectureSection />
      <DevConsoleSection />
      <WhyHireSection />
      <CtaSection />
      <ContactSection />
      <FooterSection />

      <PortfolioAgentWidget />
      <LegacyInteractions />
    </main>
  );
}
