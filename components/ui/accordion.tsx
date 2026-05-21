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
    <div className={cn("divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white", className)}>
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-slate-950">
            {item.question}
            <ChevronDown className="size-4 shrink-0 text-slate-500 transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
