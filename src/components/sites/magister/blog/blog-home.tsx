import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogCategories, getPosts, getPostsByCategory, type BlogCategory, type BlogPost } from "@/lib/magister/blog";
import { getMaterials } from "@/lib/magister/materials";
import { homeLinks } from "../home/home-content";
import { SiteShell } from "../home/site-shell";
import { BlogHeader, CategoryPill, categoryHref, MaterialCard, PostCard, PostCover, postHref } from "./blog-ui";
import { NewsletterSection } from "./newsletter";

function SectionTitle({ title, href, linkLabel = "Ver tudo" }: { title: string; href: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-mg-ink tablet:text-[30px]">{title}</h2>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-[16px] font-semibold text-mg-purple transition-colors hover:bg-mg-lilac"
      >
        {linkLabel}
        <ChevronRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/** The three latest posts: one large on the left, two compact ones stacked on the right. */
function FeaturedPosts({ posts }: { posts: BlogPost[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <section className="bg-[radial-gradient(110%_70%_at_50%_0%,#efe5ff_0%,#f8f4ff_45%,#ffffff_100%)] px-5 pt-[118px] pb-12 tablet:pt-[140px] tablet:pb-16">
      <h1 className="sr-only">Blog Sapion Magister</h1>
      <div className="mx-auto grid max-w-[1160px] gap-8 desktop:grid-cols-[1.15fr_1fr] desktop:gap-12">
        <article className="mg-rise group relative flex flex-col">
          <PostCover
            post={lead}
            sizes="(min-width: 1025px) 600px, 100vw"
            eager
            className="h-[220px] rounded-[28px] shadow-[0_30px_60px_-40px_rgba(60,20,140,0.6)] tablet:h-[350px]"
          />
          <CategoryPill slug={lead.category} className="mt-6 self-start" />
          <h2 className="mt-3 text-balance text-[24px] font-bold leading-[1.2] tracking-[-0.01em] text-mg-ink tablet:text-[28px]">
            <Link href={postHref(lead.slug)} className="after:absolute after:inset-0 after:content-['']">
              {lead.title}
            </Link>
          </h2>
          <p className="mt-3 line-clamp-2 text-[16px] leading-[1.6] text-mg-muted">{lead.excerpt}</p>
        </article>

        <div className="flex flex-col gap-8">
          {rest.map((post, i) => (
            <article
              key={post.slug}
              className={cn(
                "mg-rise group relative grid grid-cols-[110px_1fr] items-center gap-5 tablet:grid-cols-[190px_1fr]",
                i === 0 ? "[animation-delay:100ms]" : "[animation-delay:200ms]",
              )}
            >
              <PostCover
                post={post}
                sizes="190px"
                className="aspect-square rounded-[24px] shadow-[0_20px_40px_-30px_rgba(60,20,140,0.6)]"
              />
              <div>
                <CategoryPill slug={post.category} />
                <h3 className="mt-3 line-clamp-3 text-[17px] font-bold leading-snug text-mg-ink tablet:text-[19px]">
                  <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:content-['']">
                    {post.title}
                  </Link>
                </h3>
                <div className="mt-2 hidden tablet:block">
                  <p className="line-clamp-3 text-[15px] leading-[1.55] text-mg-muted">{post.excerpt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One row per learning track with its four latest posts, like the reference blog. */
function CategoryRow({ category, posts }: { category: BlogCategory; posts: BlogPost[] }) {
  return (
    <section className="px-5 py-8 tablet:py-10">
      <div className="mx-auto max-w-[1160px]">
        <SectionTitle title={category.name} href={categoryHref(category.slug)} />
        <ul className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] desktop:mx-0 desktop:grid desktop:grid-cols-4 desktop:overflow-visible desktop:px-0 desktop:pb-0">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="w-[78%] max-w-[300px] shrink-0 snap-center desktop:w-auto desktop:max-w-none"
              data-animate="fadeUp"
              data-delay={i * 80}
            >
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function BlogHome() {
  const [posts, materials] = await Promise.all([getPosts(), getMaterials()]);
  const rows = await Promise.all(
    blogCategories
      .filter((category) => category.trilha)
      .map(async (category) => ({ category, posts: (await getPostsByCategory(category.slug)).slice(0, 4) })),
  );

  return (
    <SiteShell header={<BlogHeader />}>
      <FeaturedPosts posts={posts.slice(0, 3)} />
      <div className="py-4 tablet:py-8">
        {rows
          .filter((row) => row.posts.length > 0)
          .map((row) => (
            <CategoryRow key={row.category.slug} category={row.category} posts={row.posts} />
          ))}
      </div>
      <section className="bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.12)_1.2px,transparent_1.2px)] bg-[length:22px_22px] px-5 py-16 tablet:py-20">
        <div className="mx-auto max-w-[1160px]">
          <SectionTitle title="Materiais gratuitos" href={homeLinks.materiais} linkLabel="Ver todos" />
          <ul className="mt-8 grid gap-5 tablet:grid-cols-3">
            {materials.slice(0, 3).map((material, i) => (
              <li key={material.slug} data-animate="fadeUp" data-delay={i * 100}>
                <MaterialCard material={material} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NewsletterSection />
    </SiteShell>
  );
}
