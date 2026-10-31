import { Building2, MessagesSquare, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { impactNumbers, reachStats, videoTestimonials } from "./home-content";
import { NetworkReasons } from "./network-reasons";
import { Magis, Mark, SectionHeading, SparkleIcon } from "./ui";
import { VideoCarousel } from "./video-carousel";

const reachIcons = { building: Building2, users: Users };

/** "+15 mil" with the count animated; the unit stays smaller so the figure carries the weight. */
function BigNumber({ count, className }: { count: number; className?: string }) {
  return (
    <p className={cn("flex items-baseline font-bold leading-none tracking-[-0.03em]", className)}>
      <span>
        +<CountUp to={count} />
      </span>
      <span className="ml-2 text-[0.5em] tracking-[-0.01em]">mil</span>
    </p>
  );
}

function StatIcon({ gradient, children }: { gradient: string; children: ReactNode }) {
  return (
    <span
      className="grid size-[52px] shrink-0 -rotate-6 place-items-center rounded-[18px] text-white shadow-[0_14px_28px_-14px_rgba(60,20,140,0.7)]"
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}

function ImpactNumbers() {
  const { hours, interactions, aiContents } = impactNumbers;
  const card = "relative flex flex-col overflow-hidden rounded-[32px] p-7 tablet:p-8";

  return (
    <div className="mx-auto mt-14 grid max-w-[1100px] gap-4 tablet:grid-cols-2 desktop:mt-16 desktop:grid-cols-3 desktop:gap-5">
      <div
        className={cn(
          card,
          "min-h-[300px] bg-[radial-gradient(90%_120%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(120deg,#8443ea_0%,#9b5cf6_50%,#b07cff_100%)] text-white shadow-[0_40px_80px_-40px_rgba(90,30,190,0.9)] tablet:col-span-2 desktop:p-10",
        )}
        data-animate="fadeUp"
      >
        <SparkleIcon className="mg-twinkle absolute top-9 right-[38%] hidden size-5 text-white/60 tablet:block" />
        <SparkleIcon className="mg-twinkle absolute top-24 right-[30%] hidden size-3 text-mg-mint [animation-delay:1s] tablet:block" />
        <p className="text-[14px] font-semibold tracking-[0.08em] text-white/80 uppercase">Nas redes parceiras</p>
        <BigNumber count={hours.count} className="mt-auto pt-10 text-[72px] tablet:text-[104px]" />
        <p className="mt-3 text-[22px] font-bold tablet:text-[26px]">{hours.label}</p>
        <p className="mt-2 max-w-[360px] text-[15px] leading-[1.6] text-white/80">{hours.text}</p>
        <Magis
          pose="comemorando"
          sizes="220px"
          className="mg-bob-slow absolute right-8 -bottom-6 hidden w-[170px] tablet:block desktop:right-12 desktop:w-[200px]"
        />
      </div>

      <div className={cn(card, "border border-mg-line bg-white")} data-animate="fadeUp" data-delay={100}>
        <StatIcon gradient="linear-gradient(140deg,#ffa651,#e8590c)">
          <MessagesSquare className="size-6" strokeWidth={2} />
        </StatIcon>
        <BigNumber count={interactions.count} className="mt-auto pt-10 text-[60px] text-mg-ink" />
        <p className="mt-3 text-[19px] font-bold text-mg-ink">{interactions.label}</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-mg-muted">{interactions.text}</p>
      </div>

      <div className={cn(card, "bg-[#e6fcf5]")} data-animate="fadeUp">
        <StatIcon gradient="linear-gradient(140deg,#48d3aa,#099268)">
          <SparkleIcon className="size-6" />
        </StatIcon>
        <BigNumber count={aiContents.count} className="mt-8 text-[60px] text-mg-ink" />
        <p className="mt-3 text-[19px] font-bold text-mg-ink">{aiContents.label}</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-mg-muted">{aiContents.text}</p>
      </div>

      {reachStats.map((stat, i) => {
        const Icon = reachIcons[stat.icon];
        return (
          <div key={stat.value} className={cn(card, "bg-mg-lilac")} data-animate="fadeUp" data-delay={(i + 1) * 100}>
            <StatIcon gradient="linear-gradient(140deg,#b07cff,#7a35e6)">
              <Icon className="size-6" strokeWidth={2} />
            </StatIcon>
            <p className="mt-8 text-[46px] font-bold leading-[60px] tracking-[-0.03em] text-mg-ink">{stat.value}</p>
            <p className="mt-3 text-[19px] font-bold text-mg-ink">{stat.label}</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-mg-muted">{stat.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export function ImpactoSection() {
  return (
    <section id="governo" className="relative scroll-mt-24 overflow-hidden bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              A Sapion Magister <Mark>impulsiona</Mark> a educação dos municípios
            </>
          }
          description="Ecossistema de educadores e resultados de verdade: formação continuada que gera dados para professores, gestores e secretarias de educação."
        />

        <ImpactNumbers />

        <div className="mx-auto mt-20 max-w-[1100px] desktop:mt-28" data-animate="fadeUp">
          <VideoCarousel items={videoTestimonials} />
        </div>

        <NetworkReasons />
      </div>
    </section>
  );
}
