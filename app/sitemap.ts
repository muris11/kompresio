import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { tools } from "@/lib/constants/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", lastMod: "2026-07-03", freq: "daily" as const, priority: 1 },
    { path: "/company", lastMod: "2026-07-03", freq: "weekly" as const, priority: 0.9 },
    { path: "/tools", lastMod: "2026-07-03", freq: "weekly" as const, priority: 0.9 },
    { path: "/blog", lastMod: "2026-07-03", freq: "daily" as const, priority: 0.9 },
    { path: "/pricing", lastMod: "2026-07-03", freq: "monthly" as const, priority: 0.8 },
    { path: "/privacy", lastMod: "2026-07-03", freq: "monthly" as const, priority: 0.6 },
    { path: "/terms", lastMod: "2026-07-03", freq: "monthly" as const, priority: 0.6 },
  ];

  const toolRoutes = tools.map((tool) => ({
    path: `/${tool.slug}`,
    lastMod: "2026-07-03",
    freq: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastMod: post.publishedAt,
    freq: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(route.lastMod),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
