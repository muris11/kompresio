import type { Metadata } from "next";
import { FileText, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolIcon } from "@/components/shared/tool-icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getContent } from "@/lib/content";
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
        ? "Ketentuan Layanan - Panduan & Kebijakan Penggunaan"
        : "Terms of Service - Usage Guidelines & Policies",
    description: dictionary.terms.description,
    path: "/terms",
    locale,
    keywords: [
      "kompresio terms of service",
      "image tools terms of use",
      "kompresio user agreement",
    ],
  });
}

export default async function TermsPage({ params }: PageProps) {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.terms;
  const sections = getContent(locale).terms.sections;

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/terms",
          locale,
          title: copy.title,
          description: copy.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: copy.title, path: "/terms" },
          ],
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <Badge variant="muted">
            <FileText className="size-3" />
            {copy.badge}
          </Badge>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end">
            <SectionHeading title={copy.title} description={copy.description} />
            <Card className="p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                <ShieldCheck className="size-5" />
              </span>
              <p className="mt-5 text-[12px] uppercase tracking-[0.12em] text-ash">
                {copy.summaryLabel}
              </p>
              <p className="mt-2 font-display text-subheading leading-[1.3] text-graphite">
                {copy.summary}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-mist bg-paper p-7 shadow-subtle"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                <ToolIcon name={section.icon} className="size-5" />
              </span>
              <h2 className="mt-6 font-display text-subheading leading-[1.25] text-graphite">
                {section.title}
              </h2>
              <p className="mt-3 text-body-sm leading-7 text-ash">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
