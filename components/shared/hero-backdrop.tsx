import { cn } from "@/lib/utils";

/*
  Hero backdrop: a soft brand mesh gradient with a faint grid and a single
  light bloom. Pure CSS — no SVG tile field, no image asset, no runtime cost.
  The `aria-hidden` wrapper keeps it out of the accessibility tree.
*/
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_18%_8%,rgba(63,159,208,0.20),transparent_60%),radial-gradient(50%_50%_at_88%_0%,rgba(0,121,189,0.16),transparent_55%),radial-gradient(40%_40%_at_60%_100%,rgba(21,128,61,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,35,40,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,35,40,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
    </div>
  );
}
