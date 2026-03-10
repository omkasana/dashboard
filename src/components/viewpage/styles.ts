import React from "react";

export const sectionCardStyle: React.CSSProperties = {
  background: "color-mix(in srgb, var(--muted) 60%, transparent)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  backdropFilter: "blur(12px)",
  padding: "1.25rem",
};

export const sectionHeaderStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 600,
  color: "var(--muted-foreground)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "1rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid var(--border)",
};

export const fieldLabelStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 500,
  color: "var(--muted-foreground)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "0.25rem",
};
