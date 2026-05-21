import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const normalized = Math.max(0, Math.min(100, value));
  return (
    <div
      aria-label="Progress"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalized}
      role="progressbar"
      className={cn("h-2 overflow-hidden rounded-full bg-slate-100", className)}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
        style={{ width: `${normalized}%` }}
      />
    </div>
  );
}
