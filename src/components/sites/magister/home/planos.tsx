import { Building2, Check, GraduationCap, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { links, subscriptionBenefits } from "../content";
import { ContactDialog } from "./contact-dialog";
import { buttonStyles, ButtonArrow, Magis, Mark, SectionHeading, SparkleIcon } from "./ui";

const networkBenefits = [
  "Acesso para professores, coordenadores e gestores da rede",
  "Formações alinhadas às demandas e aos índices do município",
  "Dados da formação para orientar a secretaria de educação",
  "Suporte completo para gestores e professores",
];

function Audience({ icon, children, className }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold", className)}>
      {icon}
      {children}
    </p>
  );
}

function Benefit({ children, tone }: { children: ReactNode; tone: "light" | "dark" }) {
  return (
    <li className={cn("flex items-start gap-3 text-[16px] leading-[1.5]", tone === "light" ? "text-white" : "text-mg-ink")}>
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mg-mint text-mg-ink">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

/** Two ways in: networks contract for all their teachers; a teacher can also subscribe alone. */
export function PlanosSection() {
  return (
    <section id="assine" className="relative scroll-mt-24 bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionHeading
          title={
            <>
              Para a sua rede ou <Mark>só para você</Mark>
            </>
          }
          description="Atendemos secretarias e redes municipais de ensino com formação para todos os professores da rede. E o professor que quer estudar por conta própria também pode assinar sozinho."
        />

        <div className="mx-auto mt-14 grid max-w-[1100px] gap-5 desktop:grid-cols-2">
          <div
            className="relative flex flex-col overflow-hidden rounded-[36px] bg-[radial-gradient(90%_110%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(120deg,#8443ea_0%,#9b5cf6_50%,#b07cff_100%)] p-7 text-white shadow-[0_40px_80px_-40px_rgba(90,30,190,0.9)] tablet:p-10"
            data-animate="fadeUp"
          >
            <SparkleIcon className="mg-twinkle absolute top-8 right-9 hidden size-6 text-white/70 tablet:block" />
            <SparkleIcon className="mg-twinkle absolute top-16 right-20 hidden size-3 text-mg-mint [animation-delay:1s] tablet:block" />
            <Audience icon={<Building2 className="size-4" />} className="self-start bg-white/15 text-white">
              Para redes de ensino
            </Audience>
            <h3 className="mt-6 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] tablet:text-[34px]">
              Formação continuada para toda a rede
            </h3>
            <p className="mt-4 text-[16px] leading-[1.6] text-white/85">
              A secretaria contrata e os professores da rede recebem acesso. A proposta é montada de acordo com o
              tamanho e as necessidades do seu município.
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              {networkBenefits.map((benefit) => (
                <Benefit key={benefit} tone="light">
                  {benefit}
                </Benefit>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <p className="text-[15px] font-semibold tracking-[0.08em] text-white/80 uppercase">Investimento</p>
              <p className="mt-2 text-[34px] font-bold leading-none tracking-[-0.02em]">Proposta sob medida</p>
              <ContactDialog className={cn(buttonStyles.base, buttonStyles.mint, "mt-7 w-full py-[17px] text-[17px]")}>
                Solicitar proposta para minha rede
                <ButtonArrow />
              </ContactDialog>
              <p className="mt-4 text-center text-[14px] text-white/85">Para redes de ensino e órgãos públicos de todo o Brasil</p>
            </div>
          </div>

          <div
            className="relative flex flex-col overflow-hidden rounded-[36px] border border-mg-line bg-mg-lilac p-7 tablet:p-10"
            data-animate="fadeUp"
            data-delay={120}
          >
            <Magis
              pose="oculos"
              sizes="140px"
              className="mg-bob-slow pointer-events-none absolute top-5 right-5 hidden w-[110px] tablet:block"
            />
            <Audience icon={<GraduationCap className="size-4" />} className="self-start bg-white text-mg-purple">
              Para professores
            </Audience>
            <h3 className="mt-6 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-mg-ink tablet:text-[34px]">
              Assinatura individual
            </h3>
            <p className="mt-4 text-[16px] leading-[1.6] text-mg-muted">
              Estude por conta própria, no seu ritmo, mesmo que a sua rede ainda não seja parceira.
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              {subscriptionBenefits.map((benefit) => (
                <Benefit key={benefit} tone="dark">
                  {benefit.replace(/[;.]$/, "")}
                </Benefit>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <p className="flex flex-wrap items-center gap-3">
                <span className="text-[15px] font-semibold tracking-[0.08em] text-mg-muted uppercase">Um ano por</span>
                <span className="rounded-full bg-mg-mint px-3 py-1 text-[13px] font-bold text-mg-ink">
                  Cada trilha por menos de R$ 200
                </span>
              </p>
              <p className="mt-2 flex items-baseline gap-2 font-bold leading-none text-mg-ink">
                <span className="text-[24px]">10x</span>
                <span className="text-[22px]">R$</span>
                <span className="text-[56px] tracking-[-0.03em]">99,70</span>
              </p>
              <a href={links.subscribe} className={cn(buttonStyles.base, buttonStyles.primary, "mt-7 w-full py-[17px] text-[17px]")}>
                Assine agora
                <ButtonArrow />
              </a>
              <p className="mt-4 text-center text-[14px] text-mg-muted">
                7 dias de garantia total ·{" "}
                <a href={links.signUp} className="font-semibold text-mg-purple underline-offset-4 hover:underline">
                  ou teste 14 dias grátis
                </a>
              </p>
            </div>
          </div>
        </div>

        <p
          className="mx-auto mt-6 flex max-w-[1100px] items-start gap-3 rounded-[24px] border border-mg-line bg-white p-5 text-[15px] leading-[1.6] text-mg-muted tablet:items-center tablet:px-7"
          data-animate="fadeUp"
        >
          <Info className="mt-0.5 size-5 shrink-0 text-mg-purple tablet:mt-0" />
          <span>
            <strong className="font-semibold text-mg-ink">Sua rede já é parceira da Sapion Magister?</strong> Então o
            seu acesso já está incluído: fale com a secretaria de educação do seu município antes de assinar.
          </span>
        </p>
      </div>
    </section>
  );
}
