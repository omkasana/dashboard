"use client";

import { useEffect, useState } from "react";
import { uiConfig, ThemeMode } from "@/config/ui.config";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored =
      (localStorage.getItem("crm-theme") as ThemeMode) || uiConfig.themeMode;

    applyTheme(stored);
    setTheme(stored);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const themeConfig = mode === "dark" ? uiConfig.dark : uiConfig.light;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(mode);

    Object.entries({
      "--primary": themeConfig.primary,
      "--primary-foreground": themeConfig.primaryForeground,
      "--background": themeConfig.background,
      "--foreground": themeConfig.foreground,
      "--secondary": themeConfig.secondary,
      "--secondary-foreground": themeConfig.secondaryForeground,
      "--border": themeConfig.border,
      "--muted": themeConfig.muted,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";

    applyTheme(newTheme);
    localStorage.setItem("crm-theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
