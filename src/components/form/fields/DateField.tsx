"use client";

import { formControlStyle } from "@/lib/formStyle";

export default function DateField({ field }: any) {
  const type = field.type === "datetime" ? "datetime-local" : field.type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input type={type} style={formControlStyle} />
    </div>
  );
}
