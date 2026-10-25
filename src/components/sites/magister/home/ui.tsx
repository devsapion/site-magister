import Image from "next/image";
import type { CSSProperties, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { ASSETS, links } from "../content";
import { magis, type MagisPose } from "./home-content";

/** Mint marker behind a word or two of a heading. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="mg-mark">{children}</span>;
}

export function SectionHeading({
  title,
  description,
  className,
  as: Tag = "h2",
}: {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mx-auto max-w-[780px] text-center", className)} data-animate="fadeUp">
      <Tag className="text-balance text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-mg-ink tablet:text-[42px]">
        {title}
      </Tag>
      {description && (
        <p className="mx-auto mt-4 max-w-[640px] text-pretty text-[16px] leading-[1.6] text-mg-muted tablet:text-[18px]">
          {description}
        </p>
      )}
    </div>
  );
}

/** Four-point star from the brand (same shape as the logo sparkle). */
export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 0C12.9 6.6 17.4 11.1 24 12C17.4 12.9 12.9 17.4 12 24C11.1 17.4 6.6 12.9 0 12C6.6 11.1 11.1 6.6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const buttonStyles = {
  base: "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
  primary:
    "bg-mg-purple px-7 py-[15px] text-[16px] text-white shadow-[0_12px_30px_-10px_rgba(132,67,234,0.75)] hover:-translate-y-0.5 hover:bg-[#7433d9] focus-visible:outline-mg-purple",
  mint: "bg-mg-mint px-7 py-[15px] text-[16px] text-mg-ink shadow-[0_12px_30px_-12px_rgba(48,190,90,0.8)] hover:-translate-y-0.5 hover:bg-[#8cfa9b] focus-visible:outline-mg-mint",
  outline:
    "border-2 border-mg-purple/25 bg-white/70 px-7 py-[13px] text-[16px] text-mg-purple hover:border-mg-purple hover:bg-white focus-visible:outline-mg-purple",
  white:
    "bg-white px-7 py-[15px] text-[16px] text-mg-purple shadow-[0_12px_30px_-12px_rgba(20,0,60,0.5)] hover:-translate-y-0.5 hover:bg-mg-mint hover:text-mg-ink focus-visible:outline-white",
  ghostWhite:
    "border-2 border-white/50 px-7 py-[13px] text-[16px] text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

export function ButtonArrow() {
  return <ArrowIcon className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />;
}

/** iPhone-style frame around an app screenshot (920×2000). */
export function PhoneFrame({
  src,
  alt,
  className,
  sizes = "280px",
  preload,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[18%/8.4%] bg-[linear-gradient(145deg,#3a3550,#121019_45%,#2a2638)] p-[3.2%] shadow-[0_40px_80px_-30px_rgba(40,10,110,0.55),0_18px_36px_-18px_rgba(0,0,0,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]",
        className,
      )}
    >
      <div className="relative aspect-[920/2000] overflow-hidden rounded-[15%/7%] bg-white">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
        <span className="absolute top-[1.6%] left-1/2 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

export function Magis({
  pose,
  className,
  sizes = "200px",
  alt = "",
}: {
  pose: MagisPose;
  className?: string;
  sizes?: string;
  alt?: string;
}) {
  const image = magis[pose];
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={cn("h-auto select-none", className)}
      draggable={false}
    />
  );
}

/** CSS marquee: renders the items twice and slides the track by half its width. */
export function Marquee({
  children,
  label,
  durationS = 40,
  reverse = false,
  className,
  trackClassName,
}: {
  children: ReactNode;
  label: string;
  durationS?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div
      className={cn("mg-marquee overflow-hidden", reverse && "mg-marquee-reverse", className)}
      role="region"
      aria-label={label}
      style={{ "--mg-marquee-duration": `${durationS}s` } as CSSProperties}
    >
      <div className={cn("mg-marquee-track flex w-max", trackClassName)}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

export function StoreBadges({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a href={links.appStore} className="block transition-transform duration-300 hover:-translate-y-0.5">
        <Image
          src={`${ASSETS}/badge-app-store.png`}
          alt="Baixar na App Store"
          width={600}
          height={182}
          className={cn("h-[42px] w-auto", imageClassName)}
        />
      </a>
      <a href={links.googlePlay} className="block transition-transform duration-300 hover:-translate-y-0.5">
        <Image
          src={`${ASSETS}/badge-google-play.png`}
          alt="Disponível no Google Play"
          width={568}
          height={172}
          className={cn("h-[42px] w-auto", imageClassName)}
        />
      </a>
    </div>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"
      />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
      />
    </svg>
  );
}
