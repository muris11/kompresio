import { describe, expect, it } from "vitest";

import {
  calculateCenteredCrop,
  getToolCapabilities,
  resolvePrimaryOutput,
  scaleIntoPage,
} from "./tool-behavior";

describe("tool-specific behavior", () => {
  it("maps each public tool mode to explicit capabilities", () => {
    expect(getToolCapabilities("compress")).toMatchObject({
      canCompress: true,
      canConvert: true,
      canResize: true,
      canZip: true,
      canCreatePdf: false,
    });

    expect(getToolCapabilities("pdf")).toMatchObject({
      canCreatePdf: true,
      canCompress: false,
      canZip: false,
    });

    expect(getToolCapabilities("analyzer")).toMatchObject({
      canAnalyze: true,
      canCompress: false,
      canConvert: false,
      canZip: true,
    });

    expect(getToolCapabilities("remove-bg")).toMatchObject({
      canCompress: false,
      canConvert: true,
      canResize: false,
      canZip: true,
    });
  });

  it("resolves primary output per tool instead of using one generic export", () => {
    expect(resolvePrimaryOutput("webp", "original")).toBe("webp");
    expect(resolvePrimaryOutput("avif", "jpeg")).toBe("avif");
    expect(resolvePrimaryOutput("heic", "webp")).toBe("webp");
    expect(resolvePrimaryOutput("remove-bg", "original")).toBe("png");
    expect(resolvePrimaryOutput("metadata", "original")).toBe("jpeg");
    expect(resolvePrimaryOutput("batch", "png")).toBe("png");
    expect(resolvePrimaryOutput("compress", "png")).toBe("png");
  });

  it("calculates a centered crop area for aspect presets", () => {
    expect(calculateCenteredCrop(4000, 3000, 1)).toEqual({
      x: 500,
      y: 0,
      width: 3000,
      height: 3000,
    });

    expect(calculateCenteredCrop(1200, 800, 16 / 9)).toEqual({
      x: 0,
      y: 63,
      width: 1200,
      height: 675,
    });
  });

  it("scales an image into a PDF page while preserving aspect ratio", () => {
    expect(
      scaleIntoPage({ width: 1600, height: 900 }, { width: 595, height: 842 }),
    ).toEqual({
      width: 555,
      height: 312,
      x: 20,
      y: 265,
    });
  });
});
