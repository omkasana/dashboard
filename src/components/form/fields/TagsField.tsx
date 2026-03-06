"use client";

import { useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function TagsField({
  field,
  error,
  value = [],
  onChange,
}: FieldComponentProps) {
  const [input, setInput] = useState("");

  const tags: string[] = Array.isArray(value) ? value : [];

  const addTag = () => {
    const tag = input.trim();

    if (!tag || tags.includes(tag)) return;

    onChange?.(field.name, [...tags, tag]);

    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange?.(
      field.name,
      tags.filter((t) => t !== tag),
    );
  };

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div className="flex flex-col gap-2">
        {/* Input */}

        <input
          value={input}
          placeholder="Add tag"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          className={`${inputClass} ${error ? "border-red-500" : ""}`}
          style={glassInput}
        />

        {/* Tags */}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                flex items-center gap-1
                bg-primary/10
                text-primary
                px-2 py-1
                rounded-md
                text-sm
              "
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-xs hover:opacity-70"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </FieldWrapper>
  );
}
