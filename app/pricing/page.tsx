import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Code2, Crown, Gauge } from "lucide-react";

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

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Start free with private browser processing"
            description="Kompresio's current MVP tools are free, local-first, and do not require login. Future paid plans can support heavier production, team, and API workflows."
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={
                  plan.featured ? "border-signal-blue-blue/40 p-7" : "p-7"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="size-5 text-charcoal" />
                  <Badge variant={plan.featured ? "default" : "muted"}>
                    {plan.badge}
                  </Badge>
                </div>
                <h2 className="mt-7 font-display text-heading-sm text-graphite">
                  {plan.name}
                </h2>
                <div className="mt-3 flex items-end gap-2">
                  <p className="font-mono text-3xl text-graphite">
                    {plan.price}
                  </p>
                  <p className="pb-1 text-[13px] text-ash">{plan.period}</p>
                </div>
                <p className="mt-4 text-body-sm leading-7 text-ash">
                  {plan.description}
                </p>
                <ul className="mt-7 space-y-3 border-t border-mist pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-[13px] leading-6 text-charcoal"
                    >
                      <Check className="mt-1 size-3.5 shrink-0 text-signal-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full"
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
    </>
  );
}
