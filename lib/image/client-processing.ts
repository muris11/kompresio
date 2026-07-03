"use client";

import { saveAs } from "file-saver";
import JSZip from "jszip";

import {
  buildRecommendation,
  formatBytes,
  sanitizeFilename,
} from "@/lib/image/image-rules";
import {
  calculateCenteredCrop,
  resolvePrimaryOutput,
  scaleIntoPage,
  type CropArea,
} from "@/lib/image/tool-behavior";
import type { ToolMode } from "@/types/tool";

export type OutputFormat = "original" | "jpeg" | "png" | "webp" | "avif";

export type ProcessingSettings = {
  mode: ToolMode;
  quality: number;
  outputFormat: OutputFormat;
  resizeEnabled: boolean;
  width: number;
  height: number;
  keepAspectRatio: boolean;
  stripMetadata: boolean;
  preset: string;
  cropAspectRatio: number;
  cropArea?: CropArea;
  cropAreaSourceId?: string;
  pdfOrientation: "portrait" | "landscape";
  pdfPageSize: "a4" | "letter";
  pdfMargin: number;
};

export type ProcessedResult = {
  kind: "image" | "pdf" | "json";
  blob: Blob;
  url: string;
  filename: string;
  originalSize: number;
  outputSize: number;
  savedBytes: number;
  savedPercent: number;
  width: number;
  height: number;
  format: string;
  processingTime: number;
  pageCount?: number;
  analysis?: ImageInspection;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type MetadataTag = {
  name: string;
  value: string;
  group?: string;
  sensitive: boolean;
};

export type ImageInspection = {
  filename: string;
  mimeType: string;
  fileSize: number;
  fileSizeReadable: string;
  width: number;
  height: number;
  megapixels: number;
  aspectRatio: string;
  estimatedMemory: string;
  metadataCount: number;
  sensitiveMetadataCount: number;
  metadataTags: MetadataTag[];
  recommendation: ReturnType<typeof buildRecommendation>;
};

export function getFormatFromFile(
  file: File,
): Exclude<OutputFormat, "original"> {
  if (file.type.includes("png")) return "png";
  if (file.type.includes("webp")) return "webp";
  if (file.type.includes("avif")) return "avif";
  return "jpeg";
}

export function resolveOutputFormat(file: File, settings: ProcessingSettings) {
  const primaryOutput = resolvePrimaryOutput(
    settings.mode,
    settings.outputFormat,
  );
  if (primaryOutput === "original") {
    return getFormatFromFile(file);
  }

  return primaryOutput;
}

export function mimeForFormat(format: Exclude<OutputFormat, "original">) {
  return format === "jpeg" ? "image/jpeg" : `image/${format}`;
}

export function extensionForFormat(format: Exclude<OutputFormat, "original">) {
  return format === "jpeg" ? "jpg" : format;
}

export async function readImageDimensions(
  file: File,
): Promise<ImageDimensions> {
  const source = await createImageBitmap(file);
  const dimensions = {
    width: source.width,
    height: source.height,
  };
  source.close();
  return dimensions;
}

export async function processImage(
  file: File,
  settings: ProcessingSettings,
): Promise<ProcessedResult> {
  if (settings.mode === "remove-bg") {
    return removeBackgroundFromImage(file, settings);
  }

  if (settings.mode === "heic" || isHeicFile(file)) {
    return convertHeicToImage(file, settings);
  }

  const startedAt = performance.now();
  const bitmap = await createImageBitmap(file);
  const outputFormat = resolveOutputFormat(file, settings);
  const quality = Math.max(0.01, Math.min(1, settings.quality / 100));
  const cropArea =
    settings.mode === "crop"
      ? (settings.cropArea ??
        calculateCenteredCrop(
          bitmap.width,
          bitmap.height,
          settings.cropAspectRatio,
        ))
      : undefined;
  const sourceSize = cropArea
    ? { width: cropArea.width, height: cropArea.height }
    : { width: bitmap.width, height: bitmap.height };
  const targetSize = getTargetDimensions(sourceSize, settings);

  const canvas = document.createElement("canvas");
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;

  const context = canvas.getContext("2d", {
    alpha: outputFormat === "png" || outputFormat === "webp",
  });

  if (!context) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }

  if (outputFormat === "jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  if (cropArea) {
    context.drawImage(
      bitmap,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  } else {
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }
  bitmap.close();

  const blob = await canvasToBlob(canvas, mimeForFormat(outputFormat), quality);
  const url = URL.createObjectURL(blob);
  const outputSize = blob.size;
  const savedBytes = Math.max(0, file.size - outputSize);
  const savedPercent =
    file.size > 0 ? Math.round((savedBytes / file.size) * 100) : 0;

  return {
    kind: "image",
    blob,
    url,
    filename: `${sanitizeFilename(file.name)}-kompresio.${extensionForFormat(outputFormat)}`,
    originalSize: file.size,
    outputSize,
    savedBytes,
    savedPercent,
    width: canvas.width,
    height: canvas.height,
    format: outputFormat.toUpperCase(),
    processingTime: Math.round(performance.now() - startedAt),
  };
}

async function removeBackgroundFromImage(
  file: File,
  settings: ProcessingSettings,
): Promise<ProcessedResult> {
  const startedAt = performance.now();
  const outputFormat: Exclude<OutputFormat, "original"> =
    settings.outputFormat === "webp" ? "webp" : "png";
  const quality = Math.max(0.01, Math.min(1, settings.quality / 100));
  const { removeBackground } = await import("@imgly/background-removal");

  const blob = await removeBackground(file, {
    model: "isnet_fp16",
    output: {
      format: mimeForFormat(outputFormat),
      quality,
    },
  });

  const bitmap = await createImageBitmap(blob);
  const targetSize = getTargetDimensions(
    { width: bitmap.width, height: bitmap.height },
    settings,
  );
  const canvas = document.createElement("canvas");
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;

  const context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const outputBlob = await canvasToBlob(
    canvas,
    mimeForFormat(outputFormat),
    quality,
  );
  const outputUrl = URL.createObjectURL(outputBlob);
  const outputSize = outputBlob.size;
  const savedBytes = Math.max(0, file.size - outputSize);

  return {
    kind: "image",
    blob: outputBlob,
    url: outputUrl,
    filename: `${sanitizeFilename(file.name)}-no-bg-kompresio.${extensionForFormat(outputFormat)}`,
    originalSize: file.size,
    outputSize,
    savedBytes,
    savedPercent:
      file.size > 0 ? Math.round((savedBytes / file.size) * 100) : 0,
    width: canvas.width,
    height: canvas.height,
    format: outputFormat.toUpperCase(),
    processingTime: Math.round(performance.now() - startedAt),
  };
}

function getTargetDimensions(
  source: ImageDimensions,
  settings: ProcessingSettings,
): ImageDimensions {
  if (!settings.resizeEnabled) {
    return { width: source.width, height: source.height };
  }

  const width = Math.max(1, settings.width || source.width);
  const height = Math.max(1, settings.height || source.height);

  if (!settings.keepAspectRatio) {
    return { width, height };
  }

  if (settings.width && !settings.height) {
    return {
      width,
      height: Math.round((source.height / source.width) * width),
    };
  }

  if (!settings.width && settings.height) {
    return {
      width: Math.round((source.width / source.height) * height),
      height,
    };
  }

  const ratio = Math.min(width / source.width, height / source.height);
  return {
    width: Math.round(source.width * ratio),
    height: Math.round(source.height * ratio),
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(
          new Error(`${mimeType} export is not supported in this browser.`),
        );
      },
      mimeType,
      quality,
    );
  });
}

