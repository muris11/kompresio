import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/constants/blog";
import { siteConfig } from "@/lib/constants/site";
import { tools } from "@/lib/constants/tools";

const staticRoutes = ["", "/company", "/tools", "/blog", "/privacy", "/terms", "/pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...tools.map((tool) => `/${tool.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-05-21"),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.includes("blog") ? 0.7 : 0.9,
  }));
}
