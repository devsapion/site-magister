"use client";

import { Dialog } from "@base-ui/react/dialog";
import { BookOpen, ChevronLeft, ChevronRight, CirclePlay, Compass, PencilRuler, X } from "lucide-react";
import Image from "next/image";
import { useEffect, type RefObject } from "react";
import type { Course, CourseStats } from "@/lib/magister/courses";
import { cn } from "@/lib/utils";
import { links } from "../content";
import { buttonStyles, ButtonArrow, TrilhaBadge } from "../home/ui";

export interface TrilhaTheme {
  title: string;
  icon: string;
  gradient: string;
  color: string;
  tint: string;
}

const statItems: { key: keyof CourseStats; label: string; Icon: typeof CirclePlay }[] = [
  { key: "videos", label: "videoaulas", Icon: CirclePlay },
  { key: "ebooks", label: "e-books e textos", Icon: BookOpen },
  { key: "activities", label: "atividades práticas", Icon: PencilRuler },
  { key: "extras", label: "conteúdos extras", Icon: Compass },
];

export const pad = (n: number) => String(n).padStart(2, "0");

/** Content counts of a course as small badges in the track color. */
export function StatBadges({
  stats,
  theme,
  keys = statItems.map((item) => item.key),
  className,
}: {
  stats: CourseStats;
  theme: TrilhaTheme;
  keys?: (keyof CourseStats)[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2 text-[13px] font-semibold", className)}>
      {statItems
        .filter((item) => keys.includes(item.key))
        .map(({ key, label, Icon }) => (
          <li
            key={key}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: theme.tint, color: theme.color }}
          >
            <Icon className="size-4" aria-hidden="true" />
            {stats[key]} {label}
          </li>
        ))}
    </ul>
  );
}

// aria-disabled rather than disabled, so focus stays on the arrow at either end of the track.
const stepButton =
  "inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[14px] font-semibold text-mg-purple transition-colors hover:bg-white aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:bg-transparent";

/**
 * Locks the page while the dialog is open. The page scrollbar is hidden (its width given back as
 * padding so nothing shifts), leaving the dialog's own scroll area as the only scrollbar.
 */
function usePageScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    return () => {
      Object.assign(html.style, previous);
    };
  }, [locked]);
}

/**
 * "Grade e professores" of a course: the modules in study order, the content counts and the
 * consultants who teach it. Arrows step through the other courses of the track.
 */
