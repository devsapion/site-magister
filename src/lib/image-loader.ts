import { withBasePath } from "./base-path";

/**
 * next/image loader of the static export (GitHub Pages). There is no image optimizer there, so it
 * serves the original file, under the base path for the site's own assets.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  return withBasePath(src);
}
