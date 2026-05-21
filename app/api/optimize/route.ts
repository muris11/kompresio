import { NextResponse } from "next/server";
import sharp from "sharp";

import { sanitizeFilename } from "@/lib/image/image-rules";

export const runtime = "nodejs";

const MAX_SERVER_FILE_SIZE = 20 * 1024 * 1024;
const supportedOutputFormats = new Set(["jpeg", "png", "webp", "avif"]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Upload a file field named file. Client-side processing is recommended for MVP workflows.",
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_SERVER_FILE_SIZE) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "File is larger than the 20 MB server-side safeguard. Use browser processing or direct object storage for larger files.",
      },
      { status: 413 },
    );
  }

  const requestedFormat = String(formData.get("format") || "webp").toLowerCase();
  const format = supportedOutputFormats.has(requestedFormat)
    ? requestedFormat
    : "webp";
  const quality = clamp(Number(formData.get("quality") || 78), 1, 100);
  const width = Number(formData.get("width") || 0) || undefined;
  const height = Number(formData.get("height") || 0) || undefined;
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  let pipeline = sharp(inputBuffer).rotate();

  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (format === "jpeg") {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (format === "png") {
    pipeline = pipeline.png({ compressionLevel: 9, quality });
  } else if (format === "avif") {
    pipeline = pipeline.avif({ quality, effort: 4 });
  } else {
    pipeline = pipeline.webp({ quality });
  }

  const output = await pipeline.toBuffer();
  const extension = format === "jpeg" ? "jpg" : format;
  const filename = `${sanitizeFilename(file.name)}-kompresio.${extension}`;

  return new NextResponse(new Uint8Array(output), {
    headers: {
      "Content-Type": `image/${format === "jpeg" ? "jpeg" : format}`,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Kompresio-Mode": "optional-server-processing",
    },
  });
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}
