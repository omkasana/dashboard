"use client";

import { useState } from "react";
import type { ModuleConfig, ViewType } from "@/types/module";

import PageHeader from "@/components/List/ListHeader";
import FilterPanel from "@/components/Module/FilterPanel";
import { useModuleState } from "@/hooks/useModule";
import ViewRenderer from "./Module/ViewRendered";

interface Props {
  config: ModuleConfig;
}

export default function DynamicModule({ config }: Props) {
  const [view, setView] = useState<ViewType>(
    config.views?.defaultView ?? "table",
  );

  const [showFilters, setShowFilters] = useState(false);

  const { setSearchQuery, filters, setFilters, processedData } = useModuleState(
    config.data || [],
  );

  return (
    <div className="p-1 space-y-8">
      {/* HEADER */}
      <PageHeader
        title={config.title}
        onAdd={config.actions?.add ? () => {} : undefined}
        onImport={config.actions?.import ? () => {} : undefined}
        onExport={config.actions?.export ? () => {} : undefined}
        onSearch={config.search?.enabled ? setSearchQuery : undefined}
        onFilterToggle={
          config.filters?.enabled ? () => setShowFilters((p) => !p) : undefined
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

      {/* VIEW RENDER */}
      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        <ViewRenderer view={view} config={config} data={processedData} />
      </div>
    </div>
  );
}
