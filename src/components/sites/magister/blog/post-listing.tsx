import type { ReactNode } from "react";
import { SiteShell } from "../home/site-shell";
import { BlogHeader } from "./blog-ui";
import { NewsletterSection } from "./newsletter";

/** Frame of the blog listings (category and search): blog header, the listing, newsletter. */
export function ListingShell({ children }: { children: ReactNode }) {
  return (
    <SiteShell header={<BlogHeader />}>
      {children}
      <NewsletterSection />
    </SiteShell>
  );
}
