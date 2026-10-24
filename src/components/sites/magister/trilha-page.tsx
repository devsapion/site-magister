import { getCoursesByTrilha } from "@/lib/magister/courses";
import { CertificadoSection } from "./certificado-section";
import type { Trilha } from "./content";
import { EcossistemaSection } from "./ecossistema-section";
import { FeaturesSection } from "./features-showcase";
import { PageShell } from "./page-shell";
import { PricingSection } from "./pricing-section";
import { HeaderDivider, SiteHeader } from "./site-header";
import { TeamSection } from "./team-section";
import { TrilhaCourses } from "./trilha-courses";
import { TrilhaHero } from "./trilha-hero";
import { VideoSection } from "./video-section";
import { WaveDivider } from "./wave-divider";

/** Template shared by all learning-track pages (https://magister.sapion.com.br/trilha-*). */
export async function TrilhaPage({ trilha }: { trilha: Trilha }) {
  const courses = await getCoursesByTrilha(trilha.slug);

  return (
    <PageShell>
      <div style={{ backgroundColor: trilha.pageColor }}>
        <SiteHeader variant="light" />
        <HeaderDivider />
      </div>
      <main>
        <TrilhaHero trilha={trilha} />
        <TrilhaCourses trilha={trilha} courses={courses} />
        <PricingSection variant="trilha" />
        <WaveDivider className="bg-[#c0fdfe] bg-[url(/sites/magister/images/trilha/wave-dark.png)] bg-[position:-900px_0] tablet:bg-[position:0_0]" />
        <FeaturesSection />
        <VideoSection variant="trilha" />
        <EcossistemaSection overlapClassName="-mt-[192px]" />
        <TeamSection />
        <CertificadoSection certificate={trilha.certificate} variant="trilha" />
      </main>
    </PageShell>
  );
}
