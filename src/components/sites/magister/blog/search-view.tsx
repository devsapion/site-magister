"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { withBasePath } from "@/lib/base-path";
import { blogCategories, searchPosts } from "@/lib/magister/blog";
import { homeLinks } from "../home/home-content";
import { Magis } from "../home/ui";
import { CategoryPill, ListingBody, ListingHero } from "./blog-ui";
import { PostResults } from "./post-results";
import { useBlogSearch } from "./use-blog-search";

function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const onSubmit = useBlogSearch();
  return (
    <form
      action={withBasePath("/blog/busca")}
      onSubmit={onSubmit}
      role="search"
      className="mg-rise mt-8 w-full max-w-[560px] [animation-delay:300ms]"
    >
      <div className="flex items-center gap-2 rounded-full border border-mg-line bg-white p-2 shadow-[0_20px_40px_-28px_rgba(60,20,140,0.55)]">
        <Search className="ml-3 size-5 shrink-0 text-mg-muted" />
        <input
          type="search"
          name="q"
          required
          defaultValue={defaultValue}
          placeholder="O que você quer aprender hoje?"
          aria-label="Buscar no blog"
          className="min-h-[48px] flex-1 bg-transparent px-2 text-[16px] text-mg-ink placeholder:text-mg-muted/70 focus:outline-none"
        />
        <button
          type="submit"
          className="min-h-[48px] rounded-full bg-mg-purple px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#7433d9]"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

/** Empty search: Magis with a magnifier, plus the categories to keep exploring. */
function SearchEmpty({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center py-6 text-center" data-animate="fadeUp">
      <Magis pose="lupa" sizes="200px" className="w-[170px]" />
      <h2 className="mt-6 text-[24px] font-bold text-mg-ink tablet:text-[28px]">Nenhum resultado para “{query}”</h2>
      <p className="mt-3 max-w-[480px] text-[16px] leading-[1.6] text-mg-muted">
        Tente outras palavras ou explore os conteúdos por categoria.
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {blogCategories.map((category) => (
          <li key={category.slug}>
            <CategoryPill slug={category.slug} className="px-4 py-2 text-[14px]" />
          </li>
        ))}
      </ul>
      <Link href={homeLinks.blog} className="mt-8 text-[15px] font-semibold text-mg-purple hover:underline">
        Voltar para o blog
      </Link>
    </div>
  );
}

/** Hero with the search box, then the matching posts (the latest ones without a term). */
function SearchResults({ query, page }: { query: string; page: number }) {
  const results = searchPosts(query);
  return (
    <>
      <ListingHero
        eyebrow={query ? "Exibindo resultados da pesquisa" : "Buscar no blog"}
        title={query || "O que você procura?"}
        description={
          query ? `${results.length} ${results.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}` : undefined
        }
      >
        <SearchForm key={query} defaultValue={query} />
      </ListingHero>
      <ListingBody>
        <PostResults
          posts={results}
          page={page}
          basePath="/blog/busca"
          query={query ? { q: query } : {}}
          heading={query ? undefined : "Posts recentes"}
          empty={<SearchEmpty query={query} />}
        />
      </ListingBody>
    </>
  );
}

function SearchFromUrl() {
  const params = useSearchParams();
  return <SearchResults query={(params.get("q") ?? "").trim()} page={Number(params.get("pagina") ?? 1)} />;
}

/**
 * Blog search, run in the browser from `?q=` and `?pagina=`: the static build has no server, so it
 * prerenders the page without a term.
 */
export function SearchView() {
  return (
    <Suspense fallback={<SearchResults query="" page={1} />}>
      <SearchFromUrl />
    </Suspense>
  );
}
