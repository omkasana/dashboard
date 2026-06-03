"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Circle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { TOTAL_QUESTIONS } from "../../../onboarding-data";
import { SidebarCard } from "./SidebarCard";

interface SectionProgress {
  id: string;
  label: string;
  answered: number;
  total: number;
  complete: boolean;
}

export function ReadinessCard({
  isDark,
  readiness,
  answeredCount,
}: {
  isDark: boolean;
  readiness: number;
  answeredCount: number;
}) {
  return (
    <SidebarCard isDark={isDark} title="Readiness">
      <div className="flex items-center justify-between mb-3">
        <span />
        <span
          className={`text-xs font-bold ${readiness >= 80 ? "text-emerald-400" : readiness >= 40 ? "text-amber-400" : isDark ? "text-violet-400" : "text-violet-600"}`}
        >
          {readiness}%
        </span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.05]" : "bg-black/[0.06]"}`}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              readiness >= 80 ? "#4ade80" : "linear-gradient(90deg, #ff7832, #c050ff)",
          }}
          animate={{ width: `${readiness}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className={`flex justify-between mt-2 text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}>
        <span>{answeredCount} answered</span>
        <span>{TOTAL_QUESTIONS - answeredCount} left</span>
      </div>
    </SidebarCard>
  );
}

export function BusinessCard({
  isDark,
  businessName,
  industry,
  employees,
  geoOps,
}: {
  isDark: boolean;
  businessName: string;
  industry: string;
  employees: string;
  geoOps: string;
}) {
  if (!businessName && !industry && !employees) return null;

  return (
    <SidebarCard isDark={isDark} title="Business" delay={0.05}>
      <div className="space-y-2">
        {businessName && (
          <div className="flex items-start gap-2">
            <Building2 size={13} className={isDark ? "text-white/20 mt-0.5" : "text-gray-400 mt-0.5"} />
            <span className={`text-sm font-medium ${isDark ? "text-white/82" : "text-gray-800"}`}>
              {businessName}
            </span>
          </div>
        )}
        {[
          ["Industry", industry],
          ["Employees", employees],
          ["Geography", geoOps],
        ].map(([label, value]) =>
          value ? (
            <div key={label} className="flex items-center justify-between gap-2">
              <span className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}>
                {label}
              </span>
              <span className={`text-xs text-right ${isDark ? "text-white/50" : "text-gray-600"}`}>
                {value}
              </span>
            </div>
          ) : null,
        )}
      </div>
    </SidebarCard>
  );
}

export function ModulesCard({
  isDark,
  modules,
}: {
  isDark: boolean;
  modules: string[];
}) {
  return (
    <SidebarCard isDark={isDark} title="Modules" delay={0.1}>
      {modules.length <= 2 ? (
        <p className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}>
          Answer questions to activate relevant ERP modules.
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {modules.map((mod, i) => (
            <motion.span
              key={mod}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,120,50,0.08), rgba(180,80,255,0.08))",
                borderColor: "rgba(180,80,255,0.18)",
                color: isDark ? "rgba(200,150,255,0.9)" : "#6d28d9",
              }}
            >
              {mod}
            </motion.span>
          ))}
        </div>
      )}
    </SidebarCard>
  );
}

export function MissingInfoCard({
  isDark,
  missingInfo,
}: {
  isDark: boolean;
  missingInfo: string[];
}) {
  if (missingInfo.length === 0) return null;

  return (
    <SidebarCard isDark={isDark} title="Missing Info" delay={0.15} tone="warning">
      <div className="space-y-1.5">
        {missingInfo.slice(0, 5).map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Circle size={6} className={isDark ? "text-amber-400/40" : "text-amber-500"} />
            <span className={`text-xs ${isDark ? "text-amber-300/60" : "text-amber-800"}`}>
              {item}
            </span>
          </div>
        ))}
        {missingInfo.length > 5 && (
          <span className={`text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}>
            +{missingInfo.length - 5} more fields needed
          </span>
        )}
      </div>
    </SidebarCard>
  );
}

export function RolloutCard({
  isDark,
  painPoints,
  timeline,
}: {
  isDark: boolean;
  painPoints: string;
  timeline: string;
}) {
  if (!painPoints && !timeline) return null;

  return (
    <SidebarCard isDark={isDark} title="Rollout" delay={0.2}>
      <div className="space-y-2.5">
        {painPoints && (
          <div>
            <span className={`text-xs block mb-1 ${isDark ? "text-white/25" : "text-gray-400"}`}>
              Top Pain Points
            </span>
            <p className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}>
              {painPoints}
            </p>
          </div>
        )}
        {timeline && (
          <div className="flex items-center gap-2">
            <Clock size={12} className={isDark ? "text-white/25" : "text-gray-400"} />
            <span className={`text-xs ${isDark ? "text-white/50" : "text-gray-600"}`}>
              Target go-live: {timeline}
            </span>
          </div>
        )}
      </div>
    </SidebarCard>
  );
}

export function TextSummaryCard({
  isDark,
  title,
  value,
  delay,
}: {
  isDark: boolean;
  title: string;
  value: string;
  delay: number;
}) {
  if (!value) return null;

  return (
    <SidebarCard isDark={isDark} title={title} delay={delay}>
      <p className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}>
        {value}
      </p>
    </SidebarCard>
  );
}

export function DepartmentsCard({
  isDark,
  depts,
}: {
  isDark: boolean;
  depts: string;
}) {
  if (!depts) return null;

  return (
    <SidebarCard isDark={isDark} title="Departments" delay={0.24}>
      <div className="flex flex-wrap gap-1.5">
        {depts.split(",").map((d) => (
          <span
            key={d}
            className={`text-[11px] px-2.5 py-1 rounded-full border ${isDark ? "bg-white/[0.04] border-white/[0.07] text-white/45" : "bg-black/[0.03] border-black/[0.07] text-gray-500"}`}
          >
            {d.trim()}
          </span>
        ))}
      </div>
    </SidebarCard>
  );
}

export function SectionProgressCard({
  isDark,
  sectionProgress,
}: {
  isDark: boolean;
  sectionProgress: SectionProgress[];
}) {
  return (
    <SidebarCard isDark={isDark} title="Sections" delay={0.28}>
      <div className="space-y-2">
        {sectionProgress.map((section) => (
          <div key={section.id} className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${section.complete ? "bg-emerald-400/15 text-emerald-400" : section.answered > 0 ? "text-violet-400" : isDark ? "bg-white/[0.04] text-white/15" : "bg-black/[0.04] text-gray-300"}`}
              style={
                section.answered > 0 && !section.complete
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(255,120,50,0.12), rgba(180,80,255,0.12))",
                    }
                  : {}
              }
            >
              {section.complete ? (
                <CheckCircle2 size={10} />
              ) : section.answered > 0 ? (
                <RefreshCw size={8} />
              ) : (
                <Circle size={8} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium truncate ${section.complete ? "text-emerald-400" : section.answered > 0 ? (isDark ? "text-white/70" : "text-gray-700") : isDark ? "text-white/25" : "text-gray-400"}`}
                >
                  {section.label}
                </span>
                <span className={`text-[11px] ${isDark ? "text-white/20" : "text-gray-400"}`}>
                  {section.answered}/{section.total}
                </span>
              </div>
              <div className={`mt-1 h-1 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-black/[0.05]"}`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: section.complete
                      ? "#4ade80"
                      : "linear-gradient(90deg, #ff7832, #c050ff)",
                  }}
                  animate={{ width: `${(section.answered / section.total) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

export function BlueprintReadyCard({ isDark }: { isDark: boolean }) {
  return (
    <SidebarCard isDark={isDark} title="" tone="success">
      <div className="flex items-start gap-3">
        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
        <div>
          <p className={`text-sm font-semibold mb-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
            Blueprint Ready
          </p>
          <p className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-gray-500"}`}>
            Your ERP discovery is complete. Share this blueprint with your
            implementation partner or export it as a scoping document.
          </p>
          <button
            className="mt-3 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full transition-all text-white"
            style={{
              background: "linear-gradient(135deg, #ff7832, #c050ff)",
              boxShadow: "0 4px 16px rgba(180,80,255,0.28)",
            }}
          >
            Export Blueprint <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </SidebarCard>
  );
}
