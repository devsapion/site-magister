"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Section that drives the `.mg-layer` / `.mg-hero-copy` parallax: it writes the scroll
 * progress through itself to --p and, on mouse devices, the pointer offset to --mx/--my.
 * Nothing moves for visitors who prefer reduced motion.
 */
export function ParallaxScene({
  children,
  className,
  style,
  label,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(window.scrollY / Math.max(el.offsetHeight, 1), 0), 1);
      el.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    el.addEventListener("pointermove", onPointer);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={ref} className={className} style={style} aria-label={label}>
      {children}
    </section>
  );
}

/** In-page link that glides to its target (and jumps when reduced motion is preferred). */
export function SmoothAnchor({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
        history.replaceState(null, "", href);
      }}
    >
      {children}
    </a>
  );
}
