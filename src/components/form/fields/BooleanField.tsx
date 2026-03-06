"use client";

import { useState } from "react";
import { FormField } from "@/types/module";

interface Props {
  field: FormField;
  error?: string;
}

export default function BooleanField({ field, error }: Props) {
  const [enabled, setEnabled] = useState(field.defaultValue || false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          {field.label}
        </label>

        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition
            ${enabled ? "bg-primary" : "bg-muted"}
            ${error ? "ring-2 ring-red-500" : ""}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition
              ${enabled ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </button>

        <input
          type="hidden"
          name={field.name}
          value={enabled ? "true" : "false"}
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
