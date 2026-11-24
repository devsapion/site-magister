import { Clock } from "lucide-react";
import { withBasePathInHtml } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import { formatPostDate, getRelatedPosts, type BlogPost } from "@/lib/magister/blog";
import { links } from "../content";
import { SiteShell } from "../home/site-shell";
import { buttonStyles, ButtonArrow, Magis, SparkleIcon } from "../home/ui";
import { AuthorAvatar, BlogHeader, CategoryPill, PostCard, PostCover } from "./blog-ui";
import { NewsletterSection } from "./newsletter";
import { ShareButtons } from "./share-buttons";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://magister.sapion.com.br";

function SidebarCta() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(90%_110%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(140deg,#8443ea_0%,#9b5cf6_55%,#b07cff_100%)] p-7 text-white">
      <SparkleIcon className="mg-twinkle absolute top-6 right-6 size-5 text-white/70" />
      <p className="text-[13px] font-semibold text-mg-mint">Sapion Magister</p>
      <p className="mt-2 text-[22px] font-bold leading-tight">Formação continuada que transforma a sala de aula</p>
      <p className="mt-3 text-[14px] leading-[1.55] text-white/85">
        Trilhas personalizadas com IA, gamificação e certificado válido em todo o Brasil.
      </p>
      <a href={links.signUp} className={cn(buttonStyles.base, buttonStyles.white, "mt-6 w-full px-5 py-3 text-[15px]")}>
        Teste por 14 dias grátis
        <ButtonArrow />
      </a>
      <Magis pose="piscando" sizes="140px" className="mg-bob -mb-10 ml-auto block w-[130px]" />
    </div>
  );
}

export async function PostArticle({ post }: { post: BlogPost }) {
  const related = await getRelatedPosts(post, 4);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Sapion Magister" },
    image: post.cover ? `${SITE_URL}${post.cover.src}` : undefined,
    mainEntityOfPage: url,
  };

  return (
    <SiteShell header={<BlogHeader />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="bg-[radial-gradient(110%_75%_at_70%_0%,#efe5ff_0%,#f8f4ff_50%,#ffffff_100%)] px-5 pt-[120px] pb-10 tablet:pt-[156px] tablet:pb-14">
          <div className="mx-auto grid max-w-[1160px] items-center gap-8 desktop:grid-cols-[1.05fr_1fr] desktop:gap-14">
            <PostCover
              post={post}
              sizes="(min-width: 1025px) 580px, 100vw"
              eager
              className="mg-rise aspect-[16/10] rounded-[30px] shadow-[0_30px_60px_-40px_rgba(60,20,140,0.6)]"
            />
            <div className="mg-rise [animation-delay:100ms]">
              <CategoryPill slug={post.category} />
              <h1 className="mt-4 text-balance text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-mg-ink tablet:text-[42px]">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-mg-line pt-5 text-[14px] text-mg-muted">
                <span className="flex items-center gap-2.5">
                  <AuthorAvatar name={post.author.name} className="size-9 text-[12px]" />
                  <span className="font-semibold text-mg-ink">{post.author.name}</span>
                </span>
                <time dateTime={post.date.slice(0, 10)}>{formatPostDate(post.date)}</time>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {post.readingMinutes} min de leitura
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-12 desktop:grid-cols-[minmax(0,1fr)_320px] desktop:gap-16 desktop:py-16">
          <div className="min-w-0">
            <div className="mg-prose" dangerouslySetInnerHTML={{ __html: withBasePathInHtml(post.html) }} />

            <div className="mt-12 border-t border-mg-line pt-8">
              <ShareButtons url={url} title={post.title} />
            </div>
            <div className="mt-8 flex flex-col gap-5 rounded-[28px] border border-mg-line bg-mg-lilac p-6 tablet:flex-row tablet:items-center tablet:p-8">
              <AuthorAvatar name={post.author.name} className="size-16 text-[20px]" />
              <div>
                <p className="text-[13px] font-semibold tracking-[0.1em] text-mg-purple uppercase">Sobre o autor</p>
                <p className="mt-1 text-[19px] font-bold text-mg-ink">{post.author.name}</p>
                <p className="mt-1 text-[15px] leading-[1.6] text-mg-muted">
                  {post.author.bio || "Equipe de conteúdo da Sapion Magister, a maior plataforma de formação de professores do Brasil."}
                </p>
              </div>
            </div>
          </div>
          <aside className="hidden desktop:block">
            <div className="sticky top-28">
              <SidebarCta />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-mg-lilac bg-[radial-gradient(rgba(132,67,234,0.12)_1.2px,transparent_1.2px)] bg-[length:22px_22px] px-5 py-16 tablet:py-20">
          <div className="mx-auto max-w-[1160px]">
            <h2 className="text-center text-[28px] font-bold tracking-[-0.01em] text-mg-ink tablet:text-[34px]" data-animate="fadeUp">
              Você também pode gostar
            </h2>
            <ul className="mt-10 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
              {related.map((item, i) => (
                <li key={item.slug} data-animate="fadeUp" data-delay={i * 80}>
                  <PostCard post={item} showCategory />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <NewsletterSection />
    </SiteShell>
  );
}
