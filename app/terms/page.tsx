import type { Metadata } from "next";
import {
  AlertTriangle,
  BadgeCheck,
  FileCheck2,
  FileText,
  ImageDown,
  Scale,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for using Kompresio image compression, conversion, resize, metadata cleanup, analysis, batch export, and image-to-PDF tools.",
  path: "/terms",
});

const terms = [
  {
    title: "Use of the service",
    icon: FileCheck2,
    body:
      "Kompresio provides browser-based tools for image compression, conversion, resize, crop, metadata cleaning, analysis, batch export, and image-to-PDF. You are responsible for the files you process and the outputs you publish or upload elsewhere.",
  },
  {
    title: "File ownership",
    icon: ImageDown,
    body:
      "You retain rights to your original and exported files. Do not use Kompresio to process images you do not own or do not have permission to modify, convert, distribute, or publish.",
  },
  {
    title: "Output review",
    icon: AlertTriangle,
    body:
      "Compression, conversion, resize, crop, metadata cleaning, and PDF creation can change file size, format, dimensions, transparency, metadata, color, and visual quality. Review outputs before submitting them to forms, clients, stores, or public websites.",
  },
  {
    title: "Acceptable use",
    icon: ShieldAlert,
    body:
      "Do not use Kompresio for unlawful content, privacy violations, malware distribution, abuse automation, attempts to overload infrastructure, or processing files that violate another person's rights.",
  },
  {
    title: "No account required for MVP tools",
    icon: BadgeCheck,
    body:
      "The current MVP tools are designed to work without login. Future Pro, team, API, or cloud processing features may add authentication, billing, usage limits, additional retention terms, and separate service rules.",
  },
  {
    title: "Availability and changes",
    icon: Scale,
    body:
      "Kompresio may change supported formats, browser requirements, routes, processing behavior, file limits, pricing, and feature availability as the product evolves.",
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Badge variant="muted">
            <FileText className="size-3.5" />
            Legal
          </Badge>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <SectionHeading
              title="Terms of Service"
              description="These terms define practical expectations for using Kompresio's image utility workflows. They are written for the current browser-first MVP and leave room for future Pro or API features."
            />
            <Card className="p-6">
              <ShieldCheck className="size-8 text-blue-600" />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Plain-language summary
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">
                Use files you are allowed to process and check outputs before sharing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {terms.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {section.body}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
