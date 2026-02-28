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
      (localStorage.getItem("crm-theme") as ThemeMode) || uiConfig.themeMode;

    const theme = stored === "dark" ? uiConfig.dark : uiConfig.light;

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
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return <>{children}</>;
}
