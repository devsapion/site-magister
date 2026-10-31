"use client";

import { useEffect } from "react";

/** Blocks whose looping animations (marquees, mascot bobbing, dashed trails) freeze while off screen. */
const PAUSABLE = "main section, main [data-pausable], footer";

/**
 * Plays Elementor-style entrance animations: every `[data-animate]` element stays
 * hidden until it enters the viewport, then animates after its `data-delay` (ms).
 * Elements added later (client-side navigation, pagination) are picked up too.
 *
 * It also flags sections that are out of view with `data-offscreen`, which pauses their
 * infinite animations in CSS so the browser only animates what is on screen.
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
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).toggleAttribute("data-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "120px 0px" },
    );
    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-animate]:not(.mg-animated)")
        .forEach((el) => observer.observe(el));
      document.querySelectorAll<HTMLElement>(PAUSABLE).forEach((el) => visibility.observe(el));
    };
    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return null;
}
