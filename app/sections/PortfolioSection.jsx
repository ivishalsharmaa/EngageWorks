"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { number: "01", client: "Aura Dining",   category: "Web Development · 2024",      description: "A cinematic dining experience with scroll-driven animations.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&fit=crop" },
  { number: "02", client: "Lumina Tech",   category: "Branding & Web · 2024",       description: "Complete brand identity and digital presence for a fast-growing tech startup.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=900&fit=crop" },
  { number: "03", client: "Vela Fashion",  category: "E-Commerce · 2023",           description: "A premium e-commerce experience that drove 3× revenue growth in Q1.", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop" },
  { number: "04", client: "Nova Fitness",  category: "Performance Marketing · 2023", description: "Multi-channel campaign delivering measurable ROI across channels.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop" },
];

const HERO_IMAGE  = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop";
const HERO_PCT    = 250;                                   // scroll % for hero expand
const PROJ_PCT    = (PROJECTS.length - 1) * 100;          // 300 %  (3 transitions)
const TOTAL_PCT   = HERO_PCT + PROJ_PCT;                  // 550 %
const HERO_RATIO  = HERO_PCT / TOTAL_PCT;                 // ~0.454

export default function PortfolioSection() {
  const secRef       = useRef(null);
  const stickyRef    = useRef(null);
  const imgWrapRef   = useRef(null);
  const imgRef       = useRef(null);
  const leftTextRef  = useRef(null);
  const rightTextRef = useRef(null);
  const overlayRef   = useRef(null);   // showcase overlay inside pinned div
  const bgRefs       = useRef([]);
  const cardRefs     = useRef([]);
  const dotRefs      = useRef([]);
  const titleRef     = useRef(null);
  const catRef       = useRef(null);
  const descRef      = useRef(null);
  const numRef       = useRef(null);
  const activeIdx    = useRef(0);

  const switchProject = useCallback((next, prev) => {
    if (next === prev) return;
    gsap.to(bgRefs.current[prev], { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    gsap.to(bgRefs.current[next], { opacity: 1, duration: 0.7, ease: "power2.inOut" });

    const els = [numRef.current, titleRef.current, catRef.current, descRef.current];
    gsap.timeline()
      .to(els, { opacity: 0, y: -16, duration: 0.22, ease: "power2.in", stagger: 0.04 })
      .call(() => {
        if (numRef.current)   numRef.current.textContent   = PROJECTS[next].number;
        if (titleRef.current) titleRef.current.textContent = PROJECTS[next].client;
        if (catRef.current)   catRef.current.textContent   = PROJECTS[next].category;
        if (descRef.current)  descRef.current.textContent  = PROJECTS[next].description;
      })
      .to(els, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out", stagger: 0.05 });

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i === next) {
        // Active card: lift up with a pop/bounce — feels like it's "opening"
        card.style.borderColor = "#a855f7";
        gsap.timeline()
          .to(card, { scale: 1.18, y: -10, duration: 0.18, ease: "power2.out" })
          .to(card, { scale: 1.08, y: -5,  duration: 0.4,  ease: "back.out(2.5)" });
      } else {
        // Inactive cards: settle back down
        card.style.borderColor = "rgba(255,255,255,0.18)";
        gsap.to(card, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
      }
    });

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        height: i === next ? 28 : 8,
        backgroundColor: i === next ? "#a855f7" : "rgba(255,255,255,0.3)",
        duration: 0.4, ease: "power2.out",
      });
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── initial states ──
      gsap.set(imgWrapRef.current,  { width: "24px", height: "18px", borderRadius: "6px" });
      gsap.set(imgRef.current,      { scale: 1, force3D: true });
      gsap.set([leftTextRef.current, rightTextRef.current], { opacity: 1 });
      gsap.set(overlayRef.current,  { opacity: 0 });
      bgRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      gsap.set([numRef.current, titleRef.current, catRef.current, descRef.current], { opacity: 1, y: 0 });
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        c.style.borderColor = i === 0 ? "#a855f7" : "rgba(255,255,255,0.18)";
        gsap.set(c, { scale: i === 0 ? 1.08 : 1, y: i === 0 ? -5 : 0 });
      });
      dotRefs.current.forEach((d, i) => d && gsap.set(d, {
        height: i === 0 ? 28 : 8,
        backgroundColor: i === 0 ? "#a855f7" : "rgba(255,255,255,0.3)",
      }));

      // ── one timeline, one ScrollTrigger ──
      const heroDur       = HERO_PCT  / 100;   // 2.5 s
      const totalDur      = TOTAL_PCT / 100;   // 5.5 s
      const overlayFadeDur = 0.5;               // how long overlay takes to appear
      // project switching starts only after image is full-screen AND overlay is fully visible
      const showcaseRatio = (heroDur + overlayFadeDur) / totalDur;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${TOTAL_PCT}%`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            // only switch projects after image is fully expanded + overlay is fully visible
            if (self.progress < showcaseRatio) return;
            const sp   = (self.progress - showcaseRatio) / (1 - showcaseRatio);
            const next = Math.min(Math.floor(sp * PROJECTS.length), PROJECTS.length - 1);
            if (next !== activeIdx.current) {
              switchProject(next, activeIdx.current);
              activeIdx.current = next;
            }
          },
        },
      });

      // hero: image expands
      tl.to(imgWrapRef.current, { width: "100vw", height: "100vh", borderRadius: 0, ease: "none", duration: heroDur }, 0);
      // hero: text fades mid-way
      tl.to([leftTextRef.current, rightTextRef.current], { opacity: 0, ease: "none", duration: heroDur / 3 }, heroDur / 2);
      // overlay fades in ONLY AFTER image is fully full-screen (starts at heroDur)
      tl.to(overlayRef.current, { opacity: 1, ease: "none", duration: overlayFadeDur }, heroDur);
      // dummy tween to fill project phase so the timeline has the right duration
      tl.to({}, { duration: totalDur - heroDur }, heroDur);

      setTimeout(() => ScrollTrigger.refresh(), 150);
    }, secRef);
    return () => ctx.revert();
  }, [switchProject]);

  return (
    <section ref={secRef} id="work" style={{ overflowX: "hidden" }}>

      {/* ── Single pinned container ── */}
      <div
        ref={stickyRef}
        className="flex items-center justify-center"
        style={{ height: "100vh", overflow: "hidden", position: "relative", backgroundColor: "#fff" }}
      >

        {/* GROWTH | tiny-image | STORIES */}
        <div className="flex items-center justify-center w-full px-12" style={{ gap: "1.5rem", position: "relative", zIndex: 10 }}>
          <div ref={leftTextRef} style={{ flexShrink: 0 }}>
            <span style={{ display: "block", whiteSpace: "nowrap", fontWeight: 800, fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.02em", background: "linear-gradient(135deg,#9333ea,#a855f7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              GROWTH
            </span>
          </div>

          <div ref={imgWrapRef} style={{ width: "24px", height: "18px", borderRadius: "6px", overflow: "hidden", position: "relative", flexShrink: 0, zIndex: 20, willChange: "width,height,border-radius", transform: "translateZ(0)" }}>
            <img ref={imgRef} src={HERO_IMAGE} alt="Growth Stories" draggable={false}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div ref={rightTextRef} style={{ flexShrink: 0 }}>
            <span style={{ display: "block", whiteSpace: "nowrap", fontWeight: 800, color: "#000", fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.02em" }}>
              STORIES
            </span>
          </div>
        </div>

        {/* ── Showcase overlay (fades in on top after hero is full-screen) ── */}
        <div ref={overlayRef} style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 30 }}>

          {/* Per-project background images */}
          {PROJECTS.map((p, i) => (
            <div key={p.client} ref={el => { bgRefs.current[i] = el; }}
              style={{ position: "absolute", inset: 0, opacity: i === 0 ? 1 : 0, willChange: "opacity" }}>
              <img src={p.image} alt={p.client} draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
            </div>
          ))}

          {/* Left info panel */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "52%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 4rem", zIndex: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>SELECTED WORK</p>
            <div ref={numRef} style={{ fontSize: "clamp(5rem,10vw,9rem)", fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: "-1.5rem" }}>{PROJECTS[0].number}</div>
            <h2 ref={titleRef} style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>{PROJECTS[0].client}</h2>
            <p ref={catRef} style={{ color: "#a855f7", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>{PROJECTS[0].category}</p>
            <p ref={descRef} style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "400px", marginBottom: "2rem" }}>{PROJECTS[0].description}</p>
            <a href="#contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.6rem", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", width: "fit-content" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#a855f7"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >View Project ↗</a>
          </div>

          {/* Bottom-right thumbnail cards */}
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", gap: "0.6rem", alignItems: "flex-end", zIndex: 20 }}>
            {PROJECTS.map((p, i) => (
              <div key={p.client} ref={el => { cardRefs.current[i] = el; }}
                style={{ width: "96px", height: "66px", borderRadius: "8px", overflow: "hidden", border: `2px solid ${i === 0 ? "#a855f7" : "rgba(255,255,255,0.18)"}`, transform: `scale(${i === 0 ? 1.08 : 1})`, transformOrigin: "bottom center", position: "relative", flexShrink: 0 }}>
                <img src={p.image} alt={p.client} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", bottom: 4, left: 6, color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "0.05em" }}>{p.number}</span>
              </div>
            ))}
          </div>

          {/* Right vertical progress dots */}
          <div style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "6px", zIndex: 20 }}>
            {PROJECTS.map((_, i) => (
              <div key={i} ref={el => { dotRefs.current[i] = el; }}
                style={{ width: "2px", borderRadius: "1px", height: i === 0 ? 28 : 8, backgroundColor: i === 0 ? "#a855f7" : "rgba(255,255,255,0.3)" }} />
            ))}
          </div>

        </div>{/* /overlay */}

      </div>{/* /stickyRef */}

    </section>
  );
}