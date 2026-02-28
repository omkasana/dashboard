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
     🔹 HORIZONTAL (TOP / BOTTOM)
  ========================================================== */

  if (variant === "horizontal") {
    const isBottom = position === "bottom";
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleMenu = (id: string) => {
      setOpenId((prev) => (prev === id ? null : id));
    };

    return (
      <nav className="relative flex items-center gap-8 px-6 py-3 bg-background/80 backdrop-blur-xl border-b border-white/10 z-50">
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
                  "text-sm font-medium transition-all duration-200",
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
            <div key={item.id} className="relative">
              {/* Trigger */}
              <button
                onClick={() => toggleMenu(item.id)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium px-1 py-3 transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.name}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute left-0 min-w-56 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-2 z-[9999] transition-all duration-150",
                  isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none",
                  isBottom ? "bottom-full mb-3" : "top-full mt-3",
                )}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href!}
                    onClick={() => setOpenId(null)}
                    className={cn(
                      "block px-3 py-2 text-sm rounded-xl transition-all duration-150",
                      pathname === child.href
                        ? "bg-primary/15 text-primary border border-primary/30"
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

    if (activeParent) setOpenItems([activeParent]);
  }, [pathname]);

  const toggleItem = (id: string) => {
    if (uiConfig.sidebar.accordion) {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    } else {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    }
  };

  return (
    <div
      className={cn(
        "h-screen backdrop-blur-xl bg-background/80 border-r border-white/10 transition-[width] duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <nav className="space-y-1 px-3 pt-4">
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
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "hover:bg-muted",
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
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "hover:bg-muted",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {!collapsed && item.name}
                {!collapsed && (
                  <ChevronRight
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-300",
                      isOpen && "rotate-90",
                    )}
                  />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-8 space-y-1 pt-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href!}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
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
            </div>
          );
        })}
      </nav>
    </div>
  );
}
