import type { Metadata } from "next";

import { BlogHighlights } from "@/components/marketing/home-blog-highlights";
import { FormatComparison } from "@/components/marketing/home-format-comparison";
import { HomeHero } from "@/components/marketing/home-hero";
import {
  BeforeAfterDemo,
  HomepageCta,
  HowItWorks,
  PopularTools,
  SupportedFormats,
  UseCases,
  WhyKompresio,
} from "@/components/marketing/home-sections";
import { StatsSection } from "@/components/marketing/home-stats";
import { Testimonials } from "@/components/marketing/home-testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata, websiteSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Kompresio - Compress, Convert, and Optimize Images Online",
  description:
    "Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <HomeHero />
      <PopularTools />
      <StatsSection />
      <BeforeAfterDemo />
      <HowItWorks />
      <SupportedFormats />
      <FormatComparison />
      <WhyKompresio />
      <UseCases />
      <Testimonials />
      <BlogHighlights />
      <HomepageCta />
    </>
  );
}
