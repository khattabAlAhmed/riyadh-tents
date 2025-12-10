import HeroSection from "@/components/sections/HeroSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TentsSection from "@/components/sections/TentsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CustomTentSection from "@/components/sections/CustomTentSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <ServicesSection />
        <TentsSection />
        <ProjectsSection />
        <CustomTentSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
