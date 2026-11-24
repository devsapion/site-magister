import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { ListingShell } from "@/components/sites/magister/blog/post-listing";
import { SearchView } from "@/components/sites/magister/blog/search-view";

export const metadata = blogMetadata({
  title: "Buscar no blog",
  description: "Encontre conteúdos sobre formação de professores no blog da Sapion Magister.",
  path: "/blog/busca",
  index: false,
});

export default function Page() {
  return (
    <ListingShell>
      <SearchView />
    </ListingShell>
  );
}
