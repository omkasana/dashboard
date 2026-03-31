import React from "react";

export const sectionHeaderStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  fontWeight: 600,
  color: "var(--muted-foreground)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "0.625rem",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid var(--border)",
};

export const fieldLabelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  fontWeight: 500,
  color: "var(--muted-foreground)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "0.2rem",
};

// sectionCardStyle is now driven by config in ProfileLayout
// kept here for GridLayout, CardsLayout, SidebarLayout, CompactLayout
export const sectionCardStyle: React.CSSProperties = {
  background: "color-mix(in srgb, var(--muted) 60%, transparent)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  backdropFilter: "blur(12px)",
  padding: "1rem",
};
