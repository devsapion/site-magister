import { Search } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { blogCategories, type BlogPost, type Page } from "@/lib/magister/blog";
import { homeLinks } from "../home/home-content";
import { SiteShell } from "../home/site-shell";
import { Magis } from "../home/ui";
import { BlogHeader, CategoryPill, ListingBody, Pagination, PostGrid } from "./blog-ui";
import { NewsletterSection } from "./newsletter";

/** Shell of the blog listings (category and search): hero, card grid with pagination, newsletter. */
export function PostListing({
  hero,
  page,
  basePath,
  query,
  showCategory = true,
  heading,
  empty,
}: {
  hero: ReactNode;
  page: Page<BlogPost>;
  basePath: string;
  query?: Record<string, string>;
  showCategory?: boolean;
  /** Optional title above the grid (e.g. "Posts recentes" on an empty search). */
  heading?: string;
  empty?: ReactNode;
}) {
  return (
    <SiteShell header={<BlogHeader />}>
      {hero}
      <ListingBody>
        {page.items.length > 0 ? (
          <>
            {heading && <h2 className="mb-8 text-[24px] font-bold text-mg-ink tablet:text-[28px]">{heading}</h2>}
            <PostGrid posts={page.items} showCategory={showCategory} showMeta />
            <Pagination page={page.page} pages={page.pages} basePath={basePath} query={query} />
          </>
        ) : (
          empty
        )}
      </ListingBody>
      <NewsletterSection />
    </SiteShell>
  );
}

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/blog/busca" role="search" className="mg-rise mt-8 w-full max-w-[560px] [animation-delay:300ms]">
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
export function SearchEmpty({ query }: { query: string }) {
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
