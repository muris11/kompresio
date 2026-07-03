import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
        userAgent: "GoogleOther",
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
  };
}
