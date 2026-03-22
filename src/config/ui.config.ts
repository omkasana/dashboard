export type ThemeMode = "light" | "dark";
export type SidebarPosition = "left" | "right" | "top" | "bottom";

import type { PaletteName } from "./palettes";

export const defaultTheme = {
  mode: "dark" as ThemeMode,
  palette: "default" as PaletteName,
};

export const uiConfig = {
  sidebarPosition: "left" as SidebarPosition,

  sidebar: {
    accordion: true,
    autoNavigateFirstChild: false,
    collapsible: true,
    defaultCollapsed: false,
    persistState: true,
  },

  font: {
    family: "Inter, sans-serif",
  },

  theme: {
    paletteSelector: {
      enabled: true,
      defaultView: "grid" as "grid" | "list",
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

export const AddFormConfig = {
  layout: {
    columns: 4,
    gap: 24,
    sectionGap: 32,
  },

  section: {
    collapsible: true,
    showProgress: true,
    radius: 16,
    padding: 24,
  },

  input: {
    height: 44,
    radius: 22,
    paddingX: 14,
  },

  glass: {
    blur: 18,
    backgroundLight: "rgba(255,255,255,0.65)",
    backgroundDark: "rgba(15,23,42,0.45)",
    border: "rgba(255,255,255,0.25)",
    shadow: "0 8px 30px rgba(0,0,0,0.15)",
    inputBackgroundLight: "rgba(255,255,255,0.75)",
    inputBackgroundDark: "rgba(255,255,255,0.06)",
  },

  button: {
    height: 44,
    radius: 12,
  },
};
