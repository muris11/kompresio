import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api", "/internal", "/dashboard"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api", "/internal", "/dashboard"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api", "/internal"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api", "/internal"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
