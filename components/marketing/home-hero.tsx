import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { HeroBackdrop } from "@/components/shared/hero-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";

const sample = [
  { name: "marketplace-product.jpg", from: "2.4 MB", to: "312 KB", saved: 87 },
  { name: "blog-cover.png", from: "1.8 MB", to: "420 KB", saved: 77 },
  { name: "hero-image.webp", from: "980 KB", to: "284 KB", saved: 71 },
];

export function HomeHero({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).home.hero;

  return (
    <section className="relative overflow-hidden border-b border-mist">
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="min-w-0">
          <Badge>{copy.badge}</Badge>

          <h1 className="mt-6 max-w-2xl break-words font-display text-[38px] leading-[1.06] tracking-[-0.03em] text-graphite sm:text-[46px] lg:text-display">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-8 text-ash">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={localePath(locale, "/compress-image")}>
                {copy.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href={localePath(locale, "/tools")}>
                {copy.ctaSecondary}
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {copy.trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-ash"
              >
                <span className="grid size-4 place-items-center rounded-full bg-success/10">
                  <Check className="size-3 text-success" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-mist bg-paper p-6 shadow-raised">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ash">
                {copy.sampleTitle}
              </p>
              <span className="font-mono text-[12px] text-fog">JPG → WebP</span>
            </div>

            <div className="mt-4 divide-y divide-mist border-y border-mist">
              {sample.map((file) => (
                <div key={file.name} className="py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-body-sm text-charcoal">
                      {file.name}
                    </p>
                    <p className="shrink-0 font-mono text-[13px] text-graphite">
                      {file.from} → {file.to}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-signal-blue to-cerulean"
                        style={{ width: `${file.saved}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-[12px] text-ash">
                      {file.saved}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[12px] leading-5 text-ash">
              {copy.sampleNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
