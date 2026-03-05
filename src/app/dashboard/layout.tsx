import type { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { uiConfig } from "@/config/ui.config";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const position = uiConfig.sidebarPosition;

  const isLeft = position === "left";
  const isRight = position === "right";
  const isTop = position === "top";
  const isBottom = position === "bottom";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/70 backdrop-blur-xl">
        <Navbar />
      </div>

      {/* TOP SIDEBAR */}
      {isTop && (
        <div className="fixed top-16 left-0 right-0 z-40 flex justify-center py-2 bg-background/70 backdrop-blur-xl border-b">
          <Sidebar variant="horizontal" />
        </div>
      )}

      {/* BODY */}
      <div
        className={`
          pt-16
          ${isTop ? "pt-28" : ""}
          ${isLeft ? "md:pl-64" : ""}
          ${isRight ? "md:pr-64" : ""}
          ${isBottom ? "pb-20" : ""}
        `}
      >
        {/* LEFT / RIGHT SIDEBAR */}
        {(isLeft || isRight) && (
          <div
            className={`
              hidden md:block
              fixed top-16 bottom-0
              ${isRight ? "right-0 border-l" : "left-0 border-r"}
              bg-background
              z-40
            `}
          >
            <Sidebar variant="vertical" />
          </div>
        )}

        {/* CONTENT */}
        <main className="p-4">{children}</main>
      </div>

      {/* BOTTOM SIDEBAR */}
      {isBottom && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center py-2 bg-background/70 backdrop-blur-xl border-t">
          <Sidebar variant="horizontal" />
        </div>
      )}
    </div>
  );
}
