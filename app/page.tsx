import type { Metadata } from "next";

import { BlogHighlights } from "@/components/marketing/home-blog-highlights";
import { HOME_FAQS, HomeFaq } from "@/components/marketing/home-faq";
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
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Kompresio - Compress, Convert, and Optimize Images Online",
  description:
    "Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.",
  path: "/",
  keywords: [
    "Kompresio",
    "Kompresio app",
    "Kompresio online",
    "Kompresio image compressor",
    "Kompresio webp converter",
    "kompres foto kompresio",
    "kompres gambar online",
    "kompresio.center.biz.id",
    "image compressor",
    "compress image online",
    "free image compression",
    "convert to webp online",
    "convert to avif",
    "resize image without losing quality",
    "clean image metadata",
    "bulk image optimizer",
    "browser based image editor",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/",
          title: "Kompresio - Compress, Convert, and Optimize Images Online",
          description:
            "Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.",
          breadcrumbs: [{ name: "Home", path: "/" }],
          faqs: HOME_FAQS,
        })}
      />
      <HomeHero />
      <StatsSection />
      <PopularTools />
      <BeforeAfterDemo />
      <HowItWorks />
      <FormatGuide />
      <WhyKompresio />
      <Testimonials />
      <HomeFaq />
      <BlogHighlights />
      <HomepageCta />
    </>
  );
}
