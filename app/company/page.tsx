import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  FileText,
  Globe2,
  Lock,
  Rocket,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site";
import { breadcrumbSchema, createPageMetadata, organizationSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Company",
  description:
    "Learn about Kompresio, a browser-first image optimization toolkit built for private compression, conversion, resize, metadata cleaning, analysis, and document workflows.",
  path: "/company",
});

const stats = [
  { label: "Core tools", value: "10+", description: "Compression, conversion, resize, crop, metadata, analyzer, PDF." },
  { label: "Processing model", value: "Local", description: "MVP image work runs in the browser first." },
  { label: "Target users", value: "Global", description: "Built for students, creators, sellers, and developers." },
  { label: "Attribution", value: "Clear", description: "Developed and maintained by rifqysaputra.dev." },
];

const principles = [
  {
    title: "Private by default",
    description:
      "Core files stay on the user's device for compression, conversion, resize, metadata cleanup, analysis, and PDF creation.",
    icon: ShieldCheck,
  },
  {
    title: "Tool-first product",
    description:
      "Users get the working utility immediately, then supporting content explains settings, formats, and best practices.",
    icon: Rocket,
  },
  {
    title: "Practical for Indonesia and global users",
    description:
      "The product is designed for common upload workflows: documents, forms, marketplace listings, websites, and social posts.",
    icon: Globe2,
  },
  {
    title: "Developer-grade implementation",
    description:
      "Routes, metadata, sitemap, Open Graph images, JSON-LD, tests, and build checks are part of the product surface.",
    icon: Code2,
  },
];

const resources = [
  {
    title: "Privacy Policy",
    description: "How Kompresio handles local processing, metadata, analytics boundaries, and future upload workflows.",
    href: "/privacy",
    icon: Lock,
  },
  {
    title: "Terms of Service",
    description: "Expected use, file ownership, output responsibility, availability, and prohibited behavior.",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Pricing",
    description: "Free MVP tools now, with a clear roadmap for optional Pro, API, and team workflows later.",
    href: "/pricing",
    icon: BadgeCheck,
  },
];

export default function CompanyPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Kompresio",
            description:
              "Kompresio is a browser-first image optimization toolkit for compression, conversion, resize, metadata cleaning, analysis, and document workflows.",
            mainEntity: organizationSchema(),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Company", path: "/company" },
          ]),
        ]}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Badge variant="muted">Company</Badge>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-3xl break-words font-display text-heading-sm leading-[1.1] text-graphite sm:text-heading-lg">
                A fast, private image toolkit for real upload workflows.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-charcoal">
                Kompresio helps people compress, convert, resize, crop, clean
                metadata, analyze, batch export, and create PDFs from images —
                without turning a simple task into a complicated design app.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/tools">
                    Explore tools
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/blog">Read guides</Link>
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <p className="text-[12px] uppercase tracking-[0.12em] text-ash">
                Built by
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
                Product ownership, maintenance, and attribution stay with
                rifqysaputra.dev.
              </p>
            </Card>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-px border-t border-mist pt-px lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="border-t border-mist pt-5 pr-6">
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

      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Operating principles"
          title="Built around speed, privacy, and practical output"
          description="The product is shaped for repeat work: upload quickly, choose a real setting, preview output, and download files that are ready for websites, documents, marketplaces, or sharing."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-mist bg-mist sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-paper p-7">
                <Icon className="size-5 text-charcoal" />
                <h2 className="mt-8 font-display text-subheading leading-[1.25] text-graphite">
                  {item.title}
                </h2>
                <p className="mt-3 text-body-sm leading-7 text-ash">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-mist bg-linen">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Company resources"
            title="Clear product, legal, and pricing pages"
            description="These pages document how Kompresio should be used, what data boundaries matter, and what the free MVP includes."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} href={resource.href} className="group block">
                  <Card className="h-full p-7 transition-colors hover:border-twilight/25">
                    <Icon className="size-5 text-charcoal" />
                    <h2 className="mt-8 font-display text-subheading text-graphite">
                      {resource.title}
                    </h2>
                    <p className="mt-3 text-body-sm leading-7 text-ash">
                      {resource.description}
                    </p>
                    <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-charcoal">
                      Open page
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
