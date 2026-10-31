import { BookOpen, Check, CirclePlay, GraduationCap, Layers, PencilRuler, Users } from "lucide-react";
import Image from "next/image";
import type { CatalogTotals, Course } from "@/lib/magister/courses";
import { cn } from "@/lib/utils";
import { ASSETS, certificateLaws, links, trilhas, type Trilha } from "../content";
import { trilhaVisuals } from "../home/home-content";
import { TrilhaCard } from "../home/trilhas";
import { buttonStyles, ButtonArrow, Magis, Mark, SectionHeading, SparkleIcon } from "../home/ui";
import { CountUp } from "./count-up";
import { CourseTrail } from "./course-trail";

const statTiles: { key: keyof CatalogTotals; label: string; Icon: typeof Layers }[] = [
  { key: "courses", label: "cursos", Icon: GraduationCap },
  { key: "modules", label: "módulos", Icon: Layers },
  { key: "videos", label: "videoaulas", Icon: CirclePlay },
  { key: "ebooks", label: "e-books e textos", Icon: BookOpen },
  { key: "activities", label: "atividades práticas", Icon: PencilRuler },
  { key: "consultants", label: "professores", Icon: Users },
];

/** White sheet that slides over the hero with the track numbers and its course trail. */
export function TrilhaCourses({ trilha, courses, totals }: { trilha: Trilha; courses: Course[]; totals: CatalogTotals }) {
  const visual = trilhaVisuals[trilha.slug];
  const theme = {
    title: trilha.title,
    icon: visual.icon,
    gradient: visual.gradient,
    color: visual.color,
    tint: visual.tint,
  };

  return (
    <section
      id="cursos"
      className="relative z-[1] -mt-12 rounded-t-[40px] bg-white pt-16 shadow-[0_-34px_60px_-34px_rgba(30,10,80,0.45)] tablet:rounded-t-[56px] tablet:pt-20 desktop:pt-24"
    >
      <span className="absolute top-4 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-mg-line" aria-hidden="true" />
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading
          title={
            <>
              Os cursos da trilha <Mark>{trilha.title}</Mark>
            </>
          }
          description="Cada curso combina videoaulas, e-books, atividades práticas e conteúdos extras, com certificado ao final. Abra a grade para ver os módulos e quem ensina."
        />

        <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-2 gap-3 tablet:grid-cols-3 desktop:grid-cols-6">
          {statTiles.map(({ key, label, Icon }, i) => (
            <li
              key={key}
              className="flex flex-col items-start rounded-[24px] border border-mg-line bg-white p-5 shadow-[0_20px_40px_-36px_rgba(60,20,140,0.6)]"
              data-animate="fadeUp"
              data-delay={i * 70}
            >
              <span
                className="grid size-11 -rotate-6 place-items-center rounded-[14px] text-white shadow-[0_12px_24px_-12px_rgba(40,10,110,0.6)]"
                style={{ backgroundImage: visual.gradient }}
              >
                <Icon className="size-5" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <p className="mt-4 text-[32px] leading-none font-bold tracking-[-0.03em] text-mg-ink">
                <CountUp value={totals[key]} />
              </p>
              <p className="mt-1.5 text-[14px] text-mg-muted">{label}</p>
            </li>
          ))}
        </ul>

        <CourseTrail courses={courses} theme={theme} />
      </div>
    </section>
  );
}

/** Every course of the track grants its own certificate: the sample, plus the laws that back it. */
export function TrilhaCertificado({ trilha, courses }: { trilha: Trilha; courses: number }) {
  const visual = trilhaVisuals[trilha.slug];
  return (
    <section
      id="certificado"
      className="relative scroll-mt-24 overflow-hidden bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.14)_1.2px,transparent_1.2px)] bg-[length:22px_22px] py-20 desktop:py-28"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 desktop:grid-cols-[1fr_1.1fr] desktop:gap-10">
        <div data-animate="fadeUp">
          <p
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold tracking-[0.08em] uppercase"
            style={{ backgroundColor: visual.tint, color: visual.color }}
          >
            <SparkleIcon className="size-3.5" />
            Certificado por curso
          </p>
          <h2 className="mt-5 text-balance text-[30px] leading-[1.12] font-bold tracking-[-0.02em] text-mg-ink tablet:text-[42px]">
            Cada curso concluído vale um <Mark>certificado</Mark>
          </h2>
          <p className="mt-4 max-w-[540px] text-pretty text-[16px] leading-[1.65] text-mg-muted tablet:text-[18px]">
            Não é preciso esperar o fim da trilha: são {courses} cursos na trilha {trilha.title} e, a cada um que
            você conclui, recebe o seu certificado de conclusão, válido em todo o território nacional. Os
            certificados emitidos pela Sapion Magister se enquadram na categoria de cursos livres e estão de acordo
            com as principais leis vigentes:
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {certificateLaws.map((law) => (
              <li key={law} className="flex items-start gap-3 text-[15px] leading-[1.5] text-mg-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mg-mint text-mg-ink">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {law}
              </li>
            ))}
          </ul>
          <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.primary, "mt-8")}>
            Teste por 14 dias grátis
            <ButtonArrow />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[600px]" data-animate="fadeUp" data-delay={150}>
          <span
            className="absolute inset-[8%_6%_14%] rounded-full opacity-70 blur-[2px]"
            style={{ backgroundImage: visual.gradient }}
            aria-hidden="true"
          />
          <svg
            className="pointer-events-none absolute -inset-6 h-[calc(100%+48px)] w-[calc(100%+48px)] text-mg-purple/30"
            viewBox="0 0 600 560"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="mg-dash-flow"
              d="M30 470C10 330 60 120 220 60s330 10 350 160-60 280-220 300"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 12"
            />
          </svg>
          <Image
            src={`${ASSETS}/certificado.png`}
            alt="Certificado de conclusão de curso da Sapion Magister em um tablet"
            width={1536}
            height={1465}
            sizes="(min-width: 1025px) 600px, 90vw"
            className="mg-bob-slow relative h-auto w-full"
          />
          <SparkleIcon className="mg-twinkle absolute top-[6%] left-[4%] size-7 text-mg-purple/60" />
          <SparkleIcon className="mg-twinkle absolute top-[2%] right-[18%] size-4 text-mg-mint [animation-delay:1s]" />
          <Magis
            pose="comemorando"
            sizes="150px"
            className="mg-bob absolute -bottom-6 -left-2 w-[96px] [animation-delay:-1.2s] tablet:w-[130px]"
          />
        </div>
      </div>
    </section>
  );
}

/** The four other tracks, so the visitor can keep exploring. */
export function OutrasTrilhas({ current }: { current: Trilha }) {
  const others = trilhas.filter((trilha) => trilha.slug !== current.slug);
  return (
    <section className="relative bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              Continue explorando: <Mark>outras trilhas</Mark>
            </>
          }
          description="Uma assinatura dá acesso a todas as trilhas. Monte a sua jornada de formação do seu jeito."
        />
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] desktop:mx-0 desktop:grid desktop:grid-cols-4 desktop:overflow-visible desktop:px-0 desktop:pb-0">
          {others.map((trilha, i) => (
            <li
              key={trilha.slug}
              className="w-[78%] max-w-[300px] shrink-0 snap-center tablet:w-[280px] desktop:w-auto desktop:max-w-none"
              data-animate="fadeUp"
              data-delay={i * 100}
            >
              <TrilhaCard trilha={trilha} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
