import { FileArchive, Gauge, Images, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

const stats = [
  { icon: Images, value: "50,000+", label: "Images optimized (sample)" },
  { icon: Gauge, value: "12 TB+", label: "Bandwidth saved (estimate)" },
  { icon: FileArchive, value: "8,000+", label: "ZIP exports created (sample)" },
  { icon: ShieldCheck, value: "100%", label: "Client-side processing" },
];

export function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-4 font-mono text-3xl font-extrabold text-slate-950">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
