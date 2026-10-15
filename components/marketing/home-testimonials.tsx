"use client";

import { SectionHeading } from "@/components/marketing/section-heading";
import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { Reveal } from "@/components/shared/reveal";
import { getContent } from "@/lib/content";

export function Testimonials() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const copy = dictionary.home.testimonials;
  const testimonials = getContent(locale).home.testimonials;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.05}>
            <figure className="flex h-full flex-col rounded-2xl border border-mist bg-paper p-8 shadow-subtle">
              <blockquote className="flex-1 text-[17px] leading-8 text-charcoal">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-mist pt-4">
                <p className="text-body-sm font-medium text-graphite">
                  {testimonial.name}
                </p>
                <p className="text-[13px] text-ash">{testimonial.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
