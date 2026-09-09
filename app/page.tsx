import type { Metadata } from "next";
import Link from "next/link";

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
      <StatsSection />
      <PopularTools />
      <BeforeAfterDemo />
      <HowItWorks />
      <SupportedFormats />
      <FormatComparison />
      <WhyKompresio />
      <UseCases />
      <Testimonials />
      <BlogHighlights />
      <HomepageCta />
      <StickyMobileCta />
    </>
  );
}

function StickyMobileCta() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <Link
        href="/compress-image"
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white"
      >
        Start optimizing — free
      </Link>
    </div>
  );
}
