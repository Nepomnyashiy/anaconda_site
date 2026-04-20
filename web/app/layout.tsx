import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "OSNOVA IT",
  description: "Интеллектуальная инфраструктура enterprise-уровня для интеграции legacy, AI и корпоративных процессов."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
