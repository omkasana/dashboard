"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FieldRenderer from "./FieldRenderer";

interface Props {
  section: any;
  errors: Record<string, string>;
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function FormSection({
  section,
  errors,
  values,
  onChange,
}: Props) {
  const [open, setOpen] = useState(true);

  const columnMap: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div
      className="
      rounded-2xl
      backdrop-blur-lg
      border border-black/5 dark:border-white/10
      bg-white/60 dark:bg-white/5
      shadow-sm
      p-6
      transition-all
      overflow-visible
      "
    >
      {/* Section Header */}
      <div
        className="flex items-center justify-between mb-6 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="text-lg font-semibold tracking-tight">
          {section.title}
        </h3>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Fields */}
      {open && (
        <div
          className={`grid gap-6 grid-cols-1 ${
            columnMap[section.columns] || "md:grid-cols-3"
          }`}
        >
          {section.fields.map((field: any) => (
            <FieldRenderer
              key={field.name}
              field={field}
              error={errors[field.name]}
              value={values[field.name]}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
