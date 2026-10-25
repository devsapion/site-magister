import { Building2, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS } from "../content";
import {
  appScreens,
  diferenciais,
  labsTools,
  logos,
  type Audience,
  type Diferencial,
  type MagisPose,
} from "./home-content";
import { buttonStyles, ButtonArrow, Magis, Mark, PhoneFrame, SectionHeading, SparkleIcon } from "./ui";

const personas: { label: string; pose: MagisPose; x: number; y: number; tag: string }[] = [
  { label: "Professores", pose: "ideia", x: 112, y: 150, tag: "bg-mg-mint text-mg-ink" },
  { label: "Gestores", pose: "oculos", x: 320, y: 70, tag: "bg-mg-purple text-white" },
  { label: "Redes de ensino", pose: "selfie", x: 528, y: 140, tag: "bg-[#ffb35c] text-mg-ink" },
];
const hub = { x: 320, y: 262 };

/** Who the platform serves, linked to the app icon by animated dashed trails. */
function AudienceDiagram() {
  return (
    <div className="relative mx-auto aspect-[640/320] w-full max-w-[640px]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 320" fill="none">
        {personas.map((p) => (
          <path
            key={p.label}
            className="mg-dash-flow"
            d={`M${p.x} ${p.y + 40}C${p.x} ${p.y + 120} ${hub.x} ${hub.y - 90} ${hub.x} ${hub.y - 30}`}
            stroke="#8443ea"
            strokeOpacity="0.4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="8 10"
          />
        ))}
      </svg>
      {personas.map((p, i) => (
        <div
          key={p.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${(p.x / 640) * 100}%`, top: `${(p.y / 320) * 100}%` }}
        >
          <div className="mg-bob" style={{ animationDelay: `${i * -1.1}s` }}>
            <Magis pose={p.pose} sizes="100px" className="w-[64px] tablet:w-[96px]" />
          </div>
          <span
            className={cn(
              "-mt-2 rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap shadow-[0_8px_18px_-10px_rgba(0,0,0,0.4)] tablet:text-[13px]",
              p.tag,
            )}
          >
            {p.label}
          </span>
        </div>
      ))}
      <div
        className="absolute grid size-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[20px] bg-[linear-gradient(140deg,#9b5cf6,#6a2bd6)] shadow-[0_16px_34px_-12px_rgba(106,43,214,0.8)] ring-[6px] ring-white tablet:size-[76px] tablet:rounded-[24px]"
        style={{ left: `${(hub.x / 640) * 100}%`, top: `${(hub.y / 320) * 100}%` }}
      >
        <Image src={logos.mark.src} alt="" width={28} height={28} className="size-[30px] tablet:size-[40px]" />
      </div>
    </div>
  );
}

const audienceIcons: Record<Audience, typeof GraduationCap> = {
  professores: GraduationCap,
  gestores: Users,
  redes: Building2,
};

function LabsMock() {
  return (
    <div className="relative mx-5 mt-8 rounded-t-[26px] border border-white bg-white/90 p-5 shadow-[0_30px_60px_-30px_rgba(9,146,104,0.55)] backdrop-blur tablet:absolute tablet:inset-x-8 tablet:top-10 tablet:bottom-0 tablet:mx-0 tablet:mt-0 tablet:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(140deg,#48d3aa,#099268)]">
          <SparkleIcon className="size-4 text-white" />
        </span>
        <div>
          <p className="text-[15px] font-bold text-mg-ink">Magister Labs</p>
          <p className="text-[12px] text-mg-muted">25 ferramentas com inteligência artificial</p>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {labsTools.map((tool) => (
          <li
            key={tool.name}
            className="flex flex-col items-start gap-2 rounded-2xl border border-mg-line bg-white p-3 text-[13px] font-semibold leading-tight text-mg-ink tablet:flex-row tablet:items-center tablet:gap-3"
          >
            <Image src={tool.icon} alt="" width={36} height={36} className="size-8 shrink-0 tablet:size-9" />
            {tool.name}
          </li>
        ))}
        <li className="flex items-center justify-center rounded-2xl bg-[linear-gradient(140deg,#48d3aa,#099268)] p-3 text-[14px] font-bold text-white">
          +20 ferramentas
        </li>
      </ul>
    </div>
  );
}

function DiferencialVisual({ visual }: { visual: Diferencial["visual"] }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden tablet:min-h-0" style={{ backgroundColor: visual.tint }}>
      <div className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/60 blur-2xl" />
      {visual.kind === "phone" && (
        <PhoneFrame
          {...appScreens[visual.screen]}
          sizes="270px"
          className="absolute top-10 left-1/2 w-[230px] -translate-x-1/2 rotate-[3deg] tablet:top-12 tablet:w-[262px]"
        />
      )}
      {visual.kind === "labs" && <LabsMock />}
      {visual.kind === "certificate" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={`${ASSETS}/certificado.png`}
            alt="Certificado de conclusão Sapion Magister em um tablet"
            width={1536}
            height={1465}
            sizes="(min-width: 768px) 440px, 90vw"
            className="mg-bob h-auto w-full max-w-[420px]"
          />
        </div>
      )}
    </div>
  );
}

function DiferencialCard({ item }: { item: Diferencial }) {
  const Icon = audienceIcons[item.audience];
  return (
    <div className="grid overflow-hidden rounded-[32px] border border-mg-line bg-white shadow-[0_30px_70px_-45px_rgba(60,20,140,0.55)] tablet:min-h-[480px] tablet:grid-cols-[1.08fr_1fr] tablet:rounded-[40px]">
      <div className="flex flex-col justify-center p-7 tablet:p-12">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-mg-lilac text-mg-purple">
            <Icon className="size-5" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-mg-ink">{item.audienceLabel}</p>
            <span className="mt-1 inline-block rounded-md bg-mg-purple px-2 py-[3px] text-[12px] font-semibold text-white">
              {item.tag}
            </span>
          </div>
        </div>
        <h3 className="mt-6 text-balance text-[25px] font-bold leading-[1.15] tracking-[-0.01em] text-mg-ink tablet:text-[30px]">
          {item.title}
        </h3>
        <p className="mt-4 text-[16px] leading-[1.65] text-mg-muted">{item.text}</p>
        {item.chips && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-mg-line bg-mg-lilac px-3 py-1.5 text-[13px] font-medium text-mg-ink"
              >
                <SparkleIcon className="size-3 text-mg-purple" />
                {chip}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8">
          <a href={item.cta.href} className={cn(buttonStyles.base, buttonStyles.primary, "px-6 py-[13px] text-[15px]")}>
            {item.cta.label}
            <ButtonArrow />
          </a>
        </div>
      </div>
      <DiferencialVisual visual={item.visual} />
    </div>
  );
}

export function FormacaoSection() {
  return (
    <section id="diferenciais" className="relative scroll-mt-24 bg-white py-20 desktop:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <AudienceDiagram />
        <SectionHeading
          className="mt-6"
          title={
            <>
              Uma formação <Mark>completa</Mark>
            </>
          }
          description="Tecnologia, conteúdo e comunidade para desenvolver professores — e dados para orientar gestores e redes de ensino."
        />

        {/* Cards stack on top of each other while scrolling on desktop */}
        <div className="mx-auto mt-14 flex max-w-[1100px] flex-col gap-6 desktop:mt-20 desktop:gap-12">
          {diferenciais.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              className="desktop:sticky"
              style={{ top: 104 + i * 16 }}
              data-animate="fadeUp"
            >
              <DiferencialCard item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
