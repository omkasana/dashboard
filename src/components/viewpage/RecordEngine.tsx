"use client";

import { useState } from "react";
import GridLayout from "./layouts/GridLayout";
import CardsLayout from "./layouts/CardsLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import CompactLayout from "./layouts/CompactLayout";
import RecordToolbar from "./RecordToolbar";

export default function RecordEngine({ config, data, model, id }: any) {
  console.log("VIEW CONFIG:", config);
  console.log("DEFAULT LAYOUT:", config?.defaultLayout);
  console.log("LAYOUTS:", config?.layouts);
  const [layoutKey, setLayoutKey] = useState(config.defaultLayout);

  const layout = config.layouts?.[layoutKey];

  if (!layout) {
    return <div className="p-6 text-red-500">Invalid layout config</div>;
  }

  return (
    <div className="space-y-6">
      <RecordToolbar
        config={config.toolbar}
        layouts={Object.keys(config.layouts)}
        currentLayout={layoutKey}
        onChangeLayout={setLayoutKey}
        model={model}
        id={id}
      />

      {layout.type === "grid" && <GridLayout layout={layout} data={data} />}
      {layout.type === "cards" && <CardsLayout layout={layout} data={data} />}
      {layout.type === "sidebar" && (
        <SidebarLayout layout={layout} data={data} />
      )}
      {layout.type === "compact" && (
        <CompactLayout layout={layout} data={data} />
      )}
    </div>
  );
}
