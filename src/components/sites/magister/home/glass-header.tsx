"use client";

import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BarsIcon, CloseIcon } from "../icons";
import { homeLinks, logos, navItems, type HeaderLink } from "./home-content";
import { ButtonArrow } from "./ui";

function SearchField({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  return (
    <form action="/blog/busca" role="search" className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/75" />
      <input
        type="search"
        name="q"
        required
        autoFocus={autoFocus}
        placeholder="Buscar no blog"
        aria-label="Buscar no blog"
        className="h-[44px] w-full rounded-full border border-white/25 bg-white/12 pr-4 pl-10 text-[14px] text-white placeholder:text-white/70 transition-colors focus:border-white/60 focus:bg-white/20 focus:outline-none"
      />
    </form>
  );
}

/**
 * Floating pill header in brand-purple glass. It stays fixed over the page; once the
 * visitor scrolls, the glass gets a little denser so it reads over any section.
 * The blog passes its own links (with a categories dropdown), turns on the search field and
 * drops the "Teste grátis" call to action.
 */
export function GlassHeader({
  links = navItems,
  search = false,
  cta = true,
}: {
  links?: HeaderLink[];
  search?: boolean;
  cta?: boolean;
}) {
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

          <nav aria-label="Principal" className={cn("hidden items-center gap-1 desktop:flex", search ? "ml-4" : "mx-auto")}>
            {links.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium text-white/85 transition-colors duration-300 group-focus-within:bg-white/12 group-hover:bg-white/12 group-hover:text-white"
                  >
                    {item.label}
                    <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180" />
                  </a>
                  {/* Dropdown: the top padding bridges the gap so hover is not lost on the way down. */}
                  <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="grid w-[460px] grid-cols-2 gap-1 rounded-[24px] border border-white/25 bg-[rgba(98,40,196,0.97)] p-2 shadow-[0_30px_60px_-20px_rgba(45,10,120,0.7)] backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className="block rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-white/12"
                          >
                            <span className="block text-[15px] font-semibold text-white">{child.label}</span>
                            {child.description && (
                              <span className="mt-0.5 line-clamp-1 text-[12px] text-white/65">
                                {child.description}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[15px] font-medium text-white/85 transition-colors duration-300 hover:bg-white/12 hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className={cn("hidden items-center gap-2 desktop:flex", search ? "ml-auto" : "ml-0")}>
            {search ? (
              <SearchField className="w-[220px] xl:w-[260px]" />
            ) : (
              <a
                href={homeLinks.login}
                className="rounded-full px-5 py-[11px] text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-white/12"
              >
                Sou aluno
              </a>
            )}
            {cta && (
              <a
                href={homeLinks.signUp}
                className="group inline-flex items-center gap-2 rounded-full bg-mg-mint px-5 py-[11px] text-[15px] font-semibold text-mg-ink shadow-[0_8px_20px_-8px_rgba(60,200,100,0.9)] transition-all duration-300 hover:bg-white"
              >
                Teste grátis
                <ButtonArrow />
              </a>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 desktop:hidden">
            {cta && (
              <a
                href={homeLinks.signUp}
                className="hidden rounded-full bg-mg-mint px-4 py-[9px] text-[14px] font-semibold text-mg-ink tablet:inline-flex"
              >
                Teste grátis
              </a>
            )}
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
            "absolute inset-x-0 top-[calc(100%+10px)] max-h-[calc(100dvh-100px)] origin-top overflow-y-auto rounded-[28px] border border-white/25 bg-[rgba(104,44,206,0.86)] p-3 text-white shadow-[0_30px_60px_-20px_rgba(45,10,120,0.7)] backdrop-blur-xl backdrop-saturate-[1.8] transition-all duration-300 desktop:hidden",
            open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0",
          )}
          inert={!open}
        >
          {search && <SearchField className="mb-2" />}
          <nav aria-label="Menu" className="flex flex-col">
            {links.map((item) => (
              <div key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block rounded-2xl px-4 py-3 text-[17px] font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="rounded-full bg-white/12 px-3 py-1.5 text-[14px] font-medium text-white"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {cta && (
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
          )}
        </div>
      </div>
    </header>
  );
}
