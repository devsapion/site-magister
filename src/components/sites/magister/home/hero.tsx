import { getCatalogTotals } from "@/lib/magister/courses";
import { cn } from "@/lib/utils";
import { links, trilhas } from "../content";
import { ContactDialog } from "./contact-dialog";
import { appScreens, platformNumbers } from "./home-content";
import { buttonStyles, ButtonArrow, Magis, Mark, Marquee, PhoneFrame, SparkleIcon, StoreBadges } from "./ui";

/** Dashed "learning trail" curves framing the hero, a nod to the platform's path illustrations. */
function TrailDecor() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="mg-dash-flow"
        d="M-40 640C120 610 210 520 190 400S60 220 170 120 420 40 460 -20"
        stroke="#a160fa"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 16"
      />
      <path
        className="mg-dash-flow"
        d="M1480 120C1330 160 1250 250 1280 360S1420 520 1330 640 1080 760 1010 860"
        stroke="#a160fa"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 16"
      />
    </svg>
  );
}

const sparkles = [
  "top-[150px] left-[8%] size-5 text-mg-purple/50",
  "top-[96px] left-[30%] size-3 text-mg-purple/40 [animation-delay:0.6s]",
  "top-[210px] right-[27%] size-4 text-mg-mint [animation-delay:1.2s]",
  "top-[120px] right-[9%] size-6 text-mg-purple/45 [animation-delay:0.3s]",
  "bottom-[160px] left-[24%] size-4 text-mg-mint [animation-delay:1.6s]",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(110%_75%_at_50%_0%,#efe5ff_0%,#f8f4ff_48%,#ffffff_100%)]">
      <TrailDecor />
      {sparkles.map((className) => (
        <SparkleIcon key={className} className={cn("mg-twinkle pointer-events-none absolute hidden tablet:block", className)} />
      ))}

      {/* Desktop phones on both sides of the headline */}
      <div className="pointer-events-none absolute inset-x-0 top-[118px] mx-auto hidden h-[640px] max-w-[1440px] desktop:block">
        <div className="absolute top-[40px] left-[max(8px,calc(50%-670px))] w-[200px] -rotate-[9deg] xl:w-[250px]">
          <PhoneFrame {...appScreens.inicio} className="mg-bob" sizes="250px" eager />
        </div>
        <div className="absolute top-[10px] right-[max(8px,calc(50%-670px))] w-[200px] rotate-[9deg] xl:w-[250px]">
          <PhoneFrame {...appScreens.videos} className="mg-bob-slow" sizes="250px" eager />
        </div>
        <Magis
          pose="piscando"
          sizes="150px"
          className="mg-bob absolute top-[360px] right-[max(170px,calc(50%-460px))] w-[110px] [animation-delay:-1.5s] xl:top-[400px] xl:w-[140px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 pt-[124px] tablet:pt-[160px] desktop:pb-[150px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-mg-purple/15 bg-white/80 px-4 py-2 text-[13px] font-semibold text-mg-purple shadow-[0_6px_20px_-12px_rgba(132,67,234,0.6)] mg-rise tablet:text-[14px]">
            <SparkleIcon className="size-3.5" />
            A maior plataforma de formação de professores do Brasil
          </p>
          <h1
            className="mg-rise mt-6 text-balance text-[38px] font-bold leading-[1.06] tracking-[-0.03em] text-mg-ink tablet:text-[52px] desktop:text-[clamp(42px,4.2vw,60px)] [animation-delay:100ms]"
          >
            Transformamos a <Mark>formação de professores</Mark>
          </h1>
          <p
            className="mg-rise mt-6 max-w-[580px] text-pretty text-[17px] leading-[1.6] text-mg-muted tablet:text-[19px] [animation-delay:200ms]"
          >
            Combinamos tecnologia avançada e metodologias personalizadas para capacitar os educadores da sua rede,
            garantindo impacto real na sala de aula e na aprendizagem dos alunos.
          </p>
          <div
            className="mg-rise mt-8 flex w-full flex-col items-center justify-center gap-3 tablet:w-auto tablet:flex-row [animation-delay:300ms]"
          >
            <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.primary, "w-full tablet:w-auto")}>
              Teste por 14 dias grátis
              <ButtonArrow />
            </a>
            <ContactDialog className={cn(buttonStyles.base, buttonStyles.outline, "w-full tablet:w-auto")}>
              Leve para sua rede
            </ContactDialog>
          </div>
          <div className="mg-rise mt-7 flex flex-col items-center gap-3 [animation-delay:400ms]">
            <StoreBadges imageClassName="h-[40px]" />
            <p className="text-[13px] text-mg-muted">7 dias de garantia total · Certificado válido em todo o Brasil</p>
          </div>
        </div>

        {/* Mobile and tablet: phones under the copy, cropped by the ribbon */}
        <div className="pointer-events-none relative mx-auto mt-12 h-[330px] max-w-[520px] overflow-hidden tablet:h-[440px] desktop:hidden">
          <div className="absolute top-[24px] left-[6%] w-[46%] -rotate-[7deg]">
            <PhoneFrame {...appScreens.inicio} sizes="45vw" eager />
          </div>
          <div className="absolute top-[4px] right-[6%] w-[46%] rotate-[7deg]">
            <PhoneFrame {...appScreens.videos} sizes="45vw" eager />
          </div>
          <Magis pose="piscando" sizes="120px" className="mg-bob absolute top-[150px] left-1/2 w-[30%] -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}

/** Purple band with the platform numbers scrolling by. */
export function NumbersRibbon() {
  const totals = getCatalogTotals();
  const numbers = [
    { value: String(trilhas.length), label: "trilhas de aprendizagem" },
    { value: String(totals.courses), label: "cursos no catálogo" },
    { value: String(totals.modules), label: "módulos" },
    { value: String(totals.videos), label: "videoaulas" },
    ...platformNumbers,
  ];
  return (
    <div
      data-pausable
      className="relative z-[1] bg-[linear-gradient(100deg,#7a35e6_0%,#9b5cf6_55%,#b07cff_100%)] py-4 text-white shadow-[0_20px_40px_-24px_rgba(90,30,190,0.8)]"
    >
      <Marquee label="A plataforma em números" durationS={36}>
        {numbers.map((item) => (
          <div key={item.label} className="flex shrink-0 items-center gap-3 pr-10 tablet:pr-14">
            <SparkleIcon className="size-4 text-mg-mint" />
            <span className="text-[22px] font-bold tablet:text-[26px]">{item.value}</span>
            <span className="text-[15px] font-medium text-white/85 tablet:text-[16px]">{item.label}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
