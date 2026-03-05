"use client";

import { useState, useEffect } from "react";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

interface Props {
  field: FormField;
}

interface FileItem {
  file: File;
  preview?: string;
}

export default function FileUploadField({ field }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);

  /* cleanup previews */
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, [files]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);

    const mapped = selected.map((file) => ({
      file,
      preview: file.type.startsWith("image")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setFiles((prev) => [...prev, ...mapped]);

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const item = prev[index];
      if (item.preview) URL.revokeObjectURL(item.preview);

      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <FieldWrapper label={field.label}>
      {/* Upload Input */}

      <input
        type="file"
        name={field.name}
        accept={field.accept}
        multiple
        onChange={handleChange}
        className={inputClass}
        style={{
          ...glassInput,
          padding: "6px",
        }}
      />

      {/* Preview Grid */}

      {files.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {files.map((item, index) => (
            <div
              key={index}
              className="
              relative
              rounded-xl
              overflow-hidden
              border border-border
              bg-background
              shadow-sm
              "
            >
              {item.preview ? (
                <img
                  src={item.preview}
                  className="w-full h-28 object-cover"
                  alt="preview"
                />
              ) : (
                <div className="h-28 flex items-center justify-center text-xs text-muted-foreground">
                  {item.file.name}
                </div>
              )}

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="
                absolute top-1 right-1
                bg-black/60 text-white
                text-xs
                px-2 py-0.5
                rounded-md
                hover:bg-black/80
                "
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </FieldWrapper>
  );
}
