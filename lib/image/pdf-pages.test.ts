import { describe, expect, it } from "vitest";

import {
  calculatePdfRenderScale,
  describePageSelection,
  isPdfFile,
  MAX_RENDER_DIMENSION,
  MAX_RENDER_PIXELS,
  parsePageSelection,
  pdfArchiveFilename,
  pdfPageFilename,
  validatePdfFile,
} from "./pdf-pages";

describe("pdf pages", () => {
  it("detects PDF files by MIME type or extension", () => {
    expect(isPdfFile({ name: "report.pdf", type: "application/pdf" })).toBe(true);
    expect(isPdfFile({ name: "REPORT.PDF", type: "" })).toBe(true);
    expect(isPdfFile({ name: "scan.jpg", type: "image/jpeg" })).toBe(false);
  });

  it("rejects non-PDF documents and oversized uploads", () => {
    expect(validatePdfFile({ name: "scan.jpg", size: 1000, type: "image/jpeg" })).toEqual({
      ok: false,
      reason: "PDF to WebP accepts .pdf documents only.",
    });

    expect(
      validatePdfFile({
        name: "huge.pdf",
        size: 60 * 1024 * 1024,
        type: "application/pdf",
      }),
    ).toEqual({
      ok: false,
      reason: "PDF is larger than the 50 MB free limit.",
    });

    expect(
      validatePdfFile({ name: "doc.pdf", size: 1024, type: "application/pdf" }),
    ).toEqual({ ok: true });
  });

  it("selects every page when the range is empty", () => {
    expect(parsePageSelection("", 3)).toEqual([1, 2, 3]);
    expect(parsePageSelection("all", 2)).toEqual([1, 2]);
  });

  it("parses mixed ranges, singles, and open-ended ranges", () => {
    expect(parsePageSelection("1-3, 5", 8)).toEqual([1, 2, 3, 5]);
    expect(parsePageSelection("8-", 10)).toEqual([8, 9, 10]);
    expect(parsePageSelection("-3", 6)).toEqual([1, 2, 3]);
    expect(parsePageSelection("4-2", 6)).toEqual([2, 3, 4]);
  });

  it("clamps out-of-range values and removes duplicates", () => {
    expect(parsePageSelection("2, 2, 99", 4)).toEqual([2]);
    expect(parsePageSelection("-5", 4)).toEqual([1, 2, 3, 4]);
    expect(parsePageSelection("0", 4)).toEqual([1]);
    expect(parsePageSelection("nonsense", 4)).toEqual([1]);
  });

  it("caps page selection at the free page limit", () => {
    const pages = parsePageSelection("", 250);
    expect(pages).toHaveLength(100);
    expect(pages.at(-1)).toBe(100);
  });

  it("describes the active page selection", () => {
    expect(describePageSelection([1, 2, 3], 3)).toBe("All 3 pages");
    expect(describePageSelection([1, 3], 5)).toBe("2 of 5 pages");
    expect(describePageSelection([], 5)).toBe("No pages selected");
  });

  it("caps render scale for oversized pages", () => {
    expect(calculatePdfRenderScale(595, 842, 2)).toBe(2);
    expect(calculatePdfRenderScale(20000, 10000, 2)).toBeLessThan(1);

    const scale = calculatePdfRenderScale(20000, 10000, 2);
    expect(20000 * scale).toBeLessThanOrEqual(MAX_RENDER_DIMENSION + 0.001);
    expect(20000 * 10000 * scale * scale).toBeLessThanOrEqual(
      MAX_RENDER_PIXELS + 1,
    );
  });

  it("builds zero-padded page filenames and archive names", () => {
    expect(pdfPageFilename("annual-report", 3, 120)).toBe(
      "annual-report-page-003.webp",
    );
    expect(pdfPageFilename("annual-report", 3, 9)).toBe(
      "annual-report-page-03.webp",
    );
    expect(pdfArchiveFilename("annual-report")).toBe(
      "annual-report-webp-pages.zip",
    );
  });
});
