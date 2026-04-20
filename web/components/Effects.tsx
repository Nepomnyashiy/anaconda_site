"use client";

import { cn } from "@/lib/utils";

export const Glass = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-bg-glass backdrop-blur-md border border-neutral-800", className)}>
    {children}
  </div>
);

export const NeonGlow = ({ children, className, color = "emerald" }: { children: React.ReactNode; className?: string; color?: "emerald" | "violet" }) => (
  <div className={cn(
    "relative",
    color === "emerald" && "shadow-glow-emerald-medium",
    color === "violet" && "shadow-glow-violet-medium",
    className
  )}>
    {children}
  </div>
);

export const MetallicSurface = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-gradient-to-b from-neutral-800 to-neutral-900 border-y border-neutral-700", className)}>
    {children}
  </div>
);

export const SegmentDivider = ({ className, orientation = "vertical" }: { className?: string; orientation?: "vertical" | "horizontal" }) => (
    <div className={cn(
        "bg-gradient-to-b from-transparent via-emerald-500 to-transparent",
        orientation === "vertical" ? "w-px h-full" : "h-px w-full",
        className
    )} />
);

export const GridBackground = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <div className={cn("w-full bg-bg-primary bg-grid-subtle", className)}>
        {children}
    </div>
);
