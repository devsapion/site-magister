import { CtaFinal } from "./home/cta-final";
import { EspecialistasSection } from "./home/especialistas";
import { FormacaoSection } from "./home/formacao";
import { GlassHeader } from "./home/glass-header";
import { Hero, NumbersRibbon } from "./home/hero";
import { HomeFooter } from "./home/home-footer";
import { ImpactoSection } from "./home/impacto";
import { PlanosSection } from "./home/planos";
import { ProvaSocialSection } from "./home/prova-social";
import { TrilhasSection } from "./home/trilhas";
import { RevealObserver } from "./reveal-observer";

/** Redesigned home of https://magister.sapion.com.br/ (structure inspired by tutormundi.com). */
export function MagisterHome() {
  return (
    <div className="mg-home overflow-x-clip bg-white font-lexend text-mg-ink">
      <noscript>
        <style>{"[data-animate]{visibility:visible!important}"}</style>
      </noscript>
      <GlassHeader />
      <main>
        <Hero />
        <NumbersRibbon />
        <TrilhasSection />
        <EspecialistasSection />
        <FormacaoSection />
        <ImpactoSection />
        <ProvaSocialSection />
        <PlanosSection />
        <CtaFinal />
      </main>
      <HomeFooter />
      <RevealObserver />
    </div>
  );
}
