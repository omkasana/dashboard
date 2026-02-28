"use client";

import type { ViewType } from "@/types/module";
import {
  Table2,
  List,
  LayoutGrid,
  Columns,
  Calendar,
  BarChart3,
  GitBranch,
  Map,
  Image,
} from "lucide-react";

const viewIcons: Record<ViewType, React.ReactNode> = {
  table: <Table2 size={16} />,
  list: <List size={16} />,
  grid: <LayoutGrid size={16} />,
  kanban: <Columns size={16} />,
  calendar: <Calendar size={16} />,
  analytics: <BarChart3 size={16} />,
  timeline: <GitBranch size={16} />,
  map: <Map size={16} />,
  gallery: <Image size={16} />,
};

interface ViewSwitcherProps {
  currentView?: ViewType;
  availableViews: ViewType[];
  onViewChange: (view: ViewType) => void;
}

export function ViewSwitcher({
  currentView,
  availableViews,
  onViewChange,
}: ViewSwitcherProps) {
  if (!availableViews.length) return null;

  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      {availableViews.map((view) => {
        const active = currentView === view;

        return (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`flex items-center gap-2 px-3 h-9 text-sm transition ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted text-muted-foreground"
            }`}
          >
            {viewIcons[view]}
            <span className="hidden md:inline capitalize">{view}</span>
          </button>
        );
      })}
    </div>
  );
}
