"use client";
import { useState } from "react";
import Loader from "./components/Loader";
import GlitchTransition from "./components/GlitchTransition";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import PortfolioSection from "./sections/PortfolioSection";
import MarqueeText from "./components/MarqueeText";
import ImageReveal from "./components/ImageReveal";
import ScrollRevealImage from "./components/ScrollRevealImage";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import InstagramSection from "./components/InstagramSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <main>
      {!loaderComplete ? (
        <Loader onComplete={() => setLoaderComplete(true)} />
      ) : (
        <GlitchTransition />
      )}

      <CursorFollower />
      <Navbar />
      <Hero />
      <MarqueeText />
      <ImageReveal />
      <AboutSection />
      <ScrollRevealImage />
      <ServicesSection />
      <PortfolioSection />
      <Process />
      <Testimonials />
      <InstagramSection />
      <CTA />
      <Footer />
    </main>
  );
}
