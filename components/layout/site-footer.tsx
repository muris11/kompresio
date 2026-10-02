import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/constants/site";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Tools", href: "/tools" },
      { label: "Compress Image", href: "/compress-image" },
      { label: "Convert to WebP", href: "/convert-to-webp" },
      { label: "Resize Image", href: "/resize-image" },
      { label: "Batch Converter", href: "/batch-converter" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      {
        label: "Image SEO Guide",
        href: "/blog/how-image-optimization-improves-core-web-vitals",
      },
      { label: "WebP Guide", href: "/blog/jpg-vs-png-vs-webp-vs-avif" },
      { label: "Next.js Images", href: "/blog/how-to-prepare-images-for-nextjs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Company", href: "/company" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Developer",
    links: [
      { label: "Image Analyzer", href: "/image-analyzer" },
      { label: "AVIF Converter", href: "/convert-to-avif" },
      { label: "Health Check", href: "/api/health" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-mist bg-paper">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl font-display text-heading-sm leading-[1.2] text-graphite sm:text-heading">
          Images get smaller. Nothing leaves your device.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm space-y-4">
            <p className="text-body-sm leading-6 text-ash">
              Kompresio is a browser-first image toolkit for compression,
              conversion, resize, metadata cleaning, and document workflows.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[13px] font-medium uppercase tracking-[0.08em] text-ash">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-charcoal transition-colors hover:text-cerulean"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />
        <div className="flex flex-col justify-between gap-3 text-caption text-ash sm:flex-row sm:items-center">
          <p>© 2026 Kompresio. Fast and private image optimization.</p>
          <p>
            Developed by{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-charcoal transition-colors hover:text-cerulean"
            >
              {siteConfig.developer.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
