import { AddFormConfig } from "@/config/ui.config";

const isDark =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

/* -------------------------------------------------- */
/* INPUT STYLE */
/* -------------------------------------------------- */

export const formControlStyle: React.CSSProperties = {
  height: AddFormConfig.input.height,
  borderRadius: AddFormConfig.input.radius,
  border: "1px solid var(--border)",

  padding: `0 ${AddFormConfig.input.paddingX}px`,
  width: "100%",

  background: isDark
    ? AddFormConfig.glass.inputBackgroundDark
    : AddFormConfig.glass.inputBackgroundLight,

  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,
};
/* -------------------------------------------------- */
/* LIQUID GLASS SECTION */
/* -------------------------------------------------- */

export const glassSectionStyle: React.CSSProperties = {
  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,

  WebkitBackdropFilter: `blur(${AddFormConfig.glass.blur}px)`,

  background: isDark
    ? AddFormConfig.glass.backgroundDark
    : AddFormConfig.glass.backgroundLight,

  border: `1px solid ${AddFormConfig.glass.border}`,

  boxShadow: AddFormConfig.glass.shadow,

  borderRadius: AddFormConfig.section.radius,

  padding: AddFormConfig.section.padding,
};

export const glassInput: React.CSSProperties = {
  height: AddFormConfig.input.height,
  borderRadius: AddFormConfig.input.radius,
  padding: `0 ${AddFormConfig.input.paddingX}px`,
};
