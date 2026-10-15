import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?:
    | "default"
    | "muted"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
};

/*
  Small editorial label. Rounded-square, hairline border, colored text — no
  capsule shape and no filled background, so labels stay light and do not read
  as pills wrapped around the copy.
*/
const variants = {
  default: "border-cerulean/30 text-cerulean",
  muted: "border-mist text-ash",
  outline: "border-twilight/25 text-twilight",
  success: "border-success/35 text-success",
  warning: "border-warning/40 text-warning",
  destructive: "border-destructive/35 text-destructive",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-transparent px-2 py-0.5 text-[12px] font-semibold leading-5",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
