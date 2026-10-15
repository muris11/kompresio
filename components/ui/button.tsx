import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Button system.
  - default = brand action (cerulean fill, the primary call to action)
  - dark    = single high-emphasis workbench action
  - secondary = neutral hairline outline
  - ghost   = inline text link
  - accent  = lighter brand outline for secondary emphasis
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans text-[15px] font-semibold leading-none transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "bg-cerulean text-white shadow-[0_1px_2px_rgba(16,24,40,0.08)] hover:bg-[#006aa6] hover:shadow-[0_8px_20px_-8px_rgba(0,121,189,0.55)]",
        dark: "bg-dusk text-white hover:bg-dusk/90",
        secondary:
          "border border-mist bg-paper text-graphite hover:border-fog hover:bg-linen",
        ghost:
          "text-ash hover:bg-mist/50 hover:text-graphite",
        destructive:
          "border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10",
        accent:
          "border border-cerulean/35 bg-brand-soft text-cerulean hover:border-cerulean/60",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-[16px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
