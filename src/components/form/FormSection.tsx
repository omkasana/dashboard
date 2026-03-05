"use client";

import { useState } from "react";
import { FormSection as SectionType } from "@/types/module";
import FieldRenderer from "./FieldRenderer";

interface Props {
  section: SectionType;
}

export default function FormSection({ section }: Props) {
  const [open, setOpen] = useState(section.defaultOpen ?? true);

  const columns = section.columns ?? 3;

  return (
    <div className="border rounded-xl p-6 space-y-6">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => section.collapsible && setOpen(!open)}
      >
        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>

          {section.description && (
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          )}
        </div>

        {section.collapsible && (
          <span className="text-sm">{open ? "▲" : "▼"}</span>
        )}
      </div>

      {/* Fields */}
      {open && (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
          }}
        >
          {section.fields.map((field) => (
            <FieldRenderer key={field.name} field={field} />
          ))}
        </div>
      )}
    </div>
  );
}
