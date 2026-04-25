"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] cta-word" style={{ willChange: "opacity, transform, filter" }}>
          {word}
        </span>
      ))}
    </>
  );
};

export default function CTA() {
  const secRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cta-line", { yPercent: 110 });
      gsap.to(".cta-line", {
        yPercent: 0, stagger: 0.1, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 82%" },
      });

      // Text word-by-word reveal with blur
      gsap.set(".cta-word", { opacity: 0, y: 15, filter: "blur(8px)" });
      gsap.to(".cta-word", {
        opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.015, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".cta-text-container", start: "top 85%" },
      });

      // Buttons pop-in
      gsap.set(".cta-btn", { opacity: 0, scale: 0.9, y: 20 });
      gsap.to(".cta-btn", {
        opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)", delay: 0.2,
        scrollTrigger: { trigger: ".cta-text-container", start: "top 85%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="contact" className="pt-16 pb-16 md:pt-24 md:pb-20 px-8 md:px-16 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />



      {/* Purple glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full bg-purple-200/30 blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center">
        <p className="section-label mb-8">Ready to grow?</p>

        <div className="cta-title mb-14">
          {["Let's Build", "Something", "Amazing"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span className={`cta-line block font-display leading-[0.92] tracking-wide ${i === 2 ? "grad" : "text-gray-900"}`}
                style={{ fontSize: "clamp(3.5rem,9vw,11rem)" }}>
                {line}
              </span>
            </div>
          ))}
        </div>

        <div className="cta-text-container">
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed mb-12 flex flex-wrap justify-center">
            <AnimatedText text="Ready to build a brand that converts? Drop us a message — we respond within 24 hours and every project starts with a free strategy call." />
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/916371106588" target="_blank" rel="noreferrer" className="btn-primary cta-btn text-base px-10 py-5 gap-3 relative group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                WhatsApp Us 
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-xl">↗</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </a>
            <a href="#work" className="btn-outline cta-btn text-base px-10 py-5 hover:bg-gray-50 transition-colors duration-300">View Our Work</a>
          </div>
        </div>


      </div>
    </section>
  );
}
