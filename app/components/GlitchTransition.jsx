"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlitchTransition({ onComplete }) {
  const containerRef = useRef(null);
  const slicesRef = useRef([]); // Vertical columns

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (onComplete) onComplete();
          gsap.set(containerRef.current, { display: "none" });
        }
      });

      const slices = slicesRef.current;

      // 1. Initial State: Pillars cover the whole screen
      gsap.set(slices, { y: 0, opacity: 1 });

      // 2. The Clean Reveal (Pillars slide UP)
      tl.to(slices, {
        y: "-100%",
        stagger: {
          amount: 0.7,
          from: "random"
        },
        duration: 1.5,
        ease: "expo.inOut"
      }, "+=0.2"); // Slight delay after mounting

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const colCount = 12;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
    >
      <div className="relative w-full h-full flex">
        {Array.from({ length: colCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (slicesRef.current[i] = el)}
            className="h-full flex-1 bg-[#050505] border-x border-white/[0.03]"
            style={{ willChange: "transform" }}
          />
        ))}
      </div>
    </div>
  );
}



