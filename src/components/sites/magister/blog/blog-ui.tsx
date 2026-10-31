import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { blogCategories, formatPostDate, getBlogCategory, type BlogCategorySlug, type BlogPost } from "@/lib/magister/blog";
import type { FreeMaterial } from "@/lib/magister/materials";
import { GlassHeader } from "../home/glass-header";
import { homeLinks, logos, trilhaVisuals, type HeaderLink } from "../home/home-content";
import { ArrowIcon, Magis, SparkleIcon, TrilhaBadge } from "../home/ui";

export const postHref = (slug: string) => `/blog/${slug}`;
export const categoryHref = (slug: BlogCategorySlug) => `/blog/categoria/${slug}`;
export const materialHref = (slug: string) => `/material-gratuito/${slug}`;

export const blogNavItems: HeaderLink[] = [
  {
    label: "Categorias",
    href: homeLinks.blog,
    children: blogCategories.map((category) => ({
      label: category.name,
      href: categoryHref(category.slug),
      description: category.description,
    })),
  },
  { label: "Materiais gratuitos", href: homeLinks.materiais },
  { label: "Contato", href: homeLinks.contato },
];

/** Glass header of the blog area: categories, materials, contact and search. */
export function BlogHeader() {
  return <GlassHeader links={blogNavItems} search cta={false} />;
}

export interface CategoryVisual {
  gradient: string;
  color: string;
  tint: string;
  icon?: string;
}

const platformVisual: CategoryVisual = {
  gradient: "linear-gradient(140deg, #b07cff 0%, #8443ea 55%, #5b1fc4 100%)",
  color: "#7433d9",
  tint: "#f3edff",
};

/** Colors of a category: the track's palette, or brand purple for platform news. */
export function categoryVisual(slug: BlogCategorySlug): CategoryVisual {
  const trilha = getBlogCategory(slug)?.trilha;
  return trilha ? trilhaVisuals[trilha] : platformVisual;
}

/** Round category badge: the track icon, or the logo mark for platform news. */
export function CategoryBadge({ slug, className }: { slug: BlogCategorySlug; className?: string }) {
  const visual = categoryVisual(slug);
  if (visual.icon) return <TrilhaBadge icon={visual.icon} gradient={visual.gradient} className={className} />;
  return (
    <span className={className} style={{ backgroundImage: visual.gradient }} aria-hidden="true">
      <Image src={logos.mark.src} alt="" width={28} height={28} className="size-[52%]" />
    </span>
  );
}

export function CategoryPill({ slug, className }: { slug: BlogCategorySlug; className?: string }) {
  const visual = categoryVisual(slug);
  return (
    <Link
      href={categoryHref(slug)}
      className={cn(
        "relative z-[1] inline-flex rounded-full px-3 py-1 text-[12px] font-semibold transition-opacity hover:opacity-80",
        className,
      )}
      style={{ backgroundColor: visual.tint, color: visual.color }}
    >
      {getBlogCategory(slug)?.name}
    </Link>
  );
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts.at(-1)![0] : "")).toUpperCase();
}

export function AuthorAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,#b07cff,#7a35e6)] font-bold text-white",
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-[13px] text-mg-muted", className)}>
      <AuthorAvatar name={post.author.name} className="size-7 text-[11px]" />
      <span className="font-medium text-mg-ink">{post.author.name}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date.slice(0, 10)}>{formatPostDate(post.date)}</time>
    </div>
  );
}

