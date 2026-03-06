"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
  error?: string;
}

export default function TextField({ field, error }: Props) {
  return (
    <FieldWrapper label={field.label} required={field.required} error={error}>
      <input
        type={field.type === "decimal" ? "number" : field.type}
        name={field.name}
        placeholder={field.placeholder}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
