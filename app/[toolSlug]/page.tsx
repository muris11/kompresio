import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ToolPage } from "@/components/tools/tool-page";
import { getTool, tools } from "@/lib/constants/tools";
import {
  createToolMetadata,
  yoastGraphSchema,
} from "@/lib/seo/metadata";

type ToolRouteProps = {
  params: Promise<{
    toolSlug: string;
  }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({
    toolSlug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolRouteProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    return {};
  }

  return createToolMetadata(tool);
}

export default async function DynamicToolPage({ params }: ToolRouteProps) {
  const { toolSlug } = await params;
  const tool = getTool(toolSlug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: `/${tool.slug}`,
          title: tool.title,
          description: tool.description,
          tool,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.name, path: `/${tool.slug}` },
          ],
          faqs: tool.faqs,
        })}
      />
      <ToolPage tool={tool} />
    </>
  );
}
