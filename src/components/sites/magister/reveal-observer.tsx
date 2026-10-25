"use client";

import { useEffect } from "react";

/**
 * Plays Elementor-style entrance animations: every `[data-animate]` element stays
 * hidden until it enters the viewport, then animates after its `data-delay` (ms).
 * Elements added later (client-side navigation, pagination) are picked up too.
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
    const observeAll = () =>
      document
        .querySelectorAll<HTMLElement>("[data-animate]:not(.mg-animated)")
        .forEach((el) => observer.observe(el));
    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
