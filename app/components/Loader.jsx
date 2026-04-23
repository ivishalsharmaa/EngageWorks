"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef    = useRef(null);
  const containerRef = useRef(null);
  const track        = useRef(null);
  const b1           = useRef(null);
  const b2           = useRef(null);
  const b3           = useRef(null);
  const b4           = useRef(null);



  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { if (onComplete) onComplete(); },
      });

      // ── Initial states ──────────────────────────────────────────
      gsap.set(track.current, { left: -50, top: 66, width: 200, height: 28, opacity: 1 });
      gsap.set(b1.current,    { left: -50, top: 66, width: 0,   height: 28 });
      gsap.set([b2.current, b3.current, b4.current], { left: 0, top: 66, width: 0, height: 28 });


      // ── Step 1: Bar fills ────────────────────────────────────────
      tl.to(b1.current, {
        width: 200,
        duration: 4.0,
        ease: "power1.inOut",
        delay: 0.3,
      });



      // ── Fade track ───────────────────────────────────────────────
      tl.to(track.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      }, "+=0.1");

      // ── Morph into E ─────────────────────────────────────────────
      tl.to(b1.current, { left: 0,  top: 0,   width: 28, height: 160, duration: 1.2, ease: "expo.inOut" }, "shapeE");
      tl.to(b2.current, { left: 28, top: 0,   width: 72, height: 28,  duration: 1.2, ease: "expo.inOut" }, "shapeE");
      tl.to(b3.current, { left: 28, top: 66,  width: 52, height: 28,  duration: 1.2, ease: "expo.inOut" }, "shapeE");
      tl.to(b4.current, { left: 28, top: 132, width: 72, height: 28,  duration: 1.2, ease: "expo.inOut" }, "shapeE");

      tl.to({}, { duration: 0.6 });

      // ── Zoom reveal ──────────────────────────────────────────────
      tl.to(containerRef.current, { scale: 60, duration: 1.4, ease: "power4.in" }, "zoomOut");
      tl.to(containerRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "zoomOut+=1.0");

    }, loaderRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Load editorial font */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      <div
        ref={loaderRef}
        className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
      >


        {/* ── E-morph container ── */}
        <div
          ref={containerRef}
          className="relative w-[100px] h-[160px]"
          style={{ willChange: "transform, opacity" }}
        >
          <div ref={track} className="absolute bg-white/5 rounded-[2px]" />
          <div ref={b1} className="absolute rounded-[1px]" style={{ background: "linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#0ea5e9 100%)" }} />
          <div ref={b2} className="absolute rounded-[1px]" style={{ background: "linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#0ea5e9 100%)" }} />
          <div ref={b3} className="absolute rounded-[1px]" style={{ background: "linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#0ea5e9 100%)" }} />
          <div ref={b4} className="absolute rounded-[1px]" style={{ background: "linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#0ea5e9 100%)" }} />
        </div>
      </div>
    </>
  );
}
