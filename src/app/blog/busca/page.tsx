import type { Metadata } from "next";
import { ListingHero } from "@/components/sites/magister/blog/blog-ui";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { PostListing, SearchEmpty, SearchForm } from "@/components/sites/magister/blog/post-listing";
import { getPosts, paginate, searchPosts } from "@/lib/magister/blog";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const readParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = readParam((await searchParams).q).trim();
  return blogMetadata({
    title: q ? `Resultados para “${q}” | Blog` : "Buscar no blog",
    description: "Encontre conteúdos sobre formação de professores no blog da Sapion Magister.",
    path: "/blog/busca",
    index: false,
  });
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const q = readParam(params.q).trim();
  const pagina = Number(readParam(params.pagina) || 1);
  // Without a term the page shows the latest posts under the search box.
  const results = q ? await searchPosts(q) : await getPosts();

  return (
    <PostListing
      page={paginate(results, pagina)}
      basePath="/blog/busca"
      query={q ? { q } : {}}
      heading={q ? undefined : "Posts recentes"}
      empty={<SearchEmpty query={q} />}
      hero={
        <ListingHero
          eyebrow={q ? "Exibindo resultados da pesquisa" : "Buscar no blog"}
          title={q || "O que você procura?"}
          description={
            q ? `${results.length} ${results.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}` : undefined
          }
        >
          <SearchForm key={q} defaultValue={q} />
        </ListingHero>
      }
    />
  );
}
