"use client";

import { FieldComponentProps } from "@/types/formFieldProps.ts";
import FieldWrapper from "../FieldWrapper";

export default function CheckboxField({
  field,
  error,
  value = [],
  onChange,
}: FieldComponentProps) {
  const selected: string[] = Array.isArray(value) ? value : [];

  const toggle = (val: string) => {
    let updated: string[];

    if (selected.includes(val)) {
      updated = selected.filter((v) => v !== val);
    } else {
      updated = [...selected, val];
    }

    onChange?.(field.name, updated);
  };

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div className="flex flex-col gap-2">
        {field.options?.map((opt) => {
          const val = String(opt.value);

          return (
            <label
              key={val}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(val)}
                onChange={() => toggle(val)}
                className="h-4 w-4 accent-[var(--primary)]"
              />

              {opt.label}
            </label>
          );
        })}
      </div>
    </FieldWrapper>
  );
}
