import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileArchive,
  Lock,
  UploadCloud,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const trustBadges = ["Browser-based", "Batch ready", "WebP and AVIF", "No sign-up required"];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
        <Reveal>
          <div className="min-w-0">
            <Badge variant="success">
              <Lock className="size-3.5" />
              Privacy-first image optimization
            </Badge>
            <h1 className="mt-6 max-w-3xl break-words text-4xl font-extrabold leading-[1.08] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              Compress and convert images in seconds
            </h1>
            <p className="mt-6 max-w-2xl break-words text-base leading-8 text-slate-600 sm:text-lg">
              Optimize JPG, PNG, WebP, AVIF, and HEIC images directly in your
              browser. Kompresio is fast, private, and built for websites,
              documents, marketplaces, and social media.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/compress-image">
                  Start optimizing
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/tools">Explore all tools</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <Badge key={badge} variant="muted">
                  <CheckCircle2 className="size-3.5" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <HeroUploadPanel />
        </Reveal>
      </div>
    </section>
  );
}

function HeroUploadPanel() {
  return (
    <Card className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border-slate-200/80 bg-white/86 p-4 backdrop-blur sm:p-5">
      <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-6">
        <div className="grid place-items-center text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-white text-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.16)]">
            <UploadCloud className="size-7" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-slate-950">
            Drop images here or browse
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
            Supports JPG, PNG, WebP, AVIF, HEIC, GIF, and SVG. Your images stay
            on your device for basic tools.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {[
          { name: "marketplace-product.jpg", from: "2.4 MB", to: "312 KB", saved: 87 },
          { name: "blog-cover.png", from: "1.8 MB", to: "420 KB", saved: 77 },
          { name: "hero-image.webp", from: "980 KB", to: "284 KB", saved: 71 },
        ].map((file) => (
          <div
            key={file.name}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">
                  {file.name}
                </p>
                <p className="font-mono text-xs text-slate-500">
                  {file.from} → {file.to}
                </p>
              </div>
              <Badge variant="success">Saved {file.saved}%</Badge>
            </div>
            <Progress value={file.saved} className="mt-3" />
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        <Button variant="secondary" className="min-w-0 px-2 text-xs min-[360px]:text-sm">
          <Download className="size-4" />
          Single file
        </Button>
        <Button variant="accent" className="min-w-0 px-2 text-xs min-[360px]:text-sm">
          <FileArchive className="size-4" />
          ZIP export
        </Button>
      </div>
    </Card>
  );
}
