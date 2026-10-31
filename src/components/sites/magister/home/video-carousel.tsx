"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { VideoTestimonial } from "./home-content";
import { ArrowIcon } from "./ui";

const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;

/** Placement by distance from the centered video: shift (in % of the card width), scale and dimming. */
const slots = [
  { x: 0, scale: 1, shade: 0 },
  { x: 58, scale: 0.76, shade: 0.35 },
  { x: 92, scale: 0.56, shade: 0.6 },
];

function Thumbnail({ id }: { id: string }) {
  // maxresdefault is sharper but not generated for every upload; hqdefault always exists.
  const [quality, setQuality] = useState<"maxresdefault" | "hqdefault">("maxresdefault");
  return (
    <Image
      src={`https://i.ytimg.com/vi/${id}/${quality}.jpg`}
      alt=""
      fill
      sizes="(min-width: 1025px) 680px, 85vw"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      onError={() => setQuality("hqdefault")}
    />
  );
}

/** Coverflow of 16:9 YouTube testimonials: the centered video is larger and the only one that plays. */
export function VideoCarousel({ items }: { items: VideoTestimonial[] }) {
  const count = items.length;
  const [active, setActive] = useState(Math.floor(count / 2));
  const [playing, setPlaying] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const go = (index: number) => {
    setActive((index + count) % count);
    setPlaying(false);
  };

  // Shortest signed distance on the loop, so the strip wraps around both ways.
  const offsetOf = (index: number) => {
    let d = index - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  const current = items[active];
  const arrowClass =
    "grid size-12 shrink-0 place-items-center rounded-full border-2 border-mg-purple/25 bg-white text-mg-purple transition-colors hover:border-mg-purple";

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[14px] font-semibold tracking-[0.08em] text-mg-purple uppercase">Depoimentos em vídeo</p>
          <h3 className="mt-2 text-balance text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-mg-ink tablet:text-[32px]">
            Quem vive a Sapion Magister na rede conta
          </h3>
        </div>
        <div className="hidden gap-2 tablet:flex">
          <button type="button" className={arrowClass} onClick={() => go(active - 1)} aria-label="Vídeo anterior">
            <ArrowIcon className="size-5 rotate-180" />
          </button>
          <button type="button" className={arrowClass} onClick={() => go(active + 1)} aria-label="Próximo vídeo">
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>

      <div
        className="relative mx-auto mt-10 aspect-video w-[86%] max-w-[680px] touch-pan-y tablet:mt-12 tablet:w-[62%]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos em vídeo"
      >
        {items.map((item, i) => {
          const d = offsetOf(i);
          const slot = slots[Math.min(Math.abs(d), slots.length - 1)];
          const isActive = d === 0;
          const hidden = Math.abs(d) >= slots.length;
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-[22px] bg-mg-night shadow-[0_40px_70px_-40px_rgba(40,10,110,0.9)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] tablet:rounded-[28px]",
                hidden && "pointer-events-none opacity-0",
              )}
              style={{
                transform: `translateX(${Math.sign(d) * slot.x}%) scale(${slot.scale})`,
                zIndex: 10 - Math.abs(d),
              }}
              aria-hidden={!isActive}
            >
              {isActive && playing ? (
                <iframe
                  src={embedUrl(item.youtubeId)}
                  title={`${item.title}: ${item.subtitle}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => (isActive ? setPlaying(true) : go(i))}
                  className="group absolute inset-0 h-full w-full"
                  aria-label={isActive ? `Assistir: ${item.title}, ${item.subtitle}` : `Mostrar vídeo ${i + 1}`}
                >
                  <Thumbnail id={item.youtubeId} />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,11,69,0)_45%,rgba(26,11,69,0.75)_100%)]" />
                  <span
                    className="absolute inset-0 bg-mg-night transition-opacity duration-700"
                    style={{ opacity: slot.shade }}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 left-1/2 grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] transition duration-500 group-hover:scale-110 tablet:size-[76px]",
                      !isActive && "scale-75 opacity-0",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="ml-1 size-5 fill-mg-purple tablet:size-7" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-3 left-4 text-left text-white transition-opacity duration-500 tablet:bottom-6 tablet:left-7",
                      !isActive && "opacity-0",
                    )}
                  >
                    <span className="block text-[11px] font-medium text-white/80 tablet:text-[13px]">{item.subtitle}</span>
                    <span className="block text-[14px] font-bold tablet:text-[19px]">{item.title}</span>
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" className={cn(arrowClass, "tablet:hidden")} onClick={() => go(active - 1)} aria-label="Vídeo anterior">
          <ArrowIcon className="size-5 rotate-180" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Escolher vídeo">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Vídeo ${i + 1} de ${count}: ${item.title}`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === active ? "w-8 bg-mg-purple" : "w-2 bg-mg-line hover:bg-mg-purple/40",
              )}
            />
          ))}
        </div>
        <button type="button" className={cn(arrowClass, "tablet:hidden")} onClick={() => go(active + 1)} aria-label="Próximo vídeo">
          <ArrowIcon className="size-5" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {`Vídeo ${active + 1} de ${count}: ${current.title}, ${current.subtitle}`}
      </p>
    </div>
  );
}
