"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PostResults, type PostResultsProps } from "./post-results";

function PageFromUrl(props: PostResultsProps) {
  const page = Number(useSearchParams().get("pagina") ?? 1);
  return <PostResults {...props} page={page} />;
}

/**
 * Listing whose page comes from `?pagina=` in the browser, so the static build needs a single HTML
 * file per listing. That prerendered HTML shows the first page.
 */
export function PagedPostResults(props: PostResultsProps) {
  return (
    <Suspense fallback={<PostResults {...props} page={1} />}>
      <PageFromUrl {...props} />
    </Suspense>
  );
}
