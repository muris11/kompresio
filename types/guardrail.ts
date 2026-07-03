import type { OutputFormat, ProcessingSettings } from "@/lib/image/client-processing";

export type GuardrailSeverity = "error" | "warning" | "info";

export type GuardrailFix = {
  label: string;
  quality?: number;
  outputFormat?: OutputFormat;
  resizeEnabled?: boolean;
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  stripMetadata?: boolean;
};

export type GuardrailWarning = {
  ruleId: string;
  severity: GuardrailSeverity;
  message: string;
  details?: string;
  fix?: GuardrailFix;
};

export type GuardrailResult = {
  hasIssues: boolean;
  hasErrors: boolean;
  warnings: GuardrailWarning[];
};

export type FileProfile = {
  mimeType: string;
  size: number;
  width: number;
  height: number;
  hasTransparency: boolean;
};
