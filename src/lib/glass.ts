import { AddFormConfig } from "@/config/ui.config";

export const glassContainer = {
  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,
  background: AddFormConfig.glass.backgroundLight,
  border: `1px solid ${AddFormConfig.glass.border}`,
  boxShadow: AddFormConfig.glass.shadow,
};

const isDark =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

export const glassInput: React.CSSProperties = {
  height: AddFormConfig.input.height,
  borderRadius: AddFormConfig.input.radius,

  border: `1px solid var(--border)`,

  background: isDark
    ? AddFormConfig.glass.inputBackgroundDark
    : AddFormConfig.glass.inputBackgroundLight,

  padding: `0 ${AddFormConfig.input.paddingX}px`,

  outline: "none",

  width: "100%",

  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,
};
