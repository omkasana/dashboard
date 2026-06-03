"use client";

import {
  BlueprintReadyCard,
  BusinessCard,
  DepartmentsCard,
  MissingInfoCard,
  ModulesCard,
  ReadinessCard,
  RolloutCard,
  SectionProgressCard,
  TextSummaryCard,
} from "./sidebar/SidebarCards";

interface SectionProgress {
  id: string;
  label: string;
  answered: number;
  total: number;
  complete: boolean;
}

interface BlueprintSidebarProps {
  isDark: boolean;
  isDone: boolean;
  readiness: number;
  answeredCount: number;
  businessName: string;
  industry: string;
  employees: string;
  geoOps: string;
  modules: string[];
  missingInfo: string[];
  painPoints: string;
  timeline: string;
  integrationsList: string;
  depts: string;
  sectionProgress: SectionProgress[];
}

export function BlueprintSidebar({
  isDark,
  isDone,
  readiness,
  answeredCount,
  businessName,
  industry,
  employees,
  geoOps,
  modules,
  missingInfo,
  painPoints,
  timeline,
  integrationsList,
  depts,
  sectionProgress,
}: BlueprintSidebarProps) {
  return (
    <aside
      className="hidden lg:flex w-[300px] xl:w-[320px] flex-col rounded-[28px] border overflow-hidden backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.08)]"
      style={{
        background: isDark ? "rgba(16,16,20,0.62)" : "rgba(255,255,255,0.56)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.65)",
      }}
    >
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <ReadinessCard
          isDark={isDark}
          readiness={readiness}
          answeredCount={answeredCount}
        />
        <BusinessCard
          isDark={isDark}
          businessName={businessName}
          industry={industry}
          employees={employees}
          geoOps={geoOps}
        />
        <ModulesCard isDark={isDark} modules={modules} />
        <MissingInfoCard isDark={isDark} missingInfo={missingInfo} />
        <RolloutCard isDark={isDark} painPoints={painPoints} timeline={timeline} />
        <TextSummaryCard
          isDark={isDark}
          title="Integrations"
          value={integrationsList}
          delay={0.22}
        />
        <DepartmentsCard isDark={isDark} depts={depts} />
        <SectionProgressCard
          isDark={isDark}
          sectionProgress={sectionProgress}
        />
        {isDone && <BlueprintReadyCard isDark={isDark} />}
      </div>
    </aside>
  );
}
