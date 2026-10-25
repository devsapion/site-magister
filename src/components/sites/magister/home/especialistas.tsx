import Image from "next/image";
import { consultants, pillars, type Consultant } from "./home-content";
import { Magis, Mark, Marquee, SectionHeading } from "./ui";

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

        <ol className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-x-5 gap-y-10 tablet:grid-cols-2 desktop:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              className="relative flex flex-col items-center rounded-[28px] border border-mg-line bg-white px-6 pt-10 pb-7 text-center shadow-[0_20px_40px_-34px_rgba(60,20,140,0.5)]"
              data-animate="fadeUp"
              data-delay={i * 120}
            >
              <span className="absolute -top-5 left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-mg-purple text-[18px] font-bold text-white ring-[5px] ring-mg-lilac">
                {i + 1}
              </span>
              <Magis pose={pillar.pose} sizes="160px" className="-my-2 h-[140px] w-auto" />
              <h3 className="mt-4 text-[19px] font-bold leading-tight text-mg-ink">{pillar.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-mg-muted">{pillar.text}</p>
            </li>
          ))}
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
