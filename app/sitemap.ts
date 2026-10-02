import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { tools } from "@/lib/constants/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticRoutes = [
    { path: "", lastMod: today, freq: "daily" as const, priority: 1.0 },
    { path: "/tools", lastMod: today, freq: "daily" as const, priority: 0.9 },
    { path: "/blog", lastMod: today, freq: "daily" as const, priority: 0.9 },
    { path: "/company", lastMod: today, freq: "weekly" as const, priority: 0.8 },
    { path: "/pricing", lastMod: today, freq: "weekly" as const, priority: 0.8 },
    { path: "/privacy", lastMod: today, freq: "monthly" as const, priority: 0.5 },
    { path: "/terms", lastMod: today, freq: "monthly" as const, priority: 0.5 },
  ];

  const coreTools = new Set([
    "compress-image",
    "convert-to-webp",
    "resize-image",
    "compress-jpg",
    "compress-png",
    "remove-background",
  ]);

  const toolRoutes = tools.map((tool) => ({
    path: `/${tool.slug}`,
    lastMod: today,
    freq: "daily" as const,
    priority: coreTools.has(tool.slug) ? 0.95 : 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastMod: new Date(post.publishedAt),
    freq: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: route.lastMod,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
