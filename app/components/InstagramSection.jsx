"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const IG_POSTS = [
  { src: "https://images.unsplash.com/photo-1709281847981-73a69aa6f770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D", label: "Social Media Strategy" },
  { src: "https://images.unsplash.com/photo-1674027392838-d85710a5121d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww", label: "Content Creation" },
  { src: "https://plus.unsplash.com/premium_photo-1726812103168-6ad609e53f94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww", label: "Brand Identity" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA3fHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww", label: "Performance Marketing" },
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#f7f6f2] relative overflow-clip">
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
          padding: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "92vw",
            maxWidth: "1400px",
            height: "85vh",
            maxHeight: "900px",
            overflow: "hidden",   // clips cards at y:100% so they're invisible until they slide in
            borderRadius: "32px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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
                borderRadius: "32px",
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
