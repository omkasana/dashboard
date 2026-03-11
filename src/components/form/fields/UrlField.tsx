"use client";

import { useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function LinkIcon() {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function UrlField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const strValue = (value as string) ?? "";
  const hasValue = strValue.length > 0;
  const isValid = hasValue && isValidUrl(strValue);
  const isInvalid = touched && hasValue && !isValid;
  const domain = isValid ? getDomain(strValue) : null;

  // Auto-prefix https:// on blur if missing
  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    if (
      strValue.length > 0 &&
      !strValue.startsWith("http://") &&
      !strValue.startsWith("https://")
    ) {
      onChange?.(field.name, `https://${strValue}`);
    }
  };

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
        className={`
        flex items-center rounded-xl overflow-hidden
        border transition-all duration-200
        ${fc.base} ${borderCls}
      `}
      >
        {/* Link prefix icon */}
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200 ${iconCls}`}
        >
          <LinkIcon />
        </span>

        {/* Input */}
        <input
          type="url"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "https://example.com"}
          autoComplete="url"
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          onChange={(e) => onChange?.(field.name, e.target.value)}
          className={`
            flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm
            ${fc.inputText} ${fc.inputPlaceholder}
          `}
        />

        {/* Right side — validation badge OR open link button */}
        {!focused && touched && hasValue && (
          <>
            <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />

            {isValid ? (
              /* Open in new tab */
              <a
                href={strValue}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Open ${domain}`}
                className={`
                  pr-3 pl-2 shrink-0 flex items-center gap-1
                  text-[11px] font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${fc.valid.badge} hover:opacity-80
                `}
              >
                <ExternalIcon />
                {domain}
              </a>
            ) : (
              <span
                className={`
                pr-3 pl-2 shrink-0 flex items-center gap-1
                text-[11px] font-medium whitespace-nowrap
                ${fc.invalid.badge}
              `}
              >
                <InvalidIcon />
                Invalid URL
              </span>
            )}
          </>
        )}
      </div>
    </FieldWrapper>
  );
}
