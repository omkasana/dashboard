// src/app/dashboard/settings/security/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function SecurityPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Security</h1>

          <p className="text-muted-foreground">
            Manage authentication and account protection.
          </p>
        </div>

        <SettingsSection title="Password" description="Update account password">
          <div className="grid gap-5">
            <input
              type="password"
              placeholder="Current Password"
              className="h-11 rounded-xl border px-4"
            />

            <input
              type="password"
              placeholder="New Password"
              className="h-11 rounded-xl border px-4"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="h-11 rounded-xl border px-4"
            />
          </div>
        </SettingsSection>

        <SettingsSection title="Sessions" description="Manage active sessions">
          <div className="rounded-2xl border p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">MacBook Pro · Chrome</h3>

                <p className="text-sm text-muted-foreground">
                  Active now · Ghaziabad, India
                </p>
              </div>

              <button className="rounded-xl border px-4 py-2 text-sm">
                Logout
              </button>
            </div>
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
