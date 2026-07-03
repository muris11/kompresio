import type {
  FileProfile,
  GuardrailFix,
  GuardrailResult,
  GuardrailWarning,
} from "@/types/guardrail";
import type { ProcessingSettings } from "@/lib/image/client-processing";

type RuleContext = {
  settings: ProcessingSettings;
  file?: FileProfile;
};

const MIN_QUALITY_PER_FORMAT: Record<string, number> = {
  jpeg: 30,
  jpg: 30,
  png: 60,
  webp: 40,
  avif: 35,
};

const MAX_SAFE_DOWNSCALE_RATIO = 4;
const MAX_SAFE_UPSCALE_RATIO = 1.5;
const EXTREME_DIMENSION_WARNING = 6000;
const TINY_OUTPUT_WARNING = 64;

function getOutputFormat(settings: ProcessingSettings): string {
  const format = settings.outputFormat;
  if (format === "original" && settings.mode !== "compress") {
    return "unknown";
  }
  return format === "original" ? "jpeg" : format;
}

function evaluateMinQuality(
  ctx: RuleContext,
): GuardrailWarning | null {
  if (!["compress", "webp", "avif", "batch", "resize", "crop"].includes(ctx.settings.mode)) {
    return null;
  }

  const format = getOutputFormat(ctx.settings);
  const threshold = MIN_QUALITY_PER_FORMAT[format];
  if (!threshold) return null;

  if (ctx.settings.quality < threshold) {
    return {
      ruleId: "min-quality",
      severity: ctx.settings.quality < threshold - 20 ? "error" : "warning",
      message:
        ctx.settings.quality < threshold - 20
          ? `Quality of ${ctx.settings.quality} is too low for ${format.toUpperCase()}. The image may look visibly degraded.`
          : `Quality of ${ctx.settings.quality} is below the recommended minimum of ${threshold} for ${format.toUpperCase()}.`,
      details:
        ctx.settings.quality < threshold - 20
          ? `Setting quality below ${threshold} for ${format.toUpperCase()} can cause visible artifacts, banding, and loss of detail. We recommend at least ${threshold}.`
          : `For ${format.toUpperCase()}, quality values below ${threshold} start reducing visual fidelity.`,
      fix: {
        label: `Set quality to ${threshold}`,
        quality: threshold,
      },
    };
  }

  return null;
}

function evaluateSafeResize(ctx: RuleContext): GuardrailWarning | null {
  if (!ctx.settings.resizeEnabled || !ctx.file) return null;

  const { width: srcW, height: srcH } = ctx.file;

  if (srcW <= 0 || srcH <= 0) return null;

  const targetW = ctx.settings.width || srcW;
  const targetH = ctx.settings.height || srcH;

  if (targetW <= 0 || targetH <= 0) return null;

  const scaleX = srcW / targetW;
  const scaleY = srcH / targetH;
  const maxScale = Math.max(scaleX, scaleY);
  const minScale = Math.min(scaleX, scaleY);

  if (ctx.settings.keepAspectRatio) {
    if (maxScale > MAX_SAFE_DOWNSCALE_RATIO) {
      const suggestedWidth = Math.round(srcW / MAX_SAFE_DOWNSCALE_RATIO);
      const suggestedHeight = Math.round(srcH / MAX_SAFE_DOWNSCALE_RATIO);

      return {
        ruleId: "extreme-downscale",
        severity: "warning",
        message: `Downscaling from ${srcW}×${srcH} to ${targetW}×${targetH} is a ${Math.round(maxScale)}× reduction — fine detail may be lost.`,
        details: `Reducing an image by more than ${MAX_SAFE_DOWNSCALE_RATIO}× in one pass can cause noticeable quality loss. A safer target would be around ${suggestedWidth}×${suggestedHeight}.`,
        fix: {
          label: `Set resize to ${suggestedWidth}×${suggestedHeight}`,
          width: suggestedWidth,
          height: suggestedHeight,
          keepAspectRatio: true,
        },
      };
    }
  }

  if (minScale < 1 / MAX_SAFE_UPSCALE_RATIO && minScale < 0.9) {
    return {
      ruleId: "extreme-upscale",
      severity: "info",
      message: `Upscaling from ${srcW}×${srcH} to ${targetW}×${targetH}. The output may appear blurry or pixelated.`,
      details:
        "Upscaling a raster image creates new pixels by guessing — the result will not have the same sharpness as a native-resolution image.",
      fix: {
        label: "Use original size",
        resizeEnabled: false,
      },
    };
  }

  return null;
}

