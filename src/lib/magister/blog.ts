import { trilhas, type TrilhaSlug } from "@/components/sites/magister/content";
import postsData from "./blog-posts.json";

export type BlogCategorySlug = "inovacao" | "infancia" | "skills" | "inclusao" | "gestao" | "plataforma";

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  description: string;
  /** Learning track the category mirrors (all but "plataforma"). */
  trilha?: TrilhaSlug;
}

const trilhaCategory = (slug: BlogCategorySlug, trilha: TrilhaSlug): BlogCategory => {
  const track = trilhas.find((t) => t.slug === trilha);
  return { slug, trilha, name: track?.title ?? slug, description: track?.description ?? "" };
};

/** One category per learning track, plus platform news. */
export const blogCategories: BlogCategory[] = [
  trilhaCategory("inovacao", "trilha-inovacao"),
  trilhaCategory("infancia", "trilha-infancia"),
  trilhaCategory("skills", "trilha-skills"),
  trilhaCategory("inclusao", "trilha-inclusao"),
  trilhaCategory("gestao", "trilha-gestao"),
  {
    slug: "plataforma",
    name: "Plataforma",
    description: "Novidades, lançamentos e tutoriais da Sapion Magister.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Publication date as written by WordPress (site-local, no time zone). */
  date: string;
  modified: string;
  category: BlogCategorySlug;
  author: { name: string; bio: string };
  cover: { src: string; width: number | null; height: number | null; alt: string } | null;
  readingMinutes: number;
  headings: { id: string; text: string; level: number }[];
  /** Cleaned article HTML (see scripts/sync_wp_blog.py). */
  html: string;
}

/** What post cards show: the post without its body, light enough to hand to client components. */
export type PostSummary = Omit<BlogPost, "headings" | "html">;

export const toSummary = (post: BlogPost): PostSummary => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  modified: post.modified,
  category: post.category,
  author: post.author,
  cover: post.cover,
  readingMinutes: post.readingMinutes,
});

export interface Page<T> {
  items: T[];
  page: number;
  pages: number;
  total: number;
}

export const POSTS_PER_PAGE = 12;

// Snapshot of the WordPress posts (newest first). Swap these bodies for CMS queries later —
// callers already await them.
const posts = postsData as BlogPost[];

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): Page<T> {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pages);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, pages, total: items.length };
}

export async function getPosts(): Promise<BlogPost[]> {
  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return posts.find((post) => post.slug === slug);
}

export async function getPostsByCategory(slug: BlogCategorySlug): Promise<BlogPost[]> {
  return posts.filter((post) => post.category === slug);
}

/** Same category first, then the most recent posts. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const others = posts.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  return [...same, ...others.filter((p) => p.category !== post.category)].slice(0, limit);
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const plainText = (html: string) => html.replace(/<[^>]+>/g, " ");

/**
 * Posts containing every word of the query, title matches first; the latest posts when the query
 * is empty. Synchronous because the search page runs it in the browser (the static build has no
 * server to answer `?q=`).
 */
export function searchPosts(query: string): BlogPost[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return posts;
  return posts
    .map((post) => {
      const title = normalize(post.title);
      const body = normalize(`${post.excerpt} ${plainText(post.html)}`);
      if (!terms.every((term) => title.includes(term) || body.includes(term))) return null;
      return { post, score: terms.filter((term) => title.includes(term)).length };
    })
    .filter((hit): hit is { post: BlogPost; score: number } => hit !== null)
    .sort((a, b) => b.score - a.score)
    .map((hit) => hit.post);
}

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "5 de julho de 2024" — read from the date part only, so the server time zone never shifts the day. */
export function formatPostDate(date: string): string {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  return dateFormat.format(new Date(Date.UTC(year, month - 1, day)));
}
