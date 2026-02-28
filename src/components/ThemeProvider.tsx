"use client";

import { useEffect } from "react";
import { uiConfig, ThemeMode } from "@/config/ui.config";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const stored =
      (localStorage.getItem("crm-theme") as ThemeMode) ||
      uiConfig.themeMode;

    const theme =
      stored === "dark" ? uiConfig.dark : uiConfig.light;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(stored);

    Object.entries({
      "--primary": theme.primary,
      "--primary-foreground": theme.primaryForeground,
      "--background": theme.background,
      "--foreground": theme.foreground,
      "--secondary": theme.secondary,
      "--secondary-foreground": theme.secondaryForeground,
      "--border": theme.border,
      "--muted": theme.muted,
      "--muted-foreground": theme.mutedForeground,

      "--table-header-bg": theme.table.headerBg,
      "--table-row-hover": theme.table.rowHover,
      "--table-row-alt": theme.table.rowAlternate,
      "--table-row-selected": theme.table.selectedRow,

      "--brand-success": theme.brand.success,
      "--brand-warning": theme.brand.warning,
      "--brand-danger": theme.brand.danger,
      "--brand-info": theme.brand.info,
      "--brand-neutral": theme.brand.neutral,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return <>{children}</>;
}