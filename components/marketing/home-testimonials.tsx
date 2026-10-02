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
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow="In practice"
        title="Used by designers, developers, and sellers"
        description="Different jobs, the same short loop: add files, tune, and export."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-mist bg-mist md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.05}>
            <figure className="flex h-full flex-col bg-paper p-8">
              <blockquote className="flex-1 text-[17px] leading-8 text-charcoal">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-mist pt-4">
                <p className="text-body-sm text-graphite">{testimonial.name}</p>
                <p className="text-[13px] text-ash">{testimonial.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
