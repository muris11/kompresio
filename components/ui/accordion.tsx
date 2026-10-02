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
    <div className={cn("divide-y divide-mist border-y border-mist", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-subheading text-graphite">
            {item.question}
            <ChevronDown className="size-4 shrink-0 text-ash transition group-open:rotate-180" />
          </summary>
          <p className="pb-5 pr-8 text-body-sm leading-7 text-ash">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