export async function convertHeicToImage(
  file: File,
  settings: ProcessingSettings,
): Promise<ProcessedResult> {
  const startedAt = performance.now();
  const outputFormat = resolveOutputFormat(file, settings);
  const sourceBlob = await convertHeicBlob(file, settings);
  const bitmap = await createImageBitmap(sourceBlob);
  const targetSize = getTargetDimensions(
    { width: bitmap.width, height: bitmap.height },
    settings,
  );
  const canvas = document.createElement("canvas");
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;
  const context = canvas.getContext("2d", { alpha: outputFormat === "webp" });

  if (!context) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }

  if (outputFormat === "jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await canvasToBlob(
    canvas,
    mimeForFormat(outputFormat),
    Math.max(0.01, Math.min(1, settings.quality / 100)),
  );
  const url = URL.createObjectURL(blob);
  const outputSize = blob.size;
  const savedBytes = Math.max(0, file.size - outputSize);

  return {
    kind: "image",
    blob,
    url,
    filename: `${sanitizeFilename(file.name)}-kompresio.${extensionForFormat(outputFormat)}`,
    originalSize: file.size,
    outputSize,
    savedBytes,
    savedPercent:
      file.size > 0 ? Math.round((savedBytes / file.size) * 100) : 0,
    width: canvas.width,
    height: canvas.height,
    format: outputFormat.toUpperCase(),
    processingTime: Math.round(performance.now() - startedAt),
  };
}

