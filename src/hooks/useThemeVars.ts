import { palettes } from "@/config/palettes";
import { defaultTheme } from "@/config/ui.config";

export function getThemeVars() {
  const mode =
    (localStorage.getItem("crm-theme") as "light" | "dark") ||
    defaultTheme.mode;

  const palette =
    (localStorage.getItem("crm-palette") as keyof typeof palettes) ||
    defaultTheme.palette;

  const t = palettes[palette][mode];

  return {
    "--bg": t.background,
    "--fg": t.foreground,
    "--muted": t.muted,
    "--muted-fg": t.mutedForeground,
    "--border": t.border,
    "--primary": t.primary,
    "--primary-fg": t.primaryForeground,
    "--secondary": t.secondary,
    "--secondary-fg": t.secondaryForeground,
    "--success": t.brand.success,
    "--warning": t.brand.warning,
    "--danger": t.brand.danger,
    "--info": t.brand.info,
    "--neutral": t.brand.neutral,
  } as Record<string, string>;
}
