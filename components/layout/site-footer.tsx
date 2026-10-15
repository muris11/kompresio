import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/constants/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SiteFooter({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const footerColumns = [
    {
      title: dictionary.footer.product,
      links: [
        { label: dictionary.nav.tools, href: "/tools" },
        { label: "Compress Image", href: "/compress-image" },
        { label: "Convert to WebP", href: "/convert-to-webp" },
        { label: "PDF to WebP", href: "/pdf-to-webp" },
        { label: "Resize Image", href: "/resize-image" },
        { label: "Batch Converter", href: "/batch-converter" },
      ],
    },
    {
      title: dictionary.footer.resources,
      links: [
        { label: dictionary.nav.blog, href: "/blog" },
        { label: "WebP Guide", href: "/blog/jpg-vs-png-vs-webp-vs-avif" },
        {
          label: "Next.js Images",
          href: "/blog/how-to-prepare-images-for-nextjs",
        },
      ],
    },
    {
      title: dictionary.footer.company,
      links: [
        { label: dictionary.footer.company, href: "/company" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: dictionary.footer.developer,
      links: [
        { label: "Image Analyzer", href: "/image-analyzer" },
        { label: "AVIF Converter", href: "/convert-to-avif" },
        { label: "Health Check", href: "/api/health" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-mist bg-paper">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl font-display text-heading-sm leading-[1.2] text-graphite sm:text-heading">
          {dictionary.footer.headline}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm space-y-5">
            <BrandMark locale={locale} />
            <p className="text-body-sm leading-6 text-ash">
              {dictionary.footer.tagline}
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
                        href={localePath(locale, link.href)}
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
          <p>© 2026 Kompresio. {dictionary.footer.rights}</p>
          <p>
            {dictionary.footer.builtBy}{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noreferrer"
              className="text-charcoal transition-colors hover:text-cerulean"
            >
              {siteConfig.developer.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
