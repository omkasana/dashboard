"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidebar({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  const router = useRouter();

  /* =========================================================
     🔹 HORIZONTAL (Top / Bottom)
  ========================================================== */

  if (variant === "horizontal") {
    return (
      <nav className="flex items-center gap-10 px-6 py-3 bg-background border-b">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((child) => child.href === pathname);

          if (!item.children) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          }

          return (
            <DropdownMenu key={item.id} modal={false}>
              <div
                className="relative"
                onMouseEnter={(e) => {
                  const trigger = e.currentTarget.querySelector(
                    "[data-trigger]",
                  ) as HTMLElement;
                  trigger?.click();
                }}
              >
                <DropdownMenuTrigger asChild>
                  <div
                    data-trigger
                    className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 opacity-70 transition-transform data-[state=open]:rotate-180" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  sideOffset={10}
                  className="
                    min-w-[240px]
                    rounded-xl
                    border
                    bg-popover
                    shadow-xl
                    p-2
                    data-[state=open]:animate-in
                    data-[state=closed]:animate-out
                    data-[state=open]:fade-in-0
                    data-[state=closed]:fade-out-0
                    data-[state=open]:zoom-in-95
                    data-[state=closed]:zoom-out-95
                    duration-150
                  "
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.id}
                      asChild
                      className="rounded-lg px-3 py-2 text-sm transition hover:bg-muted cursor-pointer"
                    >
                      <Link href={child.href!}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          );
        })}
      </nav>
    );
  }

  /* =========================================================
     🔹 VERTICAL (Left / Right)
  ========================================================== */

  const activeParent =
    navigationLinks.find((item) =>
      item.children?.some((child) => child.href === pathname),
    )?.id || null;

  const [openItems, setOpenItems] = useState<string[]>(
    activeParent ? [activeParent] : [],
  );

  useEffect(() => {
    if (activeParent && !openItems.includes(activeParent)) {
      setOpenItems((prev) => [...prev, activeParent]);
    }
  }, [pathname]);

  return (
    <div className="w-64 p-4 border-r bg-background border-border">
      <nav className="space-y-1">
        {navigationLinks.map((item) => {
          const isActive =
            item.href === pathname ||
            item.children?.some((child) => child.href === pathname);

          // 🔹 Simple link
          if (!item.children) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            );
          }

          const isOpen = openItems.includes(item.id);

          return (
            <Collapsible
              key={item.id}
              open={isOpen}
              onOpenChange={(open) => {
                if (uiConfig.sidebar.accordion) {
                  setOpenItems(open ? [item.id] : []);
                } else {
                  setOpenItems((prev) =>
                    open
                      ? [...prev, item.id]
                      : prev.filter((id) => id !== item.id),
                  );
                }
              }}
            >
              <CollapsibleTrigger asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault();

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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isOpen
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground/80"
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                  <ChevronRight
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-8 space-y-1 pt-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href!}
                    className={`block px-3 py-2 rounded-md text-sm transition ${
                      pathname === child.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground/80"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>
    </div>
  );
}
