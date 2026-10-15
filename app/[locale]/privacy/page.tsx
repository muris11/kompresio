import type { Metadata } from "next";
import { Lock, ShieldCheck } from "lucide-react";

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
        ? "Kebijakan Privasi - Pemrosesan Browser yang Privat"
        : "Privacy Policy - Private Browser-First Processing",
    description: dictionary.privacy.description,
    path: "/privacy",
    locale,
    keywords: [
      "kompresio privacy policy",
      "browser image processing privacy",
      "private image compression",
      "safe exif removal",
    ],
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.privacy;
  const { sections, boundaries } = getContent(locale).privacy;

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/privacy",
          locale,
          title: copy.title,
          description: copy.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: copy.title, path: "/privacy" },
          ],
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <Badge variant="muted">
            <ShieldCheck className="size-3" />
            {copy.badge}
          </Badge>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end">
            <SectionHeading title={copy.title} description={copy.description} />
            <Card className="p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                <Lock className="size-5" />
              </span>
              <p className="mt-5 text-[12px] uppercase tracking-[0.12em] text-ash">
                {copy.promiseLabel}
              </p>
              <p className="mt-2 font-display text-subheading leading-[1.3] text-graphite">
                {copy.promise}
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

      <section className="border-t border-mist bg-linen">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow={copy.boundariesEyebrow}
            title={copy.boundariesTitle}
            description={copy.boundariesDescription}
          />
          <ul className="mt-10 divide-y divide-mist border-y border-mist">
            {boundaries.map((boundary) => (
              <li
                key={boundary}
                className="flex gap-3 py-5 text-body-sm leading-7 text-charcoal"
              >
                <ShieldCheck className="mt-1 size-4 shrink-0 text-success" />
                {boundary}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
