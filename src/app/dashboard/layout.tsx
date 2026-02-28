import type { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/UI/Sidebar";
import { uiConfig } from "@/config/ui.config";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const position = uiConfig.sidebarPosition;

  const isLeft = position === "left";
  const isRight = position === "right";
  const isTop = position === "top";
  const isBottom = position === "bottom";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Navbar />

      {isTop && (
        <div className="border-b bg-background">
          <Sidebar variant="horizontal" />
        </div>
      )}

      <div
        className={`flex flex-1 min-w-0 ${isRight ? "flex-row-reverse" : ""}`}
      >
        {(isLeft || isRight) && (
          <aside className="hidden md:block border-r bg-background shrink-0">
            <Sidebar variant="vertical" />
          </aside>
        )}

        {/* 🔥 THIS IS THE CRITICAL FIX */}
        <main className="flex-1 min-w-0 p-6 overflow-hidden">{children}</main>
      </div>

      {isBottom && (
        <div className="border-t bg-background">
          <Sidebar variant="horizontal" />
        </div>
      )}
    </div>
  );
}
