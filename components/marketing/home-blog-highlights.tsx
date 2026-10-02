import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/constants/blog";

const featuredPosts = blogPosts.slice(0, 3);

export function BlogHighlights() {
  return (
    <section className="border-y border-mist bg-linen">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-ash">
              Learn
            </p>
            <h2 className="mt-3 font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
              Guides for image optimization
            </h2>
          </div>
          <Button asChild variant="ghost" className="shrink-0">
            <Link href="/blog">
              View all articles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-mist bg-mist lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-parchment"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-fog">
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
                  <span className="inline-flex items-center gap-1 text-charcoal">
                    Read
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
