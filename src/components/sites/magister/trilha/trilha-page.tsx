import { getCatalogTotals, getCoursesByTrilha } from "@/lib/magister/courses";
import { trilhas, type Trilha } from "../content";
import { CtaFinal } from "../home/cta-final";
import { FormacaoSection } from "../home/formacao";
import { PlanosSection } from "../home/planos";
import { ProvaSocialSection } from "../home/prova-social";
import { SiteShell } from "../home/site-shell";
import { TrilhaHero } from "./trilha-hero";
import { OutrasTrilhas, TrilhaCertificado, TrilhaCourses } from "./trilha-sections";

/** Template shared by the five learning-track pages (/trilha-*), in the redesigned home's style. */
export async function TrilhaPage({ trilha }: { trilha: Trilha }) {
  const courses = await getCoursesByTrilha(trilha.slug);
  const totals = getCatalogTotals(trilha.slug);

  return (
    <SiteShell>
      {/* The hero stays pinned while the course sheet slides over it. */}
      <div className="relative">
        <TrilhaHero trilha={trilha} position={trilhas.indexOf(trilha) + 1} totals={totals} />
        <TrilhaCourses trilha={trilha} courses={courses} totals={totals} />
      </div>
      <TrilhaCertificado trilha={trilha} courses={courses.length} />
      <FormacaoSection />
      <ProvaSocialSection />
      <PlanosSection />
      <OutrasTrilhas current={trilha} />
      <CtaFinal />
    </SiteShell>
  );
}
