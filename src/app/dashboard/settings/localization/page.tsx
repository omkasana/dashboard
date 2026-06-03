// src/app/dashboard/settings/localization/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function LocalizationPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Localization</h1>

          <p className="text-muted-foreground">
            Configure language, timezone, and regional formats.
          </p>
        </div>

        {/* Time */}
        <SettingsSection
          title="Time & Date"
          description="Manage date and time preferences"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
                <option>America/New_York</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Format</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>12 Hour</option>
                <option>24 Hour</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Format</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fiscal Year Start</label>

              <input
                type="date"
                className="h-11 w-full rounded-xl border bg-background px-4"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Region */}
        <SettingsSection
          title="Region"
          description="Regional preferences and localization"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>

              <input
                className="h-11 w-full rounded-xl border bg-background px-4"
                placeholder="India"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default Language</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Numbers */}
        <SettingsSection
          title="Number Format"
          description="Decimal and formatting preferences"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Decimal Precision</label>

              <input
                type="number"
                className="h-11 w-full rounded-xl border bg-background px-4"
                defaultValue={2}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number Format</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>1,234.56</option>
                <option>1.234,56</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex justify-end">
          <button
            className="
              rounded-2xl bg-primary px-6 py-3
              text-sm font-medium text-primary-foreground
              shadow-lg
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
