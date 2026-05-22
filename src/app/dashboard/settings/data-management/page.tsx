// src/app/dashboard/settings/data-management/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function DataManagementPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Management</h1>

          <p className="text-muted-foreground">
            Manage backups, retention policies, and audit logs.
          </p>
        </div>

        <SettingsSection
          title="Backups"
          description="Backup and restore settings"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <select className="h-11 rounded-xl border px-4">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>

            <select className="h-11 rounded-xl border px-4">
              <option>Auto Backup Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Retention"
          description="Data retention configuration"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="Retention Period"
              className="h-11 rounded-xl border px-4"
            />

            <select className="h-11 rounded-xl border px-4">
              <option>Soft Delete Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Audit & Versioning"
          description="Audit trails and version history"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <select className="h-11 rounded-xl border px-4">
              <option>Audit Logs Enabled</option>
              <option>Disabled</option>
            </select>

            <select className="h-11 rounded-xl border px-4">
              <option>Versioning Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <button className="rounded-2xl bg-primary px-6 py-3 text-primary-foreground">
            Save Changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
