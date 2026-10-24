import { cn } from "@/lib/utils";

/** 245px band with a full-bleed arches image; pass the background color and image as classes. */
export function WaveDivider({ className }: { className: string }) {
  return <div aria-hidden="true" className={cn("min-h-[245px] bg-cover bg-no-repeat", className)} />;
}
