"use client";

const CLIENTS = ["Aura Dining","Lumina Tech","Vela Fashion","Nova Fitness","Pixel Studio","Forte Brands","Mint Digital","Crescendo"];

export default function Clients() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <section className="py-14 bg-[#f7f6f2] border-y border-black/[0.06] overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto mb-8 px-8 md:px-16">
        <p className="section-label">Trusted By</p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f7f6f2] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f7f6f2] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {doubled.map((name, i) => (
          <div key={i} className="flex items-center gap-10 px-8 whitespace-nowrap">
            <span className="font-display text-[1.6rem] tracking-[0.12em] text-black/[0.12] hover:text-black/40 transition-colors duration-300 uppercase select-none">
              {name}
            </span>
            <span className="w-1 h-1 rounded-full bg-purple-400/40 shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
