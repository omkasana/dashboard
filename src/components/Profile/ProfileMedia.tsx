"use client";


import { FormField } from "@/types/module";
import FileUploadField from "../form/fields/FileUploadField";



export default function ProfileMedia() {
  const field: FormField = {
    name: "avatar",
    label: "Profile Picture",
    type: "file",
    accept: "image/*",
  };

  return (
    <div
      className="
        p-6
        rounded-2xl
        border border-white/10
        bg-white/40 dark:bg-white/[0.04]
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      "
    >
      <h3 className="text-sm font-semibold mb-4 text-foreground">
        Profile Media
      </h3>

      <FileUploadField field={field} />

      <p className="text-xs text-muted-foreground mt-3">
        Upload a square image for best results.
      </p>
    </div>
  );
}