function evaluateTransparencyPreservation(
  ctx: RuleContext,
): GuardrailWarning | null {
  if (!ctx.file) return null;

  const format = getOutputFormat(ctx.settings);
  const hasTransparency =
    ctx.file.hasTransparency ||
    ctx.file.mimeType === "image/png" ||
    ctx.file.mimeType === "image/webp" ||
    ctx.file.mimeType === "image/gif" ||
    ctx.file.mimeType === "image/svg+xml";

  if (!hasTransparency) return null;

  if (format === "jpeg" || format === "jpg") {
    const fix: GuardrailFix = {
      label: "Switch to PNG (preserves transparency)",
      outputFormat: "png",
    };

    return {
      ruleId: "transparency-loss",
      severity: "error",
      message:
        "JPEG does not support transparency. The transparent areas will be filled with a solid background color.",
      details: "PNG and WebP both support transparency. WebP also gives smaller file sizes while keeping the alpha channel intact.",
      fix,
    };
  }

  return null;
}

const MODES_THAT_CAN_RESIZE = [
  "compress",
  "webp",
  "avif",
  "resize",
  "crop",
  "batch",
  "pdf",
  "metadata",
  "heic",
];

function evaluateExtremeDimensions(
  ctx: RuleContext,
): GuardrailWarning | null {
  if (!ctx.file) return null;

  const { width, height } = ctx.file;

  if (width > EXTREME_DIMENSION_WARNING || height > EXTREME_DIMENSION_WARNING) {
    const canResize = MODES_THAT_CAN_RESIZE.includes(ctx.settings.mode);
    return {
      ruleId: "extreme-dimensions",
      severity: "warning",
      message: `This image (${width}×${height}) exceeds ${EXTREME_DIMENSION_WARNING}px on one side. It may be slow to decode and use significant memory in the browser.`,
      details: "Large images require more memory to process client-side. Resizing to a smaller dimension before compression is recommended.",
      ...(canResize && {
        fix: {
          label: "Resize to 1920px width",
          resizeEnabled: true,
          width: 1920,
          height: 0,
          keepAspectRatio: true,
        },
      }),
    };
  }

  if (ctx.settings.resizeEnabled) {
    const targetW = ctx.settings.width || width;
    const targetH = ctx.settings.height || height;

    if (
      (targetW > 0 && targetW < TINY_OUTPUT_WARNING) ||
      (targetH > 0 && targetH < TINY_OUTPUT_WARNING)
    ) {
      return {
        ruleId: "tiny-output",
        severity: "warning",
        message: `Output dimension (${targetW}×${targetH}) is very small — please check intended use.`,
        details: `Images smaller than ${TINY_OUTPUT_WARNING}px may not show enough detail for most use cases.`,
      };
    }
  }

  return null;
}

function evaluateQualityVsSize(
  ctx: RuleContext,
): GuardrailWarning | null {
  if (!ctx.file || !["compress", "webp", "batch"].includes(ctx.settings.mode)) return null;

  if (ctx.settings.quality >= 95 && ctx.file.size < 100_000) {
    return {
      ruleId: "overkill-quality",
      severity: "info",
      message: `Quality is set to ${ctx.settings.quality}, but this file is only ${(ctx.file.size / 1024).toFixed(1)} KB — a lower quality setting (82–90) will save space with nearly invisible differences.`,
      details: "Very high quality on small files often produces nearly the same output size with negligible visual improvement.",
      fix: {
        label: "Set quality to 85",
        quality: 85,
      },
    };
  }

  return null;
}

export function evaluateGuardrails(
  settings: ProcessingSettings,
  file?: FileProfile,
): GuardrailResult {
  const ctx: RuleContext = { settings, file };

  const warnings: GuardrailWarning[] = [];

  const rules = [
    evaluateMinQuality,
    evaluateTransparencyPreservation,
    evaluateExtremeDimensions,
    evaluateSafeResize,
    evaluateQualityVsSize,
  ];

  for (const rule of rules) {
    const warning = rule(ctx);
    if (warning) {
      warnings.push(warning);
    }
  }

  return {
    hasIssues: warnings.length > 0,
    hasErrors: warnings.some((w) => w.severity === "error"),
    warnings,
  };
}

export function applyGuardrailFix(
  settings: ProcessingSettings,
  fix: GuardrailFix,
): ProcessingSettings {
  return {
    ...settings,
    ...(fix.quality !== undefined && { quality: fix.quality }),
    ...(fix.outputFormat !== undefined && { outputFormat: fix.outputFormat }),
    ...(fix.resizeEnabled !== undefined && { resizeEnabled: fix.resizeEnabled }),
    ...(fix.width !== undefined && { width: fix.width }),
    ...(fix.height !== undefined && { height: fix.height }),
    ...(fix.keepAspectRatio !== undefined && { keepAspectRatio: fix.keepAspectRatio }),
    ...(fix.stripMetadata !== undefined && { stripMetadata: fix.stripMetadata }),
    preset: "custom",
  };
}

export function buildFileProfile(
  mimeType: string,
  size: number,
  width: number,
  height: number,
  hasTransparency?: boolean,
): FileProfile {
  const impliedTransparency =
    hasTransparency ?? (
      mimeType === "image/png" ||
      mimeType === "image/webp" ||
      mimeType === "image/gif" ||
      mimeType === "image/svg+xml"
    );

  return {
    mimeType,
    size,
    width,
    height,
    hasTransparency: impliedTransparency,
  };
}
