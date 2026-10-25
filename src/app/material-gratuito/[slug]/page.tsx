import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader, MaterialCover } from "@/components/sites/magister/blog/blog-ui";
import { FormCard, MaterialForm } from "@/components/sites/magister/blog/lead-forms";
import { AboutMagister, HighlightsSection, LeadLanding } from "@/components/sites/magister/blog/lead-landing";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { SiteShell } from "@/components/sites/magister/home/site-shell";
import { SparkleIcon } from "@/components/sites/magister/home/ui";
import { getMaterial, getMaterials } from "@/lib/magister/materials";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getMaterials()).map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const material = await getMaterial((await params).slug);
  if (!material) return {};
  return blogMetadata({
    title: `[${material.kind}] ${material.title}`,
    description: material.description,
    path: `/material-gratuito/${material.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const material = await getMaterial((await params).slug);
  if (!material) notFound();
  const where = material.kind === "Planilha" ? "nesta planilha" : `neste ${material.kind.toLowerCase()}`;

  return (
    <SiteShell header={<BlogHeader />}>
      <LeadLanding
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-mg-purple/15 bg-white/80 px-4 py-2 text-[13px] font-semibold text-mg-purple">
            <SparkleIcon className="size-3.5" />
            Material gratuito · {material.kind}
          </span>
        }
        title={material.title}
        description={<p>{material.description}</p>}
        visual={
          <div className="relative mx-auto w-[min(100%,340px)] desktop:mx-0 desktop:ml-10">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(161,96,250,0.28),transparent)]" />
            <MaterialCover material={material} className="mg-bob-slow relative -rotate-3 text-[22px]" />
          </div>
        }
        form={
          <FormCard
            title="Preencha o formulário para receber seu material."
            description="Preencha os campos abaixo para receber o material gratuitamente."
          >
            <MaterialForm material={material} />
          </FormCard>
        }
      >
        <HighlightsSection title={`O que você vai encontrar ${where}?`} items={material.highlights} />
        <AboutMagister />
      </LeadLanding>
    </SiteShell>
  );
}
