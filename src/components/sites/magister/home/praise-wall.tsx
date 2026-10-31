"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { PraisePrint } from "@/lib/magister/praise-prints";

const alt = "Print de elogio de um usuário da Sapion Magister";

/** Column height in column widths that always overflows the wall, so the loop never shows a gap. */
const MIN_COLUMN_HEIGHT = 4;

/**
 * Deals the prints into columns, always onto the shortest one, so the columns end up level.
 * Columns shorter than the wall (only a few prints) repeat their prints until they fill it.
 */
function toColumns(prints: PraisePrint[], count: number) {
  const columns = Array.from({ length: count }, () => ({ items: [] as { print: PraisePrint; index: number }[], height: 0 }));
  prints.forEach((print, index) => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.items.push({ print, index });
    shortest.height += print.height / print.width;
  });
  for (const column of columns) {
    const base = [...column.items];
    const baseHeight = column.height;
    while (base.length > 0 && column.height < MIN_COLUMN_HEIGHT) {
      column.items.push(...base);
      column.height += baseHeight;
    }
  }
  return columns;
}

const layouts = [
  { columns: 2, className: "grid grid-cols-2 gap-3 tablet:hidden", sizes: "50vw" },
  { columns: 3, className: "hidden grid-cols-3 gap-4 tablet:grid desktop:hidden", sizes: "33vw" },
  { columns: 4, className: "hidden grid-cols-4 gap-5 desktop:grid", sizes: "280px" },
];

function Wall({
  prints,
  columns,
  className,
  sizes,
  onOpen,
}: {
  prints: PraisePrint[];
  columns: number;
  className: string;
  sizes: string;
  onOpen: (index: number) => void;
}) {
  return (
    <div className={className}>
      {toColumns(prints, columns).map((column, c) => (
        <div
          key={c}
          className="mg-wall-track"
          data-reverse={c % 2 === 1 ? "" : undefined}
          // ~9s per column-width of prints keeps every column at the same speed.
          style={{ "--mg-wall-duration": `${Math.max(24, column.height * 9)}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex flex-col gap-3 pb-3 tablet:gap-5 tablet:pb-5" aria-hidden={copy === 1 || undefined}>
              {column.items.map(({ print, index }, i) => (
                <li key={`${print.src}-${i}`}>
                  <button
                    type="button"
                    tabIndex={copy === 1 ? -1 : undefined}
                    onClick={() => onOpen(index)}
                    className="block w-full cursor-zoom-in overflow-hidden rounded-[16px] border border-mg-line bg-white shadow-[0_24px_50px_-34px_rgba(60,20,140,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] tablet:rounded-[20px]"
                    aria-label={`Ampliar elogio ${index + 1}`}
                  >
                    <Image src={print.src} alt={alt} width={print.width} height={print.height} sizes={sizes} className="h-auto w-full" />
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}

function Lightbox({ prints, index, onChange, onClose }: { prints: PraisePrint[]; index: number; onChange: (index: number) => void; onClose: () => void }) {
  const print = prints[index];
  const step = (delta: number) => onChange((index + delta + prints.length) % prints.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % prints.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + prints.length) % prints.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange, onClose, prints.length]);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const control =
    "grid size-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30";

  return createPortal(
    <div
      className="mg-popup-in fixed inset-0 z-[9999] flex items-center justify-center bg-mg-night/80 p-4 font-lexend backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Elogio ${index + 1} de ${prints.length}`}
    >
      <button type="button" onClick={onClose} className={cn(control, "absolute top-5 right-5")} aria-label="Fechar">
        <X className="size-5" />
      </button>
      <div key={print.src} className="mg-swap-in" onClick={(event) => event.stopPropagation()}>
        <Image
          src={print.src}
          alt={alt}
          width={print.width}
          height={print.height}
          sizes="720px"
          className="h-auto rounded-[20px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          // Fits the print in the screen whichever side is longer, scaling small prints up.
          style={{ width: `min(90vw, 720px, calc(78vh * ${print.width / print.height}))` }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => step(-1)} className={control} aria-label="Elogio anterior">
          <ChevronLeft className="size-5" />
        </button>
        <span className="min-w-16 text-center text-[14px] font-semibold text-white tabular-nums">
          {index + 1} / {prints.length}
        </span>
        <button type="button" onClick={() => step(1)} className={control} aria-label="Próximo elogio">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

/** Columns of prints drifting up and down; hovering pauses them and a click opens the print large. */
export function PraiseWall({ prints }: { prints: PraisePrint[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (prints.length === 0) return null;

  return (
    <>
      <div className="mg-wall relative h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] tablet:h-[720px]">
        {layouts.map((layout) => (
          <Wall key={layout.columns} prints={prints} {...layout} onOpen={setOpen} />
        ))}
      </div>
      {open !== null && <Lightbox prints={prints} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
