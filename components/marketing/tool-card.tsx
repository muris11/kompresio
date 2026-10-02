import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ToolIcon } from "@/components/shared/tool-icon";
import { Card } from "@/components/ui/card";
import type { ToolDefinition } from "@/types/tool";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link href={`/${tool.slug}`} className="group block h-full transition-transform duration-150 ease-out active:scale-[0.96]">
      <Card className="flex h-full flex-col p-6 transition-colors hover:border-twilight/25">
        <div className="flex items-start justify-between gap-4">
          <ToolIcon name={tool.icon} className="size-5 text-charcoal" />
          <ArrowUpRight className="size-4 text-fog transition-[color,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cerulean" />
        </div>
        <h3 className="mt-6 font-display text-subheading text-graphite">
          {tool.name}
        </h3>
        <p className="mt-2 flex-1 text-body-sm leading-7 text-ash">
          {tool.description}
        </p>
        <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-fog">
          {tool.category}
        </p>
      </Card>
    </Link>
  );
}
