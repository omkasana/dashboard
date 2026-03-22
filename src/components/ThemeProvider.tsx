"use client";

import { useEffect } from "react";
import { palettes } from "@/config/palettes";
import { defaultTheme, ThemeMode } from "@/config/ui.config";

type PaletteName = keyof typeof palettes;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const mode =
      (localStorage.getItem("crm-theme") as ThemeMode) || defaultTheme.mode;

    const palette =
      (localStorage.getItem("crm-palette") as PaletteName) ||
      defaultTheme.palette;

    const theme = palettes[palette][mode];

    const root = document.documentElement;

    // apply class
    root.classList.remove("light", "dark");
    root.classList.add(mode);

    // apply CSS variables
    const vars: Record<string, string> = {
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
    };

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return <>{children}</>;
}
