"use client";

import { useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2 4 12 13 22 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InvalidIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function EmailField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const strValue = (value as string) ?? "";
  const hasValue = strValue.length > 0;
  const isValid = hasValue && isValidEmail(strValue);
  const isInvalid = touched && hasValue && !isValid;

  const borderCls = error
    ? fc.error.border
    : focused
      ? fc.focus
      : isValid
        ? fc.valid.border
        : isInvalid
          ? fc.invalid.border
          : fc.idle;

  const iconCls = focused
    ? fc.prefixFocused
    : isValid
      ? fc.valid.icon
      : isInvalid
        ? fc.invalid.icon
        : fc.prefixIdle;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div
        className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 ${fc.base} ${borderCls}`}
      >
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200 ${iconCls}`}
        >
          <MailIcon />
        </span>

        <input
          type="email"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "example@email.com"}
          autoComplete="email"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          onChange={(e) => onChange?.(field.name, e.target.value)}
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm
            ${fc.inputText} ${fc.inputPlaceholder}`}
        />

        {!focused && touched && hasValue && (
          <>
            <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />
            <span
              className={`pr-3 pl-2 shrink-0 flex items-center gap-1
              text-[11px] font-medium whitespace-nowrap transition-colors duration-200
              ${isValid ? fc.valid.badge : fc.invalid.badge}`}
            >
              {isValid ? <CheckIcon /> : <InvalidIcon />}
              {isValid ? "Valid" : "Invalid"}
            </span>
          </>
        )}
      </div>
    </FieldWrapper>
  );
}
