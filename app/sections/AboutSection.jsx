"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "10+",  label: "Happy Clients"      },
  { num: "4",    label: "Projects Delivered"  },
  { num: "2",    label: "Years of Excellence" },
  { num: "95%",  label: "Client Retention"    },
];

const AnimatedText = ({ text }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] about-word" style={{ willChange: "opacity, transform, filter" }}>
          {word}
        </span>
      ))}
    </>
  );
};

export default function AboutSection() {
  const secRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* set initial state via GSAP — never rely on className opacity-0 */
      gsap.set(".about-line", { yPercent: 110 });
      gsap.set(".about-stat", { opacity: 0, y: 30 });

      gsap.to(".about-line", {
        yPercent: 0, stagger: 0.1, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".about-title", start: "top 82%" },
      });

      // Text word-by-word reveal with blur
      gsap.set(".about-word", { opacity: 0, y: 15, filter: "blur(8px)" });
      gsap.to(".about-word", {
        opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.015, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".about-text-container", start: "top 85%" },
      });

      // Button pop-in
      gsap.set(".about-btn", { opacity: 0, scale: 0.9, y: 20 });
      gsap.to(".about-btn", {
        opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 0.4,
        scrollTrigger: { trigger: ".about-text-container", start: "top 85%" },
      });

      gsap.set(".about-stat", { opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" });
      gsap.to(".about-stat", {
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)", stagger: 0.15, duration: 0.8, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="about" className="pt-16 pb-32 md:pt-24 md:pb-48 px-8 md:px-16 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage:"radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize:"36px 36px" }} />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label mb-6">Who We Are</p>
            <div className="about-title">
              {["We don't just", "build websites.", "We build growth."].map((l, i) => (
                <div key={i} className="overflow-hidden">
                  <span className={`about-line block font-display leading-[0.92] tracking-wide ${i === 1 ? "grad" : "text-gray-900"}`}
                    style={{ fontSize: "clamp(2.8rem,5vw,6rem)" }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 about-text-container">
            <p className="text-gray-600 text-lg leading-relaxed flex flex-wrap">
              <AnimatedText text="Engage Works is a full-service digital agency based in Jharsuguda. We combine strategy, design, and technology to create brands that genuinely connect with audiences and drive real business results." />
            </p>
            <p className="text-gray-500 leading-relaxed flex flex-wrap">
              <AnimatedText text="From startups to established businesses, we partner with ambitious brands ready to invest in their digital presence. Every project is crafted with intention, precision, and a focus on measurable impact." />
            </p>
            <a href="#contact" className="btn-primary self-start text-sm py-3 px-7 mt-2 about-btn relative group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Work with us
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat bg-[#f7f6f2] rounded-2xl p-8 border border-black/[0.06] relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/20 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="font-display text-5xl text-gray-900 leading-none mb-2 relative z-10 group-hover:scale-105 group-hover:text-purple-900 transition-all duration-500 origin-left">{s.num}</p>
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase relative z-10">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
