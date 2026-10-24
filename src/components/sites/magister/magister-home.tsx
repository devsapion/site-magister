import { CertificadoSection } from "./certificado-section";
import { EcossistemaSection } from "./ecossistema-section";
import { HeroSection } from "./hero-section";
import { PageShell } from "./page-shell";
import { PartnersSection } from "./partners-section";
import { PricingSection } from "./pricing-section";
import { SiteHeader } from "./site-header";
import { TeamSection } from "./team-section";
import { TrilhasSection } from "./trilhas-section";
import { VideoSection } from "./video-section";

/** Home page of https://magister.sapion.com.br/ */
export function MagisterHome() {
  return (
    <PageShell>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrilhasSection />
        <VideoSection />
        <PricingSection />
        <EcossistemaSection />
        <TeamSection />
        <PartnersSection />
        <CertificadoSection />
      </main>
    </PageShell>
  );
}
