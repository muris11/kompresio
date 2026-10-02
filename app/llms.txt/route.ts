import { blogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { tools } from "@/lib/constants/tools";

const pages = [
  { label: "All image tools directory", path: "/tools" },
  { label: "Guides, tutorials, and blog", path: "/blog" },
  { label: "Pricing information", path: "/pricing" },
  { label: "Company info & developer story", path: "/company" },
  { label: "Privacy policy (client-side zero uploads)", path: "/privacy" },
  { label: "Terms of service", path: "/terms" },
];

export async function GET() {
  const base = siteConfig.url;

  const toolLines = tools
    .map((t) => `- ${t.name} (${t.title}): ${base}/${t.slug}`)
    .join("\n");

  const pageLines = pages
    .map((p) => `- ${p.label}: ${base}${p.path}`)
    .join("\n");

  const blogLines = blogPosts
    .slice(0, 15)
    .map((b) => `- ${b.title}: ${base}/blog/${b.slug}`)
    .join("\n");

  const body = `# Kompresio
> Fast, private, browser-first image optimization toolkit. Compress, convert, resize, clean metadata, and export images without uploading to a server.

## Overview
Kompresio is an online image optimization platform developed by Rifqy Saputra (https://rifqysaputra.dev).
It processes all image conversions, compression, resizing, and EXIF stripping locally inside the user's web browser using WebAssembly and HTML5 Canvas APIs. Zero files are uploaded to any server.

## Available Tools (15 Tools)

${toolLines}

## Key Guides & Articles

${blogLines}

## Documentation & Legal

${pageLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
