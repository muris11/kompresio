import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ToolPage } from "@/components/tools/tool-page";
import { getTool, getTools } from "@/lib/constants/tools";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createToolMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

type ToolRouteProps = {
  params: Promise<{
    locale: string;
    toolSlug: string;
  }>;
};

export function generateStaticParams() {
  return getTools("en").map((tool) => ({
    toolSlug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolRouteProps): Promise<Metadata> {
  const { locale: rawLocale, toolSlug } = await params;
  const locale = coerceLocale(rawLocale);
  const tool = getTool(locale, toolSlug);

  if (!tool) {
    return {};
  }

  return createToolMetadata(tool, locale);
}

export default async function DynamicToolPage({ params }: ToolRouteProps) {
  const { locale: rawLocale, toolSlug } = await params;
  const locale = coerceLocale(rawLocale);
  const tool = getTool(locale, toolSlug);

  if (!tool) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: `/${tool.slug}`,
          locale,
          title: tool.title,
          description: tool.description,
          tool,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: dictionary.common.tools, path: "/tools" },
            { name: tool.name, path: `/${tool.slug}` },
          ],
          faqs: tool.faqs,
        })}
      />
      <ToolPage tool={tool} locale={locale} />
    </>
  );
}
