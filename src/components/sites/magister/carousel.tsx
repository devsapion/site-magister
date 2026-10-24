"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface PerBreakpoint {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface CarouselProps {
  children: ReactNode;
  label: string;
  perView: PerBreakpoint;
  gap: PerBreakpoint;
  autoplayMs?: number;
  speedMs?: number;
  pauseOnHover?: boolean;
  /** Swiper's `disableOnInteraction`: stop autoplay after the visitor navigates. */
  pauseOnInteraction?: boolean;
  dots?: boolean;
  arrows?: boolean;
  /** Distance of each arrow from the carousel's side edges, in px. */
  arrowInset?: number;
  className?: string;
  viewportClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
  arrowClassName?: string;
}

const COPIES = 3;

/**
 * Infinite Swiper-like carousel. Slides are rendered three times (clone, real, clone) and the
 * track jumps back to the real set after a transition past either edge.
 */
export function Carousel({
  children,
  label,
  perView,
  gap,
  autoplayMs,
  speedMs = 500,
  pauseOnHover = false,
  pauseOnInteraction = false,
  dots = false,
  arrows = false,
  arrowInset = 0,
  className,
  viewportClassName,
  slideClassName,
  dotsClassName,
  dotClassName,
  activeDotClassName,
  arrowClassName,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const indexRef = useRef(0);
  const moving = useRef(false);
  const settleTimer = useRef<number | undefined>(undefined);
  const pointerStart = useRef<number | null>(null);

  // A timer (not `transitionend`) settles each move, so carousels hidden at the current
  // breakpoint keep a consistent position.
  const move = useCallback(
    (target: (current: number) => number) => {
      if (moving.current || count < 2) return;
      const next = target(indexRef.current);
      if (next === indexRef.current) return;
      moving.current = true;
      indexRef.current = next;
      setAnimated(true);
      setIndex(next);
      settleTimer.current = window.setTimeout(() => {
        moving.current = false;
        const current = indexRef.current;
        if (current >= 0 && current < count) return;
        const normalized = ((current % count) + count) % count;
        indexRef.current = normalized;
        setAnimated(false);
        setIndex(normalized);
      }, speedMs);
    },
    [count, speedMs],
  );

  const step = useCallback((delta: number) => move((i) => i + delta), [move]);
  const goTo = (target: number) => move(() => target);

  const handleInteraction = () => {
    if (pauseOnInteraction) setInteracted(true);
  };

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  // Restore transitions two frames after a silent jump so the jump itself never animates.
  useEffect(() => {
    if (animated) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimated(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animated]);

  useEffect(() => {
    if (!autoplayMs || count < 2 || interacted || (pauseOnHover && hovered)) return;
    const timer = window.setInterval(() => step(1), autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayMs, count, hovered, interacted, pauseOnHover, step]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const dx = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) < 40) return;
    handleInteraction();
    step(dx < 0 ? 1 : -1);
  };

  const active = ((index % count) + count) % count;
  const style = {
    "--mg-pv-m": perView.mobile,
    "--mg-pv-t": perView.tablet,
    "--mg-pv-d": perView.desktop,
    "--mg-gap-m": `${gap.mobile}px`,
    "--mg-gap-t": `${gap.tablet}px`,
    "--mg-gap-d": `${gap.desktop}px`,
  } as CSSProperties;
  const trackStyle = {
    "--mg-pos": count + index,
    transition: animated ? `transform ${speedMs}ms ease` : "none",
  } as CSSProperties;

  return (
    <div
      className={cn("mg-carousel relative", className)}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn("overflow-hidden touch-pan-y", viewportClassName)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
      >
        <div className="mg-carousel-track" style={trackStyle}>
          {Array.from({ length: COPIES }, (_, copy) =>
            slides.map((slide, i) => {
              const isReal = copy === 1;
              return (
                <div
                  key={`${copy}-${i}`}
                  className={cn("mg-carousel-slide", slideClassName)}
                  aria-hidden={!isReal || undefined}
                  inert={!isReal}
                  role={isReal ? "group" : undefined}
                  aria-roledescription={isReal ? "slide" : undefined}
                  aria-label={isReal ? `${i + 1} de ${count}` : undefined}
                >
                  {slide}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {arrows && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className={cn("absolute top-1/2 z-10 -translate-y-1/2", arrowClassName)}
            style={{ left: arrowInset }}
            onClick={() => {
              handleInteraction();
              step(-1);
            }}
          >
            <svg viewBox="0 0 1000 1000" className="size-5 fill-current" aria-hidden="true">
              <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximo"
            className={cn("absolute top-1/2 z-10 -translate-y-1/2", arrowClassName)}
            style={{ right: arrowInset }}
            onClick={() => {
              handleInteraction();
              step(1);
            }}
          >
            <svg viewBox="0 0 1000 1000" className="size-5 fill-current" aria-hidden="true">
              <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
            </svg>
          </button>
        </>
      )}

      {dots && (
        <div className={cn("flex items-center justify-center", dotsClassName)}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para o slide ${i + 1}`}
              aria-current={i === active || undefined}
              className={cn("rounded-full", dotClassName, i === active && activeDotClassName)}
              onClick={() => {
                handleInteraction();
                goTo(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
