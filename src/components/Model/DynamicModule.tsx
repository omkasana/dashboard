"use client";

import { useState, useEffect } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";
import { useRouter } from "next/navigation";

import ListHeader from "@/components/List/ListHeader";
import FilterPanel from "./FilterPanel";
import ViewRenderer from "./ViewRendered";

import { useModuleState } from "@/hooks/useModule";
import Pagination from "../List/Pagination";

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const router = useRouter();

  /* ================= MODULE STATE ================= */

  const { setSearchQuery, filters, setFilters, processedData } = useModuleState(
    config.data || [],
  );

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

  const sortedData = [...processedData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === bVal) return 0;

    const result = aVal > bVal ? 1 : -1;

    return sortOrder === "asc" ? result : -result;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [processedData, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [processedData]);

  /* ================= ACTION HANDLERS ================= */

  const handleAdd = () => {
    router.push(`/dashboard/${config.id}/add`);
  };

  const handleImport = (file: File) => {
    console.log("Imported file:", file.name);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(processedData, null, 2);
    const blob = new Blob([dataStr], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
