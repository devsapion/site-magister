import Image from "next/image";
import type { Course } from "@/lib/magister/courses";
import { ASSETS, trilhaHighlights, type Trilha } from "./content";
import { Sparkle } from "./sparkle";

/** Card art for courses that have no image yet: the track icon over the purple brand gradient. */
function CoursePlaceholder({ trilha }: { trilha: Trilha }) {
  return (
    <div className="relative flex size-full items-center justify-center bg-[radial-gradient(circle_at_70%_30%,#a05ff9_0%,#7a35e0_45%,#4f17a8_100%)]">
      <div className="flex size-[96px] items-center justify-center rounded-full bg-white/90 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <Image
          src={trilha.icon.src}
          alt=""
          width={trilha.icon.width * 4}
          height={trilha.icon.height * 4}
          className="h-[56px] w-auto"
        />
      </div>
      <Sparkle className="top-[18%] left-[16%] size-[22px]" />
      <Sparkle className="right-[18%] bottom-[16%] size-[16px]" />
    </div>
  );
}

function CourseCard({ course, trilha }: { course: Course; trilha: Trilha }) {
  return (
    <article className="flex w-full flex-col gap-5 rounded-[30px_100px_30px_30px] bg-mg-secondary shadow-[0_0_10px_0_rgba(0,0,0,0.5)] tablet:w-[calc((100%-60px)/4)]">
      <div className="aspect-[3/2] overflow-hidden rounded-[30px_100px_0_0]">
        {course.image ? (
          <Image
            src={course.image}
            alt=""
            width={795}
            height={530}
            sizes="(min-width: 768px) 265px, 100vw"
            className="size-full object-cover"
          />
        ) : (
          <CoursePlaceholder trilha={trilha} />
        )}
      </div>
      <div className="-mt-[11px] flex flex-1 flex-col gap-5 px-5 pt-5 pb-[25px]">
        <h3 className="flex-1 text-center text-[18px] font-bold leading-none text-black">{course.title}</h3>
        <div className="text-center">
          <a
            href={course.url}
            className="inline-block rounded-[10px] bg-mg-primary p-[10px] text-[12px] font-bold leading-none text-white transition-colors duration-300 hover:bg-mg-violet"
          >
            Mais detalhes
          </a>
        </div>
      </div>
    </article>
  );
}

function TrilhaHighlights() {
  return (
    <div className="flex flex-col items-center gap-5 tablet:flex-row">
      <div className="flex w-full items-center gap-5 rounded-[30px_110px_30px_30px] border border-mg-primary bg-mg-secondary p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.26)] tablet:w-[calc((100%-20px)*0.51)] tablet:shrink-0">
        <div className="flex w-full shrink-0 flex-col gap-5 text-mg-primary tablet:w-[61.483%] tablet:p-[10px]">
          <p className="text-[24px] font-bold leading-none">Trilha com mais de</p>
          <p className="-my-[15px] text-[100px] font-bold leading-none">{trilhaHighlights.workload}</p>
          <p className="text-[24px] font-bold leading-none">Carga horária total</p>
        </div>
        <div className="hidden flex-1 justify-center p-[10px] tablet:flex">
          <Image src={`${ASSETS}/trilha/stat-clock.png`} alt="" width={140} height={164} className="h-auto w-[80%]" />
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-5 tablet:w-[calc((100%-20px)*0.49)] tablet:shrink-0">
        {trilhaHighlights.items.map((item) => (
          <div
            key={item.label.join(" ")}
            className="flex flex-wrap items-center gap-5 rounded-[30px] border border-mg-primary bg-mg-secondary p-[15px] shadow-[0_0_10px_0_rgba(0,0,0,0.21)] tablet:flex-nowrap"
          >
            <div className="flex w-[29.043%] shrink-0 tablet:justify-center">
              <Image
                src={item.icon.src}
                alt=""
                width={item.icon.width}
                height={item.icon.height}
                className="h-auto max-w-full"
              />
            </div>
            <p className="w-full text-[18px] font-bold leading-none text-mg-primary tablet:w-auto tablet:text-[21px]">
              {item.label.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrilhaCourses({ trilha, courses }: { trilha: Trilha; courses: Course[] }) {
  return (
    <section id="cursos" className="bg-[linear-gradient(180deg,#e7ffff_0%,#c0fdfe_100%)] py-[60px]">
      <div className="mx-auto max-w-[1140px]">
        <div className="relative bg-[url(/sites/magister/images/trilha/courses-path-bg.png)] bg-[length:1000px_auto] bg-[position:-653px_52px] bg-no-repeat px-[10px] tablet:bg-contain tablet:bg-[position:0_0] desktop:bg-[position:0_16px]">
          <Image
            src={`${ASSETS}/trilha/diamond.png`}
            alt=""
            width={96}
            height={96}
            className="absolute top-[-3px] left-[983px] hidden w-[48px] desktop:block"
          />
          <div className="flex flex-col gap-5 py-[10px]">
            <h2 className="text-[24px] font-bold leading-none text-mg-violet">Todos os cursos da trilha</h2>
            <div className="flex flex-wrap gap-5 pt-10 pb-[55px]">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} trilha={trilha} />
              ))}
            </div>
            <TrilhaHighlights />
          </div>
        </div>
      </div>
    </section>
  );
}
