export type ThemeMode = "light" | "dark"
export type SidebarPosition = "left" | "right" | "top" | "bottom"

export const uiConfig = {
  themeMode: "light" as ThemeMode,

  sidebarPosition: "left" as SidebarPosition,

  font: {
    family: "Inter, sans-serif",
  },

  light: {
    primary: "oklch(0.205 0 0)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
  },

  dark: {
    primary: "oklch(0.922 0 0)",
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
  },
}