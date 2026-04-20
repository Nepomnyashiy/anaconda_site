"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-2xl p-6 transition-all duration-300 ease-out-quad",
  {
    variants: {
      variant: {
        glass:
          "bg-bg-glass backdrop-blur-md border border-neutral-800 shadow-elevation-2",
        metal:
          "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700 shadow-elevation-3",
        outlined: "bg-transparent border border-neutral-700 hover:border-neutral-600",
        elevated: "bg-neutral-900 shadow-elevation-4 border border-neutral-800",
        case: "bg-gradient-to-br from-neutral-900 to-transparent border border-emerald-900/40 shadow-elevation-3",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, className }),
          interactive && "group cursor-pointer hover:-translate-y-1 hover:shadow-elevation-4"
        )}
        {...props}
      >
        {interactive && (
          <div
            className="absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              borderImage:
                "radial-gradient(400px at 50% 0%, rgba(0, 229, 209, 0.8) 0%, transparent 70%) 1",
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
