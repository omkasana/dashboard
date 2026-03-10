"use client";

import { useState } from "react";
import { ViewConfig } from "@/types/module";
import { RecordToolbar } from "./RecordToolbar";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { GridLayout } from "./layouts/GridLayout";
import { CardsLayout } from "./layouts/CardsLayout";
import { SidebarLayout } from "./layouts/SidebarLayout";
import { CompactLayout } from "./layouts/CompactLayout";

interface RecordEngineProps {
  config: ViewConfig;
  data: Record<string, unknown>;
  model: string;
  id: string;
  onDelete?: () => void;
}

export function RecordEngine({
  config,
  data,
  model,
  id,
  onDelete,
}: RecordEngineProps) {
  const [activeLayout, setActiveLayout] = useState(config.defaultLayout);
  const layout = config.layouts[activeLayout];

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${model}-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderLayout = () => {
    if (!layout)
      return (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Layout not found.
        </p>
      );

    switch (layout.type) {
      case "profile":
        return (
          <ProfileLayout config={layout} viewConfig={config} data={data} />
        );
      case "grid":
        return <GridLayout config={layout} viewConfig={config} data={data} />;
      case "cards":
        return <CardsLayout config={layout} viewConfig={config} data={data} />;
      case "sidebar":
        return (
          <SidebarLayout config={layout} viewConfig={config} data={data} />
        );
      case "compact":
        return (
          <CompactLayout config={layout} viewConfig={config} data={data} />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <RecordToolbar
        model={model}
        id={id}
        currentLayout={activeLayout}
        availableLayouts={Object.keys(config.layouts)}
        onLayoutChange={setActiveLayout}
        onDelete={onDelete}
        data={data}
      />
      <div className="p-4 md:p-6 max-w-7xl mx-auto">{renderLayout()}</div>
    </div>
  );
}