export async function inspectImage(
  file: File,
  dimensions?: ImageDimensions,
): Promise<ImageInspection> {
  const resolvedDimensions =
    dimensions ||
    (isHeicFile(file) ? undefined : await readImageDimensions(file));
  const width = resolvedDimensions?.width ?? 0;
  const height = resolvedDimensions?.height ?? 0;
  const metadataTags = await readMetadataTags(file);
  const sensitiveMetadataCount = metadataTags.filter(
    (tag) => tag.sensitive,
  ).length;

  return {
    filename: file.name,
    mimeType: file.type || "unknown",
    fileSize: file.size,
    fileSizeReadable: formatBytes(file.size),
    width,
    height,
    megapixels:
      width && height ? Number(((width * height) / 1_000_000).toFixed(2)) : 0,
    aspectRatio: width && height ? `${width}:${height}` : "Unknown",
    estimatedMemory:
      width && height ? formatBytes(width * height * 4) : "Unknown",
    metadataCount: metadataTags.length,
    sensitiveMetadataCount,
    metadataTags,
    recommendation: buildQueueRecommendation(file, resolvedDimensions),
  };
}

export async function createAnalysisResult(
  file: File,
  dimensions?: ImageDimensions,
): Promise<ProcessedResult> {
  const startedAt = performance.now();
  const analysis = await inspectImage(file, dimensions);
  const payload = JSON.stringify(analysis, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  return {
    kind: "json",
    blob,
    url,
    filename: `${sanitizeFilename(file.name)}-analysis.json`,
    originalSize: file.size,
    outputSize: blob.size,
    savedBytes: 0,
    savedPercent: 0,
    width: analysis.width,
    height: analysis.height,
    format: "JSON",
    processingTime: Math.round(performance.now() - startedAt),
    analysis,
  };
}

export async function createPdfFromImages(
  files: File[],
  settings: ProcessingSettings,
): Promise<ProcessedResult> {
  if (files.length === 0) {
    throw new Error("Add at least one image before creating a PDF.");
  }

  const startedAt = performance.now();
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: settings.pdfOrientation,
    unit: "pt",
    format: settings.pdfPageSize,
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (const [index, file] of files.entries()) {
    if (index > 0) {
      doc.addPage();
    }

    const image = await imageToJpegDataUrl(file, settings);
    const placement = scaleIntoPage(
      { width: image.width, height: image.height },
      { width: pageWidth, height: pageHeight },
      settings.pdfMargin,
    );
    doc.addImage(
      image.dataUrl,
      "JPEG",
      placement.x,
      placement.y,
      placement.width,
      placement.height,
      undefined,
      "FAST",
    );
  }

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const originalSize = files.reduce((total, file) => total + file.size, 0);

  return {
    kind: "pdf",
    blob,
    url,
    filename:
      files.length === 1
        ? `${sanitizeFilename(files[0].name)}.pdf`
        : "kompresio-images.pdf",
    originalSize,
    outputSize: blob.size,
    savedBytes: 0,
    savedPercent: 0,
    width: Math.round(pageWidth),
    height: Math.round(pageHeight),
    format: "PDF",
    processingTime: Math.round(performance.now() - startedAt),
    pageCount: files.length,
  };
}

async function imageToJpegDataUrl(
  file: File,
  settings: ProcessingSettings,
): Promise<{ dataUrl: string; width: number; height: number }> {
  const sourceBlob = isHeicFile(file)
    ? await convertHeicBlob(file, settings)
    : file;
  const bitmap = await createImageBitmap(sourceBlob);
  const targetSize = getTargetDimensions(
    { width: bitmap.width, height: bitmap.height },
    settings,
  );
  const canvas = document.createElement("canvas");
  canvas.width = targetSize.width;
  canvas.height = targetSize.height;
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Canvas is not available in this browser.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return {
    dataUrl: canvas.toDataURL(
      "image/jpeg",
      Math.max(0.01, Math.min(1, settings.quality / 100)),
    ),
    width: canvas.width,
    height: canvas.height,
  };
}

async function convertHeicBlob(file: File, settings: ProcessingSettings) {
  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: Math.max(0.01, Math.min(1, settings.quality / 100)),
  });

  return Array.isArray(converted) ? converted[0] : converted;
}

