import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Paper-form input: flat edges, linen fill, defined by a single bottom rule.
*/
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-none border-0 border-b border-charcoal bg-linen px-3 text-[15px] text-charcoal outline-none transition-[color,background-color,border-color] duration-150 ease-out placeholder:text-fog focus:bg-paper",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
