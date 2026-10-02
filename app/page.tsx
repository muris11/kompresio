import type { Metadata } from "next";
import Link from "next/link";

import { BlogHighlights } from "@/components/marketing/home-blog-highlights";
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
      <FormatGuide />
      <WhyKompresio />
      <Testimonials />
      <BlogHighlights />
      <HomepageCta />
      <StickyMobileCta />
    </>
  );
}

function StickyMobileCta() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-mist bg-parchment/95 p-3 backdrop-blur sm:hidden">
      <Link
        href="/compress-image"
        className="flex min-h-12 w-full items-center justify-center rounded-lg border border-signal-blue-blue bg-transparent text-[15px] font-medium text-signal-blue-blue transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96]"
      >
        Start optimizing
      </Link>
    </div>
  );
}
