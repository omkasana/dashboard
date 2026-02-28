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

  /* ================= PAGINATION ================= */

  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

  const paginatedData = processedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Reset page when search/filter changes
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
    <div className="p-1 space-y-8">
      {/* HEADER */}
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

      {/* FILTER PANEL */}
      {showFilters && config.filters?.enabled && (
        <FilterPanel
          fields={config.filters.fields}
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters({})}
        />
      )}

      {/* VIEW */}
      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        <ViewRenderer view={view} config={config} data={paginatedData} />
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
