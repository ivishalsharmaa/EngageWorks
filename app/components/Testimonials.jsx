"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] test-word" style={{ willChange: "opacity, transform, filter" }}>
          {word}
        </span>
      ))}
    </>
  );
};

const TESTIMONIALS = [
  { name: "Sarah Jenkins", role: "CEO, Lumina Tech",        quote: "Engage Works completely transformed our digital presence. Our conversion rates have doubled since launch. The design quality is simply unmatched.", avatar: "SJ" },
  { name: "Michael Chen",  role: "Founder, Nova Fitness",    quote: "The team's attention to detail and creative approach is unlike anything I've experienced. They perfectly captured the energy of our brand.",       avatar: "MC" },
  { name: "Emma Rasmus",   role: "Marketing Director, Vela", quote: "Working with Engage Works was seamless. They delivered a stunning e-commerce experience our customers genuinely love and keeps them coming back.",  avatar: "ER" },
  { name: "Rohan Mehta",   role: "Co-founder, Aura Dining",  quote: "Our reservation rate went up 3x after the website launch. The visual storytelling they created for our brand is exceptional.",                       avatar: "RM" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const quoteRef = useRef(null);

  const goTo = (i) => {
    if (i === active) return;
    const q = quoteRef.current;
    
    // Animate out container
    gsap.to(q, { opacity: 0, y: -10, duration: 0.25, onComplete: () => {
      setActive(i);
      
      // Reset container
      gsap.set(q, { opacity: 1, y: 0 });
      
      // Animate new words in after state updates
      setTimeout(() => {
        gsap.set(".test-word", { opacity: 0, y: 10, filter: "blur(6px)" });
        gsap.to(".test-word", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.015, duration: 0.6, ease: "power2.out" });
      }, 10);
    }});
  };

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".test-word", { opacity: 0, y: 10, filter: "blur(6px)" });
      gsap.to(".test-word", {
        opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.015, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 85%" }
      });
    }, quoteRef);
    return () => ctx.revert();
  }, []);

  // Auto-play interval
  useEffect(() => {
    const iv = setInterval(() => goTo((active + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(iv);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-20 px-8 md:px-16 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="section-label mb-5">Testimonials</p>
          <h2 className="font-display text-gray-900 leading-[0.9] tracking-wide" style={{ fontSize: "clamp(3rem,6vw,7rem)" }}>
            What clients <span className="grad">say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          {/* Quote */}
          <div ref={quoteRef}>
            <div className="font-display text-[4rem] leading-none text-purple-200 mb-4 select-none">"</div>
            <p className="text-gray-700 text-2xl md:text-3xl leading-[1.5] font-light max-w-3xl mb-10 flex flex-wrap">
              <AnimatedText text={t.quote} />
            </p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center font-semibold text-sm text-white shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Selector */}
          <div className="flex flex-col gap-0 border border-black/[0.07] rounded-2xl overflow-hidden">
            {TESTIMONIALS.map((tt, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`flex items-center gap-4 px-6 py-5 text-left transition-all duration-300
                  ${i < TESTIMONIALS.length - 1 ? "border-b border-black/[0.07]" : ""}
                  ${active === i ? "bg-[#f7f6f2]" : "hover:bg-gray-50"}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${active === i ? "bg-purple-600" : "bg-black/15"}`} />
                <div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${active === i ? "text-gray-900" : "text-gray-400"}`}>{tt.name}</p>
                  <p className="text-gray-400 text-xs">{tt.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
