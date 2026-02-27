"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { uiConfig, ThemeMode } from "@/config/ui.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = localStorage.getItem("crm-theme") as ThemeMode | null;
    const initialTheme = stored || uiConfig.themeMode;

    setThemeMode(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const theme = mode === "dark" ? uiConfig.dark : uiConfig.light;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(mode);

    Object.entries({
      "--primary": theme.primary,
      "--primary-foreground": theme.primaryForeground,
      "--background": theme.background,
      "--foreground": theme.foreground,
      "--secondary": theme.secondary,
      "--secondary-foreground": theme.secondaryForeground,
      "--border": theme.border,
      "--muted": theme.muted,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    localStorage.setItem("crm-theme", mode);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
