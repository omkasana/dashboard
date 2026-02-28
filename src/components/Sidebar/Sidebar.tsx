"use client";

import { uiConfig } from "@/config/ui.config";


import HorizontalSidebar from "./HorizontalSidebar";
import VerticalSidebar from "./VerticalSidebar";

type SidebarProps = {
  variant?: "vertical" | "horizontal";
};

export default function Sidebar({ variant = "vertical" }: SidebarProps) {
  if (variant === "horizontal") {
    return <HorizontalSidebar />;
  }

  return <VerticalSidebar />;
}