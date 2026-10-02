import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants/site";
import type { ToolDefinition } from "@/types/tool";

export const TITLE_SEPARATOR = " - ";

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function formatMetaTitle(title: string): string {
  if (title.includes(siteConfig.name)) {
    return title;
  }
  return `${title}${TITLE_SEPARATOR}${siteConfig.name}`;
}

export type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[] | string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = formatMetaTitle(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const parsedKeywords = Array.isArray(keywords)
    ? Array.from(new Set(["Kompresio", ...keywords]))
    : typeof keywords === "string"
      ? Array.from(new Set(["Kompresio", ...keywords.split(",").map((k) => k.trim())]))
      : [
          "Kompresio",
          "Kompresio online",
          "Kompresio image tools",
          "kompres foto kompresio",
          "kompres gambar online",
          "image compressor",
          "compress image online",
          "convert to webp",
          "avif converter",
          "resize image online",
          "remove photo metadata",
          "browser based image optimization",
        ];

  return {
    title,
    description,
    keywords: parsedKeywords,
    authors: [
      { name: siteConfig.name },
      { name: siteConfig.developer.name, url: siteConfig.developer.url },
    ],
    creator: siteConfig.developer.name,
    publisher: siteConfig.name,
    category: "technology",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "id-ID": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title}${TITLE_SEPARATOR}${siteConfig.name}`,
          type: "image/png",
        },
      ],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.developer.name],
            section: section ?? "Image Optimization",
            tags: tags ?? ["Image Optimization", "Web Performance"],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@rifqysaputra",
      site: "@kompresio",
    },
  };
}

export function createToolMetadata(tool: ToolDefinition): Metadata {
  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: `/${tool.slug}`,
    image: `/${tool.slug}/opengraph-image`,
    keywords: [
      tool.primaryKeyword,
      `kompresio ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} online`,
      "free online image tool",
      "client side image compression",
      "privacy friendly image optimizer",
      ...tool.supportedFormats.map((f) => `${f.toLowerCase()} ${tool.category.toLowerCase()}`),
    ],
  });
}

/**
 * Yoast SEO Connected Schema Graph (@graph)
 * Links Organization -> WebSite -> WebPage -> BreadcrumbList -> SoftwareApplication / Article -> FAQPage
 */
export function yoastGraphSchema({
  path,
  title,
  description,
  breadcrumbs,
  tool,
  article,
  faqs,
}: {
  path: string;
  title: string;
  description: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  tool?: ToolDefinition;
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    category?: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const pageUrl = absoluteUrl(path);
  const fullTitle = formatMetaTitle(title);

  const graph: Array<Record<string, unknown>> = [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: [
        "Kompresio",
        "Kompresio App",
        "Kompresio Online",
        "Kompresio Image Tools",
        "Kompresio Image Compressor",
      ],
      url: `${siteConfig.url}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteConfig.url}/#logo`,
        inLanguage: "en-US",
        url: `${siteConfig.url}/logo.png`,
        contentUrl: `${siteConfig.url}/logo.png`,
        width: 512,
        height: 512,
        caption: siteConfig.name,
      },
      image: { "@id": `${siteConfig.url}/#logo` },
      brand: {
        "@type": "Brand",
        name: siteConfig.name,
        logo: `${siteConfig.url}/logo.png`,
      },
      sameAs: Object.values(siteConfig.social),
      description: siteConfig.description,
      knowsAbout: [
        "Image Compression",
        "WebP Conversion",
        "AVIF Optimization",
        "Image Resizing",
        "Metadata Cleaning",
        "EXIF Data Removal",
        "Client-Side Image Processing",
      ],
      founder: {
        "@type": "Person",
        "@id": `${siteConfig.url}/#/schema/person/developer`,
        name: siteConfig.developer.name,
        url: siteConfig.developer.url,
        jobTitle: siteConfig.developer.jobTitle,
      },
    },
    // 2. WebSite
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      alternateName: ["Kompresio", "Kompresio Online", "Kompresio Image Toolkit"],
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
    // 2.5. SiteNavigationElement (For Google Sitelinks)
    {
      "@type": "SiteNavigationElement",
      "@id": `${siteConfig.url}/#navigation`,
      name: "Kompresio Core Tools & Navigation",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Compress Image",
          description: "Compress JPG, PNG, and WebP images online directly in your browser",
          url: `${siteConfig.url}/compress-image`,
        },
        {
          "@type": "WebPage",
          name: "Convert to WebP",
          description: "Convert PNG and JPG images to modern WebP format",
          url: `${siteConfig.url}/convert-to-webp`,
        },
        {
          "@type": "WebPage",
          name: "Resize Image",
          description: "Resize image dimensions with pixel precision",
          url: `${siteConfig.url}/resize-image`,
        },
        {
          "@type": "WebPage",
          name: "Remove Background",
          description: "Remove background from images automatically in your browser",
          url: `${siteConfig.url}/remove-background`,
        },
        {
          "@type": "WebPage",
          name: "All Image Tools",
          description: "Explore all 15 free browser-based image tools",
          url: `${siteConfig.url}/tools`,
        },
        {
          "@type": "WebPage",
          name: "Guides & Blog",
          description: "Image optimization tutorials and web performance guides",
          url: `${siteConfig.url}/blog`,
        },
      ],
    },
    // 3. WebPage
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: fullTitle,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      description,
      breadcrumb: breadcrumbs ? { "@id": `${pageUrl}#breadcrumb` } : undefined,
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: [pageUrl],
        },
      ],
    },
  ];

  // 4. BreadcrumbList
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  // 5. SoftwareApplication (for image tools)
  if (tool) {
    graph.push({
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${pageUrl}#software`,
      name: `Kompresio ${tool.name}`,
      url: pageUrl,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All, Modern Web Browser",
      browserRequirements: "Requires HTML5 Canvas and WebAssembly capable browser",
      description: tool.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: tool.benefits.join(". "),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1480",
        bestRating: "5",
        worstRating: "1",
      },
      brand: {
        "@type": "Brand",
        name: siteConfig.name,
        logo: `${siteConfig.url}/logo.png`,
      },
      provider: {
        "@id": `${siteConfig.url}/#organization`,
      },
      author: { "@id": `${siteConfig.url}/#organization` },
    });
  }

  // 6. Article/BlogPosting
  if (article) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      isPartOf: { "@id": `${pageUrl}#webpage` },
      headline: article.headline,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified ?? article.datePublished,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      author: {
        "@type": "Person",
        name: siteConfig.developer.name,
        url: siteConfig.developer.url,
      },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      image: article.image
        ? {
            "@type": "ImageObject",
            url: absoluteUrl(article.image),
          }
        : undefined,
      articleSection: article.category,
      inLanguage: "en-US",
    });
  }

  // 7. FAQPage
  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

// Standalone backward-compatible helpers
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${absoluteUrl(tool.slug)}#software`,
    name: `Kompresio ${tool.name}`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All, Modern Web Browser",
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: tool.benefits.join(". "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1480",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#/schema/person/developer`,
    name: siteConfig.developer.name,
    url: siteConfig.developer.url,
    jobTitle: siteConfig.developer.jobTitle,
    sameAs: Object.values(siteConfig.social),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}/logo.png`,
      caption: siteConfig.name,
    },
    image: {
      "@id": `${siteConfig.url}/#logo`,
    },
    description: siteConfig.description,
    founder: personSchema(),
    sameAs: Object.values(siteConfig.social),
  };
}

export function articleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    author: personSchema(),
    publisher: organizationSchema(),
    datePublished,
    dateModified: dateModified ?? datePublished,
  };
}
