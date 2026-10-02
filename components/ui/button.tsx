import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Editorial button system.
  - outlined signal blue = primary marketing action (border only, no fill)
  - dark = the single filled button, reserved for high-emphasis workbench actions
  - secondary = neutral outlined (twilight)
  - ghost = inline text link
  No decorative shadows; identity comes from the border.
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-af text-[15px] font-medium leading-none transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "border border-signal-blue-blue bg-transparent text-signal-blue-blue hover:bg-signal-blue/8",
        dark: "border border-twilight bg-dusk text-white hover:bg-dusk/90",
        secondary:
          "border border-twilight bg-transparent text-twilight hover:bg-twilight/6",
        ghost:
          "border border-transparent text-charcoal hover:bg-linen hover:text-graphite",
        destructive:
          "border border-destructive bg-transparent text-destructive hover:bg-destructive/8",
        accent:
          "border border-cerulean bg-transparent text-cerulean hover:bg-cerulean/8",
      },
      size: {
        sm: "px-3 py-[5px]",
        md: "px-3 py-[5px]",
        lg: "px-4 py-2",
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
