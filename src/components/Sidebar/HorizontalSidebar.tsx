"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HorizontalSidebar() {
    const pathname = usePathname();
    const position = uiConfig.sidebarPosition;
    const isBottom = position === "bottom";
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <nav
            className="
        relative flex items-center gap-4 px-4 py-2
        bg-black/5 dark:bg-white/5
        backdrop-blur-md
        rounded-2xl
        border border-white/10
        transition-all duration-300
      "
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
                                "px-4 h-9 flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/15 text-primary border border-primary/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            )}
                        >
                            {item.name}
                        </Link>
                    );
                }

                const isOpen = openId === item.id;

                return (
                    <div key={item.id} className="relative">
                        <button
                            onClick={() => setOpenId(isOpen ? null : item.id)}
                            className={cn(
                                "px-4 h-9 flex items-center gap-1 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/15 text-primary border border-primary/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            )}
                        >
                            {item.name}
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 transition-transform duration-300",
                                    isOpen && "rotate-180"
                                )}
                            />
                        </button>

                        {/* Glass Dropdown */}
                        <div
                            className={cn(
                                "absolute left-0 min-w-56 mt-3 p-2 rounded-2xl",
                                "bg-background/95 backdrop-blur-xl border border-border",
                                "shadow-[0_20px_60px_rgba(0,0,0,0.25)] z-[9999]",
                                "transition-all duration-150",
                                isOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2 pointer-events-none",
                                isBottom && "bottom-full mb-3"
                            )}
                        >
                            {item.children.map((child) => (
                                <Link
                                    key={child.id}
                                    href={child.href!}
                                    onClick={() => setOpenId(null)}
                                    className={cn(
                                        "block px-3 py-2 rounded-xl text-sm transition-all duration-150",
                                        pathname === child.href
                                            ? "bg-primary/15 text-primary border border-primary/30"
                                            : "hover:bg-muted"
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