import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock, Home } from "lucide-react";

import { ToolCard } from "@/components/marketing/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPosts, getBlogPost } from "@/lib/constants/blog";
import { tools } from "@/lib/constants/tools";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo/metadata";
import type { ToolDefinition } from "@/types/tool";

type BlogDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: `${post.title} | Kompresio Blog`,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: `/blog/${post.slug}/opengraph-image`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedTools = post.relatedTools
    .map((toolSlug) => tools.find((tool) => tool.slug === toolSlug))
    .filter((tool): tool is ToolDefinition => Boolean(tool));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-blue-600">
              <Home className="size-4" />
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
          </nav>
          <Badge>{post.category}</Badge>
          <h1 className="mt-6 break-words text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {post.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </article>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8 lg:py-24">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <h2 className="text-sm font-bold text-slate-950">
              Table of contents
            </h2>
            <ol className="mt-4 space-y-3">
              {post.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`}
                    className="text-sm text-slate-600 hover:text-blue-600"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </Card>
        </aside>

        <div className="min-w-0">
          <Card className="p-6 sm:p-8">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section
                  key={section.heading}
                  id={section.heading.toLowerCase().replaceAll(" ", "-")}
                  className="scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-slate-950">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </Card>

          <section className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-950">
                Related tools
              </h2>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600"
              >
                All tools
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
