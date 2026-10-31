"use client";

import { Flag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Course } from "@/lib/magister/courses";
import { cn } from "@/lib/utils";
import { links } from "../content";
import { ArrowIcon, buttonStyles, TrilhaBadge } from "../home/ui";
import { CourseDialog, pad, StatBadges, type TrilhaTheme } from "./course-dialog";

function consultantNames(course: Course) {
  const names = course.consultants.map((person) => person.name);
  if (names.length <= 2) return names.join(" e ");
  return `${names.slice(0, 2).join(", ")} e mais ${names.length - 2}`;
}

/**
 * The courses of a track laid out as a trail: numbered stops on a dashed line that fills with
 * the track color as the visitor scrolls, each course alternating sides on desktop. "Grade e
 * professores" opens the course dialog.
 */
export function CourseTrail({ courses, theme }: { courses: Course[]; theme: TrilhaTheme }) {
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const stops = Array.from(list.querySelectorAll<HTMLElement>("[data-stop]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.6;
      const rect = list.getBoundingClientRect();
      list.style.setProperty("--fill", Math.min(Math.max((line - rect.top) / rect.height, 0), 1).toFixed(4));
      for (const stop of stops) {
        const box = stop.getBoundingClientRect();
        stop.toggleAttribute("data-reached", box.top + box.height / 2 < line);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const openCourse = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
    setOpen(true);
  };

  const stopClass =
    "group/stop relative z-[1] grid place-items-center rounded-full border-[3px] bg-white font-bold transition-[transform,background-color,color,box-shadow] duration-500 data-[reached]:scale-110 data-[reached]:border-white data-[reached]:text-white data-[reached]:shadow-[0_14px_30px_-12px_rgba(40,10,110,0.55)]";

  return (
    <>
      <ol ref={listRef} className="relative mt-16 tablet:mt-20">
        {/* The trail: dashed track, plus the colored fill that follows the scroll */}
        <span
          className="absolute top-0 bottom-0 left-[21px] w-0 border-l-[3px] border-dashed opacity-35 [mask-image:linear-gradient(transparent,#000_4%,#000_96%,transparent)] desktop:left-1/2 desktop:-ml-[1.5px]"
          style={{ borderColor: theme.color }}
          aria-hidden="true"
        />
        <span
          className="mg-trail-fill absolute top-0 bottom-0 left-[21px] w-[3px] rounded-full [mask-image:linear-gradient(transparent,#000_4%)] desktop:left-1/2 desktop:-ml-[1.5px]"
          style={{ backgroundImage: `linear-gradient(180deg, ${theme.tint}, ${theme.color})` }}
          aria-hidden="true"
        />

        {courses.map((course, i) => {
          const mediaLeft = i % 2 === 0;
          return (
            <li
              key={course.id}
              className="relative grid grid-cols-[44px_1fr] gap-x-5 pb-16 last:pb-20 tablet:gap-x-8 desktop:grid-cols-[1fr_128px_1fr] desktop:items-center desktop:gap-x-0 desktop:pb-24"
            >
              <span
                data-stop
                className={cn(stopClass, "row-span-2 size-11 self-start text-[15px] desktop:col-start-2 desktop:row-span-1 desktop:row-start-1 desktop:size-16 desktop:self-center desktop:text-[20px]")}
                style={{ borderColor: theme.color, color: theme.color }}
              >
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-data-[reached]/stop:opacity-100"
                  style={{ backgroundImage: theme.gradient }}
                  aria-hidden="true"
                />
                <span className="relative">{pad(i + 1)}</span>
              </span>

              {/* Artwork */}
              <div
                className={cn(
                  "col-start-2 desktop:row-start-1",
                  mediaLeft ? "desktop:col-start-1 desktop:pr-4" : "desktop:col-start-3 desktop:pl-4",
                )}
                data-animate={mediaLeft ? "fadeLeft" : "fadeRight"}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Grade e professores: ${course.title}`}
                  onClick={(event) => openCourse(i, event.currentTarget)}
                  className="group relative block w-full cursor-pointer text-left"
                >
                  <span
                    className={cn(
                      "absolute -inset-3 rounded-[38px] transition-transform duration-700 group-hover:rotate-0 tablet:-inset-4",
                      mediaLeft ? "-rotate-3" : "rotate-3",
                    )}
                    style={{ backgroundColor: theme.tint }}
                    aria-hidden="true"
                  />
                  <span className="relative block aspect-video overflow-hidden rounded-[26px] bg-mg-lilac shadow-[0_30px_60px_-30px_rgba(40,10,110,0.55)]">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt=""
                        fill
                        sizes="(min-width: 1025px) 540px, (min-width: 768px) 80vw, 90vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <span className="absolute inset-0" style={{ backgroundImage: theme.gradient }} />
                    )}
                    <span className="absolute inset-0 flex items-end bg-[linear-gradient(180deg,transparent_45%,rgba(26,11,69,0.75))] p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-mg-ink">
                        Ver grade e professores
                        <ArrowIcon className="size-4" />
                      </span>
                    </span>
                  </span>
                  <TrilhaBadge
                    icon={theme.icon}
                    gradient={theme.gradient}
                    className="absolute -top-4 -left-3 grid size-12 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] ring-4 ring-white transition-transform duration-500 group-hover:-rotate-12 tablet:size-14"
                  />
                  <span className="absolute right-5 -bottom-4 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-mg-ink shadow-[0_12px_26px_-12px_rgba(40,10,110,0.5)]">
                    {course.modules.length} módulos
                  </span>
                </button>
              </div>

              {/* Details */}
              <div
                className={cn(
                  "col-start-2 mt-10 desktop:row-start-1 desktop:mt-0",
                  mediaLeft ? "desktop:col-start-3 desktop:pl-4" : "desktop:col-start-1 desktop:pr-4",
                )}
                data-animate={mediaLeft ? "fadeRight" : "fadeLeft"}
                data-delay={120}
              >
                <p className="text-[13px] font-bold tracking-[0.14em] uppercase" style={{ color: theme.color }}>
                  Curso {pad(i + 1)}
                </p>
                <h3 className="mt-2 text-balance text-[24px] leading-[1.18] font-bold tracking-[-0.02em] text-mg-ink tablet:text-[28px]">
                  {course.title}
                </h3>
                <p className="mt-3 text-pretty text-[16px] leading-[1.65] text-mg-muted">{course.description}</p>

                <StatBadges
                  stats={course.stats}
                  theme={theme}
                  keys={["videos", "ebooks", "activities"]}
                  className="mt-5"
                />

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex shrink-0 -space-x-3">
                    {course.consultants.slice(0, 4).map((person) => (
                      <Image
                        key={person.name}
                        src={person.photo}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full bg-mg-lilac object-cover object-[50%_20%] ring-[3px] ring-white"
                      />
                    ))}
                  </div>
                  <p className="text-[14px] leading-snug text-mg-muted">
                    Com <span className="font-semibold text-mg-ink">{consultantNames(course)}</span>
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3 tablet:flex-row tablet:items-center">
                  <button
                    type="button"
                    onClick={(event) => openCourse(i, event.currentTarget)}
                    aria-haspopup="dialog"
                    className={cn(buttonStyles.base, buttonStyles.primary, "py-[13px]")}
                  >
                    Grade e professores
                    <ArrowIcon className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <a
                    href={links.signUp}
                    className="rounded-full px-5 py-[13px] text-center text-[15px] font-semibold text-mg-purple transition-colors hover:bg-mg-lilac"
                  >
                    Começar agora
                  </a>
                </div>
              </div>
            </li>
          );
        })}

        {/* End of the trail */}
        <li className="relative grid grid-cols-[44px_1fr] items-center gap-x-5 tablet:gap-x-8 desktop:flex desktop:flex-col desktop:gap-4 desktop:text-center">
          <span
            data-stop
            className={cn(stopClass, "size-11 desktop:size-16")}
            style={{ borderColor: theme.color, color: theme.color }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-data-[reached]/stop:opacity-100"
              style={{ backgroundImage: theme.gradient }}
              aria-hidden="true"
            />
            <Flag className="relative size-5 desktop:size-6" aria-hidden="true" />
          </span>
          {/* Opaque on desktop so the trail ends at the flag instead of running through the text */}
          <div data-animate="fadeUp" className="desktop:relative desktop:z-[1] desktop:bg-white desktop:px-6 desktop:pb-2">
            <p className="text-[18px] font-bold text-mg-ink tablet:text-[20px]">Você chegou ao fim da trilha {theme.title}!</p>
            <a
              href="#certificado"
              className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-mg-purple hover:underline"
            >
              Cada curso concluído vale um certificado
              <ArrowIcon className="size-4" />
            </a>
          </div>
        </li>
      </ol>

      <CourseDialog
        courses={courses}
        index={index}
        open={open}
        theme={theme}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
        onClosed={() => setIndex(null)}
        returnFocus={openerRef}
      />
    </>
  );
}
