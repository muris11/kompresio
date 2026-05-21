import { describe, expect, it } from "vitest";

import {
  buildRecommendation,
  formatBytes,
  sanitizeFilename,
  validateImageFile,
} from "./image-rules";

function makeFile(
  name: string,
  size: number,
  type: string,
  width = 1200,
  height = 800,
) {
  return {
    name,
    size,
    type,
    width,
    height,
  };
}

describe("image rules", () => {
  it("formats bytes into readable binary units", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(2_621_440)).toBe("2.5 MB");
  });

  it("sanitizes filenames for SEO-friendly downloads", () => {
    expect(sanitizeFilename(" Foto Produk #1.JPG ")).toBe("foto-produk-1");
    expect(sanitizeFilename("résumé gambar final.png")).toBe(
      "resume-gambar-final",
    );
    expect(sanitizeFilename("   !!!   ")).toBe("kompresio-image");
  });

  it("rejects unsupported formats and files above MVP limits", () => {
    expect(validateImageFile(makeFile("photo.tiff", 120_000, "image/tiff"))).toEqual({
      ok: false,
      reason: "Unsupported image format. Use JPG, PNG, WebP, AVIF, GIF, SVG, HEIC, or HEIF.",
    });

    expect(
      validateImageFile(makeFile("large.jpg", 21 * 1024 * 1024, "image/jpeg")),
    ).toEqual({
      ok: false,
      reason: "File is larger than the 20 MB free limit.",
    });
  });

  it("returns dimension warnings without blocking valid large images", () => {
    expect(
      validateImageFile(makeFile("hero.jpg", 2_000_000, "image/jpeg", 9000, 5000)),
    ).toEqual({
      ok: true,
      warning: "This image is larger than 8000px on one side. Resize is recommended before compression.",
    });
  });

  it("recommends WebP, quality, resize, and metadata rules for large photos", () => {
    expect(
      buildRecommendation({
        mimeType: "image/jpeg",
        size: 3_400_000,
        width: 4200,
        height: 2800,
        hasMetadata: true,
        hasTransparency: false,
      }),
    ).toEqual({
      format: "webp",
      quality: 78,
      resizeWidth: 1920,
      stripMetadata: true,
      estimatedSaving: 72,
      notes: [
        "Large JPG photos usually compress well as WebP at balanced quality.",
        "Resize very large images before compression for faster web delivery.",
        "Metadata can include camera or location details, so remove it before sharing.",
      ],
    });
  });

  it("keeps transparent PNGs lossless unless compression can preserve transparency", () => {
    expect(
      buildRecommendation({
        mimeType: "image/png",
        size: 800_000,
        width: 1000,
        height: 1000,
        hasMetadata: false,
        hasTransparency: true,
      }),
    ).toMatchObject({
      format: "webp",
      quality: 92,
      stripMetadata: false,
      estimatedSaving: 45,
    });
  });
});
