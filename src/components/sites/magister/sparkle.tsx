import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS, type Animation } from "./content";

interface SparkleProps {
  /** Tailwind position/size classes; positions are relative to the nearest positioned ancestor. */
  className: string;
  animation?: Animation;
  delay?: number;
  /** true: hero drift (-3→8px, 3s); "soft": track-page drift (-2→4px, 2s). */
  floating?: boolean | "soft";
}

/** Decorative four-point star scattered over the purple sections. */
export function Sparkle({ className, animation = "fadeIn", delay, floating }: SparkleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-[1]", className)}
      data-animate={animation}
      data-delay={delay}
    >
      <Image
        src={`${ASSETS}/sparkle.png`}
        alt=""
        width={176}
        height={176}
        className={cn("size-full", floating === true && "mg-float-sparkle", floating === "soft" && "mg-float-soft")}
      />
    </div>
  );
}
