import { trilhas } from "../content";
import { trilhaVisuals } from "./home-content";
import { ArrowIcon, Mark, SectionHeading } from "./ui";

/** Track badge: the platform's gradient circle with the track icon punched in white. */
export function TrilhaBadge({ icon, gradient, className }: { icon: string; gradient: string; className?: string }) {
  return (
    <span
      className={className}
      style={{ backgroundImage: gradient }}
      aria-hidden="true"
    >
      <span
        className="block size-[56%] bg-white"
        style={{ mask: `url(${icon}) center / contain no-repeat`, WebkitMask: `url(${icon}) center / contain no-repeat` }}
      />
    </span>
  );
}

export function TrilhasSection() {
  return (
    <section id="trilhas" className="relative scroll-mt-24 bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              Uma <Mark>trilha</Mark> para cada momento da sua jornada
            </>
          }
          description="Aprender nunca foi tão fácil e motivador! Conheça nossas trilhas de aprendizagem que vão transformar sua formação e suas aulas em experiências incríveis."
        />

        <div className="relative mt-14">
          {/* Dashed trail linking the five badges on desktop */}
          <div
            className="pointer-events-none absolute top-[44px] right-[10%] left-[10%] hidden border-t-[3px] border-dashed border-mg-purple/25 desktop:block"
            aria-hidden="true"
          />
          <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] desktop:mx-0 desktop:grid desktop:grid-cols-5 desktop:overflow-visible desktop:px-0 desktop:pb-0">
            {trilhas.map((trilha, i) => {
              const visual = trilhaVisuals[trilha.slug];
              return (
                <li
                  key={trilha.slug}
                  className="w-[78%] max-w-[300px] shrink-0 snap-center tablet:w-[280px] desktop:w-auto desktop:max-w-none"
                  data-animate="fadeUp"
                  data-delay={i * 100}
                >
                  <a
                    href={trilha.href}
                    className="group relative flex h-full flex-col items-start rounded-[28px] border border-mg-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(60,20,140,0.45)]"
                  >
                    <TrilhaBadge
                      icon={visual.icon}
                      gradient={visual.gradient}
                      className="relative grid size-[88px] place-items-center rounded-full shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] ring-[6px] ring-white transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6"
                    />
                    <h3 className="mt-5 text-[22px] font-bold leading-tight" style={{ color: visual.color }}>
                      {i + 1} – {trilha.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-[1.55] text-mg-muted">{trilha.description}</p>
                    <span
                      className="mt-5 rounded-full px-3 py-1.5 text-[13px] font-semibold"
                      style={{ backgroundColor: visual.tint, color: visual.color }}
                    >
                      {visual.stats}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-mg-purple">
                      Conhecer cursos
                      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
