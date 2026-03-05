"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
}

export default function DateField({ field }: Props) {
  const type = field.type === "datetime" ? "datetime-local" : field.type;

  return (
    <FieldWrapper label={field.label}>
      <input
        type={type}
        name={field.name}
        className={inputClass}
        style={glassInput}
        required={field.required}
        defaultValue={field.defaultValue}
      />
    </FieldWrapper>
  );
}
