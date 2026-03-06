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

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const router = useRouter();

  const [showExport, setShowExport] = useState(false);

  /* ================= MODULE STATE ================= */

  const { searchQuery, setSearchQuery, filters, setFilters, processedData } =
    useModuleState(config.data || []);

  /* ================= VIEW STATE ================= */

  const [view, setView] = useState<ViewType>(
    config.views?.defaultView ?? "table",
  );

  const [showFilters, setShowFilters] = useState(false);

  /* ================= SORT STATE ================= */

  const [sortField, setSortField] = useState(
    config.table?.columns?.[0]?.key || "",
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ================= SORT DATA ================= */

  const sortedData = useMemo(() => {
    if (!sortField) return processedData;

    return [...processedData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;

      const result = aVal > bVal ? 1 : -1;

      return sortOrder === "asc" ? result : -result;
    });
  }, [processedData, sortField, sortOrder]);

  /* ================= PAGINATION DATA ================= */

  const totalItems = sortedData.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  /* ================= RESET PAGE WHEN DATA CHANGES ================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, pageSize]);

  /* ================= KEEP PAGE IN RANGE ================= */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* ================= ACTION HANDLERS ================= */

  const handleAdd = () => {
    router.push(`/dashboard/${config.id}/add`);
  };

  const handleImport = (file: File) => {
    console.log("Imported file:", file.name);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-4 space-y-8">
      <ListHeader
        module={config.id}
        title={config.title}
        description={config.description}
        onAdd={config.actions?.add ? handleAdd : undefined}
        onImport={config.actions?.import ? handleImport : undefined}
        onExport={config.actions?.export ? handleExport : undefined}
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

      {(view === "table" || view === "grid" || view === "list") && (
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl py-2">
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
