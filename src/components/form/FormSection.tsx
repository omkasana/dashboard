"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FieldRenderer from "./FieldRenderer";

export default function FormSection({ section }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="
      rounded-2xl
      backdrop-blur-lg
      border border-black/5 dark:border-white/10
      bg-white/60
      dark:bg-white/5
      shadow-sm
      transition-all duration-300
      p-6
      "
    >
      {/* Header */}

      <div
        className="flex items-center justify-between mb-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-lg font-semibold tracking-tight text-title">
          {section.title}
        </h3>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="grid md:grid-cols-3 gap-6">
          {section.fields.map((field: any) => (
            <FieldRenderer key={field.name} field={field} />
          ))}
        </div>
      )}
    </div>
  );
}
