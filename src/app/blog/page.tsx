import { BlogHome } from "@/components/sites/magister/blog/blog-home";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";

export const metadata = blogMetadata({
  title: "Blog",
  description:
    "Conteúdos sobre formação de professores, inovação, infância, inclusão, skills e gestão educacional, além de materiais gratuitos.",
  path: "/blog",
});

export default function Page() {
  return <BlogHome />;
}
