import type { OutputFormat } from "@/lib/image/client-processing";
import type { ToolMode } from "@/types/tool";

export type ToolCapabilities = {
  canCompress: boolean;
  canConvert: boolean;
  canResize: boolean;
  canCrop: boolean;
  canCleanMetadata: boolean;
  canAnalyze: boolean;
  canCreatePdf: boolean;
  canConvertHeic: boolean;
  canZip: boolean;
};

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PageBox = {
  width: number;
  height: number;
};

export function getToolCapabilities(mode: ToolMode): ToolCapabilities {
  return {
    canCompress: ["compress", "webp", "avif", "resize", "crop", "metadata", "batch", "heic"].includes(mode),
    canConvert: ["compress", "webp", "avif", "resize", "crop", "metadata", "batch", "heic"].includes(mode),
    canResize: ["compress", "webp", "avif", "resize", "crop", "batch"].includes(mode),
    canCrop: mode === "crop",
    canCleanMetadata: ["compress", "webp", "resize", "metadata", "batch"].includes(mode),
    canAnalyze: ["analyzer", "metadata"].includes(mode),
    canCreatePdf: mode === "pdf",
    canConvertHeic: mode === "heic",
    canZip: ["compress", "webp", "avif", "resize", "crop", "metadata", "batch", "heic", "analyzer"].includes(mode),
  };
}

export function resolvePrimaryOutput(
  mode: ToolMode,
  requested: OutputFormat,
): Exclude<OutputFormat, "original"> | "original" {
  if (mode === "webp") return "webp";
  if (mode === "avif") return "avif";
  if (mode === "heic") return requested === "webp" ? "webp" : "jpeg";
  if (mode === "metadata") return requested === "original" ? "jpeg" : requested;
  if (mode === "batch") return requested === "original" ? "webp" : requested;
  return requested;
}

export function calculateCenteredCrop(
  width: number,
  height: number,
  aspectRatio: number,
): CropArea {
  if (aspectRatio <= 0) {
    return { x: 0, y: 0, width, height };
  }

  const sourceRatio = width / height;

  if (sourceRatio > aspectRatio) {
    const cropWidth = Math.round(height * aspectRatio);
    return {
      x: Math.round((width - cropWidth) / 2),
      y: 0,
      width: cropWidth,
      height,
    };
  }

  const cropHeight = Math.round(width / aspectRatio);
  return {
    x: 0,
    y: Math.round((height - cropHeight) / 2),
    width,
    height: cropHeight,
  };
}

export function scaleIntoPage(
  image: PageBox,
  page: PageBox,
  margin = 20,
) {
  const availableWidth = page.width - margin * 2;
  const availableHeight = page.height - margin * 2;
  const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  return {
    width,
    height,
    x: Math.round((page.width - width) / 2),
    y: Math.round((page.height - height) / 2),
  };
}
