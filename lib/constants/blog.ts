import { blogPosts as enPosts } from "@/lib/constants/blog.en";
import { blogPosts as idPosts } from "@/lib/constants/blog.id";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/types/blog";

const postSets: Record<Locale, BlogPost[]> = {
  en: enPosts,
  id: idPosts,
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return postSets[locale];
}

export function getBlogPost(
  locale: Locale,
  slug: string,
): BlogPost | undefined {
  return postSets[locale].find((post) => post.slug === slug);
}
