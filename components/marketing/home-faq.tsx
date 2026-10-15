import { ChevronDown, HelpCircle } from "lucide-react";

import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function HomeFaq({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).home.faq;
  const faqs = getContent(locale).home.faqs;

  return (
    <section className="border-b border-mist bg-paper/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-mist px-2 py-0.5 text-[12px] font-semibold text-ash">
            <HelpCircle className="size-3.5 text-cerulean" />
            <span>{copy.chip}</span>
          </div>
          <h2 className="mt-4 font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
            {copy.title}
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-ash">
            {copy.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0}
              className="group overflow-hidden rounded-2xl border border-mist bg-paper transition-colors open:border-fog open:shadow-subtle"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-linen/50 sm:p-6">
                <span className="font-display text-[17px] font-semibold text-graphite">
                  {faq.question}
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-mist transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="size-4 text-ash" />
                </span>
              </summary>
              <p className="px-5 pb-6 text-[15px] leading-7 text-ash sm:px-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
