"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export default function EmailField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  return (
    <FieldWrapper label={field.label} required={field.required} error={error}>
      <input
        type="email"
        name={field.name}
        value={value}
        placeholder={field.placeholder || "example@email.com"}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
        onChange={(e) => onChange(field.name, e.target.value)}
        onBlur={(e) => onBlur(field.name, e.target.value)}
      />
    </FieldWrapper>
  );
}
