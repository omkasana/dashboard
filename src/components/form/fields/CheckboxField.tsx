"use client";

import { FormField } from "@/types/module";

export default function CheckboxField({ field }: { field: FormField }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">
        {field.label}
      </label>

      <div className="flex flex-col gap-2">
        {field.options?.map((opt) => (
          <label
            key={opt.value}
            className="
              flex items-center gap-2 text-sm
              cursor-pointer
              select-none
            "
          >
            <input
              type="checkbox"
              name={field.name}
              value={opt.value}
              className="
                h-4 w-4
                rounded
                border-border
                accent-[var(--primary)]
              "
            />

            <span className="text-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
