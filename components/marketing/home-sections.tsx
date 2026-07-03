import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Download,
  Gauge,
  Globe,
  ImageIcon,
  Lock,
  Search,
  ShieldCheck,
  UploadCloud,
  Zap,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { featuredTools } from "@/lib/constants/tools";

export function PopularTools() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Popular tools"
          title="One workflow for image optimization"
          description="Use the most common tools immediately, then expand into batch, privacy, and developer workflows when needed."
        />
        <Link href="/tools" className="hidden shrink-0 sm:flex">
          <Button variant="secondary">
            View all tools
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredTools.map((tool, index) => (
          <Reveal key={tool.slug} delay={index * 0.04}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Button asChild variant="secondary">
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
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8 lg:py-24">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Preview first"
              title="Know what changed before you download"
              description="Kompresio keeps the tool UI first: upload, tune quality, compare visible output, then download one file or a ZIP archive."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Original", "2.4 MB"],
                ["Optimized WebP", "312 KB"],
                ["Saved", "87%"],
                ["Processing", "420ms"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="rounded-3xl p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4">
                <div className="grid aspect-[4/3] place-items-center rounded-xl bg-white">
                  <ImageIcon className="size-16 text-slate-300" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-950">
                  Original JPG
                </p>
                <p className="font-mono text-xs text-slate-500">4000x2667 · 2.4 MB</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="grid aspect-[4/3] place-items-center rounded-xl bg-white">
                  <Zap className="size-16 text-emerald-500" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-950">
                  Optimized WebP
                </p>
                <p className="font-mono text-xs text-slate-500">1920x1280 · 312 KB</p>
              </div>
            </div>
            <Progress value={87} className="mt-5" />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      title: "Upload",
      description: "Add single images or a full batch through drag and drop.",
      icon: UploadCloud,
    },
    {
      title: "Choose settings",
      description: "Pick quality, output format, resize preset, and metadata options.",
      icon: Gauge,
    },
    {
      title: "Preview",
      description: "Compare before and after with file size, format, dimensions, and time.",
      icon: Search,
    },
    {
      title: "Download",
      description: "Export one optimized image or every result in a structured ZIP.",
      icon: Download,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        align="center"
        eyebrow="Workflow"
        title="A fast tool flow without server upload"
        description="Kompresio is designed for repeat work: upload, tune, preview, and export in a few focused steps."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={index * 0.04}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function SupportedFormats() {
  const formats = ["JPG", "PNG", "WebP", "AVIF", "HEIC", "GIF", "SVG"];
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Supported formats
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Built for modern image pipelines
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Convert images to WebP, resize assets, clean metadata, export
            batches, and prepare images for fast-loading Next.js websites.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {formats.map((format) => (
            <div
              key={format}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <p className="font-mono text-2xl font-bold text-white">{format}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyKompresio() {
  const items = [
    {
      title: "Private by default",
      description: "Core image processing runs locally in the browser.",
      icon: ShieldCheck,
    },
    {
      title: "Vercel ready",
      description: "No heavy server upload path is needed for MVP image work.",
      icon: Globe,
    },
    {
      title: "Developer friendly",
      description: "WebP, AVIF, metadata, filenames, and batch export are designed for web teams.",
      icon: Code2,
    },
    {
      title: "SEO structured",
      description: "Every tool gets a focused route, metadata, internal links, and FAQ content.",
      icon: Search,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Why Kompresio"
        title="A professional image utility, not only an upload box"
        description="The product is structured for real users and organic discovery: tool-first UX, privacy confidence, and practical SEO content."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function UseCases() {
  const items = [
    "Websites",
    "Marketplace",
    "Social media",
    "Documents",
    "Developers",
    "Students",
  ];

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="Use cases"
          title="One app for everyday image prep"
          description="Kompresio supports the common jobs people need before publishing, sending, or uploading images."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-lg font-bold text-slate-950"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-[0_24px_70px_rgba(37,99,235,0.22)] lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge className="border-white/20 bg-white/10 text-white">
              <Lock className="size-3.5" />
              Browser-based
            </Badge>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Start optimizing images without sign-up
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50">
              Open the compressor, add images, choose settings, and download
              optimized results. Core files stay local for the MVP workflow.
            </p>
          </div>
          <Button asChild variant="secondary" size="lg">
            <Link href="/compress-image">
              Open compressor
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
