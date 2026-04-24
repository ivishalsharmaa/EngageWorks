"use client";
import { useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Strategy",
    desc: "Deep-dive into your brand, market, and audience. We build a data-driven roadmap before a single pixel is touched.",
    icon: "⚡",
    bg: "#1a1a2e",
  },
  {
    num: "02",
    title: "Design",
    desc: "Wireframes, moodboards, and high-fidelity UI. Every element intentional, every screen considered.",
    icon: "✦",
    bg: "#16213e",
  },
  {
    num: "03",
    title: "Development",
    desc: "Built on modern, scalable tech. Performance-first code that ranks on Google and converts visitors.",
    icon: "◈",
    bg: "#0f3460",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deployment, SEO, analytics, and continuous optimisation. We don't vanish after going live.",
    icon: "◉",
    bg: "#533483",
  },
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f6f2] relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <p className="section-label mb-5">Our Process</p>
          <h2
            className="font-display text-gray-900 leading-[0.9] tracking-wide max-w-xl"
            style={{ fontSize: "clamp(3rem,6vw,7rem)" }}
          >
            How We <span className="grad">Work</span>
          </h2>
        </div>

        {/* Accordion strip */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "460px",
            gap: "6px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              style={{
                flex: active === i ? "5 1 0%" : "1 1 0%",
                transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                background: step.bg,
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                minWidth: 0,
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  zIndex: 1,
                }}
              />

              {/* Big number watermark */}
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.07)",
                  lineHeight: 1,
                  fontFamily: "inherit",
                  userSelect: "none",
                  zIndex: 1,
                  transition: "opacity 0.4s ease",
                  opacity: active === i ? 0 : 1,
                }}
              >
                {step.num}
              </span>

              {/* Collapsed state: vertical label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: active === i ? 0 : 1,
                  transition: "opacity 0.25s ease",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transform: "rotate(180deg)",
                  }}
                >
                  {step.title}
                </span>
              </div>

              {/* Expanded content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2.5rem",
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
                  zIndex: 3,
                  pointerEvents: active === i ? "auto" : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <p
                  style={{
                    color: "#a855f7",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.num}
                </p>

                {/* Title */}
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    maxWidth: "340px",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
