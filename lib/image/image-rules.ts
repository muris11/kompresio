export type ImageFileLike = {
  name: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
};

export type RecommendationInput = {
  mimeType: string;
  size: number;
  width: number;
  height: number;
  hasMetadata: boolean;
  hasTransparency: boolean;
};

export type ImageRecommendation = {
  format: "jpeg" | "png" | "webp" | "avif";
  quality: number;
  resizeWidth?: number;
  stripMetadata: boolean;
  estimatedSaving: number;
  notes: string[];
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION_WARNING = 8000;

const SUPPORTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "image/heic",
  "image/heif",
]);

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1);

  return `${formatted} ${units[exponent]}`;
}

export function sanitizeFilename(filename: string) {
  const withoutExtension = filename.replace(/\.[^/.]+$/, "");
  const sanitized = withoutExtension
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return sanitized || "kompresio-image";
}

export function validateImageFile(file: ImageFileLike):
  | { ok: true; warning?: string }
  | { ok: false; reason: string } {
  if (!SUPPORTED_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      reason:
        "Unsupported image format. Use JPG, PNG, WebP, AVIF, GIF, SVG, HEIC, or HEIF.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      ok: false,
      reason: "File is larger than the 20 MB free limit.",
    };
  }

  if (
    (file.width && file.width > MAX_DIMENSION_WARNING) ||
    (file.height && file.height > MAX_DIMENSION_WARNING)
  ) {
    return {
      ok: true,
      warning:
        "This image is larger than 8000px on one side. Resize is recommended before compression.",
    };
  }

  return { ok: true };
}

export function buildRecommendation(
  input: RecommendationInput,
): ImageRecommendation {
  const notes: string[] = [];
  let format: ImageRecommendation["format"] = "webp";
  let quality = 82;
  let estimatedSaving = 58;

  if (input.mimeType === "image/jpeg" && input.size > 2 * 1024 * 1024) {
    quality = 78;
    estimatedSaving = 72;
    notes.push(
      "Large JPG photos usually compress well as WebP at balanced quality.",
    );
  }

  if (input.mimeType === "image/png") {
    format = "webp";
    if (input.hasTransparency) {
      quality = 92;
      estimatedSaving = 45;
      notes.push("Transparent PNGs are safest as WebP with high quality.");
    } else {
      quality = 82;
      estimatedSaving = 64;
      notes.push("PNG photos without transparency are usually smaller as WebP.");
    }
  }

  const recommendation: ImageRecommendation = {
    format,
    quality,
    stripMetadata: input.hasMetadata,
    estimatedSaving,
    notes,
  };

  if (Math.max(input.width, input.height) > 2400) {
    recommendation.resizeWidth = input.width >= input.height ? 1920 : 1600;
    notes.push(
      "Resize very large images before compression for faster web delivery.",
    );
  }

  if (input.hasMetadata) {
    notes.push(
      "Metadata can include camera or location details, so remove it before sharing.",
    );
  }

  return recommendation;
}
