"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
  error?: string;
}

export default function DateField({ field, error }: Props) {
  const type = field.type === "datetime" ? "datetime-local" : field.type;

  return (
    <FieldWrapper label={field.label} required={field.required} error={error}>
      <input
        type={type}
        name={field.name}
        defaultValue={field.defaultValue}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
