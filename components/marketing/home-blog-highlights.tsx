import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/constants/blog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";

export function BlogHighlights({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home.blog;
  const featuredPosts = getBlogPosts(locale).slice(0, 3);

  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cerulean">
              <span className="h-px w-5 bg-cerulean/40" aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
              {copy.title}
            </h2>
          </div>
          <Button asChild variant="ghost" className="shrink-0">
            <Link href={localePath(locale, "/blog")}>
              {dictionary.common.viewAllArticles}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04}>
              <Link
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group flex h-full flex-col rounded-2xl border border-mist bg-paper p-7 shadow-subtle transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-fog hover:shadow-raised"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cerulean">
                  {post.category}
                </p>
                <h3 className="mt-5 flex-1 font-display text-subheading leading-[1.25] text-graphite">
                  {post.title}
                </h3>
                <p className="mt-3 text-body-sm leading-7 text-ash line-clamp-2">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
