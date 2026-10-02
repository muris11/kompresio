import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/lib/constants/tools";
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Image Tools Directory - Online Image Optimizer & Converter",
  description:
    "Explore Kompresio image tools for compression, WebP conversion, AVIF conversion, resize, metadata cleaning, batch processing, and image analysis.",
  path: "/tools",
  keywords: [
    "image tools directory",
    "online image compressor",
    "webp converter",
    "avif converter",
    "resize image online",
    "clean image metadata",
    "batch image converter",
    "free image optimization tools",
  ],
});

const categories = ["Compression", "Conversion", "Resize", "Privacy", "Batch", "Utility"];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/tools",
          title: "Image Tools Directory - Online Image Optimizer & Converter",
          description:
            "Explore Kompresio image tools for compression, WebP conversion, AVIF conversion, resize, metadata cleaning, batch processing, and image analysis.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ],
        })}
      />
      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pt-28 pb-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="Tools"
            title="All Kompresio image tools"
            description="Compress, convert, resize, clean metadata, analyze, and batch export images with browser-first workflows."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="muted">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
