export type ThemeMode = "light" | "dark";
export type SidebarPosition = "left" | "right" | "top" | "bottom";

export const uiConfig = {
  themeMode: "light" as ThemeMode,

  sidebarPosition: "left" as SidebarPosition,

  // sidebar logik
  sidebar: {
    accordion: true, //auto close menu
    autoNavigateFirstChild: true, //auto open submenu when click menu
  },

  font: {
    family: "Inter, sans-serif",
  },

  light: {
    primary: "#ef4444", // red
    primaryForeground: "#ffffff",

    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",

    background: "#ffffff",
    foreground: "#0f172a",

    muted: "#f3f4f6",
    border: "#e5e7eb",
  },

  dark: {
    primary: "#f87171", // lighter red for dark mode
    primaryForeground: "#000000",

    secondary: "#1f2937",
    secondaryForeground: "#f9fafb",

    background: "#0f172a",
    foreground: "#f8fafc",

    muted: "#1e293b",
    border: "#334155",
  },
};
