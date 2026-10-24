import type { ReactNode } from "react";
import { RevealObserver } from "./reveal-observer";
import { SiteFooter } from "./site-footer";

/** Wrapper shared by every Magister page: overflow clipping, footer and entrance animations. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <noscript>
        <style>{"[data-animate]{visibility:visible!important}"}</style>
      </noscript>
      {children}
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
