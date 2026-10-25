import Image from "next/image";
import { partners } from "../content";
import { gridTestimonials } from "./home-content";
import { Magis, Mark, Marquee, SparkleIcon, StoreBadges } from "./ui";
import { VideoCard } from "./video-card";

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div className="mr-4 flex h-[92px] w-[190px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-mg-line bg-white tablet:mr-5 tablet:h-[104px] tablet:w-[220px]">
      <Image
        src={partner.src}
        alt={partner.alt}
        width={500}
        height={300}
        sizes="220px"
        className="h-full w-auto object-contain grayscale-[35%] transition duration-300 hover:grayscale-0"
      />
    </div>
  );
}

export function ProvaSocialSection() {
  // Two rows of the same logos, offset so they never line up.
  const rowB = [...partners.slice(3), ...partners.slice(0, 3)];

  return (
    <section className="relative overflow-hidden bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.12)_1.2px,transparent_1.2px)] bg-[length:22px_22px] py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center tablet:flex-row tablet:text-left" data-animate="fadeUp">
          <Magis pose="selfie" sizes="160px" className="mg-bob w-[130px] shrink-0 tablet:w-[160px]" />
          <div>
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-mg-ink tablet:text-[44px]">
              Quem usa <Mark>aprova!</Mark>
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-mg-muted tablet:text-[18px]">
              Professores e redes de ensino já transformaram sua formação continuada com a Sapion Magister.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 desktop:grid-cols-[360px_1fr]">
          <div
            className="flex flex-col rounded-[32px] border border-mg-line bg-white p-7 shadow-[0_30px_60px_-45px_rgba(60,20,140,0.6)]"
            data-animate="fadeUp"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(140deg,#b07cff,#7a35e6)] text-white">
              <SparkleIcon className="size-6" />
            </span>
            <p className="mt-6 text-[40px] font-bold leading-none tracking-[-0.03em] text-mg-ink">100% online</p>
            <p className="mt-4 flex-1 text-[16px] leading-[1.6] text-mg-muted">
              Estude no seu ritmo, no computador ou no app. <strong className="font-semibold text-mg-ink">Aulas em vídeo, e-books e atividades práticas</strong> sempre à mão.
            </p>
            <StoreBadges className="mt-6 flex-wrap" imageClassName="h-[38px]" />
          </div>
          <div
            className="rounded-[32px] border border-mg-line bg-white p-3 shadow-[0_30px_60px_-45px_rgba(60,20,140,0.6)] tablet:p-4"
            data-animate="fadeUp"
            data-delay={120}
          >
            <VideoCard />
          </div>
        </div>

        <ul className="mt-5 grid gap-5 tablet:grid-cols-3">
          {gridTestimonials.map((testimonial, i) => (
            <li
              key={testimonial.text}
              className="flex flex-col rounded-[28px] border border-mg-line bg-white p-7 shadow-[0_30px_60px_-50px_rgba(60,20,140,0.6)]"
              data-animate="fadeUp"
              data-delay={i * 120}
            >
              <div className="flex gap-1 text-[#ffb400]" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, star) => (
                  <svg key={star} viewBox="0 0 20 20" className="size-[18px] fill-current" aria-hidden="true">
                    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[16px] leading-[1.65] text-mg-ink">“{testimonial.text}”</blockquote>
              <p className="mt-5 text-[14px] font-semibold text-mg-purple">{testimonial.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-col gap-4 tablet:gap-5" data-animate="fadeUp">
        <p className="px-5 text-center text-[15px] font-semibold tracking-[0.08em] text-mg-muted uppercase">
          Confiam na Sapion Magister
        </p>
        <Marquee label="Parceiros da Sapion Magister" durationS={42}>
          {partners.map((partner) => (
            <PartnerLogo key={partner.src} partner={partner} />
          ))}
          {partners.map((partner) => (
            <PartnerLogo key={`${partner.src}-2`} partner={partner} />
          ))}
        </Marquee>
        <Marquee label="Parceiros da Sapion Magister, segunda fileira" durationS={48} reverse>
          {rowB.map((partner) => (
            <PartnerLogo key={partner.src} partner={partner} />
          ))}
          {rowB.map((partner) => (
            <PartnerLogo key={`${partner.src}-2`} partner={partner} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
