"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BarsIcon, CloseIcon } from "../icons";
import { homeLinks, logos, navItems } from "./home-content";
import { ButtonArrow } from "./ui";

/**
 * Floating pill header in brand-purple glass. It stays fixed over the page; once the
 * visitor scrolls, the glass gets a little denser so it reads over any section.
 */
export function GlassHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 tablet:px-6 tablet:pt-4">
      <div className="pointer-events-auto relative mx-auto max-w-[1200px]">
        <div
          className={cn(
            "flex h-[62px] items-center gap-4 rounded-full border pr-2 pl-5 text-white backdrop-blur-xl backdrop-saturate-[1.8] transition-[background-color,box-shadow,border-color] duration-500 tablet:h-[68px] tablet:pl-7",
            scrolled || open
              ? "border-white/20 bg-[rgba(104,44,206,0.74)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_18px_40px_-18px_rgba(45,10,120,0.7)]"
              : "border-white/30 bg-[rgba(132,67,234,0.62)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_32px_-16px_rgba(61,11,138,0.55)]",
          )}
        >
          <Link href={homeLinks.home} className="shrink-0" aria-label="Sapion Magister, página inicial">
            <Image
              src={logos.white.src}
              alt="Sapion Magister"
              width={logos.white.width}
              height={logos.white.height}
              preload
              className="h-[30px] w-auto tablet:h-[34px]"
            />
          </Link>

          <nav aria-label="Principal" className="mx-auto hidden items-center gap-1 desktop:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-white/85 transition-colors duration-300 hover:bg-white/12 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 desktop:ml-0 desktop:flex">
            <a
              href={homeLinks.login}
              className="rounded-full px-5 py-[11px] text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-white/12"
            >
              Sou aluno
            </a>
            <a
              href={homeLinks.signUp}
              className="group inline-flex items-center gap-2 rounded-full bg-mg-mint px-5 py-[11px] text-[15px] font-semibold text-mg-ink shadow-[0_8px_20px_-8px_rgba(60,200,100,0.9)] transition-all duration-300 hover:bg-white"
            >
              Teste grátis
              <ButtonArrow />
            </a>
          </div>

          <div className="ml-auto flex items-center gap-2 desktop:hidden">
            <a
              href={homeLinks.signUp}
              className="hidden rounded-full bg-mg-mint px-4 py-[9px] text-[14px] font-semibold text-mg-ink tablet:inline-flex"
            >
              Teste grátis
            </a>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mg-home-menu"
              onClick={() => setOpen((value) => !value)}
              className="grid size-[46px] place-items-center rounded-full bg-white/15 text-white transition-colors duration-300 hover:bg-white/25"
            >
              {open ? <CloseIcon className="size-[18px] fill-current" /> : <BarsIcon className="size-[18px] fill-current" />}
            </button>
          </div>
        </div>

        {/* Tablet and mobile menu: a glass card dropping from the pill. */}
        <div
          id="mg-home-menu"
          className={cn(
            "absolute inset-x-0 top-[calc(100%+10px)] origin-top rounded-[28px] border border-white/25 bg-[rgba(104,44,206,0.86)] p-3 text-white shadow-[0_30px_60px_-20px_rgba(45,10,120,0.7)] backdrop-blur-xl backdrop-saturate-[1.8] transition-all duration-300 desktop:hidden",
            open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0",
          )}
          inert={!open}
        >
          <nav aria-label="Menu" className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-2xl px-4 py-3 text-[17px] font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/15 pt-3">
            <a
              href={homeLinks.login}
              className="rounded-full border-2 border-white/40 py-3 text-center text-[15px] font-semibold"
            >
              Sou aluno
            </a>
            <a
              href={homeLinks.signUp}
              className="rounded-full bg-mg-mint py-3 text-center text-[15px] font-semibold text-mg-ink"
            >
              Teste grátis
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
