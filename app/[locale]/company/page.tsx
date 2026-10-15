import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolIcon } from "@/components/shared/tool-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site";
import { getContent } from "@/lib/content";
import { coerceLocale, localePath } from "@/lib/i18n/config";
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
        ? "Tentang Kami - Toolkit Optimasi Gambar Privat"
        : "About Us - Private Image Optimization Toolkit",
    description: dictionary.company.description,
    path: "/company",
    locale,
    keywords: [
      "about kompresio",
      "kompresio company",
      "private image compression toolkit",
      "browser based image editor",
    ],
  });
}

export default async function CompanyPage({ params }: PageProps) {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.company;
  const { stats, principles, resources } = getContent(locale).company;
  const href = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/company",
          locale,
          title: copy.title,
          description: copy.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: copy.badge, path: "/company" },
          ],
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <Badge variant="muted">{copy.badge}</Badge>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-3xl break-words font-display text-heading-sm leading-[1.1] text-graphite sm:text-heading-lg">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-charcoal">
                {copy.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={href("/tools")}>
                    {copy.exploreTools}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href={href("/blog")}>{copy.readGuides}</Link>
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <p className="text-[12px] uppercase tracking-[0.12em] text-ash">
                {copy.builtBy}
              </p>
              <a
                href={siteConfig.developer.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-display text-subheading text-graphite transition-colors hover:text-cerulean"
              >
                {siteConfig.developer.label}
              </a>
              <p className="mt-4 text-[13px] leading-6 text-ash">
                {copy.builtByNote}
              </p>
            </Card>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-mist pt-8 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-[12px] uppercase tracking-[0.1em] text-ash">
                  {item.label}
                </p>
                <p className="mt-2 font-mono text-2xl text-graphite">
                  {item.value}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-ash">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow={copy.principlesEyebrow}
          title={copy.principlesTitle}
          description={copy.principlesDescription}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-mist bg-paper p-7 shadow-subtle"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                <ToolIcon name={item.icon} className="size-5" />
              </span>
              <h2 className="mt-6 font-display text-subheading leading-[1.25] text-graphite">
                {item.title}
              </h2>
              <p className="mt-3 text-body-sm leading-7 text-ash">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-mist bg-linen">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow={copy.resourcesEyebrow}
            title={copy.resourcesTitle}
            description={copy.resourcesDescription}
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={href(resource.href)}
                className="group block"
              >
                <Card interactive className="h-full p-7">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                    <ToolIcon name={resource.icon} className="size-5" />
                  </span>
                  <h2 className="mt-6 font-display text-subheading text-graphite">
                    {resource.title}
                  </h2>
                  <p className="mt-3 text-body-sm leading-7 text-ash">
                    {resource.description}
                  </p>
                  <p className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-charcoal">
                    {dictionary.common.openPage}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
