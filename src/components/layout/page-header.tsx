"use client";

import {
  Search,
  Plus,
  Upload,
  Download,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ViewType } from "@/types/module";

interface PageHeaderProps {
  title: string;
  description?: string;

  onSearch?: (value: string) => void;
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;

  onFilterToggle?: () => void;

  defaultView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

export default function PageHeader({
  title,
  description,
  onSearch,
  onAdd,
  onImport,
  onExport,
  onFilterToggle,
  defaultView = "table",
  onViewChange,
}: PageHeaderProps) {
  const [view, setView] = useState<ViewType>(defaultView);

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  const handleViewChange = (type: ViewType) => {
    setView(type);
    onViewChange?.(type);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-5 justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 flex-wrap">
          {onImport && (
            <button
              onClick={onImport}
              className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
          )}

          {onExport && (
            <button
              onClick={onExport}
              className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          )}

          {onAdd && (
            <button
              onClick={onAdd}
              className="px-4 h-9 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition flex items-center gap-2 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 w-full xl:w-auto">
          {onSearch && (
            <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-background w-full xl:w-72 focus-within:ring-2 focus-within:ring-primary/30 transition">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          )}

          {/* Slim Filter Button */}
          {onFilterToggle && (
            <button
              onClick={onFilterToggle}
              className="h-9 px-3 rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}

          {onViewChange && (
            <div className="flex items-center border border-border rounded-lg overflow-hidden h-9">
              <button
                onClick={() => handleViewChange("table")}
                className={`px-3 h-full flex items-center ${
                  view === "table" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                <List className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleViewChange("grid")}
                className={`px-3 h-full flex items-center ${
                  view === "grid" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleViewChange("gridCompact")}
                className={`px-3 h-full text-xs ${
                  view === "gridCompact" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                C
              </button>

              <button
                onClick={() => handleViewChange("gridDetailed")}
                className={`px-3 h-full text-xs ${
                  view === "gridDetailed" ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                D
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
