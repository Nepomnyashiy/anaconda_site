"use client";

import React, { useState, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a Tabs provider");
  }
  return context;
};

export const Tabs = ({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      role="tablist"
      className={cn("relative flex items-center gap-4 border-b border-neutral-800", className)}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-content-${value}`}
      id={`tab-trigger-${value}`}
      className={cn(
        "relative px-1 py-3 text-base font-medium transition-colors",
        isActive ? "text-emerald-400" : "text-neutral-400 hover:text-neutral-100"
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  return isActive ? (
    <motion.div
      role="tabpanel"
      aria-labelledby={`tab-trigger-${value}`}
      id={`tab-content-${value}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("mt-6", className)}
    >
      {children}
    </motion.div>
  ) : null;
};
