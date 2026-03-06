"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function EmailField({
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
        type="email"
        name={field.name}
        value={value || ""}
        placeholder={field.placeholder || "example@email.com"}
        onChange={(e) => onChange?.(field.name, e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
