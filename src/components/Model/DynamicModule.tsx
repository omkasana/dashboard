"use client";

import { useState } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";

import ListHeader from "@/components/List/ListHeader";

import { useRouter } from "next/navigation";
import FilterPanel from "./FilterPanel";
import ViewRenderer from "./ViewRendered";
import { useModuleState } from "@/hooks/useModule";

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const router = useRouter();

  const [view, setView] = useState<ViewType>(
    config.views?.defaultView ?? "table",
  );

  const [showFilters, setShowFilters] = useState(false);

  const { setSearchQuery, filters, setFilters, processedData } = useModuleState(
    config.data || [],
  );

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
      <ListHeader
        title={config.title}
        onAdd={config.actions?.add ? handleAdd : undefined}
        onImport={config.actions?.import ? handleImport : undefined}
        onExport={config.actions?.export ? handleExport : undefined}
        onSearch={config.search?.enabled ? setSearchQuery : undefined}
        onFilterToggle={
          config.filters?.enabled ? () => setShowFilters((p) => !p) : undefined
        }
        currentView={view}
        availableViews={config.views?.available}
        onViewChange={config.views?.enabled ? setView : undefined}
      />

      {showFilters && config.filters?.enabled && (
        <FilterPanel
          fields={config.filters.fields}
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters({})}
        />
      )}

      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        <ViewRenderer view={view} config={config} data={processedData} />
      </div>
    </div>
  );
}
