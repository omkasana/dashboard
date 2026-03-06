"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function TextField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <input
        type={field.type === "decimal" ? "number" : field.type}
        name={field.name}
        value={value || ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange?.(field.name, e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
