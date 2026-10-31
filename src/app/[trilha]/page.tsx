import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrilha, trilhas } from "@/components/sites/magister/content";
import { TrilhaPage } from "@/components/sites/magister/trilha/trilha-page";

interface Props {
  params: Promise<{ trilha: string }>;
}

// Only the five tracks exist; any other top-level path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return trilhas.map((trilha) => ({ trilha: trilha.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trilha = getTrilha((await params).trilha);
  if (!trilha) return {};
  const title = `Trilha ${trilha.title} - Sapion Magister`;
  return {
    title,
    description: trilha.description,
    openGraph: { type: "website", locale: "pt_BR", siteName: "Sapion Magister", title, description: trilha.description },
  };
}

export default async function Page({ params }: Props) {
  const trilha = getTrilha((await params).trilha);
  if (!trilha) notFound();
  // Keyed so client components (entrance animations, carousels) reset between tracks.
  return <TrilhaPage key={trilha.slug} trilha={trilha} />;
}
