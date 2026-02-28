"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";
import PageHeader from "@/components/layout/page-header";
import TableEngine from "./table-engine";
import GridEngine from "./grid-engine";
import ListEngine from "./list-engine";
import KanbanEngine from "./kanban-engine";

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const viewsEnabled = config.views?.enabled ?? false;

  const [view, setView] = useState<ViewType>(
    config.views?.defaultView ?? "table",
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  /* ================= CLICK OUTSIDE FILTER ================= */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  /* ================= FILTER + SORT STATE ================= */

  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  const [sortField, setSortField] = useState<"name" | "role" | "status">(
    "name",
  );

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  /* ================= SAMPLE DATA ================= */

  const sampleData = [
    {
      name: "Jason Bourne",
      email: "jason@treadstone.com",
      role: "Operative",
      status: "Active",
    },
    {
      name: "Bruce Wayne",
      email: "bruce@wayneenterprises.com",
      role: "Chairman",
      status: "Active",
    },
    {
      name: "Walter White",
      email: "walter@heisenberg.com",
      role: "Chemist",
      status: "Inactive",
    },
    {
      name: "Tony Stark",
      email: "tony@starkindustries.com",
      role: "CEO",
      status: "Active",
    },
    {
      name: "Thomas Shelby",
      email: "thomas@shelby.co.uk",
      role: "Boss",
      status: "Inactive",
    },
  ];

  /* ================= DATA PROCESSING ================= */

  const processedData = useMemo(() => {
    return sampleData
      .filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      .filter((row) => {
        const roleMatch = filters.role === "all" || row.role === filters.role;
        const statusMatch =
          filters.status === "all" || row.status === filters.status;
        return roleMatch && statusMatch;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchQuery, filters, sortField, sortDirection]);

  /* ================= RENDER ================= */

  return (
    <div className="p-1 space-y-8">
      {/* HEADER */}
      <PageHeader
        title={config.title}
        onAdd={config.actions?.add ? () => {} : undefined}
        onImport={config.actions?.import ? () => {} : undefined}
        onExport={config.actions?.export ? () => {} : undefined}
        onSearch={config.search?.enabled ? setSearchQuery : undefined}
        onFilterToggle={() => setShowFilters((prev) => !prev)}
        currentView={view}
        availableViews={config.views?.available}
        onViewChange={viewsEnabled ? setView : undefined}
      />

      {/* FILTER PANEL */}
      {showFilters && (
        <div
          ref={filterRef}
          className="p-4 border border-border rounded-xl bg-background shadow-sm flex flex-wrap items-end gap-6"
        >
          {/* Role */}
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Role</label>
            <select
              value={filters.role}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="h-8 px-3 text-xs rounded-md border border-border"
            >
              <option value="all">All</option>
              <option value="Operative">Operative</option>
              <option value="CEO">CEO</option>
              <option value="Chairman">Chairman</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="h-8 px-3 text-xs rounded-md border border-border"
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setFilters({ role: "all", status: "all" });
              setSortField("name");
              setSortDirection("asc");
            }}
            className="h-8 px-3 text-xs rounded-md border border-border hover:bg-muted"
          >
            Reset
          </button>
        </div>
      )}

      {/* VIEW RENDER */}
      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        {view === "table" && config.table?.enabled && (
          <TableEngine
            density="compact"
            columns={config.table.columns}
            data={processedData}
          />
        )}

        {view === "list" && (
          <ListEngine density="compact" data={processedData} />
        )}

        {view === "grid" && config.grid?.enabled && (
          <GridEngine
            styleType="card"
            density="compact"
            fields={config.grid.fields}
            data={processedData}
          />
        )}

        {view === "kanban" && (
          <KanbanEngine density="compact" data={processedData} />
        )}
      </div>
    </div>
  );
}
