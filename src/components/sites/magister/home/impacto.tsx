import { Building2, Clock, Users } from "lucide-react";
import { featuredTestimonials, impactStats } from "./home-content";
import { Magis, Mark, SectionHeading } from "./ui";
import { TestimonialRotator } from "./testimonial-rotator";

const statIcons = { users: Users, building: Building2, clock: Clock };
const statGradients = [
  "linear-gradient(140deg,#b07cff,#7a35e6)",
  "linear-gradient(140deg,#48d3aa,#099268)",
  "linear-gradient(140deg,#ffa651,#e8590c)",
];

export function ImpactoSection() {
  return (
    <section id="resultados" className="relative scroll-mt-24 overflow-hidden bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              A Sapion Magister <Mark>impulsiona</Mark> a educação dos municípios
            </>
          }
          description="Ecossistema de educadores e resultados de verdade: formação continuada que gera dados para professores, gestores e secretarias de educação."
        />

        <div className="mx-auto mt-16 grid max-w-[1100px] items-center gap-14 desktop:grid-cols-[1fr_1.05fr] desktop:gap-20">
          <div data-animate="fadeUp">
            <h3 className="text-[24px] font-bold text-mg-ink tablet:text-[26px]">Nas redes parceiras,</h3>
            <ul className="mt-8 flex flex-col gap-8">
              {impactStats.map((stat, i) => {
                const Icon = statIcons[stat.icon];
                return (
                  <li key={stat.value} className="flex items-start gap-5">
                    <span
                      className="grid size-[60px] shrink-0 -rotate-6 place-items-center rounded-[20px] text-white shadow-[0_14px_28px_-14px_rgba(60,20,140,0.7)]"
                      style={{ backgroundImage: statGradients[i] }}
                    >
                      <Icon className="size-7" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[30px] font-bold leading-none tracking-[-0.02em] text-mg-ink tablet:text-[34px]">
                        {stat.value}
                      </p>
                      <p className="mt-2 max-w-[400px] text-[16px] leading-[1.6] text-mg-muted">{stat.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative" data-animate="fadeUp" data-delay={150}>
            {/* Dashed loop behind the card, like a trail drawn around it */}
            <svg
              className="pointer-events-none absolute -top-16 -right-10 h-[260px] w-[360px] text-mg-purple/30"
              viewBox="0 0 360 260"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="mg-dash-flow"
                d="M10 220C60 120 150 30 240 40s110 110 40 150-150-20-110-90S330 20 350 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="10 12"
              />
            </svg>
            <Magis
              pose="meditando"
              sizes="140px"
              className="mg-bob-slow absolute -right-6 -bottom-12 z-[1] hidden w-[120px] tablet:block"
            />
            <TestimonialRotator items={featuredTestimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
