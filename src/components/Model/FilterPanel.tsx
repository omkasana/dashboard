"use client";

import { ArrowUpDown, RotateCcw } from "lucide-react";

interface FilterField {
  key: string;
  label: string;
  options: string[];
}

interface Column {
  key: string;
  label: string;
}

interface Props {
  fields: FilterField[];
  columns: Column[];
  filters: Record<string, string>;
  setFilters: (value: any) => void;
  onReset: () => void;
  sortField?: string;
  setSortField?: (v: string) => void;
  sortOrder?: "asc" | "desc";
  setSortOrder?: (v: "asc" | "desc") => void;
}

const selectClass = `
  h-8 px-3 text-xs rounded-lg
  bg-white/40 dark:bg-white/5
  backdrop-blur-md
  border border-white/25 dark:border-white/10
  shadow-inner outline-none transition
  focus:ring-2 focus:ring-primary/30
  w-full sm:w-auto
`;

export default function FilterPanel({
  fields,
  columns,
  filters,
  setFilters,
  onReset,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <div
      className="
        relative rounded-2xl
        bg-white/35 dark:bg-white/5
        backdrop-blur-2xl
        border border-white/30 dark:border-white/10
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        p-3 sm:p-4
      "
    >
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/70 dark:bg-white/20" />
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/40 dark:bg-white/10" />
      </div>

      {/* ── Main row — wraps to grid on mobile ── */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
        {/* FILTERS */}
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <span className="text-xs text-muted-foreground whitespace-nowrap w-16 sm:w-auto shrink-0">
              {field.label}
            </span>
            <select
              value={filters[field.key] ?? "all"}
              onChange={(e) =>
                setFilters((prev: any) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              className={selectClass}
            >
              <option value="all">All</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Divider — visible on sm+ when sort exists */}
        {(setSortField || setSortOrder) && (
          <div className="hidden sm:block w-px h-5 bg-white/20 dark:bg-white/10 mx-1" />
        )}

        {/* SORT — grouped together on mobile */}
        {(setSortField || setSortOrder) && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown size={14} className="text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground whitespace-nowrap w-16 sm:w-auto shrink-0">
              Sort by
            </span>

            {setSortField && (
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className={selectClass}
              >
                {columns.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.label}
                  </option>
                ))}
              </select>
            )}

            {setSortOrder && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className={`${selectClass} w-20 sm:w-auto`}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            )}
          </div>
        )}

        {/* RESET — full width on mobile, auto on sm+ */}
        <button
          onClick={onReset}
          className="
            flex items-center justify-center gap-1.5
            h-8 px-3 text-xs rounded-lg
            bg-white/40 dark:bg-white/5
            border border-white/25 dark:border-white/10
            backdrop-blur-md
            hover:bg-white/50 dark:hover:bg-white/10
            transition
            w-full sm:w-auto sm:ml-auto
            text-muted-foreground hover:text-foreground
          "
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>
    </div>
  );
}
