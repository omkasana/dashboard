"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
}

type Density = "comfortable" | "compact";

export default function TableEngine({ columns, data }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [density, setDensity] = useState<Density>("comfortable");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  useEffect(() => {
    setPage(1);
  }, [rowsPerPage, filters]);

  // Filtering
  const filteredData = data.filter((row) => {
    const roleMatch = filters.role === "all" || row.role === filters.role;

    const statusMatch =
      filters.status === "all" || row.status === filters.status;

    return roleMatch && statusMatch;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;

    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));

  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const startItem = sortedData.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;

  const endItem = Math.min(page * rowsPerPage, sortedData.length);

  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];

    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const rowPadding = density === "comfortable" ? "py-4" : "py-2";

  return (
    <div className="w-full">
      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-4 border-b border-border bg-muted/30 relative">
        <div className="text-sm text-muted-foreground">
          Showing {startItem}–{endItem} of {sortedData.length} results
        </div>

        <div className="flex items-center gap-4 text-sm">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="px-3 h-8 border border-border rounded-md bg-background hover:bg-muted transition"
            >
              Filters
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-md p-4 space-y-4 z-50">
                <div>
                  <label className="text-xs text-muted-foreground">Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border border-border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                    <option value="Operative">Operative</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border border-border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <button
                  onClick={() =>
                    setFilters({
                      role: "all",
                      status: "all",
                    })
                  }
                  className="w-full text-sm text-primary hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Rows per page */}
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="h-8 px-2 border border-border rounded-md bg-background text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <button
            onClick={() =>
              setDensity(density === "comfortable" ? "compact" : "comfortable")
            }
            className="hover:text-foreground"
          >
            Density: {density}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-6 py-4 text-left font-medium text-muted-foreground cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-muted/30">
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 ${rowPadding}`}>
                    {renderCell(row[col.key])}
                  </td>
                ))}

                <td className="px-6 relative text-right">
                  <button
                    onClick={() =>
                      setActiveRow(activeRow === index ? null : index)
                    }
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {activeRow === index && (
                    <div className="absolute right-6 mt-2 w-40 bg-background border border-border rounded-lg shadow-md p-2 z-50">
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md">
                        View
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md">
                        Edit
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-muted rounded-md">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border border-border rounded-md disabled:opacity-40"
          >
            Previous
          </button>

          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 border rounded-md ${
                page === num
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border border-border rounded-md disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function renderCell(value: any) {
  if (value === "Active") {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
        Active
      </span>
    );
  }

  if (value === "Inactive") {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-700">
        Inactive
      </span>
    );
  }

  return value;
}
