"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  items: NavItem[];
  logo: React.ReactNode;
  cta: React.ReactNode;
}

const Navbar = ({ items, logo, cta }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-sticky h-[var(--navbar-height-desktop)] border-b transition-colors duration-300",
        isScrolled
          ? "border-neutral-800 bg-neutral-950/88 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
      animate={{ height: isScrolled ? "var(--navbar-height-desktop-scrolled)" : "var(--navbar-height-desktop)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-10">
          <a href="/" aria-label="Homepage">
            {logo}
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-neutral-300 hover:text-neutral-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">{cta}</div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 text-neutral-50 transition hover:border-neutral-700 hover:bg-neutral-900"
          >
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-modal bg-neutral-950 p-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <a href="/" aria-label="Homepage">
                {logo}
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 text-neutral-50 transition hover:border-neutral-700 hover:bg-neutral-900"
              >
                <X />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xl font-semibold text-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4">{cta}</div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export { Navbar };
