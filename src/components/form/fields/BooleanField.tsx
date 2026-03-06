"use client";

import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { FormField } from "@/types/module";

export default function BooleanField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const enabled = Boolean(value);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          {field.label}
        </label>

        <button
          type="button"
          onClick={() => onChange?.(field.name, !enabled)}
          className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition
          ${enabled ? "bg-primary" : "bg-muted"}
        `}
        >
          <span
            className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
          />
        </button>
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
