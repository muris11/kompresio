import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-lg border border-mist bg-linen px-3 text-[15px] text-charcoal outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-fog focus:border-cerulean/60 focus:bg-paper focus:ring-4 focus:ring-cerulean/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
