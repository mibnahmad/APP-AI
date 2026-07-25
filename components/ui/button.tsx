import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#111111] text-white shadow-[0_20px_40px_-28px_rgba(17,17,17,0.8)] hover:bg-black/90",
        outline: "border border-[#111111]/10 bg-white/95 hover:bg-black/[0.03]",
        ghost: "hover:bg-black/[0.05]",
        accent: "bg-[#C9A96E] text-[#111111] hover:brightness-95",
        soft: "border border-[#C9A96E]/20 bg-[#C9A96E]/10 text-[#111111] hover:bg-[#C9A96E]/15",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
