"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  name: string;
  href?: string;
  children?: NavItem[];
}

function NavDropdown({
  item,
  isActive,
  isBottom,
  pathname,
}: {
  item: NavItem;
  isActive: boolean;
  isBottom: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // Recalculate position on open
  useEffect(() => {
    if (open && triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !portalRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Recalculate on scroll/resize
  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (triggerRef.current)
        setRect(triggerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const dropdownTop = rect ? (isBottom ? rect.top - 8 : rect.bottom + 8) : 0;
  const dropdownLeft = rect ? rect.left : 0;

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "shrink-0 px-4 h-9 flex items-center gap-1 rounded-xl text-sm font-medium",
          "transition-all duration-200 whitespace-nowrap",
          isActive
            ? "bg-primary/15 text-primary border border-primary/30"
            : "text-muted-foreground hover:text-foreground hover:bg-white/5",
        )}
      >
        {item.name}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Portal dropdown — escapes overflow:hidden/auto */}
      {open &&
        rect &&
        createPortal(
          <div
            ref={portalRef}
            className="fixed z-9999 min-w-56 p-2 rounded-2xl border"
            style={{
              top: isBottom ? undefined : dropdownTop,
              bottom: isBottom ? window.innerHeight - rect.top + 8 : undefined,
              left: dropdownLeft,
              background: "var(--background)",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            {item.children?.map((child) => (
              <Link
                key={child.id}
                href={child.href!}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-xl text-sm",
                  "transition-all duration-150 whitespace-nowrap",
                  pathname === child.href
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {child.name}
              </Link>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default function HorizontalSidebar() {
  const pathname = usePathname();
  const isBottom = uiConfig.sidebarPosition === "bottom";

  return (
    <nav
      className={cn(
        "flex items-center gap-1",
        "overflow-x-auto scrollbar-none",
        "px-3 py-2",
        "bg-black/5 dark:bg-white/5",
        "backdrop-blur-md rounded-2xl",
        "border border-white/10",
        "transition-all duration-300",
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
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
                "shrink-0 px-4 h-9 flex items-center rounded-xl text-sm font-medium",
                "transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              {item.name}
            </Link>
          );
        }

        return (
          <NavDropdown
            key={item.id}
            item={item}
            isActive={!!isActive}
            isBottom={isBottom}
            pathname={pathname}
          />
        );
      })}
    </nav>
  );
}
