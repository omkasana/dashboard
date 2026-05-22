"use client";

import { useState, useEffect, useMemo } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";
import { useRouter } from "next/navigation";

import ListHeader from "@/components/List/ListHeader";
import FilterPanel from "./FilterPanel";
import ViewRenderer from "./ViewRendered";

import { useModuleState } from "@/hooks/useModule";
import Pagination from "../List/Pagination";
import ExportDialog from "@/components/List/ExportDialog";
import { fetchModuleData } from "@/lib/api";

interface Props {
  config: ModuleConfig;
}

type ModuleRow = Record<string, unknown> & {
  id?: string | number;
  _id?: string | number;
  slug?: string;
};

function sortValue(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return value.toLowerCase();
  if (value instanceof Date) return value.getTime();
  return String(value ?? "").toLowerCase();
}

export default function DynamicModule({ config }: Props) {
  const router = useRouter();

  const fallbackData = useMemo(
    () => (Array.isArray(config.data) ? (config.data as ModuleRow[]) : []),
    [config.data],
  );

  const [data, setData] = useState<ModuleRow[]>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    async function load() {
      if (
        (config.id === "users" || config.id === "user-organizations") &&
        fallbackData.length > 0
      ) {
        setData(fallbackData);
        setLoading(false);
        return;
      }

      try {
        const json = await fetchModuleData(config.id);
        setData(Array.isArray(json) ? (json as ModuleRow[]) : []);
      } catch (err) {
        console.error("Failed to load module data", err);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [config.id, fallbackData]);

  /* ================= MODULE STATE ================= */

  const { searchQuery, setSearchQuery, filters, setFilters, processedData } =
    useModuleState(data);

  /* ================= VIEW STATE ================= */

  const [view, setView] = useState<ViewType>(
    config.views?.defaultView ?? "table",
  );

  const [showFilters, setShowFilters] = useState(false);

  /* ================= SORT ================= */

  const [sortField, setSortField] = useState(
    config.table?.columns?.[0]?.key || "",
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortField) return processedData;

    return [...processedData].sort((a, b) => {
      const aVal = sortValue(a[sortField]);
      const bVal = sortValue(b[sortField]);

      if (aVal === bVal) return 0;

      const result = aVal > bVal ? 1 : -1;

      return sortOrder === "asc" ? result : -result;
    });
  }, [processedData, sortField, sortOrder]);

  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* ================= ACTIONS ================= */

  const handleAdd = () => {
    router.push(`/dashboard/${config.id}/add`);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const handleImport = () => {
    // TODO: implement
  };

  /* ================= LOADING ================= */

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  /* ================= RENDER ================= */

  return (
    <div className="p-4">
      {/* 🔹 Main content with spacing */}
      <div className="space-y-8">
        <ListHeader
          module={config.id}
          title={config.title}
          description={config.description}
          onAdd={config.actions?.add ? handleAdd : undefined}
          onExport={config.actions?.export ? handleExport : undefined}
          onImport={config.actions?.import ? handleImport : undefined}
          onSearch={config.search?.enabled ? setSearchQuery : undefined}
          onFilterToggle={
            config.filters?.enabled
              ? () => setShowFilters((prev) => !prev)
              : undefined
          }
          currentView={view}
          availableViews={config.views?.available}
          onViewChange={config.views?.enabled ? setView : undefined}
        />

        {showFilters && config.filters?.enabled && (
          <FilterPanel
            fields={config.filters.fields}
            columns={config.table.columns}
            filters={filters}
            setFilters={setFilters}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onReset={() => setFilters({})}
          />
        )}

        <ViewRenderer
          view={view}
          config={config}
          data={
            view === "table" || view === "grid" || view === "list"
              ? paginatedData
              : processedData
          }
        />

        {showExport && (
          <ExportDialog
            data={processedData}
            filename={config.id}
            onClose={() => setShowExport(false)}
          />
        )}
      </div>

      {/* 🔹 Sticky pagination (isolated from spacing) */}
      {(view === "table" || view === "grid" || view === "list") && (
        <div className="sticky bottom-0 mt-6 bg-background/80 backdrop-blur-xl py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
}
