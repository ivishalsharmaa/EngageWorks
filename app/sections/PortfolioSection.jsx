"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { client: "Aura Dining",   category: "Web Development",       year: "2024", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&h=700&fit=crop", link: "#", span: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
  { client: "Lumina Tech",   category: "Branding & Web",        year: "2024", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop", link: "#", span: "col-span-1",              aspect: "aspect-[3/4]"  },
  { client: "Vela Fashion",  category: "E-Commerce",            year: "2023", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop", link: "#", span: "col-span-1",              aspect: "aspect-[3/4]"  },
  { client: "Nova Fitness",  category: "Performance Marketing", year: "2023", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=700&fit=crop", link: "#", span: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
];

export default function PortfolioSection() {
  const secRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".port-item", { opacity: 0, y: 60 });
      gsap.to(".port-item", {
        opacity: 1, y: 0, stagger: 0.15, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".port-grid", start: "top 80%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="work" className="py-32 md:py-48 px-8 md:px-16 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <p className="section-label mb-5">Selected Work</p>
            <h2 className="font-display text-gray-900 leading-[0.9] tracking-wide" style={{ fontSize: "clamp(3rem,6vw,7rem)" }}>
              Our <span className="grad">Portfolio</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline text-sm shrink-0">View all projects ↗</a>
        </div>

        <div className="port-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <div key={p.client} className={`port-item ${p.span}`}>
              <div className={`port-card w-full ${p.aspect}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.client}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"} draggable={false} />
                <div className="port-overlay" />
                <div className="port-actions">
                  <p className="text-purple-300 text-xs tracking-[0.25em] uppercase mb-1">{p.category} · {p.year}</p>
                  <h3 className="font-display text-4xl tracking-wide text-white mb-5">{p.client}</h3>
                  <div className="flex gap-3">
                    <a href={p.link} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-colors">
                      Visit Site ↗
                    </a>
                    <a href="https://instagram.com/_engage.works_" target="_blank" rel="noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-purple-600 transition-all">
                      <FaInstagram size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
