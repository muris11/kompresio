"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export function Accordion({
  items,
  className,
}: {
  items: Array<{ question: string; answer: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y divide-mist overflow-hidden rounded-2xl border border-mist bg-paper shadow-subtle",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-display text-[17px] font-semibold text-graphite transition-colors hover:bg-linen/60">
            {item.question}
            <ChevronDown className="size-4 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="px-6 pb-6 pr-10 text-body-sm leading-7 text-ash">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
