"use client";

import { useState } from "react";

import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";
import FieldWrapper from "../FieldWrapper";

function TextIcon() {
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
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

export default function TextField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);

  const strValue = (value as string) ?? "";
  const maxLen = field.maxLength as number | undefined;
  const showCount = maxLen !== undefined && focused;

  const pct = maxLen ? strValue.length / maxLen : 0;
  const counterCls =
    pct >= 1
      ? fc.counter.limit
      : pct >= 0.85
        ? fc.counter.warning
        : fc.counter.normal;

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;

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
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <TextIcon />
        </span>

        <input
          type="text"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "Type here…"}
          maxLength={maxLen}
          autoComplete={(field.autoComplete as string) ?? "off"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(field.name, e.target.value)}
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm
            ${fc.inputText} ${fc.inputPlaceholder}`}
        />

        {showCount && (
          <>
            <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />
            <span
              className={`pr-3 pl-2 shrink-0 text-[11px] font-mono tabular-nums
              whitespace-nowrap transition-colors duration-200 ${counterCls}`}
            >
              {strValue.length}/{maxLen}
            </span>
          </>
        )}
      </div>
    </FieldWrapper>
  );
}
