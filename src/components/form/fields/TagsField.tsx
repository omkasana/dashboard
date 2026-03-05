"use client";

import { useState } from "react";
import { formControlStyle, glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

export default function TagsField({ field }: { field: FormField }) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setInput("");
      return;
    }

    setTags([...tags, value]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <FieldWrapper label={field.label}>
      {/* Tag container */}

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
            backdrop-blur-md
            "
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-xs hover:text-primary/70"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

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
        className={inputClass}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
