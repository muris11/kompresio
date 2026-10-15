"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLocale } from "@/components/providers/locale-provider";
import { ToolIcon } from "@/components/shared/tool-icon";
import type { ToolDefinition } from "@/types/tool";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const { href } = useLocale();

  return (
    <Link
      href={href(`/${tool.slug}`)}
      className="group flex h-full flex-col rounded-2xl border border-mist bg-paper p-6 shadow-subtle transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-fog hover:shadow-raised active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-cerulean transition-colors duration-200 group-hover:bg-cerulean group-hover:text-white">
          <ToolIcon name={tool.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-fog transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cerulean" />
      </div>
      <h3 className="mt-5 font-display text-subheading text-graphite">
        {tool.name}
      </h3>
      <p className="mt-2 flex-1 text-body-sm leading-7 text-ash">
        {tool.description}
      </p>
      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-fog">
        {tool.category}
      </p>
    </Link>
  );
}