export function CourseDialog({
  courses,
  index,
  open,
  theme,
  onOpenChange,
  onIndexChange,
  onClosed,
  returnFocus,
}: {
  courses: Course[];
  index: number | null;
  open: boolean;
  theme: TrilhaTheme;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  /** Called once the closing animation ends. */
  onClosed: () => void;
  /** Button that opened the dialog; it gets the focus back on close. */
  returnFocus: RefObject<HTMLElement | null>;
}) {
  const course = index === null ? null : courses[index];
  usePageScrollLock(open);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => !isOpen && onClosed()}
      // Focus is trapped by Base UI; the page scroll lock is ours (see usePageScrollLock).
      modal="trap-focus"
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-mg-night/65 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-[100] flex p-3 tablet:p-8">
          {course && index !== null && (
            <Dialog.Popup
              finalFocus={returnFocus}
              className="relative m-auto flex max-h-full w-full max-w-[1040px] flex-col overflow-hidden rounded-[30px] bg-white font-lexend text-mg-ink shadow-[0_50px_100px_-40px_rgba(26,11,69,0.75)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-8 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 tablet:rounded-[36px]">
              <Dialog.Close
                aria-label="Fechar"
                className="absolute top-4 right-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-white/90 text-mg-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white tablet:top-5 tablet:right-5"
              >
                <X className="size-5" />
              </Dialog.Close>

              {/* Keyed by course: stepping to another one replays the entrance and starts it at the top. */}
              <div key={course.id} className="mg-swap-in flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:rgba(132,67,234,0.35)_transparent] [scrollbar-width:thin]">
                  {/* Cover: course artwork under a dark wash, title on top */}
                  <header className="relative isolate flex min-h-[230px] flex-col justify-end overflow-hidden px-6 pt-20 pb-7 text-white tablet:min-h-[280px] tablet:px-10 tablet:pb-9">
                    {course.image ? (
                      <Image src={course.image} alt="" fill sizes="(min-width: 1040px) 1040px, 100vw" className="-z-10 object-cover" />
                    ) : (
                      <span className="absolute inset-0 -z-10" style={{ backgroundImage: theme.gradient }} />
                    )}
                    <span className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(26,11,69,0.05)_0%,rgba(26,11,69,0.55)_50%,rgba(26,11,69,0.92)_100%)]" />
                    <p className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.08em] text-white/85 uppercase">
                      <TrilhaBadge
                        icon={theme.icon}
                        gradient={theme.gradient}
                        className="grid size-8 place-items-center rounded-full ring-2 ring-white/70"
                      />
                      Trilha {theme.title} · Curso {pad(index + 1)} de {pad(courses.length)}
                    </p>
                    <Dialog.Title className="mt-3 max-w-[820px] text-balance text-[26px] leading-[1.15] font-bold tracking-[-0.02em] tablet:text-[36px]">
                      {course.title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-3 max-w-[760px] text-[15px] leading-[1.6] text-white/85 tablet:text-[16px]">
                      {course.description}
                    </Dialog.Description>
                  </header>

                  <StatBadges stats={course.stats} theme={theme} className="px-6 pt-7 tablet:px-10" />

                  <div className="grid gap-10 px-6 pt-8 pb-10 tablet:px-10 desktop:grid-cols-[1.2fr_1fr] desktop:gap-12">
                    <section aria-labelledby="mg-course-grade">
                      <h3 id="mg-course-grade" className="flex items-baseline gap-3 text-[20px] font-bold">
                        Grade do curso
                        <span className="text-[14px] font-semibold" style={{ color: theme.color }}>
                          {course.modules.length} módulos
                        </span>
                      </h3>
                      <ol className="mt-6">
                        {course.modules.map((module, i) => (
                          <li key={module} className="relative flex gap-4 pb-6 last:pb-0">
                            {i < course.modules.length - 1 && (
                              <span
                                className="absolute top-11 bottom-1 left-[19px] border-l-2 border-dashed opacity-40"
                                style={{ borderColor: theme.color }}
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className="grid size-10 shrink-0 place-items-center rounded-full text-[15px] font-bold"
                              style={{ backgroundColor: theme.tint, color: theme.color }}
                            >
                              {i + 1}
                            </span>
                            <div className="pt-0.5">
                              <p className="text-[12px] font-semibold tracking-[0.1em] text-mg-muted uppercase">Módulo {i + 1}</p>
                              <p className="mt-0.5 text-[16px] leading-[1.45] font-semibold text-mg-ink">{module}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>

                    <section aria-labelledby="mg-course-professores">
                      <h3 id="mg-course-professores" className="text-[20px] font-bold">
                        {course.consultants.length > 1 ? "Professores" : "Professor"}
                      </h3>
                      <ul className="mt-5 flex flex-col gap-4">
                        {course.consultants.map((person) => (
                          <li key={person.name} className="flex items-center gap-4">
                            <Image
                              src={person.photo}
                              alt=""
                              width={64}
                              height={64}
                              className="size-16 shrink-0 rounded-[20px] bg-mg-lilac object-cover object-[50%_20%]"
                            />
                            <div className="min-w-0">
                              <p className="text-[16px] leading-tight font-bold">{person.name}</p>
                              <p className="mt-1 line-clamp-3 text-[13px] leading-[1.5] text-mg-muted">{person.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <footer className="flex shrink-0 flex-col-reverse items-stretch gap-3 border-t border-mg-line bg-mg-lilac/60 px-4 py-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10 tablet:py-5">
                  <div className="flex items-center justify-between gap-2 tablet:justify-start">
                    <button
                      type="button"
                      onClick={() => index > 0 && onIndexChange(index - 1)}
                      aria-disabled={index === 0}
                      className={stepButton}
                    >
                      <ChevronLeft className="size-4" />
                      Curso anterior
                    </button>
                    <button
                      type="button"
                      onClick={() => index < courses.length - 1 && onIndexChange(index + 1)}
                      aria-disabled={index === courses.length - 1}
                      className={stepButton}
                    >
                      Próximo curso
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                  <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.primary, "py-[13px]")}>
                    Começar este curso
                    <ButtonArrow />
                  </a>
                </footer>
              </div>
            </Dialog.Popup>
          )}
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
