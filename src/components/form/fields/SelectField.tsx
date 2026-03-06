"use client";

import FieldWrapper from "../FieldWrapper";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FormField } from "@/types/module";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

interface Props {
  field: FormField;
  error?: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
}

export default function SelectField({
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
      <select
        name={field.name}
        value={value || ""}
        onChange={(e) => onChange?.(field.name, e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      >
        <option value="">Select</option>

        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
