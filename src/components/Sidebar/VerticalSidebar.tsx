"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PanelLeft } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

type Screen = "mobile" | "tablet" | "desktop";

// ── Portal flyout — renders in document.body, immune to all stacking contexts ──
function FlyoutPortal({
  anchorEl,
  isRight,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  anchorEl: HTMLDivElement | null;
  isRight: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState<{
    top: number;
    left?: number;
    right?: number;
  } | null>(null);

  useEffect(() => {
    if (!anchorEl) return;
    const update = () => {
      const rect = anchorEl.getBoundingClientRect();
      setPos(
        isRight
          ? {
              top: rect.top + window.scrollY,
              right: window.innerWidth - rect.left + 6,
            }
          : {
              top: rect.top + window.scrollY,
              left: rect.right + 6,
            },
      );
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorEl, isRight]);

  if (!pos || typeof window === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: pos.top,
        ...(pos.left !== undefined ? { left: pos.left } : {}),
        ...(pos.right !== undefined ? { right: pos.right } : {}),
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body,
  );
}

export default function VerticalSidebar({
  externalCollapsed,
  onCollapseChange,
  forceRender = false,
}: {
  externalCollapsed?: boolean;
  onCollapseChange?: Dispatch<SetStateAction<boolean>>;
  forceRender?: boolean;
}) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [internalCollapsed, setInternalCollapsed] = useState(
    uiConfig.sidebar.defaultCollapsed,
  );
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lockedFlyout, setLockedFlyout] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("desktop");
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const collapsed =
    externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreen(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = screen === "mobile";
  const isTablet = screen === "tablet";
  const isDesktop = screen === "desktop";

  useEffect(() => {
    const activeParent = navigationLinks.find((item) =>
      item.children?.some((c) => pathname.startsWith(c.href)),
    )?.id;
    if (activeParent) setOpenItems([activeParent]);
  }, [pathname]);

  const isRight = uiConfig.sidebarPosition === "right";
  const mode = uiConfig.sidebar.subMenu as "nested" | "flyout";
  const togglePosition = uiConfig.sidebar.togglePosition;
  const isCollapsible = (isDesktop || isTablet) && uiConfig.sidebar.collapsible;
  const effectiveCollapsed = isMobile ? false : collapsed;
  const showFlyout =
    !isMobile && (effectiveCollapsed || mode === "flyout" || isTablet);
  const showNested = isDesktop && !effectiveCollapsed && mode === "nested";

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = useCallback((itemId?: string) => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setHovered((curr) =>
        itemId === undefined || curr === itemId ? null : curr,
      );
    }, 120);
  }, []);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setLockedFlyout(null);
      setHovered(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  const handleItemClick = (itemId: string, hasChildren: boolean) => {
    if (!hasChildren) return;

    if (isMobile) {
      setOpenItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((i) => i !== itemId)
          : [...prev, itemId],
      );
      return;
    }

    if (isTablet || effectiveCollapsed || mode === "flyout") {
      setLockedFlyout((prev) => (prev === itemId ? null : itemId));
      return;
    }

    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((i) => i !== itemId)
        : [...prev, itemId],
    );
  };

  const handleCollapseToggle = () => {
    const next = !collapsed;
    setInternalCollapsed(next);
    onCollapseChange?.(next);
    setLockedFlyout(null);
    setHovered(null);
  };

  if (isMobile && !forceRender) return null;

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "flex flex-col shrink-0 h-full overflow-visible relative",
        "bg-background/60 backdrop-blur-2xl",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isMobile ? "w-full" : effectiveCollapsed ? "w-18" : "w-65",
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.5 0 0 / 0.15) 20%, oklch(0.5 0 0 / 0.20) 50%, oklch(0.5 0 0 / 0.15) 80%, transparent 100%)",
        }}
      />

      {isCollapsible && !isMobile && togglePosition === "sidebar" && (
        <button
          onClick={handleCollapseToggle}
          aria-label={
            effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          className={cn(
            "absolute top-5 z-60",
            "p-1.5 rounded-full",
            "bg-background/80 backdrop-blur-md",
            "border border-border/50 shadow-sm shadow-black/10",
            "hover:bg-background hover:scale-110 active:scale-95",
            "transition-all duration-200",
            isRight ? "-left-3.5" : "-right-3.5",
          )}
        >
          <PanelLeft
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-500",
              !isRight && effectiveCollapsed && "rotate-180",
              isRight && !effectiveCollapsed && "rotate-180",
            )}
          />
        </button>
      )}

      <nav className="flex-1 overflow-y-auto overflow-x-visible px-2 py-4 space-y-0.5">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((c) => pathname.startsWith(c.href));

          const isOpen = openItems.includes(item.id);
          const isFlyoutOpen = hovered === item.id || lockedFlyout === item.id;
          const hasChildren = !!item.children?.length;

          return (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              className="relative"
              onMouseEnter={() => {
                if ((isDesktop || isTablet) && showFlyout && hasChildren) {
                  clearCloseTimer();
                  if (!lockedFlyout) setHovered(item.id);
                }
              }}
              onMouseLeave={() => {
                if (!lockedFlyout) scheduleClose(item.id);
              }}
            >
              {!hasChildren && item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center rounded-xl text-sm font-medium",
                    "transition-all duration-200",
                    effectiveCollapsed
                      ? "justify-center h-11 w-full"
                      : "gap-3 px-3 h-11",
                    isActive
                      ? [
                          "text-primary",
                          "bg-primary/8 shadow-sm shadow-primary/10",
                          "ring-1 ring-primary/15",
                        ]
                      : [
                          "text-muted-foreground",
                          "hover:text-foreground",
                          "hover:bg-foreground/5 hover:shadow-sm hover:shadow-black/5",
                          "hover:ring-1 hover:ring-border/40",
                        ],
                  )}
                >
                  {isActive && !effectiveCollapsed && (
                    <span className="absolute left-0 h-5 w-0.75 rounded-r-full bg-primary shadow-sm shadow-primary/50" />
                  )}

                  {item.icon && (
                    <item.icon
                      className={cn(
                        "shrink-0 transition-all duration-200",
                        effectiveCollapsed ? "h-5 w-5" : "h-4.5 w-4.5",
                        isActive
                          ? "text-primary"
                          : "group-hover:text-foreground",
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      "whitespace-nowrap overflow-hidden transition-all duration-300 origin-left text-[13px]",
                      effectiveCollapsed
                        ? "opacity-0 max-w-0"
                        : "opacity-100 max-w-45",
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => handleItemClick(item.id, hasChildren)}
                  className={cn(
                    "group relative w-full flex items-center rounded-xl text-sm font-medium",
                    "transition-all duration-200",
                    effectiveCollapsed
                      ? "justify-center h-11"
                      : "gap-3 px-3 h-11",
                    isActive
                      ? [
                          "text-primary",
                          "bg-primary/8 shadow-sm shadow-primary/10",
                          "ring-1 ring-primary/15",
                        ]
                      : [
                          "text-muted-foreground",
                          "hover:text-foreground",
                          "hover:bg-foreground/5 hover:shadow-sm hover:shadow-black/5",
                          "hover:ring-1 hover:ring-border/40",
                        ],
                    !isActive &&
                      isFlyoutOpen &&
                      "bg-foreground/5 text-foreground ring-1 ring-border/40",
                  )}
                >
                  {isActive && !effectiveCollapsed && (
                    <span className="absolute left-0 h-5 w-0.75 rounded-r-full bg-primary shadow-sm shadow-primary/50" />
                  )}

                  {item.icon && (
                    <item.icon
                      className={cn(
                        "shrink-0 transition-all duration-200",
                        effectiveCollapsed ? "h-5 w-5" : "h-4.5 w-4.5",
                        isActive
                          ? "text-primary"
                          : "group-hover:text-foreground",
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      "flex-1 text-left whitespace-nowrap overflow-hidden transition-all duration-300 origin-left text-[13px]",
                      effectiveCollapsed
                        ? "opacity-0 max-w-0"
                        : "opacity-100 max-w-45",
                    )}
                  >
                    {item.name}
                  </span>

                  {showNested && hasChildren && (
                    <ChevronRight
                      className={cn(
                        "ml-auto h-3.5 w-3.5 shrink-0 transition-all duration-300 opacity-50",
                        isOpen && "rotate-90 opacity-100 text-primary",
                      )}
                    />
                  )}

                  {showFlyout && hasChildren && !effectiveCollapsed && (
                    <span
                      className={cn(
                        "ml-auto h-1 w-1 rounded-full transition-all duration-200",
                        isFlyoutOpen
                          ? "bg-primary scale-125"
                          : "bg-muted-foreground/30",
                      )}
                    />
                  )}
                </button>
              )}

              {showNested && hasChildren && (
                <div
                  className={cn(
                    "grid transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pl-9 pt-0.5 pb-1 space-y-0.5">
                      {item.children!.map((child) => {
                        const childActive = pathname === child.href + "/view";
                        return (
                          <Link
                            key={child.id}
                            href={child.href + "/view"}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px]",
                              "transition-all duration-200",
                              childActive
                                ? "text-primary font-medium bg-primary/8"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                            )}
                          >
                            {childActive && (
                              <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                            )}
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {isMobile && hasChildren && (
                <div
                  className={cn(
                    "grid transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pl-9 pt-0.5 pb-1 space-y-0.5">
                      {item.children!.map((child) => {
                        const childActive = pathname === child.href + "/view";
                        return (
                          <Link
                            key={child.id}
                            href={child.href + "/view"}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px]",
                              "transition-all duration-200",
                              childActive
                                ? "text-primary font-medium bg-primary/8"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                            )}
                          >
                            {childActive && (
                              <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                            )}
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {showFlyout && hasChildren && isFlyoutOpen && (
                <FlyoutPortal
                  anchorEl={itemRefs.current[item.id]}
                  isRight={isRight}
                  onMouseEnter={() => {
                    clearCloseTimer();
                  }}
                  onMouseLeave={() => {
                    if (!lockedFlyout) scheduleClose(item.id);
                  }}
                >
                  <div
                    className={cn(
                      "w-52 rounded-2xl overflow-hidden",
                      "animate-in fade-in-0 zoom-in-95 duration-150 slide-in-from-left-1",
                      "bg-background/75 backdrop-blur-2xl backdrop-saturate-150",
                      "border border-white/20 dark:border-white/10",
                      "shadow-xl shadow-black/10 dark:shadow-black/40",
                      "ring-1 ring-inset ring-white/10 dark:ring-white/5",
                    )}
                  >
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-primary shrink-0" />
                      )}
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.name}
                      </span>
                    </div>

                    <div className="p-2 space-y-0.5">
                      {item.children!.map((child) => {
                        const childActive = pathname === child.href + "/view";
                        return (
                          <Link
                            key={child.id}
                            href={child.href + "/view"}
                            onClick={() => {
                              setLockedFlyout(null);
                              setHovered(null);
                            }}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px]",
                              "transition-all duration-150",
                              childActive
                                ? "text-primary font-medium bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/8",
                            )}
                          >
                            {childActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            )}
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </FlyoutPortal>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
