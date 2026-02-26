"use client";

import { navigationLinks } from "@/config/navigation.config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  // 🔹 Horizontal Version (Top / Bottom Nav)
  if (variant === "horizontal") {
    return (
      <nav className="flex items-center gap-6 px-6 py-3">
        {navigationLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 text-sm transition ${
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    );
  }

  // 🔹 Vertical Version (Left / Right Sidebar)
  return (
    <div className="w-64 p-4">
      <nav className="space-y-2">
        {navigationLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
              ${isActive ? "bg-muted font-medium" : "hover:bg-muted"}`}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
