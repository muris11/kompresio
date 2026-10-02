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
    containerClass: "border-destructive/30 bg-destructive/6",
    textClass: "text-destructive",
    iconClass: "text-destructive",
    label: "Error",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "border-warning/30 bg-warning/6",
    textClass: "text-warning",
    iconClass: "text-warning",
    label: "Warning",
  },
  info: {
    icon: Info,
    containerClass: "border-signal/30 bg-signal/6",
    textClass: "text-cerulean",
    iconClass: "text-signal",
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
        "flex gap-3 rounded-btn border p-3 text-body-sm leading-6",
        config.containerClass,
        config.textClass,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", config.iconClass)} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="font-medium">{warning.message}</span>
          <span className="shrink-0 rounded-[4px] border border-current/30 px-1.5 py-0.5 text-[11px] uppercase tracking-[0.08em]">
            {config.label}
          </span>
        </div>
        {warning.details ? (
          <p className="text-[13px] opacity-80">{warning.details}</p>
        ) : null}
        {warning.fix ? (
          <Button
            type="button"
            variant={warning.severity === "error" ? "destructive" : "secondary"}
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
      <div className="flex items-center gap-3 border-b border-mist p-5">
        <AlertTriangle
          className={cn(
            "size-5",
            hasErrors ? "text-destructive" : "text-warning",
          )}
        />
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {hasErrors
              ? "Configuration issues found"
              : "Quality recommendations"}
          </h2>
          <p className="text-[13px] text-ash">
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
