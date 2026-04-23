"use client";
import { useRef, useEffect } from "react";

export default function MarqueeText() {
  const textRef = useRef(null);

  useEffect(() => {
    const fit = () => {
      const el = textRef.current;
      if (!el) return;
      const parent = el.parentElement;
      // Reset to a known large size first so we can measure
      el.style.fontSize = "10rem";
      const ratio = parent.offsetWidth / el.scrollWidth;
      // Set to the exact size that fills the parent width
      el.style.fontSize = `${10 * ratio}rem`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      className="bg-[#f7f6f2] border-y border-black/[0.06] overflow-hidden"
      style={{ padding: "3.5rem 0" }}
    >
      <div style={{ width: "100%" }}>
        <p
          ref={textRef}
          className="font-display whitespace-nowrap leading-none select-none"
          style={{
            letterSpacing: "0.02em",
            lineHeight:    1,
            display:       "block",
            width:         "max-content",
          }}
        >
          <span style={{ color: "#111111" }}>DIGITAL&nbsp;</span>
          <span style={{ color: "#8b5cf6" }}>MARKETING</span>
        </p>
      </div>
    </div>
  );
}
