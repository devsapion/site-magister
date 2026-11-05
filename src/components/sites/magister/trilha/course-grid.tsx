"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Course } from "@/lib/magister/courses";
import { ArrowIcon, TrilhaBadge } from "../home/ui";
import { CourseDialog, StatBadges, type TrilhaTheme } from "./course-dialog";

function consultantNames(course: Course) {
  const names = course.consultants.map((person) => person.name);
  if (names.length <= 2) return names.join(" e ");
  return `${names.slice(0, 2).join(", ")} e mais ${names.length - 2}`;
}

/**
 * The courses of a track as a grid of cards (three per row on desktop, an incomplete last row
 * centered). The whole card opens the course dialog with the modules and who teaches it.
 */
export function CourseGrid({ courses, theme }: { courses: Course[]; theme: TrilhaTheme }) {
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const openCourse = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <ul className="mt-14 flex flex-wrap justify-center gap-6 tablet:mt-16">
        {courses.map((course, i) => (
          <li
            key={course.id}
            className="flex w-full tablet:w-[calc((100%-24px)/2)] desktop:w-[calc((100%-48px)/3)]"
            data-animate="fadeUp"
            data-delay={(i % 3) * 100}
          >
            {/* Lift lives on the article: the entrance animation owns the <li>'s transform. */}
            <article className="group relative flex w-full flex-col overflow-hidden rounded-[28px] border border-mg-line bg-white shadow-[0_24px_50px_-40px_rgba(60,20,140,0.7)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-32px_rgba(60,20,140,0.55)] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-mg-purple">
              <div className="relative aspect-video overflow-hidden bg-mg-lilac">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt=""
                    fill
                    sizes="(min-width: 1025px) 370px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                ) : (
                  <span className="absolute inset-0" style={{ backgroundImage: theme.gradient }} />
                )}
                <TrilhaBadge
                  icon={theme.icon}
                  gradient={theme.gradient}
                  className="absolute top-4 right-4 grid size-12 place-items-center rounded-full shadow-[0_10px_22px_-10px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:-rotate-12"
                />
                <span className="absolute right-4 bottom-4 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-mg-ink shadow-[0_10px_22px_-12px_rgba(40,10,110,0.6)]">
                  {course.modules.length} módulos
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-balance text-[20px] leading-[1.25] font-bold tracking-[-0.01em] text-mg-ink">
                  {course.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 text-pretty text-[15px] leading-[1.6] text-mg-muted">
                  {course.description}
                </p>

                <StatBadges
                  stats={course.stats}
                  theme={theme}
                  keys={["videos", "ebooks", "activities"]}
                  className="mt-5"
                />

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <div className="flex shrink-0 -space-x-3">
                    {course.consultants.slice(0, 3).map((person) => (
                      <Image
                        key={person.name}
                        src={person.photo}
                        alt=""
                        width={36}
                        height={36}
                        className="size-9 rounded-full bg-mg-lilac object-cover object-[50%_20%] ring-[3px] ring-white"
                      />
                    ))}
                  </div>
                  <p className="text-pretty text-[14px] leading-snug text-mg-muted">
                    Com <span className="font-semibold text-mg-ink">{consultantNames(course)}</span>
                  </p>
                </div>

                <div className="mt-5 border-t border-mg-line pt-5">
                  {/* Stretched over the whole card, so clicking anywhere on it opens the dialog. */}
                  <button
                    type="button"
                    onClick={(event) => openCourse(i, event.currentTarget)}
                    aria-haspopup="dialog"
                    aria-label={`Grade e professores: ${course.title}`}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-mg-purple outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    Grade e professores
                    <ArrowIcon className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

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
