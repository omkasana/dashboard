"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PanelLeft } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function VerticalSidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(
    uiConfig.sidebar.defaultCollapsed
  );
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lockedFlyout, setLockedFlyout] = useState<string | null>(null);

  // ================= BREAKPOINTS =================
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setScreen("mobile");
      else if (w < 1024) setScreen("tablet");
      else setScreen("desktop");
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = screen === "mobile";
  const isTablet = screen === "tablet";
  const isDesktop = screen === "desktop";

  const isRight = uiConfig.sidebarPosition === "right";
  const mode = uiConfig.sidebar.subMenu;

  // ================= FIX: disable collapse on mobile =================
  const isCollapsible = isDesktop && uiConfig.sidebar.collapsible;

  // ================= OUTSIDE CLICK =================
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!sidebarRef.current) return;

      if (!sidebarRef.current.contains(e.target as Node)) {
        setLockedFlyout(null);
        setHovered(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ================= LOGIC =================
  const showNested = !collapsed && mode === "nested";
  const showFlyout =
    !isMobile && (collapsed || mode === "flyout");

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "h-full relative flex flex-col shrink-0",
        "bg-black/5 dark:bg-white/5 backdrop-blur-md",
        "border-r border-white/10",
        "transition-all duration-300 ease-in-out",
        isMobile
          ? "w-[260px]" // drawer size
          : collapsed
          ? "w-[72px]"
          : "w-[260px]"
      )}
    >
      {/* ================= TOGGLE ================= */}
      {isCollapsible && (
        <div className="absolute top-4 -right-3 z-50">
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="p-2 rounded-full bg-background border shadow-md hover:scale-105 transition"
          >
            <PanelLeft
              className={cn(
                "h-4 w-4 transition",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      )}

      {/* ================= NAV ================= */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((c) =>
              pathname.startsWith(c.href)
            );

          const isOpen = openItems.includes(item.id);

          const isFlyoutOpen =
            hovered === item.id || lockedFlyout === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => {
                if (isDesktop && !lockedFlyout) {
                  setHovered(item.id);
                }
              }}
              onMouseLeave={() => {
                if (isDesktop && !lockedFlyout) {
                  setHovered(null);
                }
              }}
            >
              {/* ================= ITEM ================= */}
              <button
                onClick={() => {
                  // MOBILE → always nested
                  if (isMobile) {
                    setOpenItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((i) => i !== item.id)
                        : [...prev, item.id]
                    );
                    return;
                  }

                  // TABLET → tap flyout
                  if (isTablet) {
                    setLockedFlyout((prev) =>
                      prev === item.id ? null : item.id
                    );
                    return;
                  }

                  // DESKTOP
                  if (collapsed || mode === "flyout") {
                    setLockedFlyout((prev) =>
                      prev === item.id ? null : item.id
                    );
                  } else {
                    setOpenItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((i) => i !== item.id)
                        : [...prev, item.id]
                    );
                  }
                }}
                className={cn(
                  "w-full flex items-center rounded-xl transition-all",
                  collapsed && isDesktop
                    ? "justify-center h-12"
                    : "gap-3 px-3 h-11",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      collapsed && isDesktop
                        ? "h-6 w-6"
                        : "h-5 w-5"
                    )}
                  />
                )}

                {!collapsed && (
                  <span className="flex-1 text-left">
                    {item.name}
                  </span>
                )}

                {!collapsed && mode === "nested" && !isMobile && (
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition",
                      isOpen && "rotate-90"
                    )}
                  />
                )}
              </button>

              {/* ================= NESTED ================= */}
              {(isMobile || showNested) && item.children && (
                <div
                  className={cn(
                    "overflow-hidden transition-all",
                    isOpen ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="pl-10 py-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href + "/view"}
                        className="block px-2 py-2 rounded-lg text-sm hover:bg-white/5"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= FLYOUT ================= */}
              {showFlyout &&
                item.children &&
                isFlyoutOpen && (
                  <div
                    className={cn(
                      "absolute top-0 w-60 rounded-2xl p-3 z-[999]",
                      "backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl",
                      isRight
                        ? "right-full mr-2"
                        : "left-full ml-2"
                    )}
                  >
                    <div className="text-sm font-semibold mb-2">
                      {item.name}
                    </div>

                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href + "/view"}
                        className="block px-2 py-2 rounded-md text-sm hover:bg-white/10"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}