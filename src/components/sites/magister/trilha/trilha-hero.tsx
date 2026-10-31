import { ArrowDown, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { CatalogTotals } from "@/lib/magister/courses";
import { cn } from "@/lib/utils";
import { links, type Trilha } from "../content";
import { trilhaVisuals } from "../home/home-content";
import { buttonStyles, Magis, SparkleIcon } from "../home/ui";
import { ParallaxScene, SmoothAnchor } from "./parallax-scene";

/** Purple of the trails drawn on the platform's track covers. */
const TRAIL = "#6b4fbb";

/**
 * Winding trail from the start diamond (top left) to the goal flag (right), in a 1440×900 box.
 * Its bottom run sits low enough to pass under the course sheet, so it never crosses the copy.
 */
const trailPath =
  "M182 214H452A46 46 0 0 1 498 260V268A46 46 0 0 1 452 314H246A46 46 0 0 0 200 360V818A46 46 0 0 0 246 864H1200A46 46 0 0 0 1246 818V356";

const sparkles = [
  { className: "top-[18%] left-[9%] size-6", shift: -220, depth: 22, delay: "0s" },
  { className: "top-[30%] left-[30%] size-3", shift: -320, depth: 30, delay: "0.8s" },
  { className: "top-[22%] right-[24%] size-4", shift: -260, depth: 26, delay: "1.4s" },
  { className: "top-[56%] right-[8%] size-5", shift: -180, depth: 18, delay: "0.4s" },
  { className: "bottom-[24%] left-[18%] size-4", shift: -300, depth: 28, delay: "1.9s" },
  { className: "bottom-[30%] right-[30%] size-3", shift: -240, depth: 20, delay: "1.1s" },
];

function TrailArt() {
  return (
    <svg
      className="absolute inset-0 hidden h-full w-full tablet:block"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id="mg-trail-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
          <path className="mg-draw" d={trailPath} pathLength={1} stroke="#fff" strokeWidth="16" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#mg-trail-reveal)">
        <path
          className="mg-dash-flow"
          d={trailPath}
          stroke={TRAIL}
          strokeOpacity="0.85"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="16 12"
        />
      </g>
      {/* Start diamond and goal flag, the platform's path markers */}
      <path className="mg-rise" d="M182 182Q194 202 214 214Q194 226 182 246Q170 226 150 214Q170 202 182 182Z" fill={TRAIL} />
      <g className="mg-rise" style={{ animationDelay: "2.2s" }}>
        <rect x="1244" y="268" width="6" height="92" rx="3" fill={TRAIL} />
        <path d="M1250 272H1312L1292 296L1312 320H1250Z" fill={TRAIL} />
      </g>
    </svg>
  );
}

/**
 * First screen of a track page: the track gradient with its trail, a giant title that rises
 * letter by letter and layers that move at different speeds while the course list slides over.
 */
export function TrilhaHero({ trilha, position, totals }: { trilha: Trilha; position: number; totals: CatalogTotals }) {
  const visual = trilhaVisuals[trilha.slug];
  const dark = visual.onGradient === "dark";
  const iconMask = `url(${visual.icon}) center / contain no-repeat`;

  return (
    <ParallaxScene
      label={`Trilha ${trilha.title}`}
      className={cn(
        "relative top-0 isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden [@media(min-height:620px)]:sticky",
        dark ? "text-mg-ink" : "text-white",
      )}
      style={{ backgroundImage: visual.gradient }}
    >
      {/* Back layers: dot grid, glow and the track icon as a giant watermark */}
      <div
        className="mg-layer absolute -inset-x-10 -top-10 -bottom-40 bg-[radial-gradient(rgba(255,255,255,0.28)_1.3px,transparent_1.3px)] bg-[length:26px_26px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_20%,transparent_75%)] [--depth:-6] [--shift:-80]"
        aria-hidden="true"
      />
      <div
        className="mg-layer pointer-events-none absolute -top-[10%] left-[calc(50%-600px)] size-[1200px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.3),transparent)] [--shift:120]"
        aria-hidden="true"
      />
      <div className="mg-layer absolute -top-[6%] -right-[14%] [--depth:-30] [--shift:-320] tablet:-right-[6%]" aria-hidden="true">
        <span
          className={cn("block size-[min(78vw,640px)] rotate-[-14deg]", dark ? "bg-mg-ink/[0.07]" : "bg-white/[0.13]")}
          style={{ mask: iconMask, WebkitMask: iconMask }}
        />
      </div>
      <div
        className="mg-layer absolute -bottom-[10%] -left-[10%] hidden [--depth:-18] [--shift:-200] tablet:block"
        aria-hidden="true"
      >
        <span
          className={cn("block size-[320px] rotate-[12deg]", dark ? "bg-mg-ink/[0.06]" : "bg-white/[0.1]")}
          style={{ mask: iconMask, WebkitMask: iconMask }}
        />
      </div>

      {/* Middle layers: the trail, sparkles and Magis waiting at the goal */}
      <div className="mg-layer absolute inset-0 [--depth:10] [--shift:-110]">
        <TrailArt />
      </div>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.className}
          className={cn("mg-layer pointer-events-none absolute", sparkle.className)}
          style={{ "--shift": sparkle.shift, "--depth": sparkle.depth } as CSSProperties}
          aria-hidden="true"
        >
          <SparkleIcon
            className={cn("mg-twinkle size-full", dark ? "text-white" : "text-white/90")}
            style={{ animationDelay: sparkle.delay }}
          />
        </div>
      ))}
      <div
        className="mg-layer pointer-events-none absolute right-[max(24px,calc(50%-640px))] bottom-[110px] hidden w-[150px] [--depth:22] [--shift:-180] desktop:block xl:w-[180px]"
        aria-hidden="true"
      >
        <Magis pose={visual.pose} sizes="180px" className="mg-bob w-full drop-shadow-[0_24px_30px_rgba(40,10,110,0.35)]" />
      </div>

      {/* Front: the copy */}
      <div className="mg-hero-copy relative flex flex-1 flex-col items-center justify-center px-5 pt-[100px] pb-[76px] text-center tablet:pt-[112px] [@media(min-height:860px)]:pb-[130px]">
        <nav aria-label="Você está aqui" className="mg-rise">
          <ol
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium backdrop-blur-md",
              dark ? "border-mg-ink/15 bg-white/40 text-mg-ink/75" : "border-white/30 bg-white/15 text-white/85",
            )}
          >
            <li>
              <a href={links.home} className="transition-opacity hover:opacity-70">
                Início
              </a>
            </li>
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            <li>
              <a href={links.trilhas} className="transition-opacity hover:opacity-70">
                Trilhas
              </a>
            </li>
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            <li aria-current="page" className={cn("font-semibold", dark ? "text-mg-ink" : "text-white")}>
              {trilha.title}
            </li>
          </ol>
        </nav>

        <div className="mg-rise relative mt-[clamp(18px,3.5vh,36px)] [animation-delay:120ms]">
          <span className="mg-ring absolute inset-0 rounded-full bg-white/40" aria-hidden="true" />
          <span className="mg-ring absolute inset-0 rounded-full bg-white/30 [animation-delay:1.4s]" aria-hidden="true" />
          <span
            className="mg-bob relative grid size-[clamp(72px,12vh,124px)] place-items-center rounded-full bg-white shadow-[0_24px_50px_-20px_rgba(30,10,90,0.55)] ring-[6px] ring-white/40"
            aria-hidden="true"
          >
            <span className="block size-[54%]" style={{ backgroundColor: visual.color, mask: iconMask, WebkitMask: iconMask }} />
          </span>
        </div>

        <p
          className={cn(
            "mg-rise mt-[clamp(14px,2.6vh,26px)] text-[13px] font-bold tracking-[0.22em] uppercase [animation-delay:200ms] tablet:text-[14px]",
            dark ? "text-mg-ink/70" : "text-white/85",
          )}
        >
          Trilha {position} de 5
        </p>
        <h1
          aria-label={trilha.title}
          className="mt-1 text-[length:clamp(60px,min(16vw,19vh),200px)] leading-[0.95] font-extrabold tracking-[-0.045em] [text-shadow:0_18px_50px_rgba(40,10,110,0.18)]"
        >
          {Array.from(trilha.title).map((letter, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="mg-letter"
              style={{ animationDelay: `${260 + i * 55}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <p
          className={cn(
            "mg-rise mt-[clamp(12px,2.4vh,24px)] max-w-[640px] text-balance text-[17px] leading-[1.55] font-medium [animation-delay:650ms] tablet:text-[20px]",
            dark ? "text-mg-ink/85" : "text-white/95 [text-shadow:0_1px_12px_rgba(40,10,110,0.18)]",
          )}
        >
          {trilha.description}
        </p>
        <p
          className={cn(
            "mg-rise mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] font-semibold [animation-delay:750ms] tablet:text-[15px]",
            dark ? "text-mg-ink/75" : "text-white/90",
          )}
        >
          <span>{totals.courses} cursos</span>
          <SparkleIcon className="size-2.5 opacity-70" />
          <span>{totals.modules} módulos</span>
          <SparkleIcon className="size-2.5 opacity-70" />
          <span>{totals.videos} videoaulas</span>
          <SparkleIcon className="size-2.5 opacity-70" />
          <span>Certificado</span>
        </p>

        <div className="mg-rise mt-[clamp(18px,3.5vh,34px)] flex w-full flex-col items-center justify-center gap-3 [animation-delay:850ms] tablet:w-auto tablet:flex-row">
          <SmoothAnchor
            href="#cursos"
            className={cn(
              buttonStyles.base,
              "w-full px-7 py-[15px] text-[16px] tablet:w-auto",
              dark
                ? "bg-mg-ink text-white shadow-[0_14px_30px_-12px_rgba(31,26,92,0.7)] hover:-translate-y-0.5 hover:bg-mg-purple focus-visible:outline-mg-ink"
                : buttonStyles.white,
            )}
          >
            Ver os {totals.courses} cursos
            <ArrowDown className="size-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
          </SmoothAnchor>
          <a
            href={links.signUp}
            className={cn(
              buttonStyles.base,
              "w-full tablet:w-auto",
              dark
                ? "border-2 border-mg-ink/30 px-7 py-[13px] text-[16px] text-mg-ink hover:border-mg-ink hover:bg-white/30 focus-visible:outline-mg-ink"
                : buttonStyles.ghostWhite,
            )}
          >
            Teste por 14 dias grátis
          </a>
        </div>
      </div>

      <SmoothAnchor
        href="#cursos"
        aria-label="Rolar até os cursos"
        className={cn(
          "absolute bottom-[72px] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase [@media(min-height:860px)]:flex",
          dark ? "text-mg-ink/60" : "text-white/75",
        )}
      >
        <span className={cn("grid h-9 w-6 justify-center rounded-full border-2 pt-1.5", dark ? "border-mg-ink/40" : "border-white/60")}>
          <span className={cn("mg-scroll-cue block h-2 w-1 rounded-full", dark ? "bg-mg-ink/60" : "bg-white")} />
        </span>
        Role para ver os cursos
      </SmoothAnchor>
    </ParallaxScene>
  );
}
