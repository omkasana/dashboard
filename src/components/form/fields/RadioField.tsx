"use client";

import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
  error?: string;
}

export default function RadioField({ field, error }: Props) {
  return (
    <FieldWrapper label={field.label} required={field.required} error={error}>
      <div className="flex gap-4">
        {field.options?.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              className="accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}
