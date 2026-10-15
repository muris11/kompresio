import { tools as enTools } from "@/lib/constants/tools.en";
import { tools as idTools } from "@/lib/constants/tools.id";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/types/tool";

const toolSets: Record<Locale, ToolDefinition[]> = {
  en: enTools,
  id: idTools,
};

const featuredSlugs = [
  "compress-image",
  "convert-to-webp",
  "resize-image",
  "metadata-cleaner",
  "batch-converter",
  "image-analyzer",
];

export function getTools(locale: Locale): ToolDefinition[] {
  return toolSets[locale];
}

export function getTool(
  locale: Locale,
  slug: string,
): ToolDefinition | undefined {
  return toolSets[locale].find((tool) => tool.slug === slug);
}

export function getFeaturedTools(locale: Locale): ToolDefinition[] {
  return toolSets[locale].filter((tool) => featuredSlugs.includes(tool.slug));
}

export function getRelatedTools(
  locale: Locale,
  tool: ToolDefinition,
): ToolDefinition[] {
  return tool.related
    .map((slug) => getTool(locale, slug))
    .filter((item): item is ToolDefinition => Boolean(item));
}
