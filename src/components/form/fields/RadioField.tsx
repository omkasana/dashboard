"use client";

import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

interface Props {
  field: FormField;
  error?: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
}

export default function RadioField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <div className="flex gap-4">
        {field.options?.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.name}
              checked={value === opt.value}
              onChange={() => onChange?.(field.name, opt.value)}
              className="accent-primary"
            />

            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}
