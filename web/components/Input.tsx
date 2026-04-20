"use client";

import React, { forwardRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ... (Keep existing Input component code here, or replace if you are refactoring)

// ============================================
// REFACTORED INPUT COMPONENT
// ============================================

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helpText, ...props }, ref) => {
    const id = useId();
    const hasValue = props.value || props.defaultValue;

    return (
      <div className={cn("relative", className)}>
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "peer h-12 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-base text-neutral-50 placeholder-transparent transition-colors focus:border-emerald-500 focus:outline-none",
            error && "border-red-500"
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-3.5 cursor-text text-base text-neutral-500 transition-all",
            "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base",
            "peer-focus:top-2 peer-focus:-translate-y-full peer-focus:scale-75 peer-focus:text-emerald-400",
            hasValue && "top-2 -translate-y-full scale-75 text-neutral-500"
          )}
        >
          {label}
        </label>
        <AnimatePresence>
          {(error || helpText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                "mt-1.5 text-xs",
                error ? "text-red-400" : "text-neutral-500"
              )}
            >
              {error || helpText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";

// ============================================
// TEXTAREA COMPONENT
// ============================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, ...props }, ref) => {
    const id = useId();
    const hasValue = props.value || props.defaultValue;

    return (
      <div className={cn("relative", className)}>
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "peer w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base text-neutral-50 placeholder-transparent transition-colors focus:border-emerald-500 focus:outline-none",
            error && "border-red-500",
            "min-h-[80px]"
          )}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-3.5 cursor-text text-base text-neutral-500 transition-all",
            "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base",
            "peer-focus:top-2 peer-focus:-translate-y-full peer-focus:scale-75 peer-focus:text-emerald-400",
            hasValue && "top-2 -translate-y-full scale-75 text-neutral-500"
          )}
        >
          {label}
        </label>
        <AnimatePresence>
          {(error || helpText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                "mt-1.5 text-xs",
                error ? "text-red-400" : "text-neutral-500"
              )}
            >
              {error || helpText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
