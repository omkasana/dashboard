"use client";

import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FormField } from "@/types/module";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
}

export default function PhoneField({ field }: Props) {
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  function handleChange(v: string | undefined) {
    setValue(v);

    if (!v) {
      setError("Phone number is required");
      return;
    }

    if (!isValidPhoneNumber(v)) {
      setError("Invalid phone number for selected country");
      return;
    }

    setError(undefined);
  }

  return (
    <FieldWrapper label={field.label}>
      <div className="flex flex-col gap-1">
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
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </FieldWrapper>
  );
}
