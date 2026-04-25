"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const FLOW_IMAGES = [
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1641951820920-c90394aef512?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1733306696471-807493ff845b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1685283298465-e52e933a3312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE3fHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1661515793199-fc2b079893c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1726812103168-6ad609e53f94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1674027392842-29f8354e236c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fDB8fHww"
];

const ScrambleText = ({ text, delay = 0, start = false }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!start) return; // Wait for start signal (intro complete)

    let timeout;
    let interval;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    timeout = setTimeout(() => {
      let iterations = 0;
      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iterations) return letter;
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        iterations += 1 / 2; // Speed of revealing

        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, start]);

  return <>{displayText || '\u00A0'}</>;
};

export default function Hero({ introComplete = false }) {
  const [images, setImages] = useState([]);
  const nextIdRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const imageIndexRef = useRef(0); // Tracks sequential position in FLOW_IMAGES
  const rafRef = useRef(null);
  const mouseHistoryRef = useRef([]);
  const directionRef = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null); // Hero section reference

  const spawnImage = useCallback((mouseX, mouseY, dirX, dirY) => {
    // Cycle through images sequentially, then repeat
    const sequentialImage = FLOW_IMAGES[imageIndexRef.current % FLOW_IMAGES.length];
    imageIndexRef.current += 1;
    const randomRotation = (Math.random() - 0.5) * 10;
    const randomScale = 0.7 + Math.random() * 0.3;
    
    const newImage = {
      id: nextIdRef.current++,
      x: mouseX,
      y: mouseY,
      rotation: randomRotation,
      scale: randomScale,
      opacity: 1,
      imageSrc: sequentialImage,
      velocityX: dirX * 0.8, // Slower movement
      velocityY: dirY * 0.8,
      createdAt: Date.now(),
    };
    
    setImages(prev => [...prev.slice(-4), newImage]); // Max 4-5 images
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      // Check if mouse is inside hero section only
      const rect = section.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (!isInside) return; // Effect only in hero section
      
      const now = Date.now();
      const timeSinceLastSpawn = now - lastSpawnTimeRef.current;
      
      const newX = e.clientX;
      const newY = e.clientY;
      
      mouseHistoryRef.current.push({ x: newX, y: newY, time: now });
      if (mouseHistoryRef.current.length > 3) {
        mouseHistoryRef.current.shift();
      }
      
      if (mouseHistoryRef.current.length >= 2) {
        const first = mouseHistoryRef.current[0];
        const last = mouseHistoryRef.current[mouseHistoryRef.current.length - 1];
        const deltaX = last.x - first.x;
        const deltaY = last.y - first.y;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (length > 0) {
          directionRef.current = {
            x: deltaX / length,
            y: deltaY / length,
          };
        }
      }
      
      // SLOWER SPAWN - 150ms delay
      if (timeSinceLastSpawn >= 150) {
        spawnImage(newX, newY, directionRef.current.x, directionRef.current.y);
        lastSpawnTimeRef.current = now;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawnImage]);

  useEffect(() => {
    const animateImages = () => {
      const now = Date.now();
      
      setImages(prevImages => 
        prevImages
          .map(img => {
            const age = now - img.createdAt;
            const maxAge = 1600; // 1.6 seconds
            
            let newOpacity = 1;
            if (age > 400) { // Fade starts later
              const fadeProgress = Math.min(1, (age - 400) / (maxAge - 400));
              newOpacity = Math.max(0, 1 - Math.pow(fadeProgress, 1.5));
            }
            
            const decay = 0.98;
            const newVelocityX = img.velocityX * decay;
            const newVelocityY = img.velocityY * decay;
            const newX = img.x + newVelocityX;
            const newY = img.y + newVelocityY;
            
            return {
              ...img,
              x: newX,
              y: newY,
              velocityX: newVelocityX,
              velocityY: newVelocityY,
              opacity: newOpacity,
              scale: img.scale * (0.8 + newOpacity * 0.2),
            };
          })
          .filter(img => img.opacity > 0.02)
      );
      
      rafRef.current = requestAnimationFrame(animateImages);
    };
    
    animateImages();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#f5f5f0] to-[#e8e6e1] dark:from-[#0a0a0f] dark:to-[#050508]"
    >
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/5 dark:bg-cyan-500/5 blur-[150px]" />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* SQUARE IMAGES - Only in hero section */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {images.map((img) => (
          <div
            key={img.id}
            className="absolute will-change-transform"
            style={{
              transform: `translate(${img.x - 80}px, ${img.y - 80}px) rotate(${img.rotation}deg) scale(${img.scale})`,
              opacity: img.opacity,
              transition: 'opacity 0.08s linear',
              filter: `blur(${(1 - img.opacity) * 1}px)`,
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/20">
                <img
                  src={img.imageSrc}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-purple-500/25 to-indigo-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        

        
        <h1 
          className="font-display tracking-wide text-center leading-[0.9] mb-6 mt-16"
          style={{ 
            fontSize: "clamp(2.8rem, 10vw, 8rem)",
          }}
        >
          <span className="text-gray-900 block">
            <ScrambleText text="WE BUILD" delay={0} start={introComplete} />
          </span>
          <span className="grad block">
            <ScrambleText text="BRANDS THAT CONVERT" delay={600} start={introComplete} />
          </span>
        </h1>

        <p 
          className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Digital Marketing &amp; Website Development Agency
        </p>

        <div className="flex gap-4 justify-center">
          <a 
            href="#work" 
            className="px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm tracking-wide hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            View Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-full border border-gray-400 dark:border-white/20 text-gray-700 dark:text-white/70 font-medium text-sm tracking-wide hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}