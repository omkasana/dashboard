"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SidebarCardProps {
  isDark: boolean;
  title: string;
  children: ReactNode;
  delay?: number;
  tone?: "default" | "warning" | "success";
}

export function SidebarCard({
  isDark,
  title,
  children,
  delay = 0,
  tone = "default",
}: SidebarCardProps) {
  const styles =
    tone === "warning"
      ? {
          background: isDark ? "rgba(251,191,36,0.04)" : "rgba(254,243,199,0.72)",
          borderColor: isDark ? "rgba(251,191,36,0.12)" : "rgba(245,158,11,0.16)",
        }
      : tone === "success"
        ? {
            background: isDark ? "rgba(74,222,128,0.04)" : "rgba(240,253,244,0.9)",
            borderColor: isDark ? "rgba(74,222,128,0.15)" : "rgba(34,197,94,0.2)",
          }
        : {
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.62)",
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          };

  const titleClass =
    tone === "warning"
      ? isDark
        ? "text-amber-400/60"
        : "text-amber-700"
      : isDark
        ? "text-white/28"
        : "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-[22px] border p-4 backdrop-blur-sm"
      style={styles}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 ${titleClass}`}>
        {title}
      </p>
      {children}
    </motion.div>
  );
}
