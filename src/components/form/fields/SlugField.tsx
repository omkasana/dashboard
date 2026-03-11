"use client";

import { useEffect, useState } from "react";
import FieldWrapper from "../FieldWrapper";

import { fieldConfig as fc } from "@/lib/fieldConfig";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

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
      <path d="M10 13a5 5 0 0 0 7.54.54l2.92-2.92a5 5 0 0 0-7.07-7.07L11 5" />
      <path d="M14 11a5 5 0 0 0-7.54-.54L3.54 13.38a5 5 0 0 0 7.07 7.07L13 19" />
    </svg>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function SlugField({
  field,
  error,
  value,
  onChange,
  formValues,
}: FieldComponentProps & { formValues?: Record<string, any> }) {
  const [focused, setFocused] = useState(false);
  const [locked, setLocked] = useState(true);

  const strValue = (value as string) ?? "";

  /* auto-generate from source field */
  useEffect(() => {
    if (!locked) return;
    if (!field.slugFrom) return;
    if (!formValues) return;

    const sourceValue = formValues[field.slugFrom];

    if (typeof sourceValue === "string" && sourceValue.length > 0) {
      const slug = slugify(sourceValue);

      if (slug !== value) {
        onChange?.(field.name, slug);
      }
    }
  }, [formValues, field.slugFrom, locked]);

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
          <LinkIcon />
        </span>

        <input
          type="text"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "slug-value"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setLocked(false);
            onChange?.(field.name, slugify(e.target.value));
          }}
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm
            ${fc.inputText} ${fc.inputPlaceholder}`}
        />

        {/* lock toggle */}
        <button
          type="button"
          onClick={() => setLocked(!locked)}
          className="px-3 text-xs opacity-70 hover:opacity-100"
        >
          {locked ? "auto" : "edit"}
        </button>
      </div>
    </FieldWrapper>
  );
}
