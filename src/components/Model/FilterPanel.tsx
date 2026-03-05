"use client";

import { ArrowUpDown } from "lucide-react";

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
      relative
      flex
      flex-wrap
      items-center
      gap-3
      px-4
      py-2.5
      rounded-2xl
      bg-white/35 dark:bg-white/5
      backdrop-blur-2xl
      border border-white/30 dark:border-white/10
      shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
    >
      {/* Glass reflection layer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/70 dark:bg-white/20"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/40 dark:bg-white/10"></div>
      </div>

      {/* FILTERS */}

      {fields.map((field) => (
        <div key={field.key} className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
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
            className="
            h-8
            px-3
            text-xs
            rounded-lg
            bg-white/40
            dark:bg-white/5
            backdrop-blur-md
            border border-white/25
            dark:border-white/10
            shadow-inner
            outline-none
            transition
            focus:ring-2
            focus:ring-primary/30
            "
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

      {/* SORT FIELD */}

      {setSortField && (
        <div className="flex items-center gap-2 ml-1">
          <ArrowUpDown size={14} className="text-muted-foreground" />

          <span className="text-xs text-muted-foreground">Sort</span>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="
            h-8
            px-3
            text-xs
            rounded-lg
            bg-white/40
            dark:bg-white/5
            backdrop-blur-md
            border border-white/25
            dark:border-white/10
            shadow-inner
            outline-none
            transition
            focus:ring-2
            focus:ring-primary/30
            "
          >
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* SORT ORDER */}

      {setSortOrder && (
        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="
            h-8
            px-3
            text-xs
            rounded-lg
            bg-white/40
            dark:bg-white/5
            backdrop-blur-md
            border border-white/25
            dark:border-white/10
            shadow-inner
            outline-none
            transition
            focus:ring-2
            focus:ring-primary/30
            "
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      )}

      {/* RESET BUTTON */}

      <button
        onClick={onReset}
        className="
        ml-auto
        h-8
        px-3
        text-xs
        rounded-lg
        bg-white/40
        dark:bg-white/5
        border border-white/25
        dark:border-white/10
        backdrop-blur-md
        hover:bg-white/50
        dark:hover:bg-white/10
        transition
        "
      >
        Reset
      </button>
    </div>
  );
}
