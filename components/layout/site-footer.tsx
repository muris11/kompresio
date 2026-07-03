import Link from "next/link";

import { Logo } from "@/components/layout/logo";
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
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm space-y-4">
            <Logo />
            <p className="text-sm leading-6 text-slate-600">
              Fast and private image optimization for websites, documents,
              marketplaces, and modern content workflows.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold text-slate-950">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition hover:text-blue-600"
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
        <div className="flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 Kompresio. Fast and private image optimization.</p>
          <p>
            Developed by{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-700 transition hover:text-blue-600"
            >
              {siteConfig.developer.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
