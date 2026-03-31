"use client";

import HorizontalSidebar from "./HorizontalSidebar";
import VerticalSidebar from "./VerticalSidebar";
import type { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  variant?: "vertical" | "horizontal";
  forceRender?: boolean;
  externalCollapsed?: boolean;
  onCollapseChange?: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  variant = "vertical",
  forceRender = false,
  externalCollapsed,
  onCollapseChange,
}: SidebarProps) {
  if (variant === "horizontal") {
    return <HorizontalSidebar />;
  }

  return (
    <VerticalSidebar
      forceRender={forceRender}
      externalCollapsed={externalCollapsed}
      onCollapseChange={onCollapseChange}
    />
  );
}
