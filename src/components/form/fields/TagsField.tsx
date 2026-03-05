"use client";

import { formControlStyle } from "@/lib/formStyle";
import { useState } from "react";

export default function TagsField({ field }: any) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTag = () => {
    if (!input) return;

    setTags([...tags, input]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-2 col-span-full">
      <label className="text-sm font-medium">{field.label}</label>

      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
        >
          {tag}

          <button onClick={() => removeTag(tag)} className="text-xs">
            ✕
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTag()}
        placeholder="Add tag"
        style={formControlStyle}
      />
    </div>
  );
}
