"use client";

import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

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

export default function PhoneField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const strValue = (value as string) ?? "";
  const hasValue = strValue.length > 0;
  const isValid = hasValue && isValidPhoneNumber(strValue);
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

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <style>{`
        .phone-field-wrap .PhoneInput {
          display: flex; align-items: stretch; width: 100%; background: transparent; gap: 0;
        }
        .phone-field-wrap .PhoneInputCountry {
          position: relative; display: flex; align-items: center; gap: 6px;
          padding: 0 10px 0 12px; flex-shrink: 0;
          border-right: 1px solid var(--border);
          background: transparent;
        }
        .phone-field-wrap .PhoneInputCountrySelect {
          position: absolute; inset: 0; width: 100%; height: 100%;
          opacity: 0; cursor: pointer; border: none; background: none; z-index: 1;
        }
        .phone-field-wrap .PhoneInputCountrySelectArrow {
          display: block; width: 6px; height: 6px;
          border-right: 1.5px solid var(--muted-foreground);
          border-bottom: 1.5px solid var(--muted-foreground);
          transform: rotate(45deg) translateY(-2px);
          flex-shrink: 0; pointer-events: none; opacity: 0.5;
        }
        .phone-field-wrap .PhoneInputCountryIcon {
          width: 22px; height: 15px; border-radius: 2px; overflow: hidden;
          flex-shrink: 0; box-shadow: 0 0 0 1px rgba(0,0,0,0.10);
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }
        .phone-field-wrap .PhoneInputCountryIcon img,
        .phone-field-wrap .PhoneInputCountryIcon svg {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .phone-field-wrap .PhoneInputInput {
          flex: 1; min-width: 0; background: transparent; border: none; outline: none;
          padding: 10px 8px 10px 10px;
          font-size: 0.875rem; line-height: 1.25rem;
          color: var(--foreground);
          font-family: ui-monospace, SFMono-Regular, monospace;
          letter-spacing: 0.05em; align-self: center;
        }
        .phone-field-wrap .PhoneInputInput::placeholder {
          color: var(--muted-foreground); opacity: 0.6;
          font-family: ui-sans-serif, system-ui, sans-serif; letter-spacing: normal;
        }
        @media (min-width: 640px) {
          .phone-field-wrap .PhoneInputInput { padding-top: 12px; padding-bottom: 12px; }
        }
      `}</style>

      <div
        className={`phone-field-wrap flex items-stretch rounded-xl overflow-hidden
        transition-all duration-200 ${fc.base} ${borderCls}`}
      >
        <PhoneInput
          defaultCountry="IN"
          international
          value={strValue || undefined}
          onChange={(v) => onChange?.(field.name, v ?? "")}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          placeholder={field.placeholder ?? "+91 98765 43210"}
        />

        {!focused && touched && hasValue && (
          <>
            <span className={`w-px bg-border shrink-0 self-stretch mx-0.5`} />
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
