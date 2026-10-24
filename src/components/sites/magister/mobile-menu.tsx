"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ASSETS, links } from "./content";
import { BarsIcon, CloseIcon } from "./icons";

/** Hamburger button + left drawer used at tablet and mobile widths (Elementor popup 2035). */
export function MobileMenu({ tone = "white" }: { tone?: "white" | "violet" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="mg-mobile-menu"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center rounded-[5px] border px-[12px] pt-[6px] pb-[5px] text-[16px] tablet:max-desktop:border-2 max-tablet:px-[13px] max-tablet:pt-[8px] max-tablet:pb-[6px] max-tablet:text-[22px]",
          tone === "white" ? "border-white text-white" : "border-mg-violet text-mg-violet",
        )}
      >
        <BarsIcon className="size-[1em] fill-current" />
      </button>

      {open && (
        <div
          className="mg-popup-in fixed inset-0 z-[9999] bg-black/80"
          onClick={close}
          role="presentation"
        >
          <nav
            id="mg-mobile-menu"
            aria-label="Menu"
            className="mg-drawer-in relative flex h-dvh w-[18.4em] max-w-full flex-col gap-5 bg-white p-[15px] shadow-[2px_8px_23px_3px_rgba(0,0,0,0.2)] [animation-duration:0.3s]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={close}
              className="absolute top-[23px] right-[20px] text-[25px] text-mg-violet"
            >
              <CloseIcon className="size-[1em] fill-current" />
            </button>
            <Link href={links.home} onClick={close} className="mb-[10px] block w-1/2">
              <Image src={`${ASSETS}/logo-color.png`} alt="Sapion Magister" width={1024} height={298} />
            </Link>
            <a
              href={links.trilhas}
              onClick={close}
              className="self-start font-poppins text-[16px] font-medium leading-none text-mg-violet transition-colors duration-300 hover:text-mg-secondary"
            >
              Nossos cursos
            </a>
            <a
              href={links.app}
              className="rounded-[10px] border border-mg-violet bg-mg-violet p-[10px] text-center font-poppins text-[16px] font-bold leading-none text-white transition-all duration-300 hover:bg-mg-secondary hover:text-mg-violet"
            >
              Sou aluno
            </a>
            <a
              href={links.assine}
              onClick={close}
              className="-mt-[10px] rounded-[10px] border border-mg-violet bg-white p-[10px] text-center font-poppins text-[16px] font-bold leading-none text-mg-violet transition-all duration-300 hover:bg-mg-secondary"
            >
              Assine agora
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
