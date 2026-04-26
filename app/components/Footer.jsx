"use client";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const NAV   = ["Home", "Work", "Services", "About", "Contact"];
const LEGAL = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="bg-[#f7f6f2] border-t border-black/[0.07] px-8 md:px-16 pt-20 pb-10 relative overflow-hidden">


      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-16 pb-8 border-b border-black/[0.07]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block mb-6">
              <span className="font-display text-2xl tracking-widest text-gray-900">ENGAGE</span>
              <span className="font-display text-2xl tracking-widest text-purple-600">WORKS</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              A premium digital agency focused on building growth-driven, high-performance websites and marketing strategies.
            </p>
            <div className="flex gap-3">
              {[{ icon: FaInstagram, href: "https://instagram.com/_engage.works_", label: "Instagram" },
                { icon: FaXTwitter,  href: "#", label: "Twitter"  },
                { icon: FaLinkedinIn,href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-full border border-black/[0.1] flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-6">Navigation</p>
            <ul className="flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n}>
                  <a href={`#${n.toLowerCase()}`}
                    className="hover-line text-gray-500 hover:text-gray-900 text-sm transition-colors duration-300">{n}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-6">Get in Touch</p>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="https://wa.me/916371106588" target="_blank" rel="noreferrer" className="hover-line hover:text-gray-900 transition-colors duration-300">+91 63711 06588</a></li>
              <li><a href="tel:+919023884833" className="hover-line hover:text-gray-900 transition-colors duration-300">+91 90238 84833</a></li>
              <li><a href="mailto:engageworks00@gmail.com" className="hover-line hover:text-gray-900 transition-colors duration-300 break-all md:break-normal">engageworks00@gmail.com</a></li>
              <li><a href="https://instagram.com/_engage.works_" target="_blank" rel="noreferrer" className="hover-line hover:text-gray-900 transition-colors duration-300">@_engage.works_</a></li>
              <li className="text-gray-400">Jharsuguda, India</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-gray-400 text-xs tracking-wider">© {new Date().getFullYear()} Engage Works. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <a key={l} href="#" className="text-gray-400 hover:text-gray-700 text-xs transition-colors duration-300">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
