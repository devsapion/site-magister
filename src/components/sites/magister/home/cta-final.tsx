import { cn } from "@/lib/utils";
import { links } from "../content";
import { ContactDialog } from "./contact-dialog";
import { buttonStyles, ButtonArrow, Magis, SparkleIcon } from "./ui";

/** Closing banner: Magis peeks over the top edge of the purple card. */
export function CtaFinal() {
  return (
    <section className="relative bg-white px-5 pt-28 tablet:pt-36">
      <div className="relative mx-auto max-w-[1160px]">
        <Magis
          pose="espiando"
          sizes="260px"
          className="absolute -top-[96px] left-1/2 z-[1] w-[170px] -translate-x-1/2 tablet:-top-[132px] tablet:left-[8%] tablet:w-[230px] tablet:translate-x-0"
        />
        <div className="relative overflow-hidden rounded-t-[40px] bg-[radial-gradient(90%_120%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(120deg,#8443ea_0%,#9b5cf6_50%,#b07cff_100%)] px-6 pt-20 pb-14 text-center text-white tablet:rounded-t-[56px] tablet:px-12 tablet:pt-16 tablet:pb-16">
          <SparkleIcon className="mg-twinkle absolute top-10 right-[12%] size-7 text-white/60" />
          <SparkleIcon className="mg-twinkle absolute bottom-12 left-[10%] size-4 text-mg-mint [animation-delay:1.2s]" />
          <SparkleIcon className="mg-twinkle absolute top-1/2 right-[6%] size-3 text-white/70 [animation-delay:0.6s]" />
          <h2
            className="mx-auto max-w-[620px] text-balance text-[30px] font-bold leading-[1.12] tracking-[-0.02em] tablet:text-[44px]"
            data-animate="fadeUp"
          >
            Traga para hoje a formação de professores do futuro
          </h2>
          <div
            className="mt-9 flex flex-col items-center justify-center gap-3 tablet:flex-row"
            data-animate="fadeUp"
            data-delay={120}
          >
            <ContactDialog className={cn(buttonStyles.base, buttonStyles.white, "w-full tablet:w-auto")}>
              Leve para sua escola ou órgão
              <ButtonArrow />
            </ContactDialog>
            <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.ghostWhite, "w-full tablet:w-auto")}>
              Teste por 14 dias grátis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
