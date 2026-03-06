"use client";

import { FormField } from "@/types/module";

export default function RadioField({ field }: { field: FormField }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">
        {field.label}
      </label>

      <div className="flex gap-4">
        {field.options?.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input type="radio" name={field.name} value={opt.value} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
