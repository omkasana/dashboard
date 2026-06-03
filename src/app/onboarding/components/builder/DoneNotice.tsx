"use client";

import { CheckCircle2 } from "lucide-react";

interface DoneNoticeProps {
  isDark: boolean;
}

export function DoneNotice({ isDark }: DoneNoticeProps) {
  return (
    <div
      className="flex-shrink-0 border-t px-4 py-3 flex items-center gap-2"
      style={{
        background: isDark ? "rgba(10,10,14,0.38)" : "rgba(255,255,255,0.22)",
        borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      }}
    >
      <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
      <span className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}>
        Discovery complete. Review your ERP blueprint on the right.
      </span>
    </div>
  );
}
