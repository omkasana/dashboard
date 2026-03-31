"use client";

import { cn } from "@/lib/utils";
import ActionMenu from "../ActionMenu";

interface GridLayout {
  header: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
  meta?: string[];
  stats?: string[];
  footer?: string[];
}

interface Props {
  data: any[];
  density: "comfortable" | "compact";
  moduleId: string;
  layout: GridLayout;
}

export default function GridEngine({
  data,
  density,
  moduleId,
  layout,
}: Props) {
  const padding = density === "compact" ? "p-5" : "p-6";
  const gap = density === "compact" ? "gap-5" : "gap-6";

  const formatDate = (value: any) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderBadge = (value: any) => {
    if (!value) return null;

    if (value === "Active" || value === "Inactive") {
      return (
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-semibold",
            value === "Active"
              ? "bg-[color-mix(in_srgb,var(--brand-success)_15%,transparent)] text-[var(--brand-success)]"
              : "bg-[color-mix(in_srgb,var(--brand-neutral)_15%,transparent)] text-[var(--brand-neutral)]"
          )}
        >
          {value}
        </span>
      );
    }

    if (value === "High" || value === "Medium" || value === "Low") {
      return (
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-semibold",
            value === "High"
              ? "bg-[color-mix(in_srgb,var(--brand-danger)_15%,transparent)] text-[var(--brand-danger)]"
              : value === "Medium"
                ? "bg-[color-mix(in_srgb,var(--brand-warning)_15%,transparent)] text-[var(--brand-warning)]"
                : "bg-[color-mix(in_srgb,var(--brand-success)_15%,transparent)] text-[var(--brand-success)]"
          )}
        >
          {value}
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        gap
      )}
    >
      {data.map((item) => (
        <div
          key={item.id}
          className={cn(
            padding,
            "rounded-2xl border border-[var(--border)] bg-[var(--background)]",
            "shadow-sm transition-all duration-200",
            "hover:shadow-lg hover:-translate-y-1 hover:border-[var(--primary)]"
          )}
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p
                className={cn(
                  "font-semibold text-[var(--foreground)]",
                  density === "compact" ? "text-sm" : "text-base"
                )}
              >
                {item[layout.header.title]}
              </p>

              {layout.header.subtitle && (
                <p className="text-xs text-[var(--muted-foreground)] truncate">
                  {item[layout.header.subtitle]}
                </p>
              )}
            </div>

            <ActionMenu id={item.id} moduleId={moduleId} />
          </div>

          {/* BADGE */}
          {layout.header.badge && (
            <div className="mb-4">
              {renderBadge(item[layout.header.badge])}
            </div>
          )}

          {/* META ROW */}
          {layout.meta && (
            <div className="text-xs text-[var(--muted-foreground)] mb-4">
              {layout.meta
                .map((key) => item[key])
                .filter(Boolean)
                .join(" • ")}
            </div>
          )}

          {/* STATS */}
          {layout.stats && (
            <div className="flex justify-between items-center mb-4">
              {layout.stats.map((key) => (
                <div key={key}>
                  {key === "accountValue" ? (
                    <p className="text-lg font-semibold text-[var(--foreground)]">
                      ₹ {Number(item[key]).toLocaleString("en-IN")}
                    </p>
                  ) : (
                    renderBadge(item[key])
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FOOTER */}
          {layout.footer && (
            <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] space-y-1">
              {layout.footer.map((key) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <span>
                    {key.toLowerCase().includes("date") ||
                      key.toLowerCase().includes("login")
                      ? formatDate(item[key])
                      : item[key]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {!data.length && (
        <div className="col-span-full text-center py-20 text-[var(--muted-foreground)]">
          No records found
        </div>
      )}
    </div>
  );
}