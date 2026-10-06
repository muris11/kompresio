export type PdfFileLike = {
  name: string;
  size: number;
  type: string;
};

export const MAX_PDF_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_PDF_PAGES = 100;
export const MAX_RENDER_DIMENSION = 6000;
export const MAX_RENDER_PIXELS = 16_777_216;
export const MIN_RENDER_SCALE = 0.25;
export const MAX_RENDER_SCALE = 4;

export function isPdfFile(file: { name: string; type: string }) {
  return file.type === "application/pdf" || /\.pdf$/i.test(file.name);
}

export function validatePdfFile(
  file: PdfFileLike,
): { ok: true } | { ok: false; reason: string } {
  if (!isPdfFile(file)) {
    return {
      ok: false,
      reason: "PDF to WebP accepts .pdf documents only.",
    };
  }

  if (file.size > MAX_PDF_FILE_SIZE) {
    return {
      ok: false,
      reason: "PDF is larger than the 50 MB free limit.",
    };
  }

  return { ok: true };
}

function rangeBetween(start: number, end: number) {
  const from = Math.min(start, end);
  const to = Math.max(start, end);
  const pages: number[] = [];

  for (let page = from; page <= to; page += 1) {
    pages.push(page);
  }

  return pages;
}

/**
 * Parses a human page selection such as "1-3, 5, 8-" into sorted, unique,
 * clamped page numbers. An empty value (or "all") selects every page.
 */
export function parsePageSelection(input: string, totalPages: number): number[] {
  const maxPages = Math.max(1, Math.min(totalPages, MAX_PDF_PAGES));
  const normalized = input.trim().toLowerCase();

  if (!normalized || normalized === "all" || normalized === "*") {
    return rangeBetween(1, maxPages);
  }

  const selected = new Set<number>();

  for (const token of normalized.split(/[\s,;]+/).filter(Boolean)) {
    const rangeMatch = token.match(/^(\d+)?-(\d+)?$/);

    if (rangeMatch) {
      const hasStart = Boolean(rangeMatch[1]);
      const hasEnd = Boolean(rangeMatch[2]);

      if (!hasStart && !hasEnd) {
        continue;
      }

      const start = hasStart ? Number(rangeMatch[1]) : 1;
      const end = hasEnd ? Number(rangeMatch[2]) : maxPages;

      for (const page of rangeBetween(
        Math.max(1, Math.min(start, maxPages)),
        Math.max(1, Math.min(end, maxPages)),
      )) {
        selected.add(page);
      }

      continue;
    }

    const single = Number(token);
    if (Number.isInteger(single) && single >= 1 && single <= maxPages) {
      selected.add(single);
    }
  }

  const pages = [...selected].sort((a, b) => a - b).slice(0, MAX_PDF_PAGES);

  return pages.length > 0 ? pages : [1];
}

export function describePageSelection(pages: number[], totalPages: number) {
  if (pages.length === 0) {
    return "No pages selected";
  }

  if (pages.length === totalPages) {
    return `All ${totalPages} pages`;
  }

  return `${pages.length} of ${totalPages} page${totalPages === 1 ? "" : "s"}`;
}

/**
 * Caps the render scale so huge or oversized PDF pages cannot create
 * canvases that exceed safe browser memory limits.
 */
export function calculatePdfRenderScale(
  pageWidth: number,
  pageHeight: number,
  requestedScale: number,
): number {
  if (pageWidth <= 0 || pageHeight <= 0) {
    return 1;
  }

  const safeRequested = Math.min(
    Math.max(requestedScale, MIN_RENDER_SCALE),
    MAX_RENDER_SCALE,
  );
  const dimensionScale = Math.min(
    MAX_RENDER_DIMENSION / pageWidth,
    MAX_RENDER_DIMENSION / pageHeight,
  );
  const pixelScale = Math.sqrt(MAX_RENDER_PIXELS / (pageWidth * pageHeight));

  return Math.max(
    MIN_RENDER_SCALE,
    Math.min(safeRequested, dimensionScale, pixelScale),
  );
}

export function pdfPageFilename(
  baseName: string,
  pageNumber: number,
  totalPages: number,
  extension = "webp",
) {
  const padding = Math.max(2, String(totalPages).length);
  return `${baseName}-page-${String(pageNumber).padStart(padding, "0")}.${extension}`;
}

export function pdfArchiveFilename(baseName: string, extension = "zip") {
  return `${baseName}-webp-pages.${extension}`;
}
