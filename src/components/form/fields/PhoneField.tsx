"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneField({ field }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <PhoneInput
        defaultCountry="US"
        international
        className="border border-border rounded-xl px-3 py-2 bg-background"
      />
    </div>
  );
}
