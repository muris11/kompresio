import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpenText } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ToolIcon } from "@/components/shared/tool-icon";
import { getBlogPosts } from "@/lib/constants/blog";
import { getContent } from "@/lib/content";
import { coerceLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";
import type { BlogPost } from "@/types/blog";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return createPageMetadata({
    title:
      locale === "id"
        ? "Blog - Panduan Optimasi Gambar Praktis"
        : "Blog - Practical Image Optimization Guides",
    description: dictionary.blog.description,
    path: "/blog",
    locale,
    keywords: [
      "image optimization blog",
      "image compression guide",
      "webp conversion tutorial",
      "core web vitals images",
      "remove exif metadata",
    ],
  });
}

export default async function BlogPage({ params }: PageProps) {
  const locale: Locale = coerceLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.blog;
  const href = (path: string) => localePath(locale, path);
  const posts = getBlogPosts(locale);
  const learningPaths = getContent(locale).blogIndex.learningPaths;
  const [featured, second, third, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={yoastGraphSchema({
          path: "/blog",
          locale,
          title: copy.title,
          description: copy.description,
          breadcrumbs: [
            { name: dictionary.common.home, path: "/" },
            { name: dictionary.common.blog, path: "/blog" },
          ],
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
          <Badge variant="muted">
            <BookOpenText className="size-3" />
            {dictionary.common.blog}
          </Badge>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <SectionHeading title={copy.title} description={copy.description} />
            <div className="flex flex-wrap gap-2">
              {copy.categories.map((category) => (
                <Badge key={category} variant="muted">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedPost post={featured} href={href} large />
          <div className="grid gap-5">
            <FeaturedPost post={second} href={href} />
            <FeaturedPost post={third} href={href} />
          </div>
        </div>

        <section className="mt-20">
          <SectionHeading
            eyebrow={dictionary.home.blog.eyebrow}
            title={copy.learningPathsTitle}
            description={copy.learningPathsDescription}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <Link key={path.href} href={href(path.href)} className="group block">
                <Card interactive className="h-full p-7">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-cerulean">
                    <ToolIcon name={path.icon} className="size-5" />
                  </span>
                  <h2 className="mt-6 font-display text-subheading text-graphite">
                    {path.title}
                  </h2>
                  <p className="mt-3 text-body-sm leading-7 text-ash">
                    {path.description}
                  </p>
                  <p className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-charcoal">
                    {dictionary.common.readPath}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow={copy.allGuidesEyebrow}
            title={copy.allGuidesTitle}
            description={copy.allGuidesDescription}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={href(`/blog/${post.slug}`)}
                className="group flex flex-col rounded-2xl border border-mist bg-paper p-7 shadow-subtle transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-fog hover:shadow-raised"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cerulean">
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
                  <span className="inline-flex items-center gap-1 font-medium text-charcoal">
                    {dictionary.common.read}
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
  href,
  large = false,
}: {
  post: BlogPost;
  href: (path: string) => string;
  large?: boolean;
}) {
  return (
    <Link href={href(`/blog/${post.slug}`)} className="group block h-full">
      <Card
        interactive
        className={large ? "flex h-full flex-col p-8 sm:p-10" : "h-full p-7"}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cerulean">
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
        <p className="mt-3 flex-1 text-body-sm leading-7 text-ash">
          {post.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-mist pt-4 text-[13px] text-ash">
          <span>{post.readTime}</span>
          <ArrowRight className="size-4 text-charcoal transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}
