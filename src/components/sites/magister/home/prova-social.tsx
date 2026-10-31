import Image from "next/image";
import { getPraisePrints } from "@/lib/magister/praise-prints";
import { partners } from "../content";
import { PraiseWall } from "./praise-wall";
import { Magis, Mark, Marquee } from "./ui";

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
              Elogios de professores e gestores, direto da plataforma, do nosso suporte e das redes sociais.
            </p>
          </div>
        </div>

        <div className="mt-12" data-animate="fadeUp">
          <PraiseWall prints={getPraisePrints()} />
        </div>
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
