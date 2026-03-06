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

  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function DataGrid({
  columns,
  data,
  moduleId,
  density = "comfortable",
  selected,
  setSelected,
}: Props) {
  const rowHeight = density === "compact" ? "h-10" : "h-12";

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
          <span className="text-[var(--muted-foreground)]">
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
                ? "bg-[color-mix(in_srgb,var(--brand-success)_15%,transparent)] text-[var(--brand-success)]"
                : "bg-[color-mix(in_srgb,var(--brand-neutral)_15%,transparent)] text-[var(--brand-neutral)]",
            )}
          >
            {value}
          </span>
        );

      case "risk":
        return (
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold",
              value === "High"
                ? "bg-[color-mix(in_srgb,var(--brand-danger)_15%,transparent)] text-(--brand-danger)"
                : value === "Medium"
                  ? "bg-[color-mix(in_srgb,var(--brand-warning)_15%,transparent)] text-(--brand-warning)"
                  : "bg-[color-mix(in_srgb,var(--brand-success)_15%,transparent)] text-(--brand-success)",
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
            {value}
          </span>
        );
    }
  }

  return (
    <div className="rounded-xl border bg-[var(--background)] border-[var(--border)] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="sticky top-0 z-30 w-14 p-4 text-center border-r border-[var(--border)] bg-[var(--table-header-bg)]">
                <input
                  type="checkbox"
                  checked={selected.length === data.length && data.length > 0}
                  onChange={() =>
                    setSelected(
                      selected.length === data.length
                        ? []
                        : data.map((d) => d.id),
                    )
                  }
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className="
                sticky top-0 z-30
                px-4 h-11
                text-left uppercase text-xs tracking-wide font-semibold
                text-[var(--muted-foreground)]
                border-r border-[var(--border)]
                bg-[var(--table-header-bg)]
              "
                >
                  {col.label}
                </th>
              ))}

              <th
                className="
              sticky top-0 right-0 z-30
              w-20 text-center uppercase text-xs font-semibold
              text-[var(--muted-foreground)]
              border-l border-[var(--border)]
              p-2
              bg-[var(--table-header-bg)]
            "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => {
              const isSelected = selected.includes(row.id);

              return (
                <tr
                  key={row.id}
                  className={cn(
                    rowHeight,
                    "border-b border-[var(--border)] transition",
                    index % 2 === 0 && "bg-[var(--table-row-alt)]",
                    "hover:bg-[var(--table-row-hover)]",
                    isSelected && "bg-[var(--table-row-selected)]",
                  )}
                >
                  <td className="text-center border-r border-[var(--border)] sticky left-0 bg-[var(--background)]">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(row.id)
                            ? prev.filter((x) => x !== row.id)
                            : [...prev, row.id],
                        )
                      }
                    />
                  </td>

                  {columns.map((col) => (
                    <td key={col.key} className="px-4 whitespace-nowrap">
                      {renderCell(col, row[col.key])}
                    </td>
                  ))}

                  <td className="text-center border-l border-[var(--border)] sticky right-0 bg-[var(--background)]">
                    <ActionMenu id={row.id} moduleId={moduleId} />
                  </td>
                </tr>
              );
            })}

            {!data.length && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-12 text-[var(--muted-foreground)]"
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
