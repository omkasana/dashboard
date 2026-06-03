"use client";

import { useRouter } from "next/navigation";
import ActionMenu from "../ActionMenu";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/* ================= TYPES ================= */

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  label: string;
  render?: (value: unknown, row: T) => ReactNode;
  type?: "text" | "badge";
}

interface Props<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  density?: "comfortable" | "compact";
  moduleId: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

/* ================= SAFE RENDER ================= */

function safeRender(value: unknown): ReactNode {
  if (value === null || value === undefined) return "-";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  // avoid dumping large objects in UI
  if (typeof value === "object") {
    return "[Object]";
  }

  return String(value);
}

/* ================= COMPONENT ================= */

export default function TableEngine<T extends { id: string }>({
  columns,
  data,
  density = "comfortable",
  moduleId,
  onRowClick,
  loading = false,
}: Props<T>) {
  const router = useRouter();

  const padding = density === "compact" ? "py-2" : "py-4";

  const handleRowClick = (row: T) => {
    if (onRowClick) return onRowClick(row);

    // default navigation fallback
    router.push(`/dashboard/${moduleId}/view/${row.id}`);
  };

  return (
    <div
      className="
        rounded-2xl
        bg-black/5 dark:bg-white/5
        backdrop-blur-md
        border border-white/10
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* ================= HEADER ================= */}
          <thead
            className="
              sticky top-0 z-10
              bg-background/80 backdrop-blur-xl
              border-b border-white/10
            "
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="
                    px-6 py-4 text-left
                    text-xs font-semibold
                    uppercase tracking-wide
                    text-muted-foreground
                  "
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 w-12" />
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-12 text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-12 text-muted-foreground"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRowClick(row);
                  }}
                  className={cn(
                    "transition-all duration-200 cursor-pointer",
                    "hover:bg-white/5",
                    index % 2 === 0 && "bg-white/[0.02]",
                  )}
                >
                  {columns.map((col) => {
                    const rawValue = row[col.key];

                    let content: ReactNode;

                    if (col.render) {
                      content = col.render(rawValue, row);
                    } else if (col.type === "badge") {
                      content = (
                        <span className="px-2 py-1 text-xs rounded border">
                          {safeRender(rawValue)}
                        </span>
                      );
                    } else {
                      content = safeRender(rawValue);
                    }

                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "px-6 whitespace-nowrap text-foreground/90",
                          padding,
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}

                  {/* ACTION MENU */}
                  <td
                    className="px-4"
                    onClick={(e) => e.stopPropagation()} // prevent row click
                  >
                    <ActionMenu id={row.id} module={moduleId} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
