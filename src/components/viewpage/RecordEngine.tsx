"use client";

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
  const layout = config.layouts[config.defaultLayout];

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
      <RecordToolbar model={model} id={id} onDelete={onDelete} data={data} />
      <div className="p-4 md:p-6 max-w-7xl mx-auto">{renderLayout()}</div>
    </div>
  );
}
