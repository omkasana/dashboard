"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
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

  return (
    <FieldWrapper label={field.label}>
      <div
        className={inputClass}
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
          onChange={setValue}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </FieldWrapper>
  );
}
