"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 1,
    num: "01",
    title: "Web Design",
    subtitle: "& Development",
    desc: "High-converting, performance-first websites built on modern tech stacks.",
    bg: "linear-gradient(145deg,#1a0533 0%,#3b0764 100%)",
    accent: "#a855f7",
    tag: "UI/UX · FRONTEND · CMS",
  },
  {
    id: 2,
    num: "02",
    title: "Digital",
    subtitle: "Marketing",
    desc: "SEO, paid ads, content & social strategies that generate real revenue.",
    bg: "linear-gradient(145deg,#001a2c 0%,#003d6b 100%)",
    accent: "#38bdf8",
    tag: "SEO · PPC · SOCIAL",
  },
  {
    id: 3,
    num: "03",
    title: "Brand",
    subtitle: "Identity",
    desc: "Logo, visual language, messaging and brand guidelines done right.",
    bg: "linear-gradient(145deg,#1c0a00 0%,#7c2d12 100%)",
    accent: "#fb923c",
    tag: "LOGO · BRAND · GUIDELINES",
  },
  {
    id: 4,
    num: "04",
    title: "E-Commerce",
    subtitle: "Solutions",
    desc: "Shopify & custom stores built for conversions — end to end.",
    bg: "linear-gradient(145deg,#0a1f00 0%,#166534 100%)",
    accent: "#4ade80",
    tag: "SHOPIFY · WOOCOMMERCE · UX",
  },
  {
    id: 5,
    num: "05",
    title: "Performance",
    subtitle: "Marketing",
    desc: "Meta Ads, Google Ads and retargeting campaigns optimised for ROAS.",
    bg: "linear-gradient(145deg,#1a001a 0%,#701a75 100%)",
    accent: "#e879f9",
    tag: "META · GOOGLE · RETARGETING",
  },
  {
    id: 6,
    num: "06",
    title: "Content",
    subtitle: "Creation",
    desc: "Photography, reels, ad creatives and copy that stops the scroll.",
    bg: "linear-gradient(145deg,#1a1000 0%,#854d0e 100%)",
    accent: "#facc15",
    tag: "PHOTO · VIDEO · COPY",
  },
];

