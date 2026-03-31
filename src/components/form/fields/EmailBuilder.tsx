"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const EmailEditor = dynamic(() => import("react-email-editor"), { ssr: false });

export default function EmailBuilderField({ field, value, onChange }: any) {
  const editorRef = useRef<any>(null);

  const exportHtml = () => {
    editorRef.current?.editor?.exportHtml((data: any) => {
      const { html } = data;
      onChange?.(field.name, html);
    });
  };

  return (
    <div className="space-y-4">

      {/* Label */}
      <label className="text-sm font-medium text-gray-300">
        {field.label}
      </label>

      {/* Editor Container */}
      <div
        className="
        rounded-xl
        border border-white/10
        bg-slate-900/40
        backdrop-blur
        overflow-hidden
        shadow-sm
        "
      >
        <EmailEditor
          ref={editorRef}
          minHeight="500px"
          options={{
            appearance: {
              theme: "dark",
              panels: {
                tools: {
                  dock: "left",
                },
              },
            },
          }}
        />
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={exportHtml}
          className="
          px-5
          py-2
          rounded-lg
          bg-primary
          text-white
          text-sm
          font-medium
          shadow-md
          hover:brightness-110
          transition
          "
        >
          Save Template
        </button>

      </div>

    </div>
  );
}