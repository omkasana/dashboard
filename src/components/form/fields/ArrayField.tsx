"use client";

import { useState } from "react";
import FieldRenderer from "../FieldRenderer";
import { FormField } from "@/types/module";
import { fieldConfig as fc } from "@/lib/fieldConfig";

interface ArrayFieldProps {
  field: any;
  value?: any[];
  onChange: (name: string, value: any[]) => void;
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// Derive a summary label from an item's fields
function getItemSummary(item: any, childFields: FormField[]): string {
  // Prefer fields named: name, title, label, key
  const priority = ["name", "title", "label", "key"];
  for (const key of priority) {
    if (item?.[key] && typeof item[key] === "string") return item[key];
  }
  // Fall back to first non-empty string field
  for (const f of childFields) {
    if (item?.[f.name] && typeof item[f.name] === "string") return item[f.name];
  }
  return "";
}

// Compute grid cols class from field.columns config or child count
function getGridCols(childFields: FormField[], fieldColumns?: number): string {
  const cols = fieldColumns ?? (childFields.length >= 4 ? 2 : 1);
  return cols === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : cols === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1";
}

function getSpanClass(span?: number): string {
  if (span === 2) return "sm:col-span-2";
  if (span === 3) return "sm:col-span-3";
  return "";
}

export default function ArrayField({
  field,
  value = [],
  onChange,
}: ArrayFieldProps) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const childFields: FormField[] = field.fields ?? [];
  const gridCols = getGridCols(childFields, field.columns);

  const addItem = () => {
    const idx = value.length;
    onChange(field.name, [...value, {}]);
    // Auto-expand the new item
    setCollapsed((prev) => ({ ...prev, [idx]: false }));
  };

  const removeItem = (index: number) => {
    onChange(
      field.name,
      value.filter((_, i) => i !== index),
    );
    setCollapsed((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const updateItem = (index: number, childName: string, childValue: any) => {
    const next = [...value];
    next[index] = { ...next[index], [childName]: childValue };
    onChange(field.name, next);
  };

  const toggleCollapse = (index: number) =>
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="flex flex-col gap-3">
      {/* ── Items ── */}
      {value.map((item, index) => {
        const isOpen = collapsed[index] !== true;
        const summary = getItemSummary(item, childFields);
        const hasValue = Object.values(item ?? {}).some(
          (v) => v !== "" && v !== undefined && v !== null,
        );

        return (
          <div
            key={index}
            className={`
              rounded-xl border transition-all duration-200
              bg-background/40 backdrop-blur-sm
              ${isOpen ? "border-border" : "border-border/60"}
            `}
          >
            {/* ── Item header ── */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 cursor-pointer
                select-none group"
              onClick={() => toggleCollapse(index)}
            >
              {/* Index badge */}
              <span
                className="shrink-0 w-5 h-5 rounded-md flex items-center
                justify-center text-[10px] font-bold
                bg-muted border border-border text-muted-foreground"
              >
                {index + 1}
              </span>

              {/* Summary or placeholder */}
              <span
                className={`flex-1 text-sm font-medium truncate
                ${summary ? "text-foreground" : "text-muted-foreground"}`}
              >
                {summary || `${field.label ?? "Item"} ${index + 1}`}
              </span>

              {/* Field value dot indicators */}
              {!isOpen && hasValue && (
                <div className="flex gap-0.5 shrink-0">
                  {childFields
                    .slice(0, 5)
                    .map((cf) =>
                      item?.[cf.name] !== undefined &&
                      item?.[cf.name] !== "" ? (
                        <span
                          key={cf.name}
                          className="w-1.5 h-1.5 rounded-full bg-primary/50"
                        />
                      ) : (
                        <span
                          key={cf.name}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20"
                        />
                      ),
                    )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 ml-1">
                {/* Remove */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index);
                  }}
                  className={`flex items-center justify-center w-6 h-6 rounded-lg
                    border border-transparent transition-colors
                    opacity-0 group-hover:opacity-100
                    text-muted-foreground hover:text-destructive
                    hover:bg-destructive/10 hover:border-destructive/20`}
                >
                  <TrashIcon />
                </button>

                {/* Collapse */}
                <span
                  className={`flex items-center justify-center w-6 h-6
                  rounded-lg text-muted-foreground transition-colors
                  hover:bg-muted`}
                >
                  <ChevronIcon open={isOpen} />
                </span>
              </div>
            </div>

            {/* ── Item fields ── */}
            {isOpen && (
              <div
                className={`grid ${gridCols} gap-3 px-3 pb-3
                border-t border-border/60 pt-3`}
              >
                {childFields.map((child: FormField) => (
                  <div
                    key={child.name}
                    className={getSpanClass((child as any).span)}
                  >
                    <FieldRenderer
                      field={child}
                      value={item?.[child.name]}
                      onChange={(name, val) => updateItem(index, name, val)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* ── Empty state ── */}
      {value.length === 0 && (
        <div
          className={`flex flex-col items-center justify-center gap-2
          py-8 rounded-xl border-2 border-dashed
          border-border/60 ${fc.counter.normal}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 opacity-30"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <p className="text-sm">No {field.label ?? "items"} yet</p>
          <p className="text-[11px] opacity-60">Click Add to create one</p>
        </div>
      )}

      {/* ── Add button ── */}
      <button
        type="button"
        onClick={addItem}
        className={`
          flex items-center justify-center gap-2
          w-full py-2 rounded-xl border border-dashed
          text-sm font-medium transition-all duration-150
          border-border/60 text-muted-foreground
          hover:border-primary/40 hover:text-primary hover:bg-primary/5
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        `}
      >
        <PlusIcon />
        Add {field.label ?? "Item"}
      </button>
    </div>
  );
}
