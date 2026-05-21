"use client";

import { Search, Filter, ChevronDown } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

export function NotificationFilters({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  return (
    <div
      className="
      flex flex-col lg:flex-row
      lg:items-center lg:justify-between

      gap-4

      rounded-3xl

      border border-white/40 dark:border-white/[0.06]

      bg-white/60 dark:bg-white/[0.03]

      backdrop-blur-3xl

      p-4
      "
    >
      <div
        className="
        flex items-center gap-3

        h-11 px-4

        rounded-2xl

        bg-white/60 dark:bg-white/[0.03]

        border border-white/50 dark:border-white/[0.06]

        flex-1 lg:max-w-md
        "
      >
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          bg-transparent outline-none border-none

          text-sm

          placeholder:text-muted-foreground

          w-full
          "
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: "Unread" },
          { key: "read", label: "Read" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`
              h-10 px-4 rounded-2xl

              text-sm font-medium

              transition-all duration-200

              ${
                filter === item.key
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : `
                  bg-white/50 dark:bg-white/[0.03]
                  hover:bg-white/70 dark:hover:bg-white/[0.06]

                  border border-white/50 dark:border-white/[0.06]
                  `
              }
            `}
          >
            {item.label}
          </button>
        ))}

        <button
          className="
          inline-flex items-center gap-2

          h-10 px-4 rounded-2xl

          bg-white/50 dark:bg-white/[0.03]

          border border-white/50 dark:border-white/[0.06]

          hover:bg-white/70 dark:hover:bg-white/[0.06]

          text-sm font-medium

          transition-all duration-200
          "
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
