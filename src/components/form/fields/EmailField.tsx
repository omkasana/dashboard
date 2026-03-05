"use client";

import { formControlStyle } from "@/lib/formStyle";

export default function EmailField({ field }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        type="email"
        placeholder={field.placeholder || "example@email.com"}
        style={formControlStyle}
      />
    </div>
  );
}
