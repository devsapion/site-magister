import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { links, subscriptionBenefits } from "../content";
import { buttonStyles, ButtonArrow, Magis, Mark, SectionHeading, SparkleIcon } from "./ui";

export function PlanosSection() {
  return (
    <section id="assine" className="relative scroll-mt-24 bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              Assine a <Mark>Sapion Magister</Mark>
            </>
          }
          description="Um ano de acesso a todas as trilhas, ferramentas e comunidade, com certificado em todos os cursos."
        />

        <div className="mx-auto mt-14 grid max-w-[1020px] gap-5 desktop:grid-cols-[1.1fr_1fr]">
          <div
            className="relative overflow-hidden rounded-[36px] border border-mg-line bg-mg-lilac p-8 tablet:p-10"
            data-animate="fadeUp"
          >
            <h3 className="text-[22px] font-bold text-mg-ink">Ao assinar, você terá:</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {subscriptionBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[16px] leading-[1.5] text-mg-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mg-mint text-mg-ink">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {benefit.replace(/[;.]$/, "")}
                </li>
              ))}
            </ul>
            <Magis
              pose="oculos"
              sizes="180px"
              className="mg-bob-slow pointer-events-none absolute -right-4 -bottom-8 hidden w-[180px] tablet:block"
            />
          </div>

          <div
            className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(90%_110%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(120deg,#8443ea_0%,#9b5cf6_50%,#b07cff_100%)] p-8 text-white shadow-[0_40px_80px_-40px_rgba(90,30,190,0.9)] tablet:p-10"
            data-animate="fadeUp"
            data-delay={120}
          >
            <SparkleIcon className="mg-twinkle absolute top-8 right-10 size-6 text-white/70" />
            <SparkleIcon className="mg-twinkle absolute top-24 right-24 size-3 text-mg-mint [animation-delay:1s]" />
            <p className="text-[15px] font-semibold tracking-[0.08em] text-white/80 uppercase">Investimento</p>
            <p className="mt-4 inline-block rounded-full bg-mg-mint px-4 py-2 text-[14px] font-bold text-mg-ink">
              Cada trilha por menos de R$ 200
            </p>
            <p className="mt-6 flex items-baseline gap-2 font-bold leading-none">
              <span className="text-[28px]">10x</span>
              <span className="text-[24px]">R$</span>
              <span className="text-[64px] tracking-[-0.03em] tablet:text-[76px]">99,70</span>
            </p>
            <a href={links.subscribe} className={cn(buttonStyles.base, buttonStyles.mint, "mt-8 w-full py-[17px] text-[17px]")}>
              Assine agora
              <ButtonArrow />
            </a>
            <p className="mt-4 text-center text-[14px] text-white/85">7 dias de garantia total</p>
          </div>
        </div>
      </div>
    </section>
  );
}