async function readMetadataTags(file: File): Promise<MetadataTag[]> {
  try {
    const ExifReader = await import("exifreader");
    const load = ExifReader.load;
    const tags = await load(file, { expanded: true, async: true });
    return flattenMetadata(tags);
  } catch {
    return [];
  }
}

function flattenMetadata(input: unknown, group?: string): MetadataTag[] {
  if (!input || typeof input !== "object") {
    return [];
  }

  const tags: MetadataTag[] = [];
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (key === "Thumbnail" || key === "base64" || key === "image") {
      continue;
    }

    if (
      value &&
      typeof value === "object" &&
      ("description" in value || "value" in value)
    ) {
      const tag = value as { description?: unknown; value?: unknown };
      tags.push({
        name: key,
        group,
        value: String(tag.description ?? tag.value ?? ""),
        sensitive: isSensitiveMetadataKey(key, group),
      });
    } else if (value && typeof value === "object") {
      tags.push(...flattenMetadata(value, key));
    }
  }

  return tags.slice(0, 80);
}

function isSensitiveMetadataKey(key: string, group?: string) {
  const normalized = `${group || ""} ${key}`.toLowerCase();
  return [
    "gps",
    "latitude",
    "longitude",
    "altitude",
    "make",
    "model",
    "lens",
    "datetime",
    "date",
    "software",
    "serial",
  ].some((token) => normalized.includes(token));
}

function isHeicFile(file: File) {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)
  );
}

export function buildQueueRecommendation(
  file: File,
  dimensions?: ImageDimensions,
) {
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;

  return buildRecommendation({
    mimeType: file.type,
    size: file.size,
    width,
    height,
    hasMetadata: file.type.includes("jpeg") || file.type.includes("jpg"),
    hasTransparency: file.type.includes("png") || file.type.includes("webp"),
  });
}

export function resultToSummaryRow(file: File, result: ProcessedResult) {
  return {
    originalFilename: file.name,
    outputFilename: result.filename,
    originalSize: file.size,
    originalSizeReadable: formatBytes(file.size),
    outputSize: result.outputSize,
    outputSizeReadable: formatBytes(result.outputSize),
    savedPercent: result.savedPercent,
    outputFormat: result.format,
    width: result.width,
    height: result.height,
    processingTimeMs: result.processingTime,
    processingDate: new Date().toISOString(),
  };
}

export function summaryRowsToCsv(rows: Array<Record<string, string | number>>) {
  if (rows.length === 0) {
    return "";
  }

  const headers = Object.keys(rows[0]);
  const escapeCell = (value: string | number) =>
    `"${String(value).replaceAll('"', '""')}"`;

  return [
    headers.map(escapeCell).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCell(row[header])).join(","),
    ),
  ].join("\n");
}

export async function downloadZip(
  items: Array<{ file: File; result: ProcessedResult }>,
) {
  const zip = new JSZip();
  const summaryRows = items.map((item) =>
    resultToSummaryRow(item.file, item.result),
  );

  for (const item of items) {
    const folder = item.result.format.toLowerCase();
    zip.file(`${folder}/${item.result.filename}`, item.result.blob);
  }

  zip.file("summary.json", JSON.stringify(summaryRows, null, 2));
  zip.file("summary.csv", summaryRowsToCsv(summaryRows));

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "kompresio-export.zip");
}

export function downloadBlob(blob: Blob, filename: string) {
  saveAs(blob, filename);
}
