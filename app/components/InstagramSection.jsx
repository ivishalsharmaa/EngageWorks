"use client";
import { FaInstagram } from "react-icons/fa6";

const IG_POSTS = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop",
];

export default function InstagramSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-[#f7f6f2] relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <FaInstagram className="text-white" size={17} />
            </div>
            <div>
              <p className="text-gray-900 font-semibold tracking-wide">@_engage.works_</p>
              <p className="text-gray-400 text-xs tracking-widest uppercase">Follow us on Instagram</p>
            </div>
          </div>
          <a href="https://instagram.com/_engage.works_" target="_blank" rel="noreferrer"
            className="btn-outline text-sm py-3 px-7 flex items-center gap-2">
            Follow us <FaInstagram size={13} />
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {IG_POSTS.map((src, i) => (
            <a key={i} href="https://instagram.com/_engage.works_" target="_blank" rel="noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group block bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <FaInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
