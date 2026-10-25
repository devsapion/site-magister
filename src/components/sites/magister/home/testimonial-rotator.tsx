"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../content";

function initials(name: string) {
  const parts = name.split(" ").filter((part) => part.length > 2);
  return (parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "");
}

/** Testimonial card that cycles through quotes; pauses while hovered or focused. */
export function TestimonialRotator({ items, intervalMs = 6500 }: { items: Testimonial[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, items.length, paused]);

  const current = items[index];

  return (
    <figure
      className="relative rounded-[32px] border border-mg-line bg-white/90 p-7 shadow-[0_40px_80px_-50px_rgba(60,20,140,0.6)] backdrop-blur tablet:p-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={index} className="mg-swap-in flex min-h-[230px] flex-col">
        <figcaption className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,#b07cff,#7a35e6)] text-[18px] font-bold text-white">
            {initials(current.name)}
          </span>
          <span>
            <span className="block text-[16px] font-bold text-mg-ink">{current.name}</span>
            <span className="block text-[14px] font-medium text-mg-purple">Cursista Sapion Magister</span>
          </span>
        </figcaption>
        <blockquote className="relative mt-6 flex-1 pl-9 text-[17px] leading-[1.7] text-mg-muted">
          <span className="absolute top-[-10px] left-0 font-serif text-[56px] leading-none text-mg-purple/25" aria-hidden="true">
            “
          </span>
          {current.text}
        </blockquote>
      </div>
      <div className="mt-6 flex gap-2" role="tablist" aria-label="Depoimentos">
        {items.map((item, i) => (
          <button
            key={item.text}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Depoimento ${i + 1} de ${items.length}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === index ? "w-8 bg-mg-purple" : "w-2 bg-mg-line hover:bg-mg-purple/40",
            )}
          />
        ))}
      </div>
    </figure>
  );
}
