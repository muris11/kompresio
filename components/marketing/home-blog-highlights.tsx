import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Clock } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/constants/blog";

const featuredPosts = blogPosts.slice(0, 6);

export function BlogHighlights() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Learn
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Guides and tutorials for image optimization
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Practical articles about compression, formats, resize, metadata
              privacy, and developer workflows.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/blog">
              View all articles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.04}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col p-5 transition hover:-translate-y-1 hover:border-blue-200">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="muted">{post.category}</Badge>
                    <BookOpenText className="size-4 text-slate-400" />
                  </div>
                  <h3 className="mt-4 flex-1 text-base font-bold text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
