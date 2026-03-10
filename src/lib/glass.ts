import { AddFormConfig } from "@/config/ui.config";
import type { CSSProperties } from "react";

/*
================================
THEME DETECTION
================================
*/

const isDark =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

/*
================================
GLASS CONTAINER
================================
*/

export const glassContainer: CSSProperties = {
  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,

  background: isDark
    ? AddFormConfig.glass.backgroundDark
    : AddFormConfig.glass.backgroundLight,

  border: `1px solid ${AddFormConfig.glass.border}`,

  boxShadow: AddFormConfig.glass.shadow,
};

/*
================================
GLASS CARD (for views / panels)
================================
*/

export const glassCard = (): string => {
  return `
  backdrop-blur-[${AddFormConfig.glass.blur}px]
  border
  border-[${AddFormConfig.glass.border}]
  shadow-[${AddFormConfig.glass.shadow}]
  rounded-xl
  p-5
  bg-white/40
  dark:bg-black/30
  `;
};

/*
================================
GLASS INPUT
================================
*/

export const glassInput: CSSProperties = {
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
