"use client";

import { useEffect, useState } from "react";
import { palettes, PaletteName } from "@/config/palettes";
import { defaultTheme, ThemeMode } from "@/config/ui.config";

/* ----------------------------------------
   Type Guard (IMPORTANT)
---------------------------------------- */
function isValidPalette(value: string): value is PaletteName {
  return value in palettes;
}

/* ----------------------------------------
   Hook
---------------------------------------- */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [palette, setPaletteState] = useState<PaletteName>(
    defaultTheme.palette,
  );

  /* ----------------------------------------
     Init from localStorage
  ---------------------------------------- */
  useEffect(() => {
    const storedThemeRaw = localStorage.getItem("crm-theme");
    const storedPaletteRaw = localStorage.getItem("crm-palette");

    const storedTheme: ThemeMode =
      storedThemeRaw === "light" || storedThemeRaw === "dark"
        ? storedThemeRaw
        : defaultTheme.mode;

    const storedPalette: PaletteName =
      storedPaletteRaw && isValidPalette(storedPaletteRaw)
        ? storedPaletteRaw
        : defaultTheme.palette;

    applyTheme(storedTheme, storedPalette);

    setTheme(storedTheme);
    setPaletteState(storedPalette);
  }, []);

  /* ----------------------------------------
     Apply Theme (CSS Variables)
  ---------------------------------------- */
  const applyTheme = (mode: ThemeMode, palette: PaletteName) => {
    const themeConfig = palettes[palette][mode];
    const root = document.documentElement;

    // set html class
    root.classList.remove("light", "dark");
    root.classList.add(mode);

    // CSS variables
    const vars: Record<string, string> = {
      "--primary": themeConfig.primary,
      "--primary-foreground": themeConfig.primaryForeground,
      "--background": themeConfig.background,
      "--foreground": themeConfig.foreground,
      "--secondary": themeConfig.secondary,
      "--secondary-foreground": themeConfig.secondaryForeground,
      "--border": themeConfig.border,
      "--muted": themeConfig.muted,
      "--muted-foreground": themeConfig.mutedForeground,

      "--table-header-bg": themeConfig.table.headerBg,
      "--table-row-hover": themeConfig.table.rowHover,
      "--table-row-alt": themeConfig.table.rowAlternate,
      "--table-row-selected": themeConfig.table.selectedRow,

      "--brand-success": themeConfig.brand.success,
      "--brand-warning": themeConfig.brand.warning,
      "--brand-danger": themeConfig.brand.danger,
      "--brand-info": themeConfig.brand.info,
      "--brand-neutral": themeConfig.brand.neutral,
    };

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  /* ----------------------------------------
     Toggle Light/Dark
  ---------------------------------------- */
  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";

    applyTheme(newTheme, palette);

    localStorage.setItem("crm-theme", newTheme);
    setTheme(newTheme);
  };

  /* ----------------------------------------
     Change Palette
  ---------------------------------------- */
  const changePalette = (newPalette: PaletteName) => {
    applyTheme(theme, newPalette);

    localStorage.setItem("crm-palette", newPalette);
    setPaletteState(newPalette);
  };

  /* ----------------------------------------
     Return API
  ---------------------------------------- */
  return {
    theme,
    palette,
    toggleTheme,
    changePalette,
  };
}
