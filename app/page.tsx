import AboutSection from "@/components/landing_page/AboutSection";
import ContactSection from "@/components/landing_page/ContactSection";
import FeaturesSection from "@/components/landing_page/FeaturesSection";
import Footer from "@/components/landing_page/Footer";
import Hero from "@/components/landing_page/Hero";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
