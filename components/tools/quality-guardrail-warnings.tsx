"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { GuardrailFix, GuardrailWarning } from "@/types/guardrail";
import type { WorkbenchMessages } from "@/lib/i18n/workbench";

const severityStyles = {
  error: {
    container: "border-destructive/25 bg-destructive/6 text-destructive",
    icon: "text-destructive",
  },
  warning: {
    container: "border-warning/25 bg-warning/6 text-warning",
    icon: "text-warning",
  },
  info: {
    container: "border-cerulean/25 bg-brand-soft text-cerulean",
    icon: "text-cerulean",
  },
};

export function GuardrailWarnings({
  warnings,
  hasErrors,
  onApplyFix,
  messages,
}: {
  warnings: GuardrailWarning[];
  hasErrors: boolean;
  onApplyFix: (fix: GuardrailFix) => void;
  messages: WorkbenchMessages;
}) {
  if (warnings.length === 0) {
    return null;
  }

  const t = messages.guardrails;
  const labelFor = {
    error: t.error,
    warning: t.warning,
    info: t.info,
  } as const;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-mist p-5">
        <span
          className={cn(
            "grid size-9 place-items-center rounded-xl",
            hasErrors
              ? "bg-destructive/10 text-destructive"
              : "bg-warning/10 text-warning",
          )}
        >
          <AlertTriangle className="size-4.5" />
        </span>
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {t.title}
          </h2>
          <p className="text-[13px] text-ash">
            {warnings.length}
          </p>
        </div>
      </div>
      <div className="space-y-2 p-5">
        {warnings.map((warning) => {
          const style = severityStyles[warning.severity];
          return (
            <div
              key={warning.ruleId}
              className={cn(
                "flex gap-3 rounded-xl border p-3 text-[13px] leading-6",
                style.container,
              )}
            >
              <AlertTriangle
                className={cn("mt-0.5 size-4 shrink-0", style.icon)}
              />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{warning.message}</span>
                  <span className="shrink-0 rounded-md border border-current/30 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
                    {labelFor[warning.severity]}
                  </span>
                </div>
                {warning.details ? (
                  <p className="text-[13px] opacity-80">{warning.details}</p>
                ) : null}
                {warning.fix ? (
                  <Button
                    type="button"
                    variant={
                      warning.severity === "error" ? "destructive" : "secondary"
                    }
                    size="sm"
                    className="mt-1"
                    onClick={() => onApplyFix(warning.fix!)}
                  >
                    <CheckCircle2 className="size-3.5" />
                    {warning.fix.label}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
