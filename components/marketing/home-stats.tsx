import { Reveal } from "@/components/shared/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function StatsSection({ locale }: { locale: Locale }) {
  const stats = getDictionary(locale).home.stats.items;

  return (
    <section className="border-b border-mist bg-paper">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-px overflow-hidden bg-mist px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05}>
            <div className="bg-paper px-6 py-10">
              <p className="font-mono text-3xl text-graphite">{stat.value}</p>
              <p className="mt-2 text-[13px] leading-6 text-ash">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
