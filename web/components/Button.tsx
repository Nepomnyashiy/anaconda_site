"use client";

import React, { forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-500 text-neutral-950 hover:bg-emerald-400 hover:shadow-glow-emerald-medium active:bg-emerald-600",
        secondary:
          "bg-neutral-800 text-neutral-50 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600",
        ghost:
          "bg-transparent text-neutral-50 hover:bg-neutral-800 active:bg-neutral-700",
        destructive:
          "bg-red-600 text-neutral-50 hover:bg-red-500 active:bg-red-700",
        link:
          "bg-transparent text-emerald-500 p-0 h-auto leading-none hover:text-emerald-400 hover:underline underline-offset-4",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-label="Загрузка"
          />
        )}
        {!loading && iconLeft && <span className="-ml-1">{iconLeft}</span>}
        {!loading && children && <span>{children}</span>}
        {!loading && iconRight && <span className="-mr-1">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
