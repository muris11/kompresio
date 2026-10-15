import { content as en } from "@/lib/content/content.en";
import { content as id } from "@/lib/content/content.id";
import type { Locale } from "@/lib/i18n/config";
import type { PageContent } from "@/types/content";

const contentSets: Record<Locale, PageContent> = { en, id };

export function getContent(locale: Locale): PageContent {
  return contentSets[locale];
}
