"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-800 text-neutral-50 hover:bg-neutral-800/80",
        emerald:
          "border-transparent bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        violet:
          "border-transparent bg-violet-500/10 text-violet-400 hover:bg-violet-500/20",
        success:
          "border-transparent bg-green-500/10 text-green-400 hover:bg-green-500/20",
        warning:
          "border-transparent bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
        error:
          "border-transparent bg-red-500/10 text-red-400 hover:bg-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dotVariants = cva("w-1.5 h-1.5 rounded-full", {
  variants: {
    variant: {
      default: "bg-neutral-400",
      emerald: "bg-emerald-400",
      violet: "bg-violet-400",
      success: "bg-green-400",
      warning: "bg-amber-400",
      error: "bg-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot = false, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className={cn(dotVariants({ variant }))}>
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotVariants({ variant })
            )}
          />
        </span>
      )}
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants };
