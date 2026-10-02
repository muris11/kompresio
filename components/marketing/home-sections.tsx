import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileArchive,
  Gauge,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  XCircle,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredTools } from "@/lib/constants/tools";

export function PopularTools() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Popular tools"
          title="One workflow for image optimization"
          description="Start with the common tools, then move into batch, privacy, and developer workflows when you need them."
        />
        <Button asChild variant="ghost" className="hidden shrink-0 sm:inline-flex">
          <Link href="/tools">
            View all tools
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredTools.map((tool, index) => (
          <Reveal key={tool.slug} delay={index * 0.04}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="secondary" className="w-full">
          <Link href="/tools">
            View all tools
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function BeforeAfterDemo() {
  const metrics = [
    ["Original", "2.4 MB"],
    ["Optimized WebP", "312 KB"],
    ["Saved", "87%"],
    ["Processing", "420ms"],
  ];

  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:py-28">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Preview first"
              title="See what changed before you download"
              description="Upload, tune quality, compare the visible result, then export one file or a ZIP. The comparison happens in your browser."
            />
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {metrics.map(([label, value]) => (
                <div key={label} className="border-t border-mist pt-4">
                  <dt className="text-[13px] uppercase tracking-[0.1em] text-ash">
                    {label}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl text-graphite">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="grid aspect-[4/3] place-items-center rounded-lg border border-mist bg-linen">
                  <span className="font-display text-4xl text-fog">JPG</span>
                </div>
                <p className="mt-3 text-body-sm text-graphite">Original JPG</p>
                <p className="font-mono text-[13px] text-ash">
                  4000×2667 · 2.4 MB
                </p>
              </div>
              <div>
                <div className="grid aspect-[4/3] place-items-center rounded-lg border border-signal-blue/30 bg-signal-blue/6">
                  <span className="font-display text-4xl text-cerulean">
                    WebP
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-graphite">
                  Optimized WebP
                </p>
                <p className="font-mono text-[13px] text-ash">
                  1920×1280 · 312 KB
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Upload",
    description: "Drag in one image or a batch of up to 50 files.",
    icon: Upload,
  },
  {
    title: "Adjust",
    description: "Keep the Balanced default, or set quality, format, and size.",
    icon: SlidersHorizontal,
  },
  {
    title: "Download",
    description: "Export a single file or everything as a ZIP archive.",
    icon: Download,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow="Workflow"
        title="Three steps, no server upload"
        description="Kompresio is built for repeat work: add files, tune, and export — nothing else in the way."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="bg-paper p-7">
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-charcoal" aria-hidden="true" />
                <span className="font-mono text-[13px] text-fog">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-subheading text-graphite">
                {step.title}
              </h3>
              <p className="mt-2 text-body-sm leading-7 text-ash">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const formats = [
  {
    name: "JPEG",
    extension: ".jpg",
    compression: "Lossy",
    transparency: false,
    animation: false,
    support: "Universal",
    bestFor: "Photos, web images",
  },
  {
    name: "PNG",
    extension: ".png",
    compression: "Lossless",
    transparency: true,
    animation: false,
    support: "Universal",
    bestFor: "Screenshots, UI, logos",
  },
  {
    name: "WebP",
    extension: ".webp",
    compression: "Lossy + lossless",
    transparency: true,
    animation: false,
    support: "97%",
    bestFor: "Websites, performance",
  },
  {
    name: "AVIF",
    extension: ".avif",
    compression: "Lossy + lossless",
    transparency: true,
    animation: false,
    support: "93%",
    bestFor: "Modern web, Core Web Vitals",
  },
  {
    name: "GIF",
    extension: ".gif",
    compression: "Lossless",
    transparency: true,
    animation: true,
    support: "Universal",
    bestFor: "Simple animations",
  },
  {
    name: "SVG",
    extension: ".svg",
    compression: "Vector",
    transparency: true,
    animation: true,
    support: "Universal",
    bestFor: "Icons, illustrations",
  },
];

function BoolMark({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="size-4 text-signal" aria-label="Yes" />
  ) : (
    <XCircle className="size-4 text-fog" aria-label="No" />
  );
}

export function FormatGuide() {
  const supported = ["JPG", "PNG", "WebP", "AVIF", "HEIC", "GIF", "SVG"];

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="overflow-hidden rounded-3xl border border-cerulean/20 bg-cerulean">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1fr] lg:p-16">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/70">
              Formats
            </p>
            <h2 className="mt-3 font-display text-heading-sm leading-[1.15] text-white sm:text-heading">
              Built for modern image pipelines
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-8 text-white/80">
              Convert to WebP, resize assets, clean metadata, and export
              batches prepared for fast-loading sites.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {supported.map((format) => (
                <span
                  key={format}
                  className="rounded-[4px] border border-white/25 px-2.5 py-1 font-mono text-[13px] text-white"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-left">
              <thead>
                <tr className="border-b border-white/20">
                  {["Format", "Alpha", "Motion", "Support", "Best for"].map(
                    (header) => (
                      <th
                        key={header}
                        className="py-3 pr-4 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {formats.map((format) => (
                  <tr
                    key={format.name}
                    className="border-b border-white/10 last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <span className="text-body-sm font-medium text-white">
                        {format.name}
                      </span>
                      <span className="ml-2 font-mono text-[12px] text-white/50">
                        {format.extension}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <BoolMark value={format.transparency} />
                    </td>
                    <td className="py-3 pr-4">
                      <BoolMark value={format.animation} />
                    </td>
                    <td className="py-3 pr-4 font-mono text-[13px] text-white/80">
                      {format.support}
                    </td>
                    <td className="py-3 pr-4 text-[13px] text-white/80">
                      {format.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    title: "Private by default",
    description:
      "Images never leave your device. No upload, no account, no tracking of file content.",
    icon: ShieldCheck,
  },
  {
    title: "No sign-up needed",
    description:
      "Open a tool, add files, download results. Works on mobile and desktop.",
    icon: Gauge,
  },
  {
    title: "Batch and ZIP ready",
    description:
      "Process up to 50 images at once and export everything as a single ZIP.",
    icon: FileArchive,
  },
];

const useCases = [
  "Websites",
  "Marketplace listings",
  "Social media",
  "Documents and forms",
  "Developer handoff",
  "Student projects",
];

export function WhyKompresio() {
  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Why Kompresio"
          title="A working utility, not just an upload box"
          description="Tool-first, private, and shaped for the everyday jobs people actually bring to an image tool."
        />

        <div>
          <ul className="divide-y divide-mist border-y border-mist">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <li key={reason.title} className="flex gap-4 py-5">
                  <Icon
                    className="mt-0.5 size-5 shrink-0 text-charcoal"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-subheading text-graphite">
                      {reason.title}
                    </p>
                    <p className="mt-1 text-body-sm leading-7 text-ash">
                      {reason.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <p className="text-[13px] uppercase tracking-[0.1em] text-ash">
              Used for
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {useCases.map((useCase) => (
                <Badge key={useCase} variant="muted">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomepageCta() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="rounded-3xl border border-mist bg-paper p-10 text-center shadow-subtle sm:p-16">
        <h2 className="mx-auto max-w-2xl font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
          Start optimizing images in about thirty seconds
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[17px] leading-8 text-ash">
          No account, no upload, no waiting. Add a file and see the result in
          the same tab.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/compress-image">
              Open the compressor
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/tools">Browse all tools</Link>
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {["Free to use", "No sign-up", "Files stay on your device"].map(
            (item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-[13px] text-ash"
              >
                <Check className="size-3.5 text-signal-blue" />
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
