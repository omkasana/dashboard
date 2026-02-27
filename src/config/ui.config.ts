export type ThemeMode = "light" | "dark";
export type SidebarPosition = "left" | "right" | "top" | "bottom";

export const uiConfig = {
  themeMode: "light" as ThemeMode,

  sidebarPosition: "left" as SidebarPosition,

  // =========================================================
  // 🧭 SIDEBAR CONFIGURATION
  // Controls sidebar behavior & interaction logic
  // =========================================================
  sidebar: {
    /*
     * Accordion Mode
     * --------------------------------------------------------
     * true  → Only ONE parent menu can stay open at a time.
     *         Opening another closes the previous.
     *
     * false → Multiple parent menus can stay open.
     *         Useful for content-heavy dashboards.
     */
    accordion: true,

    /*
     * Auto Navigate First Child
     * --------------------------------------------------------
     * true  → Clicking a parent menu automatically navigates
     *         to its first child route.
     *
     * false → Clicking parent only expands/collapses.
     *         No automatic redirection.
     */
    autoNavigateFirstChild: true,

    /*
     * Collapsible Sidebar
     * --------------------------------------------------------
     * true  → Sidebar can collapse into icon-only mode.
     *
     * false → Sidebar remains fixed width.
     */
    collapsible: true,

    /*
     * Default Collapsed State
     * --------------------------------------------------------
     * true  → Sidebar loads in collapsed mode.
     * false → Sidebar loads expanded.
     */
    defaultCollapsed: false,

    /*
     * Persist State
     * --------------------------------------------------------
     * true  → Saves:
     *           - Open menus
     *           - Collapsed state
     *         in localStorage.
     *
     * false → Sidebar resets on page reload.
     */
    persistState: true,
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
