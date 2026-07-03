import { siteConfig } from "@/lib/constants/site";

const tools = [
  { label: "Image Compressor", path: "/compress-image" },
  { label: "Convert to WebP", path: "/convert-to-webp" },
  { label: "Convert to AVIF", path: "/convert-to-avif" },
  { label: "Resize Image", path: "/resize-image" },
  { label: "Crop Image", path: "/crop-image" },
  { label: "Metadata Cleaner", path: "/metadata-cleaner" },
  { label: "Image Analyzer", path: "/image-analyzer" },
  { label: "Batch Image Converter", path: "/batch-converter" },
  { label: "Image to PDF", path: "/image-to-pdf" },
  { label: "Compress JPG", path: "/compress-jpg" },
  { label: "Compress PNG", path: "/compress-png" },
  { label: "HEIC to JPG", path: "/heic-to-jpg" },
  { label: "Remove Background", path: "/remove-bg" },
];

const pages = [
  { label: "All tools", path: "/tools" },
  { label: "Guides and blog", path: "/blog" },
  { label: "Pricing", path: "/pricing" },
  { label: "Company info", path: "/company" },
  { label: "Privacy policy", path: "/privacy" },
  { label: "Terms of service", path: "/terms" },
];

export async function GET() {
  const base = siteConfig.url;

  const toolLines = tools
    .map((t) => `- ${t.label}: ${base}${t.path}`)
    .join("\n");

  const pageLines = pages
    .map((p) => `- ${p.label}: ${base}${p.path}`)
    .join("\n");

  const body = `# Kompresio
> Fast, private, browser-based image optimization toolkit. Compress, convert, resize, clean metadata, and export images without uploading to a server.

## Core tools

${toolLines}

## Documentation

${pageLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
