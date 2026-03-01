"use client";

import CalendarView from "../List/View/CalendarVIew";
import DataGrid from "../List/View/DataGrid/DataGrid";
import GridEngine from "../List/View/GridEngine";
import KanbanEngine from "../List/View/KanbanEngine";
import ListEngine from "../List/View/ListEngine";
import TableEngine from "../List/View/TableEngine";

interface Props {
  view: string;
  config: any;
  data: any[];
}

export default function ViewRenderer({ view, config, data }: Props) {
  switch (view) {
    case "table":
      if (!config.table?.enabled) return null;
      return (
        <DataGrid
          density="comfortable"
          columns={config.table.columns}
          data={data}
          moduleId={config.id}
        />
      );

    case "grid":
      if (!config.grid?.enabled) return null;
      return (
        <GridEngine
          density="compact"
          layout={config.grid.layout}
          data={data}
          moduleId={config.id}
        />
      );

    case "list":
      return <ListEngine density="compact" data={data} moduleId={config.id} />;

    case "kanban":
      return (
        <KanbanEngine
          density="compact"
          data={data}
          moduleId={config.id}
          groupBy={config.kanban!.groupBy}
          columns={config.kanban!.columns}
          card={config.kanban!.card}
        />
      );
    case "calendar":
      if (!config.calendar?.enabled) return null;
      return (
        <CalendarView
          data={data}
          moduleId={config.id}
          dateField={config.calendar.dateField}
          layout={config.calendar.layout}
        />
      );

    default:
      return null;
  }
}
