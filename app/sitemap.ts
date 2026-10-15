import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/constants/blog";
import { getTools } from "@/lib/constants/tools";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { localeUrl } from "@/lib/seo/metadata";

type Route = {
  path: string;
  lastMod: Date;
  freq: "daily" | "weekly" | "monthly";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const posts = getBlogPosts(defaultLocale);

  const staticRoutes: Route[] = [
    { path: "/", lastMod: today, freq: "daily", priority: 1.0 },
    { path: "/tools", lastMod: today, freq: "daily", priority: 0.9 },
    { path: "/blog", lastMod: today, freq: "daily", priority: 0.9 },
    { path: "/company", lastMod: today, freq: "weekly", priority: 0.8 },
    { path: "/pricing", lastMod: today, freq: "weekly", priority: 0.8 },
    { path: "/privacy", lastMod: today, freq: "monthly", priority: 0.5 },
    { path: "/terms", lastMod: today, freq: "monthly", priority: 0.5 },
  ];

  const coreTools = new Set([
    "compress-image",
    "convert-to-webp",
    "resize-image",
    "compress-jpg",
    "compress-png",
    "remove-background",
  ]);

  const toolRoutes: Route[] = getTools(defaultLocale).map((tool) => ({
    path: `/${tool.slug}`,
    lastMod: today,
    freq: "daily",
    priority: coreTools.has(tool.slug) ? 0.95 : 0.9,
  }));

  const blogRoutes: Route[] = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastMod: new Date(post.publishedAt),
    freq: "weekly",
    priority: 0.75,
  }));

  const routes = [...staticRoutes, ...toolRoutes, ...blogRoutes];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route.path),
      lastModified: route.lastMod,
      changeFrequency: route.freq,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            localeUrl(alt, route.path),
          ]),
        ),
      },
    })),
  );
}
