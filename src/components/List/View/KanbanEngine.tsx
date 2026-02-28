"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ActionMenu from "../ActionMenu";

interface KanbanColumn {
  key: string;
  label: string;
  color?: "success" | "warning" | "danger" | "info" | "neutral";
}

interface Props {
  data: any[];
  density: "comfortable" | "compact";
  moduleId: string;
  groupBy: string;
  columns: KanbanColumn[];
  card: {
    title: string;
    subtitle?: string;
    meta?: string[];
    highlight?: string;
    badge?: string;
  };
}

export default function KanbanEngine({
  data,
  density,
  moduleId,
  groupBy,
  columns,
  card,
}: Props) {
  const [items, setItems] = useState(data);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const padding = density === "compact" ? "p-3" : "p-4";

  const handleDrop = (columnKey: string) => {
    if (!draggingId) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingId
          ? { ...item, [groupBy]: columnKey }
          : item
      )
    );

    setDraggingId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="flex gap-8 overflow-x-auto pb-6">
      {columns.map((column) => {
        const columnItems = items.filter(
          (item) => item[groupBy] === column.key
        );

        return (
          <div
            key={column.key}
            className="
            min-w-[320px] flex-shrink-0
            flex flex-col
            max-h-[78vh]
          "
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverColumn(column.key);
            }}
            onDrop={() => handleDrop(column.key)}
            onDragLeave={() => setDragOverColumn(null)}
          >
            {/* COLUMN HEADER */}
            <div
              className={cn(
                "sticky top-0 z-20 px-2 pb-4 bg-background",
                dragOverColumn === column.key &&
                "bg-primary/5"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground tracking-tight">
                  {column.label}
                </h3>

                <span className="text-xs text-muted-foreground">
                  {columnItems.length}
                </span>
              </div>

              <div className="h-px mt-3 bg-border" />
            </div>

            {/* COLUMN BODY */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {columnItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggingId(item.id)}
                  onDragEnd={() => setDraggingId(null)}
                  className={cn(
                    padding,
                    "group rounded-xl bg-background border border-border",
                    "shadow-sm transition-all duration-200",
                    "hover:shadow-md hover:border-primary/30",
                    "hover:-translate-y-[2px]",
                    draggingId === item.id && "opacity-40 scale-95"
                  )}
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item[card.title]}
                      </p>

                      {card.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item[card.subtitle]}
                        </p>
                      )}
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition">
                      <ActionMenu
                        id={item.id}
                        moduleId={moduleId}
                      />
                    </div>
                  </div>

                  {/* META */}
                  {card.meta && (
                    <div className="text-xs text-muted-foreground mb-3">
                      {card.meta
                        .map((key) => item[key])
                        .filter(Boolean)
                        .join(" • ")}
                    </div>
                  )}

                  {/* VALUE */}
                  {card.highlight && (
                    <div className="text-base font-semibold text-foreground mb-2">
                      ₹{" "}
                      {Number(item[card.highlight]).toLocaleString("en-IN")}
                    </div>
                  )}

                  {/* BADGE */}
                  {card.badge && (
                    <div>
                      <span className="px-2.5 py-1 text-xs rounded-full bg-muted text-foreground/70">
                        {item[card.badge]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}