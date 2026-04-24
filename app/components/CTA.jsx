"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const secRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cta-line", { yPercent: 110 });
      gsap.to(".cta-line", {
        yPercent: 0, stagger: 0.1, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 82%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="contact" className="py-32 md:py-48 px-8 md:px-16 bg-white relative overflow-hidden">
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

        <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12">
          Ready to build a brand that converts? Drop us a message — we respond within 24 hours and every project starts with a free strategy call.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:hello@engageworks.in" className="btn-primary text-base px-10 py-5 gap-3">
            Send a Message <span className="text-xl">↗</span>
          </a>
          <a href="#work" className="btn-outline text-base px-10 py-5">View Our Work</a>
        </div>


      </div>
    </section>
  );
}
