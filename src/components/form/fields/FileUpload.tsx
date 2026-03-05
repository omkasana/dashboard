"use client";

import { formControlStyle } from "@/lib/formStyle";
import { useState } from "react";

export default function FileUploadField({ field }: any) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type.startsWith("image")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-2 col-span-full">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        type="file"
        name={field.name}
        accept={field.accept}
        onChange={handleChange}
        style={{
          ...formControlStyle,
          padding: "6px",
        }}
      />

      {preview && <img src={preview} className="w-40 rounded-lg border" />}
    </div>
  );
}
