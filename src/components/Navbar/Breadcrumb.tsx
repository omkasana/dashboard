"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Pencil, Package } from "lucide-react";

const segmentIcons: Record<string, any> = {
  dashboard: Home,
  users: Users,
  edit: Pencil,
  add: Pencil,
  products: Package,
};

const segmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  add: "Add",
  edit: "Edit",
};

function formatSegment(segment: string) {
  return (
    segmentLabels[segment] ??
    segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  let path = "";

  const lastSegment = segments[segments.length - 1] || "dashboard";
  const PageIcon = segmentIcons[lastSegment];

  return (
    <div className="hidden md:flex flex-col min-w-0">
      {/* PAGE TITLE */}

      <span className="flex items-center gap-2 text-lg font-semibold truncate">
        {formatSegment(lastSegment)}
      </span>

      {/* BREADCRUMB PATH */}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {segments.map((segment, index) => {
          path += `/${segment}`;

          const isLast = index === segments.length - 1;
          const Icon = segmentIcons[segment];

          return (
            <div key={path} className="flex items-center gap-2">
              {index !== 0 && <span>›</span>}

              {isLast ? (
                <span className="flex items-center gap-1 font-medium text-foreground">
                  {Icon && <Icon size={14} />}
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={path}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  {Icon && <Icon size={14} />}
                  {formatSegment(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
