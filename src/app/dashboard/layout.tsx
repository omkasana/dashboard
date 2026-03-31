"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { uiConfig } from "@/config/ui.config";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const position = uiConfig.sidebarPosition;
  const isNavbarToggle = uiConfig.sidebar.togglePosition === "navbar";

  const isLeft = position === "left";
  const isRight = position === "right";
  const isTop = position === "top";
  const isBottom = position === "bottom";

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    uiConfig.sidebar.defaultCollapsed,
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/70 backdrop-blur-xl">
        <Navbar
          // Only pass toggle props when navbar owns it AND sidebar is vertical
          {...(isNavbarToggle &&
            (isLeft || isRight) && {
              sidebarCollapsed,
              onSidebarToggle: () => setSidebarCollapsed((p) => !p),
            })}
        />
      </div>

      {isTop && (
        <div className="fixed top-16 left-0 right-0 z-40 flex justify-center py-2 bg-background/70 backdrop-blur-xl">
          <Sidebar variant="horizontal" />
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 pt-16 overflow-visible",
          isTop && "pt-28",
          isBottom && "pb-16",
        )}
      >
        {(isLeft || isRight) && (
          <div
            className={cn(
              "hidden md:block shrink-0 overflow-visible",
              "sticky top-16 self-start h-[calc(100vh-4rem)]",
              "z-30",
              isRight ? "order-last" : "order-first",
              "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isNavbarToggle
                ? sidebarCollapsed
                  ? "w-18"
                  : "w-65"
                : uiConfig.sidebar.defaultCollapsed
                  ? "w-18"
                  : "w-65",
            )}
          >
            <Sidebar
              variant="vertical"
              {...(isNavbarToggle && {
                externalCollapsed: sidebarCollapsed,
                onCollapseChange: setSidebarCollapsed,
              })}
            />
          </div>
        )}

        <main className="flex-1 min-w-0 overflow-auto p-4">{children}</main>
      </div>

      {isBottom && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center py-2 bg-background/70 backdrop-blur-xl">
          <Sidebar variant="horizontal" />
        </div>
      )}
    </div>
  );
}
