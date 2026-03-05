"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
}

export default function EmailField({ field }: Props) {
  return (
    <FieldWrapper label={field.label}>
      <input
        type="email"
        name={field.name}
        placeholder={field.placeholder || "example@email.com"}
        className={inputClass}
        style={glassInput}
        required={field.required}
      />
    </FieldWrapper>
  );
}
