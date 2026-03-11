"use client";

import { useState, useRef, KeyboardEvent } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-2.5 h-2.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TagIcon() {
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
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

export default function TagsField({
  field,
  error,
  value = [],
  onChange,
}: FieldComponentProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tags: string[] = Array.isArray(value) ? value : [];
  const maxTags = field.maxTags as number | undefined;
  const atLimit = maxTags !== undefined && tags.length >= maxTags;
  const duplicate = input.trim() !== "" && tags.includes(input.trim());

  const addTag = (raw = input) => {
    const tag = raw.trim();
    if (!tag || tags.includes(tag) || atLimit) return;
    onChange?.(field.name, [...tags, tag]);
    setInput("");
  };

  const removeTag = (tag: string) =>
    onChange?.(
      field.name,
      tags.filter((t) => t !== tag),
    );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    // Backspace on empty input removes last tag
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  // Allow paste of comma-separated tags
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (!text.includes(",")) return;
    e.preventDefault();
    const newTags = text
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t));
    const allowed = maxTags ? newTags.slice(0, maxTags - tags.length) : newTags;
    if (allowed.length) onChange?.(field.name, [...tags, ...allowed]);
    setInput("");
  };

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      {/* ── Input container ── */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`
          flex flex-wrap items-center gap-1.5
          min-h-[42px] sm:min-h-[46px]
          px-2.5 py-2 rounded-xl cursor-text
          transition-all duration-200
          ${fc.base} ${borderCls}
        `}
      >
        {/* Tag prefix icon */}
        <span
          className={`shrink-0 transition-colors duration-200 mr-0.5
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <TagIcon />
        </span>

        {/* Rendered tags inline with input */}
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5
              rounded-md text-xs font-medium shrink-0
              bg-primary/10 text-primary
              border border-primary/20
              max-w-[160px]"
          >
            <span className="truncate">{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="flex-shrink-0 opacity-50 hover:opacity-100
                transition-opacity rounded-sm p-0.5"
            >
              <XIcon />
            </button>
          </span>
        ))}

        {/* Text input — hidden when at limit */}
        {!atLimit && (
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              addTag();
            }}
            placeholder={
              tags.length === 0 ? (field.placeholder ?? "Add tags…") : ""
            }
            className={`flex-1 min-w-[80px] bg-transparent outline-none
              text-sm py-0.5
              ${fc.inputText} ${fc.inputPlaceholder}
              ${duplicate ? "text-destructive" : ""}`}
          />
        )}
      </div>

      {/* ── Footer hints ── */}
      <div className="flex items-center justify-between mt-1.5 px-0.5">
        <p className={`text-[10px] ${fc.counter.normal}`}>
          {duplicate ? (
            <span className="text-destructive">Tag already exists</span>
          ) : (
            <span>
              Press{" "}
              <kbd
                className="px-1 py-0.5 rounded text-[10px]
                bg-muted border border-border font-mono"
              >
                Enter
              </kbd>{" "}
              or{" "}
              <kbd
                className="px-1 py-0.5 rounded text-[10px]
                bg-muted border border-border font-mono"
              >
                ,
              </kbd>{" "}
              to add
            </span>
          )}
        </p>

        {/* Tag counter */}
        {maxTags !== undefined && (
          <span
            className={`text-[10px] font-mono tabular-nums
            ${tags.length >= maxTags ? fc.counter.limit : fc.counter.normal}`}
          >
            {tags.length}/{maxTags}
          </span>
        )}
      </div>
    </FieldWrapper>
  );
}
