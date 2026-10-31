"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ContactDialog } from "./contact-dialog";
import { appScreens, networkReasons, type NetworkReason } from "./home-content";
import { buttonStyles, ButtonArrow, Magis, PhoneFrame, SparkleIcon } from "./ui";

const title = "Por que levar a Sapion Magister para a sua rede?".split(" ");
const highlighted = new Set(["Sapion", "Magister"]);

function NumberBadge({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full bg-mg-mint text-[22px] font-bold text-mg-ink shadow-[0_12px_30px_-12px_rgba(48,190,90,0.8)]",
        className,
      )}
    >
      {n}
    </span>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-white/25 bg-white/15 px-3 py-[7px] text-[11px] font-semibold tracking-[0.14em] uppercase">
      {children}
    </span>
  );
}

/** Desktop: the open panel takes most of the row; the others shrink to a strip with a vertical caption. */
function Panel({ reason, index, active, onOpen }: { reason: NetworkReason; index: number; active: boolean; onOpen: () => void }) {
  return (
    <div
      className={cn(
        "relative min-w-0 basis-0 overflow-hidden rounded-[28px] text-white transition-[flex-grow,box-shadow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        active ? "grow-[5] shadow-[0_40px_80px_-40px_rgba(60,20,140,0.9)]" : "grow",
      )}
      style={{ backgroundImage: reason.gradient }}
    >
      {/* Visual: phone with the matching app screen, and Magis */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-[440px] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0",
        )}
        aria-hidden="true"
      >
        <SparkleIcon className="mg-twinkle absolute top-10 left-10 size-5 text-white/70" />
        <SparkleIcon className="mg-twinkle absolute top-28 left-24 size-3 text-mg-mint [animation-delay:1s]" />
        <PhoneFrame
          {...appScreens[reason.screen]}
          sizes="240px"
          className="absolute top-12 right-24 w-[230px] rotate-[5deg]"
        />
        <Magis pose={reason.pose} sizes="140px" className="mg-bob-slow absolute right-3 bottom-3 w-[124px]" />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,5,50,0)_40%,rgba(20,5,50,0.45)_100%)]" />

      {/* Collapsed strip */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          active ? "pointer-events-none opacity-0" : "opacity-100 delay-200",
        )}
      >
        <NumberBadge n={index + 1} className="absolute top-6 left-1/2 -translate-x-1/2" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[20px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase">
          {reason.short}
        </span>
        <button
          type="button"
          onClick={onOpen}
          tabIndex={active ? -1 : 0}
          aria-expanded={active}
          aria-label={`Motivo ${index + 1}: ${reason.title}`}
          className="absolute inset-0 cursor-pointer rounded-[28px] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
        />
      </div>

      {/* Open panel copy: fixed width so it does not reflow while the panel grows */}
      <div
        className={cn(
          "absolute bottom-9 left-9 w-[360px] transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "translate-y-0 opacity-100 duration-700 delay-300" : "pointer-events-none translate-y-4 opacity-0 duration-200",
        )}
        aria-hidden={!active}
      >
        <NumberBadge n={index + 1} />
        <div className="mt-6">
          <Tag>{reason.tag}</Tag>
        </div>
        <h4 className="mt-4 text-[32px] leading-[1.08] font-bold tracking-[-0.02em]">{reason.title}</h4>
        <p className="mt-4 text-[15px] leading-[1.65] text-white/85">{reason.text}</p>
      </div>
    </div>
  );
}

/** Mobile and tablet: the same panels stacked as an accordion. */
function MobilePanel({ reason, index, active, onOpen }: { reason: NetworkReason; index: number; active: boolean; onOpen: () => void }) {
  return (
    <div className="overflow-hidden rounded-[24px] text-white" style={{ backgroundImage: reason.gradient }}>
      <button type="button" onClick={onOpen} aria-expanded={active} className="flex w-full items-center gap-4 p-5 text-left">
        <NumberBadge n={index + 1} />
        <span className="flex-1 text-[15px] font-semibold tracking-[0.1em] uppercase">{reason.short}</span>
        <ChevronDown className={cn("size-5 shrink-0 transition-transform duration-500", active && "rotate-180")} />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-7">
            <Tag>{reason.tag}</Tag>
            <h4 className="mt-4 text-[24px] leading-[1.12] font-bold tracking-[-0.01em]">{reason.title}</h4>
            <p className="mt-3 text-[15px] leading-[1.65] text-white/85">{reason.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Por que levar…": layout of sauter.digital's partners section (word-by-word title, expanding panels). */
export function NetworkReasons() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto mt-24 max-w-[1100px] desktop:mt-32">
      <div className="grid gap-6 desktop:grid-cols-[1.35fr_1fr] desktop:items-end desktop:gap-12">
        <div>
          <p className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em] text-mg-purple uppercase" data-animate="fadeUp">
            <span className="h-px w-8 bg-mg-purple/50" />
            Para secretarias de educação
          </p>
          <h3
            className="mt-5 text-[38px] leading-[1.04] font-bold tracking-[-0.035em] text-mg-ink tablet:text-[54px] desktop:text-[60px]"
            data-animate="words"
          >
            {title.map((word, i) => (
              <span key={i}>
                <span
                  className={cn("mg-word inline-block", highlighted.has(word) && "text-mg-purple")}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </h3>
        </div>
        <p className="max-w-[440px] text-[17px] leading-[1.6] text-mg-muted desktop:justify-self-end" data-animate="fadeUp" data-delay={200}>
          Formação continuada que chega à sala de aula, com tecnologia, personalização e suporte para professores e
          gestores de toda a rede.
        </p>
      </div>

      <div className="mt-12 hidden h-[540px] gap-4 desktop:flex" data-animate="fadeUp" data-delay={150}>
        {networkReasons.map((reason, i) => (
          <Panel key={reason.title} reason={reason} index={i} active={active === i} onOpen={() => setActive(i)} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 desktop:hidden" data-animate="fadeUp">
        {networkReasons.map((reason, i) => (
          <MobilePanel key={reason.title} reason={reason} index={i} active={active === i} onOpen={() => setActive(i)} />
        ))}
      </div>

      <div className="mt-8 flex justify-end" data-animate="fadeUp">
        <ContactDialog className={cn(buttonStyles.base, buttonStyles.primary, "w-full tablet:w-auto")}>
          Leve para sua rede
          <ButtonArrow />
        </ContactDialog>
      </div>
    </div>
  );
}
