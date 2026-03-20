"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ActionMenu from "../../ActionMenu";

interface Column {
  key: string;
  label: string;
  type?: string;
  strong?: boolean;
  variant?: "primary" | "neutral" | "info";
}

interface Props {
  columns: Column[];
  data: any[];
  moduleId: string;
  density?: "comfortable" | "compact";

  selected: (string | number)[];
  setSelected: React.Dispatch<React.SetStateAction<(string | number)[]>>;

  onDelete?: (id: string | number) => void; // ✅ added
}

export default function DataGrid({
  columns,
  data,
  moduleId,
  density = "comfortable",
  selected,
  setSelected,
  onDelete,
}: Props) {
  const rowHeight = density === "compact" ? "h-10" : "h-12";

  function safeValue(value: any) {
    if (value === null || value === undefined) return "-";

    if (Array.isArray(value)) return value.length;

    if (typeof value === "object") return JSON.stringify(value);

    return value;
  }

  function renderCell(column: Column, value: any) {
    switch (column.type) {
      case "number":
        return (
          <span className="text-right tabular-nums w-full block text-foreground">
            {value}
          </span>
        );

      case "currency":
        return (
          <span className="text-right font-semibold tabular-nums w-full block text-foreground">
            ₹ {Number(value).toLocaleString("en-IN")}
          </span>
        );

      case "date":
        return value ? (
          <span className="text-foreground">
            {new Date(value).toLocaleDateString("en-IN")}
          </span>
        ) : (
          "-"
        );

      case "status":
        return (
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold",
              value === "Active"
                ? "bg-[color-mix(in_srgb,var(--brand-success)_15%,transparent)] text-brand-success"
                : "bg-[color-mix(in_srgb,var(--brand-neutral)_15%,transparent)] text-brand-neutral",
            )}
          >
            {value}
          </span>
        );

      default:
        return (
          <span
            className={cn(
              column.strong
                ? "font-semibold text-foreground"
                : "text-foreground",
            )}
          >
            {safeValue(value)}
          </span>
        );
    }
  }

  return (
    <div className="rounded-xl border bg-background border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-40 w-14 p-4 text-center border-r border-border bg-background">
                <input
                  type="checkbox"
                  checked={selected.length === data.length && data.length > 0}
                  onChange={() =>
                    setSelected(
                      selected.length === data.length
                        ? []
                        : data.map((d) => d.id ?? d._id),
                    )
                  }
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className="sticky top-0 z-30 px-4 h-11 text-left uppercase text-xs tracking-wide font-semibold text-muted-foreground border-r border-border bg-background"
                >
                  {col.label}
                </th>
              ))}

              <th className="sticky top-0 right-0 z-30 w-20 text-center uppercase text-xs font-semibold text-muted-foreground border-l border-border p-2 bg-background">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => {
              const id = row.id ?? row._id ?? index;

              const isSelected = selected.includes(id);

              return (
                <tr
                  key={id}
                  className={cn(
                    rowHeight,
                    "border-b border-border transition",
                    index % 2 === 0 && "bg-table-row-alt",
                    "hover:bg-table-row-hover",
                    isSelected && "bg-table-row-selected",
                  )}
                >
                  <td className="text-center border-r border-border sticky left-0 bg-background">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(id)
                            ? prev.filter((x) => x !== id)
                            : [...prev, id],
                        )
                      }
                    />
                  </td>

                  {columns.map((col) => (
                    <td key={col.key} className="px-4 whitespace-nowrap">
                      {renderCell(col, row[col.key])}
                    </td>
                  ))}

                  <td className="text-center border-l border-border sticky right-0 bg-background">
                    <ActionMenu
                      id={String(id)}
                      module={moduleId}
                      onDelete={onDelete} // ✅ pass down
                    />
                  </td>
                </tr>
              );
            })}

            {!data.length && (
              <tr>
                <td
                  colSpan={columns.length + 2}
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
