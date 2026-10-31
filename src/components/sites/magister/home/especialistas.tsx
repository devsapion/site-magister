import { Award, GraduationCap, Lightbulb, Target } from "lucide-react";
import Image from "next/image";
import { consultants, pillars, type Consultant, type Pillar } from "./home-content";
import { Mark, Marquee, SectionHeading } from "./ui";

const pillarIcons: Record<Pillar["icon"], typeof Target> = {
  target: Target,
  experts: GraduationCap,
  idea: Lightbulb,
  award: Award,
};

function ConsultantCard({ consultant }: { consultant: Consultant }) {
  return (
    <figure className="group relative mr-4 h-[300px] w-[224px] shrink-0 overflow-hidden rounded-[26px] bg-mg-purple shadow-[0_20px_40px_-24px_rgba(60,20,140,0.6)] tablet:mr-5 tablet:h-[330px] tablet:w-[246px]">
      <Image
        src={consultant.photo}
        alt={consultant.name}
        fill
        sizes="250px"
        className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,11,138,0)_40%,rgba(61,11,138,0.55)_68%,rgba(43,8,100,0.96)_100%)]" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-[17px] font-bold leading-tight">{consultant.name}</p>
        <p className="mt-1 text-[13px] leading-snug text-white/80">{consultant.title}</p>
      </figcaption>
    </figure>
  );
}

export function EspecialistasSection() {
  return (
    <section
      id="especialistas"
      className="relative scroll-mt-24 overflow-hidden bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.14)_1.2px,transparent_1.2px)] bg-[length:22px_22px] py-20 desktop:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              Um time de <Mark>especialistas</Mark> a serviço da sua formação
            </>
          }
          description="40 consultores especialistas — mestres, doutores e referências da educação brasileira — criam cursos para os desafios reais da sala de aula."
        />

        {/* Numbered steps on a dashed trail (desktop), each card with its own track color */}
        <ol className="relative mx-auto mt-16 grid max-w-[1080px] gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
          <span
            className="mg-dash-line pointer-events-none absolute top-[27px] right-[12%] left-[12%] hidden h-[2px] desktop:block"
            aria-hidden="true"
          />
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.icon];
            return (
              <li key={pillar.title} className="relative flex flex-col" data-animate="fadeUp" data-delay={i * 120}>
                <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-white text-[18px] font-bold text-mg-purple shadow-[0_12px_28px_-14px_rgba(60,20,140,0.6)] ring-[6px] ring-mg-lilac">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="group mt-6 flex flex-1 flex-col rounded-[28px] border border-mg-line bg-white p-7 shadow-[0_20px_40px_-34px_rgba(60,20,140,0.5)] transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className="grid size-14 -rotate-6 place-items-center rounded-[18px] text-white shadow-[0_14px_28px_-14px_rgba(60,20,140,0.7)] transition-transform duration-300 group-hover:rotate-0"
                    style={{ backgroundImage: pillar.gradient }}
                  >
                    <Icon className="size-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-6 text-[19px] font-bold leading-tight text-mg-ink">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-mg-muted">{pillar.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-16" data-animate="fadeUp">
        <Marquee label="Consultores especialistas da Sapion Magister" durationS={60}>
          {consultants.map((consultant) => (
            <ConsultantCard key={consultant.name} consultant={consultant} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
