import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpenText, FileText, ShieldCheck, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
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

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Badge variant="muted">
            <BookOpenText className="size-3" />
            Blog
          </Badge>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <SectionHeading
              title="Image optimization guides for real workflows"
              description="Learn compression, conversion, resize, metadata privacy, HEIC handling, batch export, image-to-PDF, SEO, and developer handoff patterns."
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="muted">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedPost post={featured} large />
          <div className="grid gap-5">
            <FeaturedPost post={second} />
            <FeaturedPost post={third} />
          </div>
        </div>

        <section className="mt-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Learning paths"
              title="Pick the guide that matches your job"
              description="Start with the outcome you need: faster pages, safer sharing, or upload-ready documents."
            />
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.href} href={path.href} className="group block">
                  <Card className="h-full p-7 transition-colors hover:border-twilight/25">
                    <Icon className="size-5 text-charcoal" />
                    <h2 className="mt-7 font-display text-subheading text-graphite">
                      {path.title}
                    </h2>
                    <p className="mt-3 text-body-sm leading-7 text-ash">
                      {path.description}
                    </p>
                    <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-charcoal">
                      Read path
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="All guides"
            title="Complete Kompresio article library"
            description="Every article links back to the relevant working tool so the guide can turn into action immediately."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-mist bg-mist sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-paper p-7 transition-colors hover:bg-parchment"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-fog">
                  {post.category}
                </p>
                <h2 className="mt-5 break-words font-display text-subheading leading-[1.25] text-graphite">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-body-sm leading-7 text-ash line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-mist pt-4 text-[13px] text-ash">
                  <span>{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-charcoal">
                    Read
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
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
        className={
          large
            ? "flex h-full flex-col p-8 transition-colors hover:border-twilight/25 sm:p-10"
            : "h-full p-7 transition-colors hover:border-twilight/25"
        }
      >
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-fog">
          {post.category}
        </p>
        <h2
          className={
            large
              ? "mt-6 font-display text-heading-sm leading-[1.15] text-graphite"
              : "mt-5 font-display text-subheading leading-[1.25] text-graphite"
          }
        >
          {post.title}
        </h2>
        <p className="mt-4 flex-1 text-body-sm leading-7 text-ash">
          {post.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-mist pt-4 text-[13px] text-ash">
          <span>{post.readTime}</span>
          <span className="inline-flex items-center gap-2 text-charcoal">
            Read guide
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
