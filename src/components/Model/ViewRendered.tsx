"use client";

import { useState } from "react";

import CalendarView from "../List/View/CalendarVIew";
import DataGrid from "../List/View/DataGrid/DataGrid";
import GridEngine from "../List/View/GridEngine";
import KanbanEngine from "../List/View/KanbanEngine";
import ListEngine from "../List/View/ListEngine";
import TableEngine from "../List/View/TableEngine";
import BulkActionsBar from "../List/BulkActionsBar";

interface Props {
  view: string;
  config: any;
  data: any[];
}

export default function ViewRenderer({ view, config, data }: Props) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [rows, setRows] = useState(data); // ✅ local state

  const handleDelete = (id: string | number) => {
    setRows((prev) => prev.filter((item) => (item.id ?? item._id) !== id));

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
