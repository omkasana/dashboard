"use client";

import { useState, useEffect, useRef } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

interface FileItem {
  id: string;
  file: File;
  preview?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExt(name: string): string {
  return name.split(".").pop()?.toUpperCase() ?? "FILE";
}

function UploadIcon() {
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
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

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

export default function FileUploadField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () =>
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
  }, [files]);

  const addFiles = (incoming: File[]) => {
    const mapped: FileItem[] = incoming.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setFiles((prev) => {
      const next = [...prev, ...mapped];
      onChange?.(
        field.name,
        next.map((f) => f.file),
      );
      return next;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      const next = prev.filter((f) => f.id !== id);
      onChange?.(
        field.name,
        next.map((f) => f.file),
      );
      return next;
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const multiple = field.multiple !== false;
  const accept = field.accept as string | undefined;

  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <div className="flex flex-col gap-2">
        {/* ── Compact drop zone ── */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`
            flex items-center gap-3 px-3.5 py-2.5
            rounded-xl cursor-pointer
            border transition-all duration-200
            ${fc.base}
            ${
              error
                ? fc.error.border
                : dragging
                  ? "border-primary bg-primary/5 shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                  : `border-dashed ${fc.idle} hover:bg-muted/40`
            }
          `}
        >
          {/* Icon */}
          <span
            className={`shrink-0 transition-colors duration-200
            ${dragging ? "text-primary" : fc.prefixIdle}`}
          >
            <UploadIcon />
          </span>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium transition-colors
              ${dragging ? "text-primary" : fc.inputText}`}
            >
              {dragging ? "Drop to upload" : "Click or drag to upload"}
            </p>
            <p className={`text-[10px] truncate ${fc.counter.normal}`}>
              {accept ?? "Any file type"}
              {!multiple && " · Single file"}
            </p>
          </div>

          {/* File count badge if files exist */}
          {files.length > 0 && !dragging && (
            <span
              className="shrink-0 px-2 py-0.5 rounded-full
              bg-primary/10 border border-primary/20
              text-[10px] font-semibold text-primary"
            >
              {files.length}
            </span>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
            className="sr-only"
          />
        </div>

        {/* ── Preview strip ── */}
        {files.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {/* Header */}
            <div className="flex items-center justify-between px-0.5">
              <span className={`text-[11px] font-medium ${fc.counter.normal}`}>
                {files.length} {files.length === 1 ? "file" : "files"}
              </span>
              <button
                type="button"
                onClick={() => {
                  files.forEach(
                    (f) => f.preview && URL.revokeObjectURL(f.preview),
                  );
                  setFiles([]);
                  onChange?.(field.name, []);
                }}
                className={`text-[11px] transition-colors ${fc.dropdown.clearBtn}`}
              >
                Remove all
              </button>
            </div>

            {/* Horizontal scroll strip */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden
                    border border-border bg-muted shadow-sm group"
                >
                  {/* Image preview */}
                  {item.preview ? (
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Non-image: icon + ext */
                    <div
                      className="w-full h-full flex flex-col items-center
                      justify-center gap-1 px-1"
                    >
                      <span className={fc.prefixIdle}>
                        <FileIcon />
                      </span>
                      <span
                        className={`text-[9px] font-mono font-semibold
                        px-1.5 py-0.5 rounded bg-muted border border-border
                        ${fc.counter.normal}`}
                      >
                        {getExt(item.file.name)}
                      </span>
                      <span
                        className={`text-[9px] text-center leading-tight
                        truncate w-full px-1 ${fc.counter.normal}`}
                      >
                        {formatBytes(item.file.size)}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay with filename */}
                  {item.preview && (
                    <div
                      className="absolute inset-0 bg-black/50 opacity-0
                      group-hover:opacity-100 transition-opacity duration-150
                      flex items-end p-1"
                    >
                      <span
                        className="text-[9px] text-white leading-tight
                        line-clamp-2 font-medium"
                      >
                        {item.file.name}
                      </span>
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(item.id)}
                    className="absolute top-1 right-1 w-5 h-5
                      flex items-center justify-center rounded-full
                      bg-black/60 text-white
                      opacity-0 group-hover:opacity-100
                      transition-all duration-150 hover:bg-black/90"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}
