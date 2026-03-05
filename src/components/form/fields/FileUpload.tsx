"use client";

import { useState, useEffect } from "react";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
}

export default function FileUploadField({ field }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];

    if (!f) return;

    setFile(f);

    if (f.type.startsWith("image")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  return (
    <FieldWrapper label={field.label}>
      {/* Upload Input */}

      <input
        type="file"
        name={field.name}
        accept={field.accept}
        onChange={handleChange}
        className={inputClass}
        style={{
          ...glassInput,
          padding: "6px",
        }}
      />

      {/* Preview */}

      {preview && (
        <div className="flex items-start gap-4">
          <img
            src={preview}
            alt="preview"
            className="
            w-40
            h-40
            object-cover
            rounded-xl
            border border-border
            shadow-sm
            "
          />

          <button
            type="button"
            onClick={removeFile}
            className="
            text-sm
            text-red-500
            hover:text-red-600
            transition
            "
          >
            Remove
          </button>
        </div>
      )}
    </FieldWrapper>
  );
}
