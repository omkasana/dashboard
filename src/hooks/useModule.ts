"use client";

import { useMemo, useState } from "react";

export function useModuleState<T>(data: T[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const processedData = useMemo(() => {
    let result = [...data];

    // 🔍 Search
    if (searchQuery) {
      result = result.filter((row) =>
        Object.values(row as any).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }

    // 🎯 Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((row: any) => row[key] === value);
      }
    });

    // 🔄 Sorting
    if (sortField) {
      result.sort((a: any, b: any) => {
        if (a[sortField] < b[sortField])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, filters, sortField, sortDirection]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    processedData,
  };
}
