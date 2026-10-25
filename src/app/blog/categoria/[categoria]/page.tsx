import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryBadge, ListingHero } from "@/components/sites/magister/blog/blog-ui";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { PostListing } from "@/components/sites/magister/blog/post-listing";
import { blogCategories, getBlogCategory, getPostsByCategory, paginate } from "@/lib/magister/blog";

interface Props {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getBlogCategory((await params).categoria);
  if (!category) return {};
  return blogMetadata({
    title: `${category.name} | Blog`,
    description: category.description,
    path: `/blog/categoria/${category.slug}`,
  });
}

export default async function Page({ params, searchParams }: Props) {
  const category = getBlogCategory((await params).categoria);
  if (!category) notFound();
  const pagina = Number((await searchParams).pagina ?? 1);
  const page = paginate(await getPostsByCategory(category.slug), pagina);

  return (
    <PostListing
      page={page}
      basePath={`/blog/categoria/${category.slug}`}
      showCategory={false}
      hero={
        <ListingHero
          eyebrow="Categoria"
          title={category.name}
          description={category.description}
          badge={
            <CategoryBadge
              slug={category.slug}
              className="mg-rise grid size-[76px] place-items-center rounded-full shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] ring-[6px] ring-white"
            />
          }
        />
      }
    />
  );
}
