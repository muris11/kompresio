import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Search,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/constants/blog";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Kompresio Blog",
  description:
    "Practical image optimization guides for compression, WebP, AVIF, resize, metadata privacy, batch workflows, image-to-PDF, SEO, and developer workflows.",
  path: "/blog",
});

const categories = [
  "Compression",
  "Formats",
  "Resize",
  "SEO",
  "Privacy",
  "Developer",
  "Workflow",
  "Document",
];

const learningPaths = [
  {
    title: "For website performance",
    description: "Resize large assets, convert to WebP or AVIF, and protect Core Web Vitals.",
    href: "/blog/how-image-optimization-improves-core-web-vitals",
    icon: TrendingUp,
  },
  {
    title: "For privacy-safe sharing",
    description: "Analyze metadata, clean hidden fields, and export a fresh image before publishing.",
    href: "/blog/how-to-remove-metadata-from-photos",
    icon: ShieldCheck,
  },
  {
    title: "For document uploads",
    description: "Convert photos and scanned images into practical PDF files with page controls.",
    href: "/blog/how-to-create-image-to-pdf-for-documents",
    icon: FileText,
  },
];

export default function BlogPage() {
  const [featured, second, third, ...posts] = blogPosts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Badge variant="success">
            <BookOpenText className="size-3.5" />
            Blog
          </Badge>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <SectionHeading
              title="Image optimization guides for real workflows"
              description="Learn compression, conversion, resize, metadata privacy, HEIC handling, batch export, image-to-PDF, SEO, and developer handoff patterns."
            />
            <Card className="p-5">
              <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-slate-500">
                <Search className="size-5" />
                <span className="text-sm">Search-ready knowledge hub</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="muted">
                    {category}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedPost post={featured} large />
          <div className="grid gap-5">
            <FeaturedPost post={second} />
            <FeaturedPost post={third} />
          </div>
        </div>

        <section className="mt-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Learning paths"
              title="Pick the guide that matches your job"
              description="Start with the outcome you need: faster pages, safer sharing, or upload-ready documents."
            />
            <Button asChild variant="secondary">
              <Link href="/tools">
                Open tools
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.href} href={path.href} className="group block">
                  <Card className="h-full p-6 transition hover:-translate-y-1 hover:border-blue-200">
                    <span className="grid size-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                      <Icon className="size-5" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-slate-950">
                      {path.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {path.description}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                      Read path
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="All guides"
            title="Complete Kompresio article library"
            description="Every article links back to the relevant working tool so the guide can turn into action immediately."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <Card className="h-full p-5 transition hover:-translate-y-1 hover:border-blue-200">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="muted">{post.category}</Badge>
                    <FolderOpen className="size-4 text-slate-400" />
                  </div>
                  <h2 className="mt-5 break-words text-xl font-bold text-slate-950">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {post.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {post.publishedAt}
                    </span>
                    <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

function FeaturedPost({
  post,
  large = false,
}: {
  post: typeof blogPosts[number];
  large?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card
        className={large
          ? "flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-blue-200"
          : "h-full p-6 transition hover:-translate-y-1 hover:border-blue-200"}
      >
        {large ? (
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white sm:p-10">
            <Badge className="border-white/20 bg-white/10 text-white">{post.category}</Badge>
            <p className="mt-12 font-mono text-5xl font-bold">87%</p>
            <p className="mt-3 max-w-sm text-blue-50">
              Example saving from resizing and converting a heavy JPG into a web-ready file.
            </p>
          </div>
        ) : null}
        <div className={large ? "flex flex-1 flex-col p-7 sm:p-10" : ""}>
          {!large ? <Badge>{post.category}</Badge> : null}
          <h2 className={large ? "text-3xl font-extrabold text-slate-950" : "mt-5 text-xl font-bold text-slate-950"}>
            {post.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="size-3.5" />
              Practical guide
            </span>
          </div>
          <p className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
            Read guide
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </p>
        </div>
      </Card>
    </Link>
  );
}
