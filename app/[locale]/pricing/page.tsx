import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolIcon } from "@/components/shared/tool-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
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
        ? "Harga - Alat Gambar Browser Gratis & Rencana Mendatang"
        : "Pricing - Free Browser Image Tools & Future Plans",
    description: dictionary.pricing.description,
    path: "/pricing",
    locale,
    keywords: [
      "kompresio pricing",
      "free image compressor",
      "free webp converter",
      "free online image optimizer",
    ],
  });
}

export default async function PricingPage({ params }: PageProps) {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pricing;
  const { plans, faqs } = getContent(locale).pricing;
  const href = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/pricing",
          locale,
          title: copy.title,
          description: copy.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: copy.eyebrow, path: "/pricing" },
          ],
          faqs,
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.featured
                  ? "relative border-cerulean/40 p-7 shadow-raised"
                  : "p-7"
              }
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={
                    plan.featured
                      ? "grid size-10 place-items-center rounded-xl bg-cerulean text-white"
                      : "grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean"
                  }
                >
                  <ToolIcon name={plan.icon} className="size-5" />
                </span>
                <Badge variant={plan.featured ? "default" : "muted"}>
                  {plan.badge}
                </Badge>
              </div>
              <h2 className="mt-7 font-display text-heading-sm text-graphite">
                {plan.name}
              </h2>
              <div className="mt-3 flex items-end gap-2">
                <p className="font-mono text-3xl text-graphite">{plan.price}</p>
                <p className="pb-1 text-[13px] text-ash">{plan.period}</p>
              </div>
              <p className="mt-4 text-body-sm leading-7 text-ash">
                {plan.description}
              </p>
              <ul className="mt-7 space-y-3 border-t border-mist pt-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-[13px] leading-6 text-charcoal"
                  >
                    <Check className="mt-1 size-3.5 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8 w-full"
                variant={plan.featured ? "default" : "secondary"}
              >
                <Link href={href(plan.href)}>
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-mist bg-linen">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading align="center" title={dictionary.home.faq.title} />
          <Accordion items={faqs} className="mt-10" />
        </div>
      </section>
    </>
  );
}
