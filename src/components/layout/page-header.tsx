"use client";

import {
  Search,
  Plus,
  Upload,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ViewType } from "@/types/module";

interface PageHeaderProps {
  title: string;
  description?: string;

  onSearch?: (value: string) => void;
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;

  onFilterToggle?: () => void;

  currentView?: ViewType;
  availableViews?: ViewType[];
  onViewChange?: (view: ViewType) => void;
}

export default function PageHeader({
  onSearch,
  onAdd,
  onImport,
  onExport,
  onFilterToggle,
  currentView,
  availableViews = [],
  onViewChange,
}: PageHeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
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
            className="px-4 h-9 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 w-full xl:w-auto">
        {onSearch && (
          <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-background w-full xl:w-72">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        )}

        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="h-9 px-3 rounded-lg border border-border bg-background hover:bg-muted transition"
          >
            <Filter className="h-4 w-4" />
          </button>
        )}

        {/* VIEW DROPDOWN */}
        {onViewChange && availableViews.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="h-9 px-3 border border-border rounded-md bg-background flex items-center gap-2 text-sm"
            >
              {currentView}
              <ChevronDown size={14} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-md shadow-lg z-50">
                {availableViews.map((view) => (
                  <button
                    key={view}
                    onClick={() => {
                      onViewChange(view);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  >
                    {view}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
