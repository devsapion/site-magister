import { BlogHeader, ListingBody, ListingHero, MaterialCard } from "@/components/sites/magister/blog/blog-ui";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { NewsletterSection } from "@/components/sites/magister/blog/newsletter";
import { SiteShell } from "@/components/sites/magister/home/site-shell";
import { Mark } from "@/components/sites/magister/home/ui";
import { getMaterials } from "@/lib/magister/materials";

export const metadata = blogMetadata({
  title: "Materiais gratuitos",
  description: "E-books, guias e planilhas gratuitos para professores, gestores e redes de ensino.",
  path: "/materiais-gratuitos",
});

export default async function Page() {
  const materials = await getMaterials();
  return (
    <SiteShell header={<BlogHeader />}>
      <ListingHero
        eyebrow="Materiais gratuitos"
        title={
          <>
            E-books, guias e planilhas para a sua <Mark>rede</Mark>
          </>
        }
        description="Conteúdos práticos para professores, gestores e secretarias de educação. Escolha um material e baixe gratuitamente."
      />
      <ListingBody>
        <ul className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
          {materials.map((material, i) => (
            <li key={material.slug} data-animate="fadeUp" data-delay={(i % 3) * 100}>
              <MaterialCard material={material} />
            </li>
          ))}
        </ul>
      </ListingBody>
      <NewsletterSection />
    </SiteShell>
  );
}
