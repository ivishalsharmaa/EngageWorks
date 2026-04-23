"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "150+",  label: "Happy Clients"      },
  { num: "320+",  label: "Projects Delivered"  },
  { num: "5+",    label: "Years of Excellence" },
  { num: "98%",   label: "Client Retention"    },
];

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
      gsap.to(".about-stat", {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 84%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="about" className="py-32 md:py-48 px-8 md:px-16 bg-white relative overflow-hidden">
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
          <div className="flex flex-col gap-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Engage Works is a full-service digital agency based in Mumbai. We combine strategy, design, and technology to create brands that genuinely connect with audiences and drive real business results.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From startups to established businesses, we partner with ambitious brands ready to invest in their digital presence. Every project is crafted with intention, precision, and a focus on measurable impact.
            </p>
            <a href="#contact" className="btn-primary self-start text-sm py-3 px-7 mt-2">Work with us ↗</a>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat bg-[#f7f6f2] rounded-2xl p-8 border border-black/[0.06]">
              <p className="font-display text-5xl text-gray-900 leading-none mb-2">{s.num}</p>
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
