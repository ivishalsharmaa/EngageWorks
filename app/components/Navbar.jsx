"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "Work",     href: "#work"     },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Dot pulse
  useEffect(() => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, {
      scale: 1.4, duration: 0.7, yoyo: true, repeat: -1, ease: "sine.inOut"
    });
  }, []);

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-8 md:px-16 py-5 bg-transparent"
      >
        {/* Logo — left */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-[0.18em] text-gray-900 dark:text-white">ENGAGEWORKS</span>
        </Link>

        {/* MENU pill — right */}
        <button
          onClick={() => setOpen(p => !p)}
          data-cursor
          className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300
            ${open
              ? "bg-purple-600 text-white"
              : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
        >
          {open ? "CLOSE" : "MENU"}
          <span
            ref={dotRef}
            className={`w-2 h-2 rounded-full inline-block transition-colors duration-300 ${open ? "bg-white" : "bg-purple-600"}`}
          />
        </button>
      </header>

      {/* ── Fullscreen overlay menu ─────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[190] bg-[#0a0a0a] flex flex-col items-start justify-end pb-20 px-8 md:px-16 overflow-hidden"
          >
            {/* Big ghost number */}
            <div className="absolute top-0 right-16 font-display text-[22rem] leading-none text-white/[0.02] select-none pointer-events-none">
              EW
            </div>

            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.7 } }}
                  exit={{ opacity: 0, x: -40 }}
                  className="group flex items-center gap-6"
                >
                  <span className="text-white/20 font-mono text-xs w-6">0{i + 1}</span>
                  <span className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] tracking-wide text-white group-hover:text-purple-400 transition-colors duration-300">
                    {l.label}
                  </span>
                  <span className="ml-auto text-white/20 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom bar */}
            <div className="mt-16 w-full flex justify-between items-center border-t border-white/[0.07] pt-8">
              <p className="text-white/25 text-xs tracking-[0.2em] uppercase">@_engage.works_</p>
              <p className="text-white/25 text-xs tracking-[0.2em] uppercase">Jharsuguda, India</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
