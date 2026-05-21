import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/lib/constants/tools";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Image Tools Directory",
  description:
    "Explore Kompresio image tools for compression, WebP conversion, AVIF conversion, resize, metadata cleaning, batch processing, and image analysis.",
  path: "/tools",
});

const categories = ["Compression", "Conversion", "Resize", "Privacy", "Batch", "Utility"];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Tools"
            title="All Kompresio image tools"
            description="Compress, convert, resize, clean metadata, analyze, and batch export images with browser-first workflows."
          />
          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="muted">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
