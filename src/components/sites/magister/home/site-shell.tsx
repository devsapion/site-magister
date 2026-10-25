import type { ReactNode } from "react";
import { RevealObserver } from "../reveal-observer";
import { GlassHeader } from "./glass-header";
import { HomeFooter } from "./home-footer";

/** Frame of every redesigned page: glass header, footer and the entrance animations. */
export function SiteShell({ children, header = <GlassHeader /> }: { children: ReactNode; header?: ReactNode }) {
  return (
    <div className="mg-home overflow-x-clip bg-white font-lexend text-mg-ink">
      <noscript>
        <style>{"[data-animate]{visibility:visible!important}"}</style>
      </noscript>
      {header}
      <main>{children}</main>
      <HomeFooter />
      <RevealObserver />
    </div>
  );
}
