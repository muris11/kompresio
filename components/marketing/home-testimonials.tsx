import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/shared/reveal";

const testimonials = [
  {
    quote:
      "I process about 200 product photos a week for my marketplace listings. Kompresio saves me the subscription cost of dedicated photo tools while keeping my images clean and under 200 KB.",
    name: "Rina Amelia",
    role: "Marketplace seller, Tokopedia",
  },
  {
    quote:
      "The batch WebP converter with ZIP export is the feature I use most. Drag in a folder of JPGs, set quality to 80, and get a ZIP of WebP files ready for production.",
    name: "Dimas Prayoga",
    role: "Frontend developer",
  },
  {
    quote:
      "I was surprised to see GPS coordinates and camera model info in my vacation photos. The metadata scanner caught them before I shared the album online.",
    name: "Sari Fitriani",
    role: "Graphic designer",
  },
  {
    quote:
      "Built a Next.js landing page and needed optimized hero images. Resized to 1920px, converted to WebP, and the page hit 98 Lighthouse Performance. No server upload needed.",
    name: "Bagus Wirawan",
    role: "Web developer",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        align="center"
        eyebrow="Testimonials"
        title="Used by designers, developers, and sellers"
        description="People use Kompresio for different jobs. Here is how it fits into real workflows."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
              <Quote className="size-6 text-blue-200" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                {t.quote}
              </blockquote>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-950">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
