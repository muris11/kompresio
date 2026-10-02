import Link from "next/link";
import { ArrowRight, Check, Home, Lock } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { OptimizerWorkbench } from "@/components/tools/optimizer-workbench";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRelatedTools } from "@/lib/constants/tools";
import type { ToolDefinition } from "@/types/tool";

export function ToolPage({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  return (
    <>
      <ToolHero tool={tool} />
      <OptimizerWorkbench tool={tool} />
      <ToolSeoContent tool={tool} />
      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-40">
        <SectionHeading
          eyebrow="Related tools"
          title="Continue the image workflow"
          description="Move between compression, conversion, resize, metadata cleanup, and batch export without changing apps."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((related) => (
            <ToolCard key={related.slug} tool={related} />
          ))}
        </div>
      </section>
      <section className="border-t border-mist bg-linen">
        <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-40">
          <SectionHeading
            eyebrow="FAQ"
            title={`Questions about ${tool.name}`}
            description="Clear answers for privacy, formats, batch processing, and output quality."
          />
          <Accordion items={tool.faqs} className="mt-10" />
        </div>
      </section>
    </>
  );
}

function ToolHero({ tool }: { tool: ToolDefinition }) {
  return (
    <section className="border-b border-mist bg-paper">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-32">
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-[13px] text-ash">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-cerulean"
          >
            <Home className="size-3.5" />
            Home
          </Link>
          <span className="text-fog">/</span>
          <Link href="/tools" className="transition-colors hover:text-cerulean">
            Tools
          </Link>
          <span className="text-fog">/</span>
          <span className="text-charcoal">{tool.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="min-w-0">
            <Badge variant="outline">
              <Lock className="size-3" />
              Runs in your browser
            </Badge>
            <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.16em] text-ash">
              {tool.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl break-words font-display text-heading-sm leading-[1.1] text-graphite sm:text-heading-lg">
              {tool.h1}
            </h1>
            <p className="mt-5 max-w-2xl break-words text-[17px] leading-8 text-charcoal">
              {tool.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {tool.supportedFormats.map((format) => (
                <span
                  key={format}
                  className="rounded-[4px] border border-mist bg-linen px-2.5 py-1 font-mono text-[12px] text-ash"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-mist bg-linen p-6">
            <h2 className="font-display text-subheading text-graphite">
              How to use
            </h2>
            <ol className="mt-5 space-y-4">
              {tool.steps.slice(0, 3).map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="font-mono text-[13px] text-fog">
                    0{index + 1}
                  </span>
                  <span className="text-body-sm leading-7 text-charcoal">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <Button asChild className="mt-6 w-full">
              <a href="#kompresio-workbench">
                Go to step 1
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolSeoContent({ tool }: { tool: ToolDefinition }) {
  return (
    <section id="tool-content" className="border-y border-mist bg-linen">
      <div className="mx-auto grid w-full max-w-[1200px] gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-40">
        <SectionHeading
          eyebrow="Guide"
          title={`How to use ${tool.name}`}
          description={`Kompresio keeps ${tool.primaryKeyword} practical: the tool comes first, then guidance explains the settings and the cases they fit.`}
        />

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-subheading text-graphite">
              How to {tool.primaryAction.toLowerCase()}
            </h2>
            <ol className="mt-6 divide-y divide-mist border-y border-mist">
              {tool.steps.map((step, index) => (
                <li key={step} className="flex gap-5 py-5">
                  <span className="font-mono text-[13px] text-fog">
                    0{index + 1}
                  </span>
                  <p className="text-body-sm leading-7 text-charcoal">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-subheading text-graphite">
                Why use Kompresio
              </h2>
              <ul className="mt-5 space-y-3">
                {tool.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-body-sm leading-7 text-charcoal"
                  >
                    <Check className="mt-1.5 size-4 shrink-0 text-signal-blue" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-subheading text-graphite">
                Best for
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {tool.useCases.map((useCase) => (
                  <Badge key={useCase} variant="muted">
                    {useCase}
                  </Badge>
                ))}
              </div>
              <p className="mt-5 text-body-sm leading-7 text-ash">
                Supported formats include {tool.supportedFormats.join(", ")}.
                For heavier server-side processing, use direct object storage
                upload rather than posting large images to serverless
                functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
