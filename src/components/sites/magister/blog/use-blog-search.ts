"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

/**
 * Submit handler of the blog search boxes. Opening the results through the router adds the base
 * path and trailing slash of the static build, which a plain GET form would leave out.
 */
export function useBlogSearch() {
  const router = useRouter();
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    router.push(`/blog/busca?${new URLSearchParams({ q })}`);
  };
}
