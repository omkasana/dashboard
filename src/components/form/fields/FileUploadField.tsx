"use client";

import { useState, useEffect } from "react";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

interface FileItem {
  file: File;
  preview?: string;
}

export default function FileUploadField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
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

    const mapped: FileItem[] = selected.map((file) => ({
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
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <div className="flex flex-col gap-2">
        {/* Upload Input */}

        <input
          type="file"
          accept={field.accept}
          multiple
          onChange={handleChange}
          className={`${inputClass} ${error ? "border-red-500" : ""}`}
          style={{
            ...glassInput,
            padding: "10px",
          }}
        />

        {/* Hidden inputs so FormData works */}

        {files.map((item, i) => (
          <input
            key={i}
            type="hidden"
            name={field.name}
            value={item.file.name}
          />
        ))}

        {/* Preview Strip */}

        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-2">Uploaded files</p>

            <div
              className="
              flex gap-3
              overflow-x-auto
              pb-2
              scrollbar-thin
              scrollbar-thumb-muted
            "
            >
              {files.map((item, index) => (
                <div
                  key={index}
                  className="
                  relative
                  shrink-0
                  w-24 h-24
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
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground text-center px-2">
                      {item.file.name}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="
                    absolute top-1 right-1
                    w-5 h-5
                    flex items-center justify-center
                    rounded-full
                    bg-black/60
                    text-white
                    text-xs
                    hover:bg-black
                  "
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error message */}

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </FieldWrapper>
  );
}
