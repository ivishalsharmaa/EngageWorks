"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", title: "Strategy",    desc: "Deep-dive into your brand, market, and audience. We build a data-driven roadmap before a single pixel is touched.", icon: "⚡" },
  { num: "02", title: "Design",      desc: "Wireframes, moodboards, and high-fidelity UI. Every element intentional, every screen considered.", icon: "✦" },
  { num: "03", title: "Development", desc: "Built on modern, scalable tech. Performance-first code that ranks on Google and converts visitors.", icon: "◈" },
  { num: "04", title: "Launch",      desc: "Deployment, SEO, analytics, and continuous optimisation. We don't vanish after going live.", icon: "◉" },
];

export default function Process() {
  const secRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".process-step", { opacity: 0, y: 50 });
      gsap.to(".process-step", {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 80%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f6f2] relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <p className="section-label mb-5">Our Process</p>
          <h2 className="font-display text-gray-900 leading-[0.9] tracking-wide max-w-xl"
            style={{ fontSize: "clamp(3rem,6vw,7rem)" }}>
            How We <span className="grad">Work</span>
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step) => (
            <div key={step.num}
              className="process-step bg-white rounded-2xl p-8 border border-black/[0.06] group hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/40 transition-all duration-500 relative overflow-hidden">
              <span className="absolute -right-3 -top-3 font-display text-[6rem] leading-none text-black/[0.03] select-none group-hover:text-purple-500/[0.05] transition-colors duration-700">
                {step.num}
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#f7f6f2] group-hover:bg-purple-600 flex items-center justify-center text-xl text-purple-600 group-hover:text-white transition-all duration-400 mb-6">
                {step.icon}
              </div>
              <h3 className="font-display text-2xl tracking-wide text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
