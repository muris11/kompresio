import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { getTools } from "@/lib/constants/tools";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return createPageMetadata({
    title:
      locale === "id"
        ? "Direktori Alat Gambar - Pengompres & Konverter Gambar Online"
        : "Image Tools Directory - Online Image Optimizer & Converter",
    description: dictionary.toolsPage.description,
    path: "/tools",
    locale,
    keywords: [
      "image tools directory",
      "online image compressor",
      "webp converter",
      "avif converter",
      "resize image online",
      "clean image metadata",
      "batch image converter",
    ],
  });
}

export default async function ToolsPage({ params }: PageProps) {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const tools = getTools(locale);

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/tools",
          locale,
          title: dictionary.toolsPage.title,
          description: dictionary.toolsPage.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: dictionary.common.tools, path: "/tools" },
          ],
        })}
      />
      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={dictionary.toolsPage.eyebrow}
            title={dictionary.toolsPage.title}
            description={dictionary.toolsPage.description}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {dictionary.blog.categories.map((category) => (
              <Badge key={category} variant="muted">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
