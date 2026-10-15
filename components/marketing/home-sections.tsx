"use client";

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
import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedTools } from "@/lib/constants/tools";

const stepIcons = [Upload, SlidersHorizontal, Download];
const reasonIcons = [ShieldCheck, Gauge, FileArchive];

export function PopularTools() {
  const dictionary = useDictionary();
  const { locale, href } = useLocale();
  const copy = dictionary.home.popularTools;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <Button asChild variant="ghost" className="hidden shrink-0 sm:inline-flex">
          <Link href={href("/tools")}>
            {dictionary.common.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getFeaturedTools(locale).map((tool, index) => (
          <Reveal key={tool.slug} delay={index * 0.04}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="secondary" className="w-full">
          <Link href={href("/tools")}>
            {dictionary.common.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function BeforeAfterDemo() {
  const dictionary = useDictionary();
  const copy = dictionary.home.beforeAfter;

  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:py-28">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {copy.metrics.map((metric) => (
                <div key={metric.label} className="border-t border-mist pt-4">
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ash">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl text-graphite">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="p-6" interactive>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="grid aspect-[4/3] place-items-center rounded-xl border border-mist bg-linen">
                  <span className="font-display text-4xl font-extrabold text-fog">
                    JPG
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-graphite">
                  {copy.originalLabel}
                </p>
                <p className="font-mono text-[13px] text-ash">
                  4000×2667 · 2.4 MB
                </p>
              </div>
              <div>
                <div className="grid aspect-[4/3] place-items-center rounded-xl border border-cerulean/25 bg-brand-soft">
                  <span className="font-display text-4xl font-extrabold text-cerulean">
                    WebP
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-graphite">
                  {copy.optimizedLabel}
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

export function HowItWorks() {
  const dictionary = useDictionary();
  const copy = dictionary.home.howItWorks;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <ol className="mt-14 grid gap-4 sm:grid-cols-3">
        {copy.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <li
              key={step.title}
              className="rounded-2xl border border-mist bg-paper p-7 shadow-subtle"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[13px] text-fog">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-subheading text-graphite">
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
    transparency: false,
    animation: false,
    support: "100%",
    bestFor: "Photos, web images",
  },
  {
    name: "PNG",
    extension: ".png",
    transparency: true,
    animation: false,
    support: "100%",
    bestFor: "Screenshots, UI, logos",
  },
  {
    name: "WebP",
    extension: ".webp",
    transparency: true,
    animation: true,
    support: "97%",
    bestFor: "Websites, performance",
  },
  {
    name: "AVIF",
    extension: ".avif",
    transparency: true,
    animation: true,
    support: "93%",
    bestFor: "Modern web, Core Web Vitals",
  },
  {
    name: "GIF",
    extension: ".gif",
    transparency: true,
    animation: true,
    support: "100%",
    bestFor: "Simple animations",
  },
  {
    name: "SVG",
    extension: ".svg",
    transparency: true,
    animation: true,
    support: "100%",
    bestFor: "Icons, illustrations",
  },
];

function BoolMark({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="size-4 text-white" aria-label="Yes" />
  ) : (
    <XCircle className="size-4 text-white/35" aria-label="No" />
  );
}

export function FormatGuide() {
  const dictionary = useDictionary();
  const copy = dictionary.home.formatGuide;
  const supported = ["JPG", "PNG", "WebP", "AVIF", "HEIC", "GIF", "SVG"];

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="overflow-hidden rounded-3xl border border-cerulean/20 bg-[linear-gradient(135deg,#0079bd_0%,#005f96_100%)]">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1fr] lg:p-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-heading-sm leading-[1.15] text-white sm:text-heading">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-8 text-white/80">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {supported.map((format) => (
                <span
                  key={format}
                  className="rounded-md border border-white/25 px-2.5 py-1 font-mono text-[13px] text-white"
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
                  {copy.headers.map((header) => (
                    <th
                      key={header}
                      className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/60"
                    >
                      {header}
                    </th>
                  ))}
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

export function WhyKompresio() {
  const dictionary = useDictionary();
  const copy = dictionary.home.why;

  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div>
          <ul className="grid gap-4 sm:grid-cols-1">
            {copy.reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <li
                  key={reason.title}
                  className="flex gap-4 rounded-2xl border border-mist bg-paper p-5 shadow-subtle"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-cerulean">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
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
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ash">
              {copy.usedFor}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {copy.useCases.map((useCase) => (
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
  const dictionary = useDictionary();
  const { href } = useLocale();
  const copy = dictionary.home.cta;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-mist bg-paper p-10 text-center shadow-raised sm:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(0,121,189,0.10),transparent_70%)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
            {copy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-8 text-ash">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={href("/compress-image")}>
                {dictionary.common.openCompressor}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={href("/tools")}>{dictionary.common.browseTools}</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {copy.trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-[13px] text-ash"
              >
                <Check className="size-3.5 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
