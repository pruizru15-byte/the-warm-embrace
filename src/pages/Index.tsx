import Navbar from "@/components/Navbar";
import TechHeroSection from "@/components/TechHeroSection";
import ParticleGrid from "@/components/ParticleGrid";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import GallerySection from "@/components/GallerySection";
import PoemsSection from "@/components/PoemsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleGrid />
      <Navbar />
      <TechHeroSection />
      <AboutSection />
      <SkillsSection />
      <GallerySection />
      <PoemsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
