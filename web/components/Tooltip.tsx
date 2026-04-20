"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export const Tooltip = ({ children, content, side = "top", delay = 200 }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout;

  React.useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen || !tooltipRef.current || !triggerRef.current || !portalRoot) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    let top = 0, left = 0;

    switch (side) {
      case "top":
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 8;
        break;
    }

    tooltipRef.current.style.top = `${top + window.scrollY}px`;
    tooltipRef.current.style.left = `${left + window.scrollX}px`;

  }, [isOpen, side, portalRoot]);

  const triggerWithProps = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    "aria-describedby": isOpen ? "tooltip" : undefined,
  });

  const tooltipContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed z-tooltip rounded-md bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-sm text-neutral-100 shadow-lg"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {triggerWithProps}
      {portalRoot && createPortal(tooltipContent, portalRoot)}
    </>
  );
};
