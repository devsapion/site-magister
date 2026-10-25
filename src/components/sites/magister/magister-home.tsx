import { CtaFinal } from "./home/cta-final";
import { EspecialistasSection } from "./home/especialistas";
import { FormacaoSection } from "./home/formacao";
import { Hero, NumbersRibbon } from "./home/hero";
import { ImpactoSection } from "./home/impacto";
import { PlanosSection } from "./home/planos";
import { ProvaSocialSection } from "./home/prova-social";
import { SiteShell } from "./home/site-shell";
import { TrilhasSection } from "./home/trilhas";

/** Redesigned home of https://magister.sapion.com.br/ (structure inspired by tutormundi.com). */
export function MagisterHome() {
  return (
    <SiteShell>
      <Hero />
      <NumbersRibbon />
      <TrilhasSection />
      <EspecialistasSection />
      <FormacaoSection />
      <ImpactoSection />
      <ProvaSocialSection />
      <PlanosSection />
      <CtaFinal />
    </SiteShell>
  );
}
