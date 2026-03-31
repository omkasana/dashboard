"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import ActionMenu from "../ActionMenu";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";

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
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  const padding = density === "compact" ? "p-3" : "p-4";

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBrandColor = (color?: string) =>
    color ? `var(--brand-${color})` : "var(--primary)";

  const handleDrop = (columnKey: string) => {
    if (!draggingId) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingId ? { ...item, [groupBy]: columnKey } : item,
      ),
    );

    setDraggingId(null);
    setDragOverColumn(null);
  };

  return (
    <div
      className={cn(
        "flex gap-8 overflow-x-auto pb-10 px-2 scroll-smooth transition-all duration-500",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{
        scrollPaddingLeft: "2rem",
        scrollPaddingRight: "2rem",
      }}
    >
      {columns.map((column) => {
        const columnItems = items.filter(
          (item) => item[groupBy] === column.key,
        );

        const totalValue = useMemo(() => {
          if (!card.highlight) return 0;
          const highlightKey = card.highlight;
          return columnItems.reduce(
            (sum, item) => sum + Number(item[highlightKey] || 0),
            0,
          );
        }, [columnItems, card.highlight]);

        return (
          <div
            key={column.key}
            className="
              min-w-[320px]
              shrink-0
              flex flex-col
              max-h-[78vh]
              rounded-2xl
              border border-border
              bg-background
              overflow-hidden
              relative
            "
            style={{
              background:
                dragOverColumn === column.key
                  ? "color-mix(in srgb, var(--primary) 6%, transparent)"
                  : undefined,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverColumn(column.key);
            }}
            onDrop={() => handleDrop(column.key)}
            onDragLeave={() => setDragOverColumn(null)}
          >
            {/* Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: getBrandColor(column.color) }}
            />

            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-background px-4 pt-4 pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {column.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {columnItems.length} items
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCollapsed((prev) => ({
                      ...prev,
                      [column.key]: !prev[column.key],
                    }))
                  }
                  className="p-1 rounded hover:bg-muted transition"
                >
                  {collapsed[column.key] ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

              {card.highlight && (
                <div className="text-xs text-muted-foreground mt-2">
                  ₹ {totalValue.toLocaleString("en-IN")}
                </div>
              )}

              <div className="h-px mt-2 bg-border" />
            </div>

            {/* BODY */}
            {!collapsed[column.key] && (
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                {columnItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => setDraggingId(item.id)}
                    onDragEnd={() => setDraggingId(null)}
                    className={cn(
                      padding,
                      "group relative rounded-xl border border-border bg-background shadow-sm transition-all duration-200",
                      "hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40",
                      draggingId === item.id && "opacity-40 scale-95",
                    )}
                  >
                    {/* Drag Overlay */}
                    {draggingId === item.id && (
                      <div className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none" />
                    )}

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

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-1 rounded hover:bg-muted transition">
                          <Eye size={14} />
                        </button>
                        <ActionMenu id={item.id} moduleId={moduleId} />
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
                        ₹ {Number(item[card.highlight]).toLocaleString("en-IN")}
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
            )}
          </div>
        );
      })}

      {/* Right Spacer Prevents Edge Cut */}
      <div className="w-2 shrink-0" />
    </div>
  );
}