const CARD_W = 300;
const CARD_H = 440;

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const totalCards = SERVICES.length;
    const cards = cardsRef.current;
    const dots = dotsRef.current;

    // Fan carousel positions — cards spread out like a hand of cards
    // rotateZ gives the tilt; y drops side cards slightly; x offsets them horizontally
    const POS = {
      center:      { x: 0,    y: 0, rotateZ: 0,   scale: 1,    opacity: 1,    zIndex: 20, filter: "blur(0px)",  visibility: "visible"  },
      right1:      { x: 205,  y: 0, rotateZ: 13,  scale: 0.86, opacity: 0.72, zIndex: 15, filter: "blur(2px)",  visibility: "visible"  },
      right2:      { x: 355,  y: 0, rotateZ: 24,  scale: 0.72, opacity: 0.45, zIndex: 10, filter: "blur(4px)",  visibility: "visible"  },
      left1:       { x: -205, y: 0, rotateZ: -13, scale: 0.86, opacity: 0.72, zIndex: 15, filter: "blur(2px)",  visibility: "visible"  },
      left2:       { x: -355, y: 0, rotateZ: -24, scale: 0.72, opacity: 0.45, zIndex: 10, filter: "blur(4px)",  visibility: "visible"  },
      hiddenRight: { x: 520,  y: 0, rotateZ: 34,  scale: 0.6,  opacity: 0,    zIndex: 5,  filter: "blur(7px)",  visibility: "hidden"   },
      hiddenLeft:  { x: -520, y: 0, rotateZ: -34, scale: 0.6,  opacity: 0,    zIndex: 5,  filter: "blur(7px)",  visibility: "hidden"   },
    };

    // Get the fan position for a card given its offset from the active index
    const getPos = (rel) => {
      if (rel === 0)  return POS.center;
      if (rel === 1)  return POS.right1;
      if (rel === 2)  return POS.right2;
      if (rel === -1) return POS.left1;
      if (rel === -2) return POS.left2;
      return rel > 0  ? POS.hiddenRight : POS.hiddenLeft;
    };

    // STEP 1: SET INITIAL FAN LAYOUT (card 0 is active)
    cards.forEach((card, i) => gsap.set(card, getPos(i)));

    gsap.set(dots, { width: 8, opacity: 0.3 });
    gsap.set(dots[0], { width: 40, opacity: 1 });

    // STEP 2: SCROLL-PINNED TIMELINE
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalCards * 120}%`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeCard = Math.min(
            totalCards - 1,
            Math.max(0, Math.floor(self.progress * totalCards))
          );
          dots.forEach((dot, i) =>
            gsap.to(dot, {
              width:   i === activeCard ? 40 : 8,
              opacity: i === activeCard ? 1  : 0.3,
              duration: 0.3,
            })
          );
        },
      },
    });

    // Hold the first card for a beat
    mainTimeline.to({}, { duration: 0.3 }, 0);

    // STEP 3: ANIMATE EACH CARD TRANSITION
    // On every step, recalculate all cards' fan positions relative to the new active index
    SERVICES.forEach((_, activeIdx) => {
      if (activeIdx === 0) return;
      const segmentStart = activeIdx * 1;

      cards.forEach((card, cardIdx) => {
        const rel = cardIdx - activeIdx;
        const pos = getPos(rel);
        mainTimeline.to(
          card,
          {
            x:        pos.x,
            y:        pos.y,
            rotateZ:  pos.rotateZ,
            scale:    pos.scale,
            opacity:  pos.opacity,
            zIndex:   pos.zIndex,
            filter:   pos.filter,
            // only unhide cards coming into view, never re-hide mid-animation
            ...(pos.visibility === "visible" ? { visibility: "visible" } : {}),
            duration: 0.5,
            ease: rel === 0 ? "back.out(0.7)" : "power2.inOut",
          },
          segmentStart
        );
      });
    });

    return () => {
      mainTimeline.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: "100vh" }}
    >
      <div className="relative w-full h-screen bg-gradient-to-b from-[#f8f8f8] to-[#efefef]" style={{ overflow: "clip" }}>
        
        {/* Top section */}
        <div className="absolute top-8 left-0 right-0 z-30 px-6 md:px-12">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-none">
              OUR SERVICES
            </p>
            <p className="text-purple-600 tracking-[0.3em] text-xs md:text-sm font-semibold mt-1">
              WHAT WE DO
            </p>
          </div>
        </div>

        {/* Cards container */}
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ paddingTop: "200px", paddingBottom: "80px" }}>
          <div className="relative" style={{ width: CARD_W, height: CARD_H + 80 }}>
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
                  background: service.bg,
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                {/* Subtle noise */}
                <div
                  className="absolute inset-0 z-[1] pointer-events-none opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Glow effect */}
                <div
                  className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-20 blur-2xl z-[1]"
                  style={{
                    background: service.accent,
                    width: "200%",
                    height: "200%",
                  }}
                />

                {/* Card content */}
                <div className="relative z-[2] p-7 h-full flex flex-col justify-between">
                  <div>
                    <span
                      className="inline-block px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide mb-6"
                      style={{
                        borderColor: `${service.accent}40`,
                        color: service.accent,
                        background: `${service.accent}10`,
                      }}
                    >
                      {service.tag}
                    </span>

                    <div className="text-white mt-5">
                      <h3 className="text-3xl font-bold leading-tight mb-1">
                        {service.title}
                      </h3>
                      <h3
                        className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                      >
                        {service.subtitle}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-6xl font-bold opacity-40"
                        style={{ color: service.accent }}
                      >
                        {service.num}
                      </span>
                      <div
                        className="w-12 h-px"
                        style={{
                          background: `linear-gradient(90deg, ${service.accent}, transparent)`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    style={{
                      transform: "translateX(-100%) skewX(-15deg)",
                      animation: "shine 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          20% {
            transform: translateX(100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
      `}</style>
    </section>
  );
}