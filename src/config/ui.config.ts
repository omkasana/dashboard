export type ThemeMode = "light" | "dark";
export type SidebarPosition = "left" | "right" | "top" | "bottom";

export const uiConfig = {
  themeMode: "light" as ThemeMode,
  sidebarPosition: "left" as SidebarPosition,

  sidebar: {
    accordion: true,
    autoNavigateFirstChild: true,
    collapsible: true,
    defaultCollapsed: false,
    persistState: true,
  },

  font: {
    family: "Inter, sans-serif",
  },

  light: {
    primary: "#2251BF",
    primaryForeground: "#ffffff",

    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",

    background: "#ffffff",
    foreground: "#0f172a",

    muted: "#f3f4f6",
    mutedForeground: "#6b7280",

    border: "#e5e7eb",

    table: {
      headerBg: "#f3f4f6",
      rowHover: "#e5e7eb",
      rowAlternate: "#fafafa",
      selectedRow: "#e8f0ff",
    },

    brand: {
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6",
      neutral: "#64748b",
    },
  },

  dark: {
    primary: "#2251BF",
    primaryForeground: "#000000",

    secondary: "#1f2937",
    secondaryForeground: "#f9fafb",

    background: "#0f172a",
    foreground: "#f8fafc",

    muted: "#1e293b",
    mutedForeground: "#94a3b8",

    border: "#334155",

    table: {
      headerBg: "#1e293b",
      rowHover: "#334155",
      rowAlternate: "#172033",
      selectedRow: "#1d2c52",
    },

    brand: {
      success: "#22c55e",
      warning: "#fbbf24",
      danger: "#f87171",
      info: "#60a5fa",
      neutral: "#94a3b8",
    },
  },
};

export const tableUIConfig = {
  actionColumnPosition: "right",
  stickyActionColumn: true,

  striped: true,
  hoverHighlight: true,
  rowClick: false,

  pagination: {
    show: true,
    position: "bottom",
    align: "center",
  },

  pageInfo: {
    show: true,
    position: "bottom",
    align: "right",
  },

  rowsPerPage: {
    show: true,
    position: "bottom",
    align: "left",
  },

  densityToggle: {
    show: true,
    position: "top",
    align: "left",
  },

  multiSelect: {
    enabled: true,
    bulkActions: ["Delete", "Export", "Deactivate"],
  },
};
