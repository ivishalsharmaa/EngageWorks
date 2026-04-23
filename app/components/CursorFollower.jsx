"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  const ring = useRef(null);
  const dot  = useRef(null);
  const pos  = useRef({ x: -200, y: -200 });
  const cur  = useRef({ x: -200, y: -200 });
  const raf  = useRef(null);

  useEffect(() => {
    const $ring = ring.current;
    const $dot  = dot.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.to($dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
    };

    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.12;
      cur.current.y += (pos.current.y - cur.current.y) * 0.12;
      gsap.set($ring, { x: cur.current.x, y: cur.current.y });
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();

    // Expand on interactive elements
    const expand   = () => $ring.classList.add("expanded");
    const contract = () => $ring.classList.remove("expanded");

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", contract);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-ring" ref={ring} />
      <div id="cursor-dot"  ref={dot} />
    </>
  );
}
