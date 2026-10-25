import type { Metadata } from "next";

/** Title, description and Open Graph for the blog area pages. */
export function blogMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  index?: boolean;
}): Metadata {
  const fullTitle = `${title} - Sapion Magister`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type,
      locale: "pt_BR",
      siteName: "Sapion Magister",
      title: fullTitle,
      description,
      url: path,
      images: image ? [{ url: image }] : undefined,
    },
  };
}
