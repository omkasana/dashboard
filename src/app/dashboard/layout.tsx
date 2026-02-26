import type { ReactNode } from "react";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { uiConfig } from "@/config/ui.config";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const position = uiConfig.sidebarPosition;

  const isLeft = position === "left";
  const isRight = position === "right";
  const isTop = position === "top";
  const isBottom = position === "bottom";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* 🔹 Top Navigation */}
      {isTop && (
        <div className="border-b bg-background">
          <Sidebar variant="horizontal" />
        </div>
      )}

      <div className={`flex flex-1 ${isRight ? "flex-row-reverse" : ""}`}>
        {/* 🔹 Left / Right Sidebar */}
        {(isLeft || isRight) && (
          <aside className="hidden md:block border-r bg-background">
            <Sidebar variant="vertical" />
          </aside>
        )}

        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* 🔹 Bottom Navigation */}
      {isBottom && (
        <div className="border-t bg-background">
          <Sidebar variant="horizontal" />
        </div>
      )}
    </div>
  );
}
