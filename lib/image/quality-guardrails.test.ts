import { describe, expect, it } from "vitest";

import {
  applyGuardrailFix,
  buildFileProfile,
  evaluateGuardrails,
} from "./quality-guardrails";
import type { ProcessingSettings } from "./client-processing";

function makeSettings(overrides: Partial<ProcessingSettings> = {}): ProcessingSettings {
  return {
    mode: "compress",
    quality: 78,
    outputFormat: "webp",
    resizeEnabled: false,
    width: 1600,
    height: 0,
    keepAspectRatio: true,
    stripMetadata: true,
    preset: "balanced",
    cropAspectRatio: 0,
    pdfOrientation: "portrait",
    pdfPageSize: "a4",
    pdfMargin: 24,
    ...overrides,
  };
}

function makeFileProfile(overrides: {
  mimeType?: string;
  size?: number;
  width?: number;
  height?: number;
  hasTransparency?: boolean;
} = {}) {
  return buildFileProfile(
    overrides.mimeType ?? "image/jpeg",
    overrides.size ?? 2_000_000,
    overrides.width ?? 4000,
    overrides.height ?? 3000,
    overrides.hasTransparency,
  );
}

describe("quality guardrails", () => {
  describe("minimum quality rule", () => {
    it("warns when quality is too low for JPEG", () => {
      const settings = makeSettings({ quality: 20, outputFormat: "jpeg" });
      const result = evaluateGuardrails(settings, makeFileProfile());

      expect(result.hasIssues).toBe(true);
      expect(result.warnings.some((w) => w.ruleId === "min-quality")).toBe(true);
    });

    it("flags very low quality as error", () => {
      const settings = makeSettings({ quality: 5, outputFormat: "jpeg" });
      const result = evaluateGuardrails(settings, makeFileProfile());

      const minQualityWarning = result.warnings.find(
        (w) => w.ruleId === "min-quality",
      );
      expect(minQualityWarning?.severity).toBe("error");
    });

    it("passes when quality is above threshold", () => {
      const settings = makeSettings({ quality: 82, outputFormat: "webp" });
      const result = evaluateGuardrails(settings, makeFileProfile());

      const minQualityWarning = result.warnings.find(
        (w) => w.ruleId === "min-quality",
      );
      expect(minQualityWarning).toBeUndefined();
    });

    it("provides a fix with recommended quality", () => {
      const settings = makeSettings({ quality: 20, outputFormat: "jpeg" });
      const result = evaluateGuardrails(settings, makeFileProfile());

      const warning = result.warnings.find((w) => w.ruleId === "min-quality");
      expect(warning?.fix).toBeDefined();
      expect(warning?.fix?.quality).toBe(30);
      expect(warning?.fix?.label).toContain("Set quality");
    });

    it("skips rule for analyzer and metadata modes", () => {
      const settings = makeSettings({ mode: "analyzer", quality: 10 });
      const result = evaluateGuardrails(settings);

      expect(
        result.warnings.some((w) => w.ruleId === "min-quality"),
      ).toBe(false);
    });
  });

  describe("transparency preservation rule", () => {
    it("errors when PNG with transparency is exported as JPEG", () => {
      const settings = makeSettings({ outputFormat: "jpeg" });
      const file = makeFileProfile({
        mimeType: "image/png",
        hasTransparency: true,
      });
      const result = evaluateGuardrails(settings, file);

      expect(result.hasErrors).toBe(true);
      expect(
        result.warnings.some((w) => w.ruleId === "transparency-loss"),
      ).toBe(true);
    });

    it("provides a fix to switch to PNG", () => {
      const settings = makeSettings({ outputFormat: "jpeg" });
      const file = makeFileProfile({
        mimeType: "image/png",
        hasTransparency: true,
      });
      const result = evaluateGuardrails(settings, file);

      const warning = result.warnings.find(
        (w) => w.ruleId === "transparency-loss",
      );
      expect(warning?.fix?.outputFormat).toBe("png");
      expect(warning?.fix?.label).toContain("PNG");
    });

    it("passes when transparency is preserved via WebP", () => {
      const settings = makeSettings({ outputFormat: "webp" });
      const file = makeFileProfile({
        mimeType: "image/png",
        hasTransparency: true,
      });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "transparency-loss"),
      ).toBe(false);
    });

    it("passes for non-transparent formats", () => {
      const settings = makeSettings({ outputFormat: "jpeg" });
      const file = makeFileProfile({ mimeType: "image/jpeg" });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "transparency-loss"),
      ).toBe(false);
    });
  });

  describe("extreme dimensions rule", () => {
    it("warns when image exceeds 6000px on one side", () => {
      const settings = makeSettings();
      const file = makeFileProfile({ width: 8000, height: 4500 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "extreme-dimensions"),
      ).toBe(true);
    });

    it("provides a resize fix for large images", () => {
      const settings = makeSettings();
      const file = makeFileProfile({ width: 8000, height: 6000 });
      const result = evaluateGuardrails(settings, file);

      const warning = result.warnings.find(
        (w) => w.ruleId === "extreme-dimensions",
      );
      expect(warning?.fix?.resizeEnabled).toBe(true);
      expect(warning?.fix?.width).toBe(1920);
    });

    it("passes for normal-sized images", () => {
      const settings = makeSettings();
      const file = makeFileProfile({ width: 1920, height: 1080 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "extreme-dimensions"),
      ).toBe(false);
    });
  });

  describe("safe resize rule", () => {
    it("warns on extreme downscale", () => {
      const settings = makeSettings({
        resizeEnabled: true,
        width: 100,
        height: 100,
        keepAspectRatio: true,
      });
      const file = makeFileProfile({ width: 4000, height: 3000 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "extreme-downscale"),
      ).toBe(true);
    });

    it("provides a safer resize fix for extreme downscales", () => {
      const settings = makeSettings({
        resizeEnabled: true,
        width: 100,
        height: 100,
        keepAspectRatio: true,
      });
      const file = makeFileProfile({ width: 4000, height: 3000 });
      const result = evaluateGuardrails(settings, file);

      const warning = result.warnings.find(
        (w) => w.ruleId === "extreme-downscale",
      );
      expect(warning?.fix?.width).toBe(1000);
      expect(warning?.fix?.height).toBe(750);
    });

    it("passes for modest downscales", () => {
      const settings = makeSettings({
        resizeEnabled: true,
        width: 1920,
        height: 1080,
        keepAspectRatio: true,
      });
      const file = makeFileProfile({ width: 3000, height: 1690 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "extreme-downscale"),
      ).toBe(false);
    });

    it("skips resize rule when resize is disabled", () => {
      const settings = makeSettings({ resizeEnabled: false });
      const file = makeFileProfile({ width: 10000, height: 10000 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "extreme-downscale"),
      ).toBe(false);
    });
  });

  describe("quality vs size rule", () => {
    it("suggests lower quality for small files at 95+ quality", () => {
      const settings = makeSettings({ quality: 98 });
      const file = makeFileProfile({ size: 50_000, mimeType: "image/png" });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "overkill-quality"),
      ).toBe(true);
    });

    it("passes for small files with reasonable quality", () => {
      const settings = makeSettings({ quality: 85 });
      const file = makeFileProfile({ size: 50_000 });
      const result = evaluateGuardrails(settings, file);

      expect(
        result.warnings.some((w) => w.ruleId === "overkill-quality"),
      ).toBe(false);
    });
  });

  describe("applyGuardrailFix", () => {
    it("applies a quality fix correctly", () => {
      const settings = makeSettings({ quality: 10 });
      const updated = applyGuardrailFix(settings, {
        label: "Set quality to 80",
        quality: 80,
      });
      expect(updated.quality).toBe(80);
      expect(updated.preset).toBe("custom");
    });

    it("applies a format fix correctly", () => {
      const settings = makeSettings({ outputFormat: "jpeg" });
      const updated = applyGuardrailFix(settings, {
        label: "Switch to PNG",
        outputFormat: "png",
      });
      expect(updated.outputFormat).toBe("png");
    });

    it("applies a resize fix correctly", () => {
      const settings = makeSettings({ resizeEnabled: false });
      const updated = applyGuardrailFix(settings, {
        label: "Enable resize",
        resizeEnabled: true,
        width: 1920,
        height: 1080,
      });
      expect(updated.resizeEnabled).toBe(true);
      expect(updated.width).toBe(1920);
      expect(updated.height).toBe(1080);
    });
  });

  describe("buildFileProfile", () => {
    it("correctly detects implied transparency from MIME type", () => {
      const profile = buildFileProfile("image/png", 1000, 100, 100);
      expect(profile.hasTransparency).toBe(true);
    });

    it("accepts explicit hasTransparency override", () => {
      const profile = buildFileProfile("image/jpeg", 1000, 100, 100, false);
      expect(profile.hasTransparency).toBe(false);
    });
  });

  describe("no file profile", () => {
    it("still returns valid result without file context", () => {
      const settings = makeSettings({ quality: 20, outputFormat: "jpeg" });
      const result = evaluateGuardrails(settings);

      expect(result.hasIssues).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0].ruleId).toBe("min-quality");
    });
  });
});
