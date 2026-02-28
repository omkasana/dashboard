"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  variant?: "vertical" | "horizontal";
};

export default function Sidebar({ variant = "vertical" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const position = uiConfig.sidebarPosition;

  /* =========================================================
     🔹 HORIZONTAL (TOP / BOTTOM) — STABLE VERSION
  ========================================================== */

  if (variant === "horizontal") {
    const isBottom = position === "bottom";
    const [openId, setOpenId] = useState<string | null>(null);

    return (
      <nav className="relative flex items-center gap-8 px-6 py-3 bg-background z-50">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((c) => c.href === pathname);

          if (!item.children) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                className={cn(
                  "text-sm font-medium whitespace-nowrap transition",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            );
          }

          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setOpenId(item.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              {/* Trigger */}
              <div
                className={cn(
                  "flex items-center gap-1 cursor-pointer text-sm font-medium whitespace-nowrap px-1 py-3 transition",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.name}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </div>

              {/* Invisible hover bridge (IMPORTANT) */}
              <div
                className={cn(
                  "absolute left-0 right-0 h-3",
                  isBottom ? "bottom-full" : "top-full",
                )}
              />

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute left-0 min-w-55 rounded-lg border bg-popover shadow-xl p-2 z-50",
                  "transition-all duration-150 ease-out",
                  isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 pointer-events-none",
                  isBottom ? "bottom-full mb-3" : "top-full mt-3",
                )}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href!}
                    className={cn(
                      "block px-3 py-2 text-sm rounded-md transition",
                      pathname === child.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted",
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    );
  }

  /* =========================================================
     🔹 VERTICAL (LEFT / RIGHT)
  ========================================================== */

  const [collapsed, setCollapsed] = useState(uiConfig.sidebar.defaultCollapsed);
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const activeParent = navigationLinks.find((item) =>
      item.children?.some((c) => c.href === pathname),
    )?.id;

    if (activeParent) {
      setOpenItems([activeParent]);
    }
  }, [pathname]);

  return (
    <div
      className={cn(
        "h-screen bg-background border-r transition-[width] duration-200",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {uiConfig.sidebar.collapsible && (
        <div className="p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-muted-foreground"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>
      )}

      <nav className="space-y-1 px-2">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((c) => c.href === pathname);

          const isOpen = openItems.includes(item.id);

          if (!item.children) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                onClick={() => setOpenItems([])}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground/80",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {!collapsed && item.name}
              </Link>
            );
          }

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (uiConfig.sidebar.accordion) {
                    setOpenItems(isOpen ? [] : [item.id]);
                  } else {
                    setOpenItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id],
                    );
                  }

                  if (
                    uiConfig.sidebar.autoNavigateFirstChild &&
                    item.children?.length
                  ) {
                    router.push(item.children[0].href!);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground/80",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {!collapsed && item.name}

                {!collapsed && (
                  <ChevronRight
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-200",
                      isOpen && "rotate-90",
                    )}
                  />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen && !collapsed
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-8 space-y-1 pt-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href!}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition",
                        pathname === child.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground/80",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
