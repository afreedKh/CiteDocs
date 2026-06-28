import CTA from "../../components/Landing/CTA";
import Features from "../../components/Landing/Features";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";
import Navbar from "../../components/Landing/Navbar";
import Pipeline from "../../components/Landing/Pipeline";
import Stats from "../../components/Landing/Stats";

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0b] text-white min-h-screen">
      <Navbar />
      <Hero />
      <Pipeline />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
