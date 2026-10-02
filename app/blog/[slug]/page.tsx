import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock, Home } from "lucide-react";

import { ToolCard } from "@/components/marketing/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getBlogPost } from "@/lib/constants/blog";
import { tools } from "@/lib/constants/tools";
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";
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
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: `/blog/${post.slug}/opengraph-image`,
    type: "article",
    publishedTime: post.publishedAt,
    section: post.category,
    keywords: [
      "Kompresio",
      post.category,
      "image optimization",
      "web performance",
      post.title.toLowerCase(),
    ],
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
        data={yoastGraphSchema({
          path: `/blog/${post.slug}`,
          title: post.title,
          description: post.description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ],
          article: {
            headline: post.title,
            description: post.description,
            image: `/blog/${post.slug}/opengraph-image`,
            datePublished: post.publishedAt,
            category: post.category,
          },
          faqs: post.sections.map((s) => ({
            question: s.heading,
            answer: s.body,
          })),
        })}
      />

      <article className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-3xl px-4 pt-28 pb-14 sm:py-16 lg:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[13px] text-ash">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-cerulean"
            >
              <Home className="size-3.5" />
              Home
            </Link>
            <span className="text-fog">/</span>
            <Link href="/blog" className="transition-colors hover:text-cerulean">
              Blog
            </Link>
          </nav>
          <Badge variant="muted">{post.category}</Badge>
          <h1 className="mt-6 break-words font-display text-heading-sm leading-[1.12] text-graphite sm:text-heading-lg">
            {post.title}
          </h1>
          <p className="mt-5 text-[17px] leading-8 text-charcoal">
            {post.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-5 text-[13px] text-ash">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-3.5" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </article>

      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-24">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ash">
            Contents
          </p>
          <ol className="mt-4 space-y-3 border-l border-mist pl-4">
            {post.sections.map((section) => (
              <li key={section.heading}>
                <a
                  href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`}
                  className="text-[13px] leading-6 text-ash transition-colors hover:text-cerulean"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="min-w-0">
          <div className="max-w-2xl space-y-10">
            {post.sections.map((section) => (
              <section
                key={section.heading}
                id={section.heading.toLowerCase().replaceAll(" ", "-")}
                className="scroll-mt-28"
              >
                <h2 className="font-display text-subheading text-graphite sm:text-heading-sm">
                  {section.heading}
                </h2>
                <p className="mt-4 text-[17px] leading-8 text-charcoal">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-16 border-t border-mist pt-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-subheading text-graphite">
                Related tools
              </h2>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-[13px] text-charcoal transition-colors hover:text-cerulean"
              >
                All tools
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
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
