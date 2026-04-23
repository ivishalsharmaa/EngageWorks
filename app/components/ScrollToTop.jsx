"use client";
import { useEffect } from "react";

/**
 * ScrollToTop
 * Disables the browser's native scroll restoration so that on every
 * page load / hard refresh the viewport always starts at (0, 0).
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Tell the browser not to remember the previous scroll position
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Immediately jump to the very top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null; // renders nothing
}
