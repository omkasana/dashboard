"use client";

import type { ViewType } from "@/types/module";
import { ViewSwitcher } from "./ViewSwitcher";
import { HeaderActions } from "./HeaderAction";

import { FilterButton } from "./FilterButton";
import { SearchBar } from "./SearchBar";
import ExportDialog from "@/components/List/ExportDialog";

interface PageHeaderProps {
  module: string;
  title: string;
  description?: string;

  onSearch?: (value: string) => void;
  onAdd?: () => void;
  onImport?: (file: File) => void; // ✅ FIXED
  onExport?: () => void;
  onFilterToggle?: () => void;

  currentView?: ViewType;
  availableViews?: ViewType[];
  onViewChange?: (view: ViewType) => void;

  addLabel?: string;
}

export default function ListHeader({
  module,
  title,
  description,
  onSearch,
  onAdd,
  onImport,
  onExport,
  onFilterToggle,
  currentView,
  availableViews = [],
  onViewChange,
  addLabel,
}: PageHeaderProps) {
  return (
    <div className="space-y-6">
      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {onViewChange && (
          <ViewSwitcher
            currentView={currentView}
            availableViews={availableViews}
            onViewChange={onViewChange}
            moduleId={module}
          />
        )}
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <HeaderActions
          onImport={onImport}
          onExport={onExport}
          onAdd={onAdd}
          addLabel={addLabel}
        />

        <div className="flex items-center gap-3 w-full xl:w-auto">
          {onSearch && <SearchBar onSearch={onSearch} />}
          {onFilterToggle && <FilterButton onClick={onFilterToggle} />}
        </div>
      </div>
    </div>
  );
}
