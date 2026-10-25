import { Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { links } from "../content";
import { NumbersRibbon } from "../home/hero";
import { buttonStyles, ButtonArrow, Magis, SparkleIcon } from "../home/ui";

/**
 * Two-column landing shared by the free-material pages and the contact page:
 * copy and a visual on the left, the lead form on the right, then supporting sections.
 */
export function LeadLanding({
  eyebrow,
  title,
  description,
  visual,
  form,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  visual?: ReactNode;
  form: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(110%_75%_at_30%_0%,#efe5ff_0%,#f8f4ff_50%,#ffffff_100%)] pt-[120px] pb-16 tablet:pt-[156px] desktop:pb-24">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 820"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="mg-dash-flow"
            d="M-40 560C140 520 220 420 180 300S40 120 160 40"
            stroke="#a160fa"
            strokeOpacity="0.3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="12 16"
          />
        </svg>
        <SparkleIcon className="mg-twinkle absolute top-[140px] right-[8%] hidden size-5 text-mg-purple/40 tablet:block" />
        <div className="relative mx-auto grid max-w-[1160px] items-start gap-12 px-5 desktop:grid-cols-[1fr_480px] desktop:gap-16">
          <div className="flex flex-col items-start">
            <div className="mg-rise">{eyebrow}</div>
            <h1 className="mg-rise mt-5 text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-mg-ink [animation-delay:100ms] tablet:text-[48px]">
              {title}
            </h1>
            <div className="mg-rise mt-5 max-w-[540px] text-[17px] leading-[1.65] text-mg-muted [animation-delay:200ms] tablet:text-[18px]">
              {description}
            </div>
            {visual && <div className="mg-rise mt-10 w-full [animation-delay:300ms]">{visual}</div>}
          </div>
          <div className="mg-rise [animation-delay:200ms] desktop:sticky desktop:top-28">{form}</div>
        </div>
      </section>
      {children}
      <NumbersRibbon />
    </>
  );
}

export function HighlightsSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.12)_1.2px,transparent_1.2px)] bg-[length:22px_22px] px-5 py-16 tablet:py-20">
      <div className="mx-auto max-w-[900px]" data-animate="fadeUp">
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-mg-ink tablet:text-[32px]">{title}</h2>
        <ul className="mt-8 grid gap-4 tablet:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-[22px] border border-mg-line bg-white p-5 text-[16px] leading-[1.55] text-mg-ink">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mg-mint">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {item.replace(/[;.]$/, "")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Conheça a Sapion Magister" block between the highlights and the numbers ribbon. */
export function AboutMagister({ className }: { className?: string }) {
  return (
    <section className={cn("bg-white px-5 py-16 tablet:py-24", className)}>
      <div
        className="mx-auto flex max-w-[1000px] flex-col items-center gap-8 text-center tablet:flex-row tablet:text-left"
        data-animate="fadeUp"
      >
        <Magis pose="ideia" sizes="220px" className="mg-bob w-[170px] shrink-0 tablet:w-[210px]" />
        <div>
          <h2 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-mg-ink tablet:text-[36px]">
            Conheça a Sapion Magister
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-mg-muted">
            A maior plataforma de formação de professores do Brasil: trilhas personalizadas com inteligência artificial,
            gamificação, comunidade e certificado válido em todo o território nacional.
          </p>
          <div className="mt-7 flex flex-col gap-3 tablet:flex-row">
            <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.primary)}>
              Teste por 14 dias grátis
              <ButtonArrow />
            </a>
            <Link href="/" className={cn(buttonStyles.base, buttonStyles.outline)}>
              Quero saber mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
