"use client";

import { useMemo, useState } from "react";

import CalendarView from "../List/View/CalendarVIew";
import DataGrid from "../List/View/DataGrid/DataGrid";
import GridEngine from "../List/View/GridEngine";
import KanbanEngine from "../List/View/KanbanEngine";
import ListEngine from "../List/View/ListEngine";
import BulkActionsBar from "../List/BulkActionsBar";

interface Props {
  view: string;
  config: {
    id: string;
    table?: {
      enabled?: boolean;
      columns: {
        key: string;
        label: string;
        type?: string;
        strong?: boolean;
        variant?: "primary" | "neutral" | "info";
      }[];
    };
    grid?: {
      enabled?: boolean;
      layout: {
        header: {
          title: string;
          subtitle?: string;
          badge?: string;
        };
        meta?: string[];
        stats?: string[];
        footer?: string[];
      };
    };
    kanban?: {
      groupBy: string;
      columns: {
        key: string;
        label: string;
        color?: "success" | "warning" | "danger" | "info" | "neutral";
      }[];
      card: {
        title: string;
        subtitle?: string;
        meta?: string[];
        highlight?: string;
        badge?: string;
      };
    };
    calendar?: {
      enabled?: boolean;
      dateField: string;
      layout?: {
        title: string;
        subtitle?: string;
        badge?: string;
      };
    };
  };
  data: Record<string, unknown>[];
}

function rowId(item: Record<string, unknown>) {
  const id = item.id ?? item._id;
  return typeof id === "string" || typeof id === "number" ? id : "";
}

export default function ViewRenderer({ view, config, data }: Props) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [deletedIds, setDeletedIds] = useState<(string | number)[]>([]);
  const rows = useMemo(
    () => data.filter((item) => !deletedIds.includes(rowId(item))),
    [data, deletedIds],
  );

  const handleDelete = (id: string | number) => {
    setDeletedIds((prev) => [...prev, id]);
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <>
      <BulkActionsBar
        selectedIds={selectedIds.map(String)}
        data={rows}
        onClear={() => setSelectedIds([])}
      />

      {view === "table" && config.table?.enabled && (
        <DataGrid
          density="comfortable"
          columns={config.table.columns}
          data={rows}
          moduleId={config.id}
          selected={selectedIds}
          setSelected={setSelectedIds}
          onDelete={handleDelete} // ✅ added
        />
      )}

      {view === "grid" && config.grid?.enabled && (
        <GridEngine
          density="compact"
          layout={config.grid.layout}
          data={rows}
          moduleId={config.id}
        />
      )}

      {view === "list" && (
        <ListEngine density="compact" data={rows} moduleId={config.id} />
      )}

      {view === "kanban" && (
        <KanbanEngine
          density="compact"
          data={rows}
          moduleId={config.id}
          groupBy={config.kanban!.groupBy}
          columns={config.kanban!.columns}
          card={config.kanban!.card}
        />
      )}

      {view === "calendar" && config.calendar?.enabled && (
        <CalendarView
          data={rows}
          moduleId={config.id}
          dateField={config.calendar.dateField}
          layout={config.calendar.layout}
        />
      )}
    </>
  );
}
