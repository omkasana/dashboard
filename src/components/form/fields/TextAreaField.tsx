"use client";

import { useState, useRef, useEffect } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

export default function TextAreaField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const strValue = (value as string) ?? "";
  const maxLen = field.maxLength as number | undefined;
  const minRows = (field.rows as number | undefined) ?? 3;

  const pct = maxLen ? strValue.length / maxLen : 0;
  const counterCls =
    pct >= 1
      ? fc.counter.limit
      : pct >= 0.85
        ? fc.counter.warning
        : fc.counter.normal;

  // Auto-resize height to content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [strValue]);

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;

  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <div
        className={`
        relative rounded-xl overflow-hidden
        transition-all duration-200
        ${fc.base} ${borderCls}
      `}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          name={field.name}
          value={strValue}
          rows={minRows}
          maxLength={maxLen}
          placeholder={field.placeholder ?? "Type here…"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(field.name, e.target.value)}
          className={`
            w-full bg-transparent outline-none resize-none
            px-3.5 pt-3 pb-8
            text-sm leading-relaxed
            ${fc.inputText} ${fc.inputPlaceholder}
          `}
        />

        {/* Bottom toolbar */}
        <div
          className={`
          absolute bottom-0 left-0 right-0
          flex items-center justify-between
          px-3 py-1.5
          border-t ${error ? fc.error.border : "border-border/50"}
          bg-muted/30
        `}
        >
          {/* Line / word count */}
          <span className={`text-[10px] font-mono ${fc.counter.normal}`}>
            {strValue.split("\n").length}{" "}
            {strValue.split("\n").length === 1 ? "line" : "lines"}
            {" · "}
            {strValue.trim() === ""
              ? "0 words"
              : `${strValue.trim().split(/\s+/).length} words`}
          </span>

          {/* Character counter — always shown if maxLen set, else on focus */}
          {(maxLen !== undefined || focused) && (
            <span
              className={`text-[10px] font-mono tabular-nums transition-colors duration-200 ${counterCls}`}
            >
              {maxLen !== undefined
                ? `${strValue.length} / ${maxLen}`
                : `${strValue.length} chars`}
            </span>
          )}
        </div>
      </div>
    </FieldWrapper>
  );
}
