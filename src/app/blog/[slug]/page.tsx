import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { PostArticle } from "@/components/sites/magister/blog/post-article";
import { getPost, getPosts } from "@/lib/magister/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return blogMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover?.src,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return <PostArticle key={post.slug} post={post} />;
}
