import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Lock } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { OptimizerWorkbench } from "@/components/tools/optimizer-workbench";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRelatedTools } from "@/lib/constants/tools";
import type { ToolDefinition } from "@/types/tool";

export function ToolPage({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  return (
    <>
      <ToolHero tool={tool} />
      <OptimizerWorkbench tool={tool} />
      <ToolSeoContent tool={tool} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Related tools"
          title="Continue the image workflow"
          description="Move between compression, conversion, resize, metadata cleanup, and batch export without changing apps."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((related) => (
            <ToolCard key={related.slug} tool={related} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-24">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title={`Questions about ${tool.name}`}
          description="Clear answers for privacy, formats, batch processing, and output quality."
        />
        <Accordion items={tool.faqs} className="mt-10" />
      </section>
    </>
  );
}

function ToolHero({ tool }: { tool: ToolDefinition }) {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-blue-600">
            <Home className="size-4" />
            Home
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-blue-600">
            Tools
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">
            {tool.name}
          </span>
        </nav>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="min-w-0">
            <Badge variant="success">
              <Lock className="size-3.5" />
              Browser-based MVP tool
            </Badge>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              {tool.eyebrow}
            </p>
            <h1 className="mt-3 max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {tool.h1}
            </h1>
            <p className="mt-5 max-w-3xl break-words text-base leading-8 text-slate-600 sm:text-lg">
              {tool.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {tool.supportedFormats.map((format) => (
                <Badge key={format} variant="muted">
                  {format}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="w-full max-w-full overflow-hidden p-5">
            <h2 className="text-base font-bold text-slate-950">
              Smart recommendation example
            </h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                "Format: WebP",
                "Quality: 78",
                "Resize width: 1600px",
                "Remove metadata: Yes",
                "Estimated saving: 72%",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
            <Button asChild className="mt-5 w-full min-w-0 px-2 text-xs min-[360px]:text-sm">
              <a href="#tool-content">
                Read how it works
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ToolSeoContent({ tool }: { tool: ToolDefinition }) {
  return (
    <section
      id="tool-content"
      className="border-y border-slate-200 bg-slate-50"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-24">
        <div className="lg:col-span-1">
          <SectionHeading
            eyebrow="Guide"
            title={`How to use ${tool.name}`}
            description={`Kompresio keeps ${tool.primaryKeyword} practical: the tool loads first, then useful guidance explains settings and use cases.`}
          />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-950">
              How to {tool.primaryAction.toLowerCase()}
            </h2>
            <ol className="mt-5 space-y-4">
              {tool.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 font-mono text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-slate-600">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-950">
                Why use Kompresio
              </h2>
              <ul className="mt-5 space-y-3">
                {tool.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-950">
                Best for
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {tool.useCases.map((useCase) => (
                  <Badge key={useCase} variant="default">
                    {useCase}
                  </Badge>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Supported formats include {tool.supportedFormats.join(", ")}.
                For advanced server-side processing, use direct object storage
                upload rather than posting large images to serverless functions.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
