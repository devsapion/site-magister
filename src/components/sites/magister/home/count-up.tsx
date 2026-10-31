"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up from zero the first time it scrolls into view. The server renders the
 * final value (no-JS, crawlers, reduced motion); the animation writes straight to the DOM so the
 * count does not re-render React on every frame.
 */
export function CountUp({ to, durationMs = 1800 }: { to: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = "0";
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Timed from the first frame: its timestamp can precede a performance.now() taken here.
        let start = 0;
        const tick = (now: number) => {
          start ||= now;
          const t = Math.min((now - start) / durationMs, 1);
          el.textContent = String(Math.round(to * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = String(to);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}
