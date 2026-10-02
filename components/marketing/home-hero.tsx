import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { SkylineScene } from "@/components/shared/atmospheric-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trust = [
  "Runs in your browser",
  "Batch up to 50 files",
  "No sign-up",
];

const sample = [
  { name: "marketplace-product.jpg", from: "2.4 MB", to: "312 KB", saved: 87 },
  { name: "blog-cover.png", from: "1.8 MB", to: "420 KB", saved: 77 },
  { name: "hero-image.webp", from: "980 KB", to: "284 KB", saved: 71 },
];

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden border-b border-mist pb-12 pt-32">
      <SkylineScene />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="min-w-0 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-sm backdrop-blur-xl sm:p-10 lg:p-12">
          <Badge variant="outline" className="border-white/30 text-white hover:bg-white/10">Privacy-first image optimization</Badge>

          <h1 className="mt-6 max-w-xl break-words font-display text-[48px] leading-[1.1] tracking-[-0.02em] text-white">
            Images, made small without leaving your device
          </h1>

          <p className="mt-6 max-w-lg font-af text-[17px] leading-8 text-white/90">
            Compress, convert, resize, and clean JPG, PNG, WebP, AVIF, and HEIC
            in the browser. Nothing is uploaded, nothing is stored.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/compress-image">
                Start optimizing
                <span className="ml-2 flex size-5 items-center justify-center rounded-full border border-signal-blue">
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href="/tools">Browse all tools</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 font-af text-[13px] text-white/80"
              >
                <Check className="size-3.5 text-white/90" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-surface border border-mist bg-paper/85 p-5 shadow-hairline backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-ash">
                Example output
              </p>
              <span className="font-mono text-[12px] text-fog">
                1 → 2 → 3
              </span>
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
                        className="h-full rounded-full bg-cerulean"
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

            <p className="mt-4 text-[13px] leading-6 text-ash">
              Illustrative figures. Your results depend on the source image and
              the settings you choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
