/**
 * Path the site is served under when it is not at the domain root, e.g. "/site-magister" on
 * GitHub Pages. Empty for `next dev`, `next start` and Docker.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative URL (a public asset, or a page reached without next/link) with the
 * base path. next/link adds it on its own; external URLs, anchors and prefixed paths pass through.
 */
export function withBasePath(url: string): string {
  if (!basePath || !url.startsWith("/") || url.startsWith("//")) return url;
  if (url === basePath || url.startsWith(`${basePath}/`)) return url;
  return `${basePath}${url}`;
}

/** Applies withBasePath to every root-relative src/href of an HTML string (blog post bodies). */
export function withBasePathInHtml(html: string): string {
  return basePath ? html.replace(/\b(src|href)="\/(?!\/)/g, `$1="${basePath}/`) : html;
}
