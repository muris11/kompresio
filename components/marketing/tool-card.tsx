import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ToolIcon } from "@/components/shared/tool-icon";
import { Card } from "@/components/ui/card";
import type { ToolDefinition } from "@/types/tool";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link href={`/${tool.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(37,99,235,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <ToolIcon name={tool.icon} />
          </span>
          <ArrowRight className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
        </div>
        <h3 className="mt-5 text-lg font-bold text-slate-950">{tool.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
          {tool.description}
        </p>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          {tool.category}
        </p>
      </Card>
    </Link>
  );
}
