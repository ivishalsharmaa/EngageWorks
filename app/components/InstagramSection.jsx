"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const IG_POSTS = [
  { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&h=700&fit=crop", label: "Social Media Strategy" },
  { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=700&fit=crop", label: "Content Creation" },
  { src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&h=700&fit=crop", label: "Brand Identity" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=700&fit=crop", label: "Performance Marketing" },
  { src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&h=700&fit=crop", label: "Web Development" },
];

export default function InstagramSection() {
  const containerRef = useRef(null);
  const imgRefs      = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs   = imgRefs.current;
      const total  = imgs.length;
      if (!imgs[0]) return;

      // Stack all cards: first on top, rest hidden below
      // z-index is set in JSX — don't override here
      gsap.set(imgs[0], { y: "0%", scale: 1, rotation: 0 });
      for (let i = 1; i < total; i++) {
        gsap.set(imgs[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ig-sticky",
          start: "top top",
          end: `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        // Current card: scale down + slight tilt as next slides up
        tl.to(imgs[i],     { scale: 0.72, rotation: 4, duration: 1, ease: "none" }, i);
        // Next card: slides up from below
        tl.to(imgs[i + 1], { y: "0%",                  duration: 1, ease: "none" }, i);
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      if (containerRef.current) ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#f7f6f2] relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Header — outside the pin so it scrolls away */}
      <div className="px-8 md:px-16 pt-24 pb-12 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <FaInstagram className="text-white" size={17} />
          </div>
          <div>
            <p className="text-gray-900 font-semibold tracking-wide">@_engage.works_</p>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Follow us on Instagram</p>
          </div>
        </div>
        <a
          href="https://instagram.com/_engage.works_"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1.5rem", borderRadius: "999px",
            border: "1.5px solid rgba(0,0,0,0.1)", color: "#111",
            fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em",
            textDecoration: "none", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#a855f7"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}
        >
          Follow us <FaInstagram size={13} />
        </a>
      </div>

      {/* Sticky card stack */}
      <div
        className="ig-sticky"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "680px",
            height: "75vh",
            maxHeight: "520px",
            overflow: "hidden",   // clips cards at y:100% so they're invisible until they slide in
            borderRadius: "20px",
          }}
        >
          {IG_POSTS.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com/_engage.works_"
              target="_blank"
              rel="noreferrer"
              ref={el => { imgRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                overflow: "hidden",
                display: "block",
                transformOrigin: "bottom center",
                // Later cards have higher zIndex so they slide up and COVER the previous card
                // overflow:hidden on container clips them at y:100% until they scroll in
                zIndex: i + 1,
              }}
            >
              <img
                src={post.src}
                alt={post.label}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Label overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
              }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.75rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <FaInstagram size={14} color="rgba(255,255,255,0.7)" />
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {post.label}
                </span>
              </div>
              {/* Card number */}
              <span style={{ position: "absolute", top: "1.25rem", right: "1.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em" }}>
                {String(i + 1).padStart(2, "0")} / {String(IG_POSTS.length).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom padding to account for pinSpacing */}
    </section>
  );
}
