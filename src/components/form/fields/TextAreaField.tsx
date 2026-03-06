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

export default function TextAreaField({
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
      <textarea
        name={field.name}
        rows={4}
        value={value || ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange?.(field.name, e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={{
          ...glassInput,
          height: "auto",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      />
    </FieldWrapper>
  );
}
