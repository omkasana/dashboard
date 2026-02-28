"use client";

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
        <TableEngine
          density="compact"
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
          styleType="card"
          fields={config.grid.fields}
          data={data}
          moduleId={config.id}
        />
      );

    case "list":
      return <ListEngine density="compact" data={data} moduleId={config.id} />;

    case "kanban":
      return (
        <KanbanEngine density="compact" data={data} moduleId={config.id} />
      );

    default:
      return null;
  }
}
