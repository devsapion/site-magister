"use client";

import { useEffect } from "react";

/**
 * Plays Elementor-style entrance animations: every `[data-animate]` element stays
 * hidden until it enters the viewport, then animates after its `data-delay` (ms).
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.delay) el.style.animationDelay = `${el.dataset.delay}ms`;
          el.classList.add("mg-animated");
          observer.unobserve(el);
        }
      },
      { threshold: 0 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-animate]:not(.mg-animated)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
