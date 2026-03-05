import { AddFormConfig } from "@/config/ui.config";

export const formControlStyle = {
  height: AddFormConfig.input.height,
  borderRadius: AddFormConfig.input.radius,
  border: "1px solid var(--border)",
  background: "var(--background)",
  padding: "0 12px",
  width: "100%",
};

export const glassSectionStyle = {
  backdropFilter: `blur(${AddFormConfig.glass.blur}px)`,
  background: AddFormConfig.glass.background,
  border: `1px solid ${AddFormConfig.glass.border}`,
  boxShadow: AddFormConfig.glass.shadow,
  borderRadius: AddFormConfig.section.radius,
  padding: AddFormConfig.section.padding,
};
