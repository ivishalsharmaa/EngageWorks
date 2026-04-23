"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:    sectionRef.current,
          start:      "top top",
          end:        "+=200%",      // scroll 2x the viewport height while pinned
          pin:        true,
          scrub:      1.5,           // smooth drag-linked animation
          anticipatePin: 1,
        },
      });

      /* Image: drops from top-centre small → fills the entire screen */
      tl.fromTo(
        imageRef.current,
        {
          scale:        0,
          borderRadius: "28px",
        },
        {
          scale:        1,
          borderRadius: "0px",
          ease:         "none",
        }
      );

      /* Overlay text fades in near the end */
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0.6   // starts at 60% of the scroll progress
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#f7f6f2]"
    >
      {/* The image — starts as a tiny card at top, scales to fullscreen */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform, border-radius", overflow: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Engage Works Agency"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Dim overlay — uniform dark base + gradient for depth */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* Text overlay — fades in as image fills screen */}
      <div
        ref={overlayRef}
        className="relative z-10 text-center text-white opacity-0 pointer-events-none select-none"
      >
        <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-4">
          Since 2019
        </p>
        <h2
          className="font-display leading-none tracking-wide"
          style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
        >
          WE CREATE
          <br />
          <span className="text-purple-400">IMPACT</span>
        </h2>
        <p className="text-white/50 mt-6 text-lg max-w-md mx-auto">
          Jharsuguda's premium digital agency
        </p>
      </div>
    </section>
  );
}
