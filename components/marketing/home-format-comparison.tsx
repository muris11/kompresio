import { CheckCircle2, XCircle } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formats = [
  {
    name: "JPEG",
    extension: ".jpg",
    compression: "Lossy",
    transparency: false,
    animation: false,
    browserSupport: "Universal",
    bestFor: "Photos, web images",
    typicalSize: "Medium",
  },
  {
    name: "PNG",
    extension: ".png",
    compression: "Lossless",
    transparency: true,
    animation: false,
    browserSupport: "Universal",
    bestFor: "Screenshots, UI, logos",
    typicalSize: "Large",
  },
  {
    name: "WebP",
    extension: ".webp",
    compression: "Lossy + Lossless",
    transparency: true,
    animation: false,
    browserSupport: "97%",
    bestFor: "Websites, performance",
    typicalSize: "Small",
  },
  {
    name: "AVIF",
    extension: ".avif",
    compression: "Lossy + Lossless",
    transparency: true,
    animation: false,
    browserSupport: "93%",
    bestFor: "Modern web, Core Web Vitals",
    typicalSize: "Smallest",
  },
  {
    name: "GIF",
    extension: ".gif",
    compression: "Lossless",
    transparency: true,
    animation: true,
    browserSupport: "Universal",
    bestFor: "Simple animations",
    typicalSize: "Large",
  },
  {
    name: "SVG",
    extension: ".svg",
    compression: "Vector",
    transparency: true,
    animation: true,
    browserSupport: "Universal",
    bestFor: "Icons, illustrations, logos",
    typicalSize: "Small (vector)",
  },
];

function BoolIcon({ value }: { value: boolean }) {
  if (value) {
    return <CheckCircle2 className="size-4 text-emerald-600" />;
  }
  return <XCircle className="size-4 text-slate-300" />;
}

export function FormatComparison() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Format comparison
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Pick the right format for every job
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Each image format has trade-offs between size, quality, feature
            support, and browser compatibility. Use this table to choose the
            best format before you export.
          </p>
        </Reveal>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {[
                  "Format",
                  "Compression",
                  "Transparency",
                  "Animation",
                  "Browser support",
                  "Best for",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formats.map((fmt) => (
                <tr
                  key={fmt.name}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <span className="font-bold text-white">{fmt.name}</span>
                    <span className="ml-2 font-mono text-xs text-slate-500">
                      {fmt.extension}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {fmt.compression}
                  </td>
                  <td className="px-4 py-3">
                    <BoolIcon value={fmt.transparency} />
                  </td>
                  <td className="px-4 py-3">
                    <BoolIcon value={fmt.animation} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={cn(
                        "border-0",
                        fmt.browserSupport === "Universal"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-blue-500/20 text-blue-300",
                      )}
                    >
                      {fmt.browserSupport}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{fmt.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
