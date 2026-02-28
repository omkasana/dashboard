"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";
import { uiConfig } from "@/config/ui.config";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function VerticalSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(
        uiConfig.sidebar.defaultCollapsed
    );
    const [openItems, setOpenItems] = useState<string[]>([]);

    useEffect(() => {
        const activeParent = navigationLinks.find((item) =>
            item.children?.some((c) => c.href === pathname)
        )?.id;

        if (activeParent) setOpenItems([activeParent]);
    }, [pathname]);

    return (
        <aside
            className={cn(
                "h-screen p-3 relative",
                "bg-black/5 dark:bg-white/5 backdrop-blur-md",
                "border-r border-white/10",
                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Soft glow edge */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <nav className="space-y-2">
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
                                    "group relative flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium",
                                    "transition-all duration-300 ease-out",
                                    "hover:scale-[1.02]",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <span className="absolute left-0 h-6 w-1 rounded-r bg-primary transition-all duration-300" />
                                )}

                                {item.icon && (
                                    <item.icon
                                        className={cn(
                                            "h-5 w-5 transition-all duration-300",
                                            isActive
                                                ? "text-primary scale-110"
                                                : "group-hover:scale-110"
                                        )}
                                    />
                                )}

                                <span
                                    className={cn(
                                        "transition-all duration-300 origin-left",
                                        collapsed
                                            ? "opacity-0 scale-90 w-0"
                                            : "opacity-100 scale-100"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() =>
                                    setOpenItems((prev) =>
                                        prev.includes(item.id)
                                            ? prev.filter((i) => i !== item.id)
                                            : [...prev, item.id]
                                    )
                                }
                                className={cn(
                                    "group relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium",
                                    "transition-all duration-300 ease-out",
                                    "hover:scale-[1.02]",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <span className="absolute left-0 h-6 w-1 rounded-r bg-primary transition-all duration-300" />
                                )}

                                {item.icon && (
                                    <item.icon
                                        className={cn(
                                            "h-5 w-5 transition-all duration-300",
                                            isActive
                                                ? "text-primary scale-110"
                                                : "group-hover:scale-110"
                                        )}
                                    />
                                )}

                                <span
                                    className={cn(
                                        "transition-all duration-300 origin-left",
                                        collapsed
                                            ? "opacity-0 scale-90 w-0"
                                            : "opacity-100 scale-100"
                                    )}
                                >
                                    {item.name}
                                </span>

                                {!collapsed && (
                                    <ChevronRight
                                        className={cn(
                                            "ml-auto h-4 w-4 transition-all duration-300",
                                            isOpen ? "rotate-90 text-primary" : "opacity-60"
                                        )}
                                    />
                                )}
                            </button>

                            {/* Animated submenu */}
                            <div
                                className={cn(
                                    "grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <div className="pl-10 pt-2 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                href={child.href!}
                                                className={cn(
                                                    "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                                    "hover:translate-x-1",
                                                    pathname === child.href
                                                        ? "text-primary bg-primary/10"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                )}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}