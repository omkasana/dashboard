"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/config/navigation.config";

export function Breadcrumb() {
  const pathname = usePathname();

  let currentPage = "Dashboard";
  let parentName: string | null = null;

  for (const item of navigationLinks) {
    if (item.href === pathname) {
      currentPage = item.name;
      break;
    }

    if (item.children) {
      const child = item.children.find((c) => c.href === pathname);
      if (child) {
        currentPage = child.name;
        parentName = item.name;
        break;
      }
    }
  }

  return (
    <div className="hidden md:flex flex-col min-w-0">
      <span className="text-lg font-semibold truncate">{currentPage}</span>

      <div className="flex items-center gap-3 text-sm text-muted-foreground truncate">
        <Link href="/dashboard">Dashboard</Link>

        {parentName && (
          <>
            <span>›</span>
            <span>{parentName}</span>
          </>
        )}

        {pathname !== "/dashboard" && (
          <>
            <span>›</span>
            <span className="text-foreground font-medium">{currentPage}</span>
          </>
        )}
      </div>
    </div>
  );
}
