"use client";

import { useEffect, useRef, useState } from "react";
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

function slugify(val: string) {
  return val
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

  // ── Stable ref for onChange so it never triggers the effect ──
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // ── Auto-generate slug from source field ──
  useEffect(() => {
    if (!locked) return;
    if (!field.slugFrom) return;
    if (!formValues) return;

    const source = formValues[field.slugFrom as string];
    if (typeof source !== "string") return;

    const slug = slugify(source);

    // Only call onChange if the slug actually differs — avoids loop
    if (slug !== strValue) {
      onChangeRef.current?.(field.name, slug);
    }
    // ✅ Only re-run when the SOURCE value or locked state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.[field.slugFrom as string], locked]);

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div
        className={`flex items-center rounded-xl overflow-hidden
        transition-all duration-200 ${fc.base} ${borderCls}`}
      >
        {/* Prefix */}
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <LinkIcon />
        </span>

        {/* Input */}
        <input
          type="text"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "slug-value"}
          readOnly={locked}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            if (locked) return;
            onChange?.(field.name, slugify(e.target.value));
          }}
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm
            ${fc.inputText} ${fc.inputPlaceholder}
            ${locked ? "opacity-60 cursor-default" : ""}`}
        />

        {/* Lock / Edit toggle */}
        <button
          type="button"
          onClick={() => setLocked((l) => !l)}
          className={`
            shrink-0 flex items-center gap-1.5
            px-3 self-stretch border-l border-border
            text-[11px] font-medium transition-colors duration-150
            ${
              locked
                ? "text-primary hover:text-primary/70"
                : `${fc.counter.normal} hover:text-foreground`
            }
          `}
        >
          {locked ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Auto
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              Edit
            </>
          )}
        </button>
      </div>
    </FieldWrapper>
  );
}
