"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import FieldWrapper from "../FieldWrapper";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function PhoneField({
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
      <div
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        style={{
          ...glassInput,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
        }}
      >
        <PhoneInput
          defaultCountry="US"
          international
          value={value}
          onChange={(v) => onChange?.(field.name, v)}
          className="w-full bg-transparent outline-none border-none"
        />
      </div>
    </FieldWrapper>
  );
}
