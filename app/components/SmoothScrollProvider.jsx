"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
