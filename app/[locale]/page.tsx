import type { Metadata } from "next";

import { BlogHighlights } from "@/components/marketing/home-blog-highlights";
import { HomeFaq } from "@/components/marketing/home-faq";
import { HomeHero } from "@/components/marketing/home-hero";
import {
  BeforeAfterDemo,
  FormatGuide,
  HomepageCta,
  HowItWorks,
  PopularTools,
  WhyKompresio,
} from "@/components/marketing/home-sections";
import { StatsSection } from "@/components/marketing/home-stats";
import { Testimonials } from "@/components/marketing/home-testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { getContent } from "@/lib/content";
import { coerceLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = coerceLocale((await params).locale);
  const copy = getDictionary(locale).home.hero;

  return createPageMetadata({
    title:
      locale === "id"
        ? "Kompresio - Kompres, Konversi, dan Optimalkan Gambar Online"
        : "Kompresio - Compress, Convert, and Optimize Images Online",
    description: copy.description,
    path: "/",
    locale,
    keywords:
      locale === "id"
        ? [
            "kompres gambar online",
            "kompres foto online gratis",
            "konversi webp",
            "ubah ukuran gambar",
            "hapus metadata foto",
          ]
        : [
            "image compressor",
            "compress image online",
            "convert to webp online",
            "resize image without losing quality",
            "clean image metadata",
          ],
  });
}

export default async function Home({ params }: PageProps) {
  const locale: Locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/",
          locale,
          title: dictionary.home.hero.title,
          description: dictionary.home.hero.description,
          breadcrumbs: [{ name: dictionary.common.home, path: "/" }],
          faqs: content.home.faqs,
        })}
      />
      <HomeHero locale={locale} />
      <StatsSection locale={locale} />
      <PopularTools locale={locale} />
      <BeforeAfterDemo locale={locale} />
      <HowItWorks locale={locale} />
      <FormatGuide locale={locale} />
      <WhyKompresio locale={locale} />
      <Testimonials locale={locale} />
      <HomeFaq locale={locale} />
      <BlogHighlights locale={locale} />
      <HomepageCta locale={locale} />
    </>
  );
}
