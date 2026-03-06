"use client";

import ActionMenu from "../ActionMenu";
import { cn } from "@/lib/utils";

interface Props {
  columns: { key: string; label: string }[];
  data: any[];
  density: "comfortable" | "compact";
  moduleId: string;
}

export default function TableEngine({
  columns,
  data,
  density,
  moduleId,
}: Props) {
  const padding = density === "compact" ? "py-2" : "py-4";

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
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  "transition-all duration-200",
                  "hover:bg-white/5",
                  index % 2 === 0 && "bg-white/[0.02]",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-6 whitespace-nowrap text-foreground/90",
                      padding,
                    )}
                  >
                    {row[col.key]}
                  </td>
                ))}

                <td className="px-4">
                  <ActionMenu id={row.id} moduleId={moduleId} />
                </td>
              </tr>
            ))}

            {/* ================= EMPTY STATE ================= */}
            {!data.length && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-12 text-muted-foreground"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
