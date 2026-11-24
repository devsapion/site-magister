import type { ReactNode } from "react";
import { paginate, type PostSummary } from "@/lib/magister/blog";
import { Pagination, PostGrid } from "./blog-ui";

export interface PostResultsProps {
  /** Every post of the listing; the page shown is sliced from it. */
  posts: PostSummary[];
  /** Route the page links point to; `query` keeps its other parameters (e.g. the search term). */
  basePath: string;
  query?: Record<string, string>;
  showCategory?: boolean;
  /** Optional title above the grid (e.g. "Posts recentes" on an empty search). */
  heading?: string;
  empty?: ReactNode;
}

/** One page of a listing: card grid with pagination, or `empty` when there are no posts. */
export function PostResults({
  posts,
  page,
  basePath,
  query,
  showCategory = true,
  heading,
  empty,
}: PostResultsProps & { page: number }) {
  if (!posts.length) return <>{empty}</>;
  const current = paginate(posts, page);
  return (
    <>
      {heading && <h2 className="mb-8 text-[24px] font-bold text-mg-ink tablet:text-[28px]">{heading}</h2>}
      <PostGrid posts={current.items} showCategory={showCategory} showMeta />
      <Pagination page={current.page} pages={current.pages} basePath={basePath} query={query} />
    </>
  );
}
