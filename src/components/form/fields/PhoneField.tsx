"use client";
import PhoneInput from "react-phone-number-input";
import { formControlStyle } from "@/lib/formStyle";

export default function PhoneField({ field }: { field: FormField }) {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <PhoneInput
        defaultCountry="US"
        international
        value={value}
        onChange={setValue}
        style={{
          ...formControlStyle,
        }}
      />
    </div>
  );
}

import { useState } from "react";
import { FormField } from "@/types/module";

import "react-phone-number-input/style.css";

interface Props {
  field: FormField;
}
