"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

interface Props {
  field: FormField;
  error?: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
}

export default function DateField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const type = field.type === "datetime" ? "datetime-local" : field.type;

  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <input
        type={type}
        name={field.name}
        value={value || ""}
        min={field.min}
        max={field.max}
        onChange={(e) => onChange?.(field.name, e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
