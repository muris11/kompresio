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
  UsersRound,
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

      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Badge variant="success">
            <BadgeCheck className="size-3.5" />
            Company
          </Badge>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-4xl break-words text-4xl font-extrabold leading-tight text-slate-950 sm:text-6xl">
                Kompresio is a fast, private image toolkit for real upload workflows.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Kompresio helps people compress, convert, resize, crop, clean metadata,
                analyze, batch export, and create PDFs from images without turning a
                simple task into a complicated design app.
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
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <UsersRound className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950">Built by</p>
                  <a
                    href={siteConfig.developer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-extrabold text-blue-600"
                  >
                    {siteConfig.developer.label}
                  </a>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Product ownership, maintenance, and attribution stay with rifqysaputra.dev.
              </p>
            </Card>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-3 font-mono text-3xl font-bold text-slate-950">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Operating principles"
          title="Built around speed, privacy, and practical output"
          description="The product is shaped for repeat work: upload quickly, choose a real setting, preview output, and download files that are ready for websites, documents, marketplaces, or sharing."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Company resources"
            title="Clear product, legal, and pricing pages"
            description="These pages document how Kompresio should be used, what data boundaries matter, and what the free MVP includes."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} href={resource.href} className="group block">
                  <Card className="h-full p-6 transition hover:-translate-y-1 hover:border-blue-200">
                    <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-slate-950">
                      {resource.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {resource.description}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                      Open page
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" />
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