/** Post image, or a branded panel (category gradient + Magis) when the post has none. `eager` above the fold. */
export function PostCover({
  post,
  sizes,
  className,
  eager,
}: {
  post: BlogPost;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  const visual = categoryVisual(post.category);
  return (
    <div className={cn("relative overflow-hidden bg-mg-lilac", className)}>
      {post.cover ? (
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center" style={{ backgroundImage: visual.gradient }}>
          <Magis pose="pensando" sizes="200px" className="w-[42%]" />
        </div>
      )}
    </div>
  );
}

/**
 * Vertical card used in grids. On the blog home it is just image, title and "Leia mais"
 * (like the reference); listings add the author and date, related posts add the category.
 */
export function PostCard({
  post,
  showCategory = false,
  showMeta = false,
  sizes = "(min-width: 1025px) 270px, (min-width: 768px) 45vw, 80vw",
  eager,
}: {
  post: BlogPost;
  showCategory?: boolean;
  showMeta?: boolean;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-mg-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-34px_rgba(60,20,140,0.55)]">
      <PostCover post={post} sizes={sizes} eager={eager} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5 tablet:p-6">
        {showCategory && <CategoryPill slug={post.category} className="mb-3 self-start" />}
        {showMeta && <PostMeta post={post} className="mb-3" />}
        <h3 className="line-clamp-3 text-[17px] font-semibold leading-snug text-mg-ink">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[15px] font-semibold text-mg-purple">
          Leia mais
          <ArrowIcon className="size-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

export function PostGrid({
  posts,
  showCategory,
  showMeta,
}: {
  posts: BlogPost[];
  showCategory?: boolean;
  showMeta?: boolean;
}) {
  return (
    <ul className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
      {posts.map((post, i) => (
        <li key={post.slug} data-animate="fadeUp" data-delay={(i % 4) * 80}>
          {/* The first row sits right under the listing hero: load it immediately. */}
          <PostCard post={post} showCategory={showCategory} showMeta={showMeta} eager={i < 4} />
        </li>
      ))}
    </ul>
  );
}

/** Page links for listings; keeps the other query parameters (e.g. the search term). */
export function Pagination({
  page,
  pages,
  basePath,
  query = {},
}: {
  page: number;
  pages: number;
  basePath: string;
  query?: Record<string, string>;
}) {
  if (pages < 2) return null;
  const href = (target: number) => {
    const params = new URLSearchParams(query);
    if (target > 1) params.set("pagina", String(target));
    const search = params.toString();
    return search ? `${basePath}?${search}` : basePath;
  };
  const item = "grid h-11 min-w-11 place-items-center rounded-full px-4 text-[15px] font-semibold transition-colors";
  return (
    <nav aria-label="Paginação" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={cn(item, "bg-white text-mg-purple hover:bg-mg-line")}>
          Anterior
        </Link>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((target) => (
        <Link
          key={target}
          href={href(target)}
          aria-current={target === page ? "page" : undefined}
          className={cn(item, target === page ? "bg-mg-purple text-white" : "bg-white text-mg-ink hover:bg-mg-line")}
        >
          {target}
        </Link>
      ))}
      {page < pages && (
        <Link href={href(page + 1)} className={cn(item, "bg-white text-mg-purple hover:bg-mg-line")}>
          Próximo
        </Link>
      )}
    </nav>
  );
}

/** Centered hero shared by the category, search and materials listings. */
export function ListingHero({
  eyebrow,
  title,
  description,
  badge,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(110%_80%_at_50%_0%,#efe5ff_0%,#f8f4ff_55%,#ffffff_100%)] px-5 pt-[132px] pb-14 text-center tablet:pt-[168px] tablet:pb-20">
      <SparkleIcon className="mg-twinkle absolute top-[130px] left-[12%] hidden size-5 text-mg-purple/40 tablet:block" />
      <SparkleIcon className="mg-twinkle absolute top-[190px] right-[14%] hidden size-4 text-mg-mint tablet:block [animation-delay:1s]" />
      <div className="mx-auto flex max-w-[760px] flex-col items-center">
        {badge}
        <p className="mg-rise mt-5 text-[13px] font-semibold tracking-[0.14em] text-mg-purple uppercase">{eyebrow}</p>
        <h1 className="mg-rise mt-3 text-balance text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-mg-ink [animation-delay:100ms] tablet:text-[48px]">
          {title}
        </h1>
        {description && (
          <p className="mg-rise mt-4 max-w-[600px] text-pretty text-[16px] leading-[1.6] text-mg-muted [animation-delay:200ms] tablet:text-[18px]">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Lilac dotted band holding a listing grid. */
export function ListingBody({ children }: { children: ReactNode }) {
  return (
    <section className="bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.12)_1.2px,transparent_1.2px)] bg-[length:22px_22px] py-14 tablet:py-20">
      <div className="mx-auto max-w-[1160px] px-5">{children}</div>
    </section>
  );
}

/** Book-like cover drawn with the category colors, the material kind and Magis. */
export function MaterialCover({ material, className }: { material: FreeMaterial; className?: string }) {
  const visual = categoryVisual(material.category);
  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-[8px_22px_22px_8px] p-[9%] text-white shadow-[inset_6px_0_0_rgba(0,0,0,0.14),0_30px_60px_-28px_rgba(40,10,110,0.7)]",
        className,
      )}
      style={{ backgroundImage: visual.gradient }}
    >
      <span className="absolute inset-y-0 left-[5%] w-px bg-white/25" aria-hidden="true" />
      <Image src={logos.white.src} alt="" width={110} height={32} className="h-auto w-[42%]" />
      <p className="mt-[12%] text-[0.7em] font-bold tracking-[0.14em] text-white/80 uppercase">{material.kind}</p>
      <p className="mt-[4%] line-clamp-5 text-[1.05em] font-bold leading-[1.15]">{material.title}</p>
      <Magis pose={material.pose} sizes="200px" className="absolute -right-[6%] -bottom-[4%] w-[58%]" />
    </div>
  );
}

export function MaterialCard({ material }: { material: FreeMaterial }) {
  const visual = categoryVisual(material.category);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-mg-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-34px_rgba(60,20,140,0.55)]">
      <div className="grid place-items-center px-10 pt-10 pb-6" style={{ backgroundColor: visual.tint }}>
        <MaterialCover
          material={material}
          className="w-[62%] max-w-[210px] text-[15px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-2"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[13px] font-semibold text-mg-purple">[{material.kind}]</p>
        <h3 className="mt-2 line-clamp-3 text-[18px] font-bold leading-snug text-mg-ink">
          <Link href={materialHref(material.slug)} className="after:absolute after:inset-0 after:content-['']">
            {material.title}
          </Link>
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-mg-purple">
          Baixar grátis
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
