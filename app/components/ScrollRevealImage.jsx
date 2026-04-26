"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealImage() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section while reveal happens
      gsap.to(imageRef.current, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", // scroll distance
          scrub: 1.2,
          pin: true,
          anticipatePin: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#f7f6f2] overflow-hidden"
    >
      {/* Background/Base layer or noise if needed */}
      <div className="absolute inset-0 bg-[#f7f6f2]" />

      {/* The Reveal Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
      >
        <img
          src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Premium Office Space"
          className="w-full h-full object-cover"
        />
        
        {/* Subtle dark overlay for text contrast if added later */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Optional Brand Text that appears with image */}
        <div className="absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 w-full flex justify-center text-center md:block md:w-auto md:text-left md:bottom-20 md:left-20 px-4 md:px-0">
          <h2 className="font-display text-white text-6xl sm:text-7xl md:text-8xl leading-[1.1] md:leading-none tracking-tight">
            CRAFTED <br className="md:hidden" /> WITH <br /> <span className="text-purple-400">PRECISION</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
