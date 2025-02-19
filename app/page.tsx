import AboutSection from "@/components/landing_page/AboutSection";
import ContactSection from "@/components/landing_page/ContactSection";
import FeaturesSection from "@/components/landing_page/FeaturesSection";
import Footer from "@/components/landing_page/Footer";
import Header from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <Hero />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
