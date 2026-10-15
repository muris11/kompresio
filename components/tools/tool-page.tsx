import Link from "next/link";
import { ArrowRight, Check, Home, Lock } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { OptimizerWorkbench } from "@/components/tools/optimizer-workbench";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRelatedTools } from "@/lib/constants/tools";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, interpolate } from "@/lib/i18n/dictionaries";
import type { ToolDefinition } from "@/types/tool";

export function ToolPage({
  tool,
  locale,
}: {
  tool: ToolDefinition;
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const relatedTools = getRelatedTools(locale, tool);
  const copy = dictionary.toolPage;

  return (
    <>
      <ToolHero tool={tool} locale={locale} />
      <OptimizerWorkbench tool={tool} />
      <ToolSeoContent tool={tool} locale={locale} />
      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={copy.relatedEyebrow}
          title={copy.relatedTitle}
          description={copy.relatedDescription}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((related) => (
            <ToolCard key={related.slug} tool={related} locale={locale} />
          ))}
        </div>
      </section>
      <section className="border-t border-mist bg-linen">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow={copy.faqEyebrow}
            title={interpolate(copy.faqTitle, { tool: tool.name })}
            description={copy.faqDescription}
          />
          <Accordion items={tool.faqs} className="mt-10" />
        </div>
      </section>
    </>
  );
}

function ToolHero({
  tool,
  locale,
}: {
  tool: ToolDefinition;
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.toolPage;
  const href = (path: string) => localePath(locale, path);

  return (
    <section className="relative overflow-hidden border-b border-mist bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_0%,rgba(0,121,189,0.10),transparent_65%)]"
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-ash">
          <Link
            href={href("/")}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-cerulean"
          >
            <Home className="size-3.5" />
            {dictionary.common.home}
          </Link>
          <span className="text-fog">/</span>
          <Link
            href={href("/tools")}
            className="transition-colors hover:text-cerulean"
          >
            {dictionary.common.tools}
          </Link>
          <span className="text-fog">/</span>
          <span className="text-charcoal">{tool.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="min-w-0">
            <Badge variant="success">
              <Lock className="size-3" />
              {copy.privacyBadge}
            </Badge>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-cerulean">
              {tool.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl break-words font-display text-heading-sm leading-[1.08] text-graphite sm:text-heading-lg">
              {tool.h1}
            </h1>
            <p className="mt-5 max-w-2xl break-words text-[17px] leading-8 text-charcoal">
              {tool.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {tool.supportedFormats.map((format) => (
                <span
                  key={format}
                  className="rounded-md border border-mist bg-linen px-2.5 py-1 font-mono text-[12px] text-ash"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-mist bg-linen p-6 shadow-subtle">
            <h2 className="font-display text-subheading text-graphite">
              {copy.howToUse}
            </h2>
            <ol className="mt-5 space-y-4">
              {tool.steps.slice(0, 3).map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-paper font-mono text-[12px] text-ash shadow-subtle">
                    {index + 1}
                  </span>
                  <span className="text-body-sm leading-7 text-charcoal">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <Button asChild className="mt-6 w-full">
              <a href="#kompresio-workbench">
                {copy.goToStep1}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolSeoContent({
  tool,
  locale,
}: {
  tool: ToolDefinition;
  locale: Locale;
}) {
  const copy = getDictionary(locale).toolPage;

  return (
    <section id="tool-content" className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={copy.guideEyebrow}
          title={interpolate(copy.guideTitle, { tool: tool.name })}
          description={interpolate(copy.guideDescription, {
            keyword: tool.primaryKeyword,
          })}
        />

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-subheading text-graphite">
              {interpolate(copy.howTo, {
                action: tool.primaryAction.toLowerCase(),
              })}
            </h2>
            <ol className="mt-6 divide-y divide-mist border-y border-mist">
              {tool.steps.map((step, index) => (
                <li key={step} className="flex gap-5 py-5">
                  <span className="font-mono text-[13px] text-fog">
                    0{index + 1}
                  </span>
                  <p className="text-body-sm leading-7 text-charcoal">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-subheading text-graphite">
                {copy.whyUse}
              </h2>
              <ul className="mt-5 space-y-3">
                {tool.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-body-sm leading-7 text-charcoal"
                  >
                    <Check className="mt-1.5 size-4 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-subheading text-graphite">
                {copy.bestFor}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {tool.useCases.map((useCase) => (
                  <Badge key={useCase} variant="muted">
                    {useCase}
                  </Badge>
                ))}
              </div>
              <p className="mt-5 text-body-sm leading-7 text-ash">
                {interpolate(copy.supportedFormatsNote, {
                  formats: tool.supportedFormats.join(", "),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
