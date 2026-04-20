import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-family-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-family-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OSNOVA IT",
  description: "Интеллектуальная инфраструктура enterprise-уровня для интеграции legacy, AI и корпоративных процессов."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const navItems = [
    { label: "Услуги", href: "#services" },
    { label: "Кейсы", href: "#cases" },
    { label: "О нас", href: "#about" },
    { label: "Блог", href: "#blog" },
  ];

  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="pt-[var(--navbar-height-desktop)]">
        <Navbar
          items={navItems}
          logo={<span className="text-sm font-semibold tracking-[0.32em] text-neutral-50">ANACONDA</span>}
          cta={
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400"
            >
              Получить AI-аудит
            </a>
          }
        />
        {children}
      </body>
    </html>
  );
}
