"use client";

import { AddFormConfig } from "@/config/ui.config";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      {/* Primary glow */}
      <div
        className="
        absolute inset-0
        rounded-3xl
        opacity-20
        blur-3xl
        pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle at top right, var(--primary), transparent 60%)",
        }}
      />

      {/* Glass container */}
      <div
        className="
        relative
        rounded-3xl
        backdrop-blur-xl

        border border-black/5 dark:border-white/10

        shadow-[0_20px_60px_rgba(0,0,0,0.25)]

        bg-white/70
        dark:bg-white/5

        transition-all duration-300
        "
        style={{
          padding: AddFormConfig.section.padding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
