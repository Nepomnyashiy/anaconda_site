"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

// ============================================
// DROPDOWN MENU
// ============================================

export const DropdownMenu = ({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-56 origin-top-right rounded-xl bg-neutral-800 border border-neutral-700 shadow-elevation-4 z-dropdown"
          >
            <div className="p-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DropdownMenuItem = ({ children, onSelect }: { children: React.ReactNode; onSelect?: () => void }) => {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-200 rounded-md hover:bg-neutral-700 cursor-pointer transition-colors"
    >
      {children}
    </div>
  );
};

// ============================================
// SELECT COMPONENT
// ============================================

interface SelectOption {
  value: string;
  label: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
}: {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen || !listRef.current || !triggerRef.current || !portalRoot) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    listRef.current.style.left = `${triggerRect.left}px`;
    listRef.current.style.top = `${triggerRect.bottom + 8}px`;
    listRef.current.style.width = `${triggerRect.width}px`;
  }, [isOpen, portalRoot]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const list = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed z-modal max-h-60 w-full overflow-auto rounded-xl bg-neutral-800 border border-neutral-700 p-1 shadow-elevation-4"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center justify-between px-3 py-2 text-sm text-neutral-200 rounded-md hover:bg-neutral-700 cursor-pointer transition-colors"
              role="option"
              aria-selected={value === option.value}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={16} className="text-emerald-400" />}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full">
        <label className="block text-sm font-medium text-neutral-400 mb-1.5">{label}</label>
        <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-12 w-full items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-left text-base text-neutral-50 transition-colors focus:border-emerald-500 focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
        >
            <span>{selectedOption?.label || placeholder}</span>
            <ChevronDown size={20} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>
        {portalRoot && createPortal(list, portalRoot)}
    </div>
  );
};
