"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextProps {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(
  undefined
);
const AccordionItemContext = createContext<string | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion provider");
  }
  return context;
};

export const Accordion = ({
  defaultValue,
  children,
  className,
}: {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(defaultValue || null);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={cn("w-full border-t border-neutral-800", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className="border-b border-neutral-800">{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children }: { children: React.ReactNode }) => {
  const { activeItem, setActiveItem } = useAccordion();
  const value = useContext(AccordionItemContext);
  if (!value) {
    throw new Error("AccordionTrigger must be used within AccordionItem");
  }
  const isOpen = activeItem === value;

  return (
    <button
      className="flex w-full items-center justify-between py-5 text-left text-lg font-medium text-neutral-100 hover:text-emerald-400 transition-colors"
      onClick={() => setActiveItem(isOpen ? null : value)}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn("transition-transform duration-300", isOpen && "rotate-180")}
        size={20}
      />
    </button>
  );
};

export const AccordionContent = ({ children }: { children: React.ReactNode }) => {
  const value = useContext(AccordionItemContext);
  const { activeItem } = useAccordion();
  const isOpen = useMemo(() => activeItem === value, [activeItem, value]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-base text-neutral-400 leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
