import type {
  FileProfile,
  GuardrailFix,
  GuardrailResult,
  GuardrailWarning,
} from "@/types/guardrail";
import type { ProcessingSettings } from "@/lib/image/client-processing";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

type RuleContext = {
  settings: ProcessingSettings;
  file?: FileProfile;
  locale: Locale;
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

/*
  Localized copy for guardrail warnings. English is the default and matches the
  strings asserted by the unit tests; Indonesian mirrors the same structure.
*/
const guardrailCopy = {
  en: {
    minQualityError: (quality: number, format: string) =>
      `Quality of ${quality} is too low for ${format}. The image may look visibly degraded.`,
    minQualityErrorDetails: (threshold: number, format: string) =>
      `Setting quality below ${threshold} for ${format} can cause visible artifacts, banding, and loss of detail. We recommend at least ${threshold}.`,
    minQualityWarning: (quality: number, threshold: number, format: string) =>
      `Quality of ${quality} is below the recommended minimum of ${threshold} for ${format}.`,
    minQualityWarningDetails: (threshold: number, format: string) =>
      `For ${format}, quality values below ${threshold} start reducing visual fidelity.`,
    setQuality: (threshold: number) => `Set quality to ${threshold}`,
    extremeDownscale: (
      srcW: number,
      srcH: number,
      targetW: number,
      targetH: number,
      ratio: number,
    ) =>
      `Downscaling from ${srcW}×${srcH} to ${targetW}×${targetH} is a ${ratio}× reduction — fine detail may be lost.`,
    extremeDownscaleDetails: (
      ratio: number,
      suggestedW: number,
      suggestedH: number,
    ) =>
      `Reducing an image by more than ${ratio}× in one pass can cause noticeable quality loss. A safer target would be around ${suggestedW}×${suggestedH}.`,
    setResize: (w: number, h: number) => `Set resize to ${w}×${h}`,
    extremeUpscale: (
      srcW: number,
      srcH: number,
      targetW: number,
      targetH: number,
    ) =>
      `Upscaling from ${srcW}×${srcH} to ${targetW}×${targetH}. The output may appear blurry or pixelated.`,
    extremeUpscaleDetails:
      "Upscaling a raster image creates new pixels by guessing — the result will not have the same sharpness as a native-resolution image.",
    useOriginalSize: "Use original size",
    transparencyLoss:
      "JPEG does not support transparency. The transparent areas will be filled with a solid background color.",
    transparencyLossDetails:
      "PNG and WebP both support transparency. WebP also gives smaller file sizes while keeping the alpha channel intact.",
    switchToPng: "Switch to PNG (preserves transparency)",
    extremeDimensions: (w: number, h: number, limit: number) =>
      `This image (${w}×${h}) exceeds ${limit}px on one side. It may be slow to decode and use significant memory in the browser.`,
    extremeDimensionsDetails:
      "Large images require more memory to process client-side. Resizing to a smaller dimension before compression is recommended.",
    resizeTo1920: "Resize to 1920px width",
    tinyOutput: (w: number, h: number) =>
      `Output dimension (${w}×${h}) is very small — please check intended use.`,
    tinyOutputDetails: (limit: number) =>
      `Images smaller than ${limit}px may not show enough detail for most use cases.`,
    overkillQuality: (quality: number, kb: string) =>
      `Quality is set to ${quality}, but this file is only ${kb} KB — a lower quality setting (82–90) will save space with nearly invisible differences.`,
    overkillQualityDetails:
      "Very high quality on small files often produces nearly the same output size with negligible visual improvement.",
    setQuality85: "Set quality to 85",
  },
  id: {
    minQualityError: (quality: number, format: string) =>
      `Kualitas ${quality} terlalu rendah untuk ${format}. Gambar mungkin terlihat jelas menurun.`,
    minQualityErrorDetails: (threshold: number, format: string) =>
      `Menyetel kualitas di bawah ${threshold} untuk ${format} dapat menyebabkan artefak, banding, dan hilangnya detail yang terlihat. Kami menyarankan minimal ${threshold}.`,
    minQualityWarning: (quality: number, threshold: number, format: string) =>
      `Kualitas ${quality} berada di bawah minimum yang disarankan ${threshold} untuk ${format}.`,
    minQualityWarningDetails: (threshold: number, format: string) =>
      `Untuk ${format}, nilai kualitas di bawah ${threshold} mulai menurunkan ketajaman visual.`,
    setQuality: (threshold: number) => `Setel kualitas ke ${threshold}`,
    extremeDownscale: (
      srcW: number,
      srcH: number,
      targetW: number,
      targetH: number,
      ratio: number,
    ) =>
      `Memperkecil dari ${srcW}×${srcH} ke ${targetW}×${targetH} adalah pengurangan ${ratio}× — detail halus bisa hilang.`,
    extremeDownscaleDetails: (
      ratio: number,
      suggestedW: number,
      suggestedH: number,
    ) =>
      `Mengurangi gambar lebih dari ${ratio}× dalam satu langkah dapat menimbulkan penurunan kualitas yang terlihat. Target yang lebih aman sekitar ${suggestedW}×${suggestedH}.`,
    setResize: (w: number, h: number) => `Setel ukuran ke ${w}×${h}`,
    extremeUpscale: (
      srcW: number,
      srcH: number,
      targetW: number,
      targetH: number,
    ) =>
      `Memperbesar dari ${srcW}×${srcH} ke ${targetW}×${targetH}. Hasilnya mungkin tampak buram atau berpiksel.`,
    extremeUpscaleDetails:
      "Memperbesar gambar raster menciptakan piksel baru dengan perkiraan — hasilnya tidak akan setajam gambar resolusi aslinya.",
    useOriginalSize: "Pakai ukuran asli",
    transparencyLoss:
      "JPEG tidak mendukung transparansi. Area transparan akan diisi warna latar solid.",
    transparencyLossDetails:
      "PNG dan WebP sama-sama mendukung transparansi. WebP juga menghasilkan ukuran file lebih kecil sambil mempertahankan kanal alpha.",
    switchToPng: "Ganti ke PNG (mempertahankan transparansi)",
    extremeDimensions: (w: number, h: number, limit: number) =>
      `Gambar ini (${w}×${h}) melebihi ${limit}px di salah satu sisi. Mungkin lambat didekode dan memakai memori besar di browser.`,
    extremeDimensionsDetails:
      "Gambar besar memerlukan lebih banyak memori untuk diproses di sisi klien. Sebaiknya perkecil dimensi sebelum kompresi.",
    resizeTo1920: "Perkecil ke lebar 1920px",
    tinyOutput: (w: number, h: number) =>
      `Dimensi keluaran (${w}×${h}) sangat kecil — mohon periksa tujuan penggunaannya.`,
    tinyOutputDetails: (limit: number) =>
      `Gambar lebih kecil dari ${limit}px mungkin tidak menampilkan detail yang cukup untuk sebagian besar kebutuhan.`,
    overkillQuality: (quality: number, kb: string) =>
      `Kualitas disetel ke ${quality}, tetapi file ini hanya ${kb} KB — kualitas lebih rendah (82–90) akan menghemat ruang dengan perbedaan yang nyaris tak terlihat.`,
    overkillQualityDetails:
      "Kualitas sangat tinggi pada file kecil sering menghasilkan ukuran keluaran yang hampir sama dengan peningkatan visual yang dapat diabaikan.",
    setQuality85: "Setel kualitas ke 85",
  },
} satisfies Record<Locale, Record<string, unknown>>;

type GuardrailCopy = (typeof guardrailCopy)["en"];

function copyFor(locale: Locale): GuardrailCopy {
  return guardrailCopy[locale];
}

function getOutputFormat(settings: ProcessingSettings): string {
  const format = settings.outputFormat;
  if (format === "original" && settings.mode !== "compress") {
    return "unknown";
  }
  return format === "original" ? "jpeg" : format;
}

function evaluateMinQuality(ctx: RuleContext): GuardrailWarning | null {
  if (
    !["compress", "webp", "avif", "batch", "resize", "crop"].includes(
      ctx.settings.mode,
    )
  ) {
    return null;
  }

  const t = copyFor(ctx.locale);
  const format = getOutputFormat(ctx.settings);
  const threshold = MIN_QUALITY_PER_FORMAT[format];
  if (!threshold) return null;

  if (ctx.settings.quality < threshold) {
    const upper = format.toUpperCase();
    const isError = ctx.settings.quality < threshold - 20;
    return {
      ruleId: "min-quality",
      severity: isError ? "error" : "warning",
      message: isError
        ? t.minQualityError(ctx.settings.quality, upper)
        : t.minQualityWarning(ctx.settings.quality, threshold, upper),
      details: isError
        ? t.minQualityErrorDetails(threshold, upper)
        : t.minQualityWarningDetails(threshold, upper),
      fix: {
        label: t.setQuality(threshold),
        quality: threshold,
      },
    };
  }

  return null;
}

function evaluateSafeResize(ctx: RuleContext): GuardrailWarning | null {
  if (!ctx.settings.resizeEnabled || !ctx.file) return null;

  const t = copyFor(ctx.locale);
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
        message: t.extremeDownscale(
          srcW,
          srcH,
          targetW,
          targetH,
          Math.round(maxScale),
        ),
        details: t.extremeDownscaleDetails(
          MAX_SAFE_DOWNSCALE_RATIO,
          suggestedWidth,
          suggestedHeight,
        ),
        fix: {
          label: t.setResize(suggestedWidth, suggestedHeight),
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
      message: t.extremeUpscale(srcW, srcH, targetW, targetH),
      details: t.extremeUpscaleDetails,
      fix: {
        label: t.useOriginalSize,
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

  const t = copyFor(ctx.locale);
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
      label: t.switchToPng,
      outputFormat: "png",
    };

    return {
      ruleId: "transparency-loss",
      severity: "error",
      message: t.transparencyLoss,
      details: t.transparencyLossDetails,
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

  const t = copyFor(ctx.locale);
  const { width, height } = ctx.file;

  if (width > EXTREME_DIMENSION_WARNING || height > EXTREME_DIMENSION_WARNING) {
    const canResize = MODES_THAT_CAN_RESIZE.includes(ctx.settings.mode);
    return {
      ruleId: "extreme-dimensions",
      severity: "warning",
      message: t.extremeDimensions(width, height, EXTREME_DIMENSION_WARNING),
      details: t.extremeDimensionsDetails,
      ...(canResize && {
        fix: {
          label: t.resizeTo1920,
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
        message: t.tinyOutput(targetW, targetH),
        details: t.tinyOutputDetails(TINY_OUTPUT_WARNING),
      };
    }
  }

  return null;
}

function evaluateQualityVsSize(ctx: RuleContext): GuardrailWarning | null {
  if (
    !ctx.file ||
    !["compress", "webp", "batch"].includes(ctx.settings.mode)
  )
    return null;

  const t = copyFor(ctx.locale);

  if (ctx.settings.quality >= 95 && ctx.file.size < 100_000) {
    return {
      ruleId: "overkill-quality",
      severity: "info",
      message: t.overkillQuality(
        ctx.settings.quality,
        (ctx.file.size / 1024).toFixed(1),
      ),
      details: t.overkillQualityDetails,
      fix: {
        label: t.setQuality85,
        quality: 85,
      },
    };
  }

  return null;
}

export function evaluateGuardrails(
  settings: ProcessingSettings,
  file?: FileProfile,
  locale: Locale = defaultLocale,
): GuardrailResult {
  const ctx: RuleContext = { settings, file, locale };

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
    ...(fix.keepAspectRatio !== undefined && {
      keepAspectRatio: fix.keepAspectRatio,
    }),
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
    hasTransparency ??
    (mimeType === "image/png" ||
      mimeType === "image/webp" ||
      mimeType === "image/gif" ||
      mimeType === "image/svg+xml");

  return {
    mimeType,
    size,
    width,
    height,
    hasTransparency: impliedTransparency,
  };
}
