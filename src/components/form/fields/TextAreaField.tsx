"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
  error?: string;
}

export default function TextAreaField({ field, error }: Props) {
  return (
    <FieldWrapper label={field.label} required={field.required} error={error}>
      <textarea
        name={field.name}
        rows={4}
        placeholder={field.placeholder}
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
