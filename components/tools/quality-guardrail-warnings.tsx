"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  GuardrailFix,
  GuardrailWarning,
} from "@/types/guardrail";

const severityConfig = {
  error: {
    icon: XCircle,
    containerClass: "border-red-200 bg-red-50",
    textClass: "text-red-800",
    iconClass: "text-red-500",
    badgeClass:
      "bg-red-100 text-red-700 border-red-200",
    label: "Error",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "border-amber-200 bg-amber-50",
    textClass: "text-amber-800",
    iconClass: "text-amber-600",
    badgeClass:
      "bg-amber-100 text-amber-700 border-amber-200",
    label: "Warning",
  },
  info: {
    icon: Info,
    containerClass: "border-blue-200 bg-blue-50",
    textClass: "text-blue-800",
    iconClass: "text-blue-600",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Info",
  },
};

function GuardrailWarningItem({
  warning,
  onApplyFix,
}: {
  warning: GuardrailWarning;
  onApplyFix: (fix: GuardrailFix) => void;
}) {
  const config = severityConfig[warning.severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-3 text-sm leading-6",
        config.containerClass,
        config.textClass,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", config.iconClass)} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold">{warning.message}</span>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase",
              config.badgeClass,
            )}
          >
            {config.label}
          </span>
        </div>
        {warning.details ? (
          <p className="text-xs opacity-80">{warning.details}</p>
        ) : null}
        {warning.fix ? (
          <Button
            type="button"
            variant={
              warning.severity === "error" ? "destructive" : "secondary"
            }
            size="sm"
            className="mt-1 h-8 text-xs"
            onClick={() => onApplyFix(warning.fix!)}
          >
            <CheckCircle2 className="mr-1 size-3.5" />
            {warning.fix.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function GuardrailWarnings({
  warnings,
  hasErrors,
  onApplyFix,
}: {
  warnings: GuardrailWarning[];
  hasErrors: boolean;
  onApplyFix: (fix: GuardrailFix) => void;
}) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-200 p-5">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl",
            hasErrors
              ? "bg-red-50 text-red-600"
              : "bg-amber-50 text-amber-600",
          )}
        >
          <AlertTriangle className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">
            {hasErrors ? "Configuration issues found" : "Quality recommendations"}
          </h2>
          <p className="text-xs text-slate-500">
            {warnings.length} issue{warnings.length === 1 ? "" : "s"} to review
          </p>
        </div>
      </div>
      <div className="space-y-2 p-5">
        {warnings.map((warning) => (
          <GuardrailWarningItem
            key={warning.ruleId}
            warning={warning}
            onApplyFix={onApplyFix}
          />
        ))}
      </div>
    </Card>
  );
}
