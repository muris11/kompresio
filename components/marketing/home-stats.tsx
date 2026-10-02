import { Reveal } from "@/components/shared/reveal";

const stats = [
  { value: "14+", label: "Free tools, no sign-up" },
  { value: "20 MB", label: "Max file size per image" },
  { value: "50", label: "Files per batch queue" },
  { value: "100%", label: "Processed in your browser" },
];

export function StatsSection() {
  return (
    <section className="border-b border-mist bg-paper">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-px bg-mist px-0 lg:grid-cols-4">
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
