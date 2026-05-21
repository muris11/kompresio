import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Code2,
  Crown,
  FileArchive,
  Gauge,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { breadcrumbSchema, createPageMetadata, faqSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Kompresio pricing overview for free browser-based image tools and future Pro, team, API, and cloud processing workflows.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "no login required",
    description: "Core browser-based image optimization for everyday files.",
    icon: Gauge,
    badge: "Available now",
    featured: true,
    href: "/compress-image",
    cta: "Start optimizing",
    features: [
      "Compress JPG, PNG, WebP, AVIF, GIF, SVG where browser support allows",
      "Convert to WebP and AVIF",
      "Resize by pixel or preset",
      "Crop with aspect ratio presets",
      "Metadata cleaner and image analyzer",
      "Image to PDF with A4 or Letter output",
      "Batch queue up to 50 files",
      "Single download and ZIP export",
    ],
  },
  {
    name: "Pro",
    price: "Later",
    period: "roadmap",
    description: "Advanced workflows for heavier batches and saved production settings.",
    icon: Crown,
    badge: "Roadmap",
    featured: false,
    href: "/blog/how-to-prepare-images-for-nextjs",
    cta: "Read roadmap guide",
    features: [
      "Larger batch limits",
      "Saved presets for social, marketplace, and web teams",
      "Advanced AVIF and HEIC batch workflows",
      "Processing history and reusable naming rules",
      "Priority browser and cloud fallback processing",
      "Team-ready export manifests",
    ],
  },
  {
    name: "Developer API",
    price: "Later",
    period: "planned",
    description: "Optional server-side processing for apps that need repeatable automation.",
    icon: Code2,
    badge: "Planned",
    featured: false,
    href: "/company",
    cta: "View company notes",
    features: [
      "Sharp-backed server processing",
      "Direct object storage upload patterns",
      "Webhook-ready processing jobs",
      "Rate limits and API keys",
      "Structured JSON result manifests",
      "Privacy and retention controls for uploads",
    ],
  },
];

const faqs = [
  {
    question: "Is Kompresio free?",
    answer:
      "The MVP browser-based tools are free and do not require login. Pro, API, or cloud workflows can be added later with separate limits and terms.",
  },
  {
    question: "Do free tools upload images to a server?",
    answer:
      "Core compression, conversion, resize, crop, metadata cleaning, analysis, PDF creation, preview, and ZIP export are designed to run locally in the browser.",
  },
  {
    question: "Why mention Pro if it is not available yet?",
    answer:
      "The page documents the product direction clearly so future advanced features have an obvious place without misleading users about the current MVP.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Badge variant="success">
            <BadgeCheck className="size-3.5" />
            Pricing
          </Badge>
          <SectionHeading
            align="center"
            title="Start free with private browser processing"
            description="Kompresio's current MVP tools are free, local-first, and do not require login. Future paid plans can support heavier production, team, and API workflows."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={plan.featured ? "border-blue-300 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.14)]" : "p-6"}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="size-6" />
                  </span>
                  <Badge variant={plan.featured ? "default" : "muted"}>{plan.badge}</Badge>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-slate-950">{plan.name}</h2>
                <div className="mt-3 flex items-end gap-2">
                  <p className="font-mono text-4xl font-bold text-slate-950">{plan.price}</p>
                  <p className="pb-1 text-sm font-semibold text-slate-500">{plan.period}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-7 w-full"
                  variant={plan.featured ? "default" : "secondary"}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-20">
          {[
            {
              title: "No sign-up for MVP tools",
              description: "Open a route, add images, process locally, and download results.",
              icon: BadgeCheck,
            },
            {
              title: "Batch and ZIP included",
              description: "Free workflows include queue processing and structured ZIP manifests.",
              icon: FileArchive,
            },
            {
              title: "Privacy stays central",
              description: "Advanced plans should keep explicit consent and retention controls.",
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="p-6">
                <Icon className="size-7 text-blue-600" />
                <h2 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
