"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/shared/reveal";

export const HOME_FAQS = [
  {
    question: "What is Kompresio and how does it work?",
    answer:
      "Kompresio is a privacy-first, browser-based image optimization and format conversion suite. Powered by WebAssembly and HTML5 Canvas APIs, Kompresio processes your images entirely inside your local device memory. This means compression, conversion, and resizing happen instantly without ever uploading your files to any remote server.",
  },
  {
    question: "Is Kompresio free to use? Are there limits or watermarks?",
    answer:
      "Yes, Kompresio is completely free to use. There are no watermarks, no account registration required, and no subscription fees. You can compress individual images or batch-process up to 50 files at once and export them as a single convenient ZIP file.",
  },
  {
    question: "Are my photos private and secure on Kompresio?",
    answer:
      "Yes. Absolute privacy is the foundational pillar of Kompresio. Unlike traditional converters that upload your personal or client photos to third-party cloud servers, Kompresio performs 100% of processing locally on your computer or phone. Your files never touch a remote network or storage system.",
  },
  {
    question: "What image formats does Kompresio support?",
    answer:
      "Kompresio supports all major web and camera image formats, including JPG, JPEG, PNG, WebP, AVIF, HEIC, GIF, and SVG. You can compress files, convert between formats (such as JPG to WebP or PNG to AVIF), resize dimensions, and strip EXIF camera metadata.",
  },
  {
    question: "Can I use Kompresio on mobile phones (Android & iPhone)?",
    answer:
      "Yes! Kompresio is designed from the ground up to be ultra-fast and lightweight on mobile devices. It works smoothly in Safari on iOS, Chrome on Android, and all modern mobile web browsers.",
  },
  {
    question: "Apa itu Kompresio dan bagaimana cara kompres gambar online gratis?",
    answer:
      "Kompresio adalah platform kompresi dan konversi foto online gratis yang aman dan menjaga privasi penuh. Cukup unggah foto JPG, PNG, atau WebP Anda, pilih persentase kompresi atau resolusi yang diinginkan, dan unduh hasilnya seketika tanpa kompromi kualitas dan tanpa watermark.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="border-b border-mist bg-paper/60 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-mist bg-linen px-3.5 py-1 text-[13px] font-medium text-ash">
            <HelpCircle className="size-3.5 text-signal-blue" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-4 font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
            Frequently Asked Questions about Kompresio
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-ash">
            Find answers regarding how Kompresio works, privacy policies, supported
            formats, and client-side performance.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-mist rounded-2xl border border-mist bg-paper shadow-subtle">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-linen/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[17px] font-medium text-graphite sm:text-[18px]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-mist bg-linen transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-paper" : ""
                    }`}
                  >
                    <ChevronDown className="size-4 text-ash" />
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-mist/40 bg-linen/30 px-6 pt-3 pb-6">
                    <p className="font-af text-[15px] leading-7 text-ash sm:text-[16px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
