export const siteConfig = {
  name: "Kompresio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kompresio.app",
  description:
    "Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Kompresio",
  developer: {
    name: "Rifqy Saputra",
    url: "https://rifqysaputra.dev",
    label: "rifqysaputra.dev",
  },
  links: {
    company: "/company",
    tools: "/tools",
    compress: "/compress-image",
    webp: "/convert-to-webp",
    resize: "/resize-image",
    blog: "/blog",
    privacy: "/privacy",
    terms: "/terms",
  },
};

export const primaryNav = [
  { label: "Tools", href: "/tools" },
  { label: "Compress", href: "/compress-image" },
  { label: "Convert", href: "/convert-to-webp" },
  { label: "Resize", href: "/resize-image" },
  { label: "Blog", href: "/blog" },
];
