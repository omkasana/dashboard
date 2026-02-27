"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";
import PageHeader from "@/components/layout/page-header";
import TableEngine from "./table-engine";
import GridEngine from "./grid-engine";

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const viewsEnabled = config.views?.enabled ?? false;
  const defaultView = config.views?.defaultView ?? "table";

  const [view, setView] = useState<ViewType>(defaultView);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

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

  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  const [sortField, setSortField] = useState<"name" | "role" | "status">(
    "name",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  /* -------------------------------------------------------------------------- */
  /* SAMPLE DATA (Replace later with API)                                       */
  /* -------------------------------------------------------------------------- */

  const sampleData = [
    {
      name: "Jason Bourne",
      email: "jason.bourne@treadstone.com",
      role: "Operative",
      status: "Active",
    },
    {
      name: "Tyler Durden",
      email: "tyler.durden@fightclub.com",
      role: "Founder",
      status: "Active",
    },
    {
      name: "Nick Hale",
      email: "nick.hale@division7.com",
      role: "Director",
      status: "Inactive",
    },
    {
      name: "Thomas Shelby",
      email: "thomas.shelby@peakyblinders.uk",
      role: "Boss",
      status: "Active",
    },
    {
      name: "Walter White",
      email: "walter.white@heisenberg.com",
      role: "Chemist",
      status: "Inactive",
    },
    {
      name: "Tony Stark",
      email: "tony.stark@starkindustries.com",
      role: "CEO",
      status: "Active",
    },
    {
      name: "Bruce Wayne",
      email: "bruce.wayne@wayneenterprises.com",
      role: "Chairman",
      status: "Active",
    },
    {
      name: "Michael Corleone",
      email: "michael@corleonefamily.com",
      role: "Don",
      status: "Inactive",
    },
    {
      name: "Saul Goodman",
      email: "saul.goodman@bettercallsaul.com",
      role: "Lawyer",
      status: "Active",
    },
    {
      name: "Jon Snow",
      email: "jon.snow@thenorth.com",
      role: "Commander",
      status: "Active",
    },
    {
      name: "Daenerys Targaryen",
      email: "daenerys@dragonstone.com",
      role: "Queen",
      status: "Inactive",
    },
    {
      name: "Sherlock Holmes",
      email: "sherlock@bakerstreet.uk",
      role: "Detective",
      status: "Active",
    },
    {
      name: "James Bond",
      email: "james.bond@mi6.co.uk",
      role: "Agent 007",
      status: "Active",
    },
    {
      name: "Loki Laufeyson",
      email: "loki@asgard.com",
      role: "God of Mischief",
      status: "Inactive",
    },
    {
      name: "Peter Parker",
      email: "peter.parker@dailybugle.com",
      role: "Photographer",
      status: "Active",
    },
  ];

  /* -------------------------------------------------------------------------- */
  /* SEARCH + FILTER LOGIC (MEMOIZED)                                           */
  /* -------------------------------------------------------------------------- */

  const processedData = useMemo(() => {
    return (
      sampleData
        // Search
        .filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        )
        // Filters
        .filter((row) => {
          const roleMatch = filters.role === "all" || row.role === filters.role;

          const statusMatch =
            filters.status === "all" || row.status === filters.status;

          return roleMatch && statusMatch;
        })
        // Sorting
        .sort((a, b) => {
          const aVal = a[sortField];
          const bVal = b[sortField];

          if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
          if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
          return 0;
        })
    );
  }, [searchQuery, filters, sortField, sortDirection]);
  /* -------------------------------------------------------------------------- */
  /* RENDER                                                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="p-8 space-y-10">
      <PageHeader
        title={config.title}
        description={config.description}
        onAdd={config.actions?.add ? () => {} : undefined}
        onImport={config.actions?.import ? () => {} : undefined}
        onExport={config.actions?.export ? () => {} : undefined}
        onSearch={config.search?.enabled ? setSearchQuery : undefined}
        onFilterToggle={() => setShowFilters((prev) => !prev)}
        defaultView={viewsEnabled ? defaultView : undefined}
        onViewChange={viewsEnabled ? (view) => setView(view) : undefined}
      />

      {/* FILTER PANEL (Outside Table/Grid) */}
      {showFilters && (
        <div
          ref={filterRef}
          className="p-4 border border-border rounded-xl bg-background shadow-sm flex flex-wrap items-end gap-6"
        >
          {/* ROLE */}
          <div className="flex flex-col">
            <label className="text-[11px] font-medium text-muted-foreground mb-1">
              Role
            </label>
            <select
              value={filters.role}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="h-8 px-3 text-xs rounded-md border border-border bg-background"
            >
              <option value="all">All</option>
              <option value="Operative">Operative</option>
              <option value="Founder">Founder</option>
              <option value="Director">Director</option>
              <option value="Boss">Boss</option>
              <option value="CEO">CEO</option>
              <option value="Chairman">Chairman</option>
              <option value="Don">Don</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Commander">Commander</option>
              <option value="Queen">Queen</option>
              <option value="Detective">Detective</option>
              <option value="Agent 007">Agent 007</option>
              <option value="Photographer">Photographer</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="flex flex-col">
            <label className="text-[11px] font-medium text-muted-foreground mb-1">
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
              className="h-8 px-3 text-xs rounded-md border border-border bg-background"
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* SORT FIELD */}
          <div className="flex flex-col">
            <label className="text-[11px] font-medium text-muted-foreground mb-1">
              Sort By
            </label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="h-8 px-3 text-xs rounded-md border border-border bg-background"
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* SORT ORDER */}
          <div className="flex flex-col">
            <label className="text-[11px] font-medium text-muted-foreground mb-1">
              Order
            </label>
            <select
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as "asc" | "desc")
              }
              className="h-8 px-3 text-xs rounded-md border border-border bg-background"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* RESET BUTTON */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ role: "all", status: "all" });
                setSortField("name");
                setSortDirection("asc");
              }}
              className="h-8 px-3 text-xs rounded-md border border-border hover:bg-muted transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* VIEW CONTAINER */}
      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        {view === "table" && config.table?.enabled && (
          <TableEngine columns={config.table.columns} data={processedData} />
        )}

        {view !== "table" && config.grid?.enabled && (
          <GridEngine
            type={view}
            fields={config.grid.fields}
            data={processedData}
          />
        )}
      </div>
    </div>
  );
}
