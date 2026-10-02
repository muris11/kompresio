import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "muted" | "success" | "warning" | "destructive" | "outline";
};

/*
  Small editorial label. 4px radius, hairline border, no pill fill.
*/
const variants = {
  default: "border-signal-blue-blue/40 bg-signal-blue/8 text-cerulean",
  muted: "border-mist bg-linen text-ash",
  outline: "border-twilight/30 bg-transparent text-twilight",
  success: "border-success/35 bg-success/8 text-success",
  warning: "border-warning/35 bg-warning/8 text-warning",
  destructive: "border-destructive/35 bg-destructive/8 text-destructive",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[4px] border px-2 py-0.5 text-[12px] font-medium leading-5",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
