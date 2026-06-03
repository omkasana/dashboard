// src/app/dashboard/settings/notifications/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function NotificationsPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>

          <p className="text-muted-foreground">
            Configure alerts and notification channels.
          </p>
        </div>

        <SettingsSection
          title="Channels"
          description="Enable or disable notification channels"
        >
          <div className="space-y-4">
            {[
              "Email Notifications",
              "Push Notifications",
              "SMS Notifications",
              "Desktop Notifications",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border p-4"
              >
                <div>
                  <h3 className="font-medium">{item}</h3>
                </div>

                <input type="checkbox" defaultChecked />
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          title="Activity Alerts"
          description="Workspace activity notifications"
        >
          <div className="space-y-4">
            {[
              "Workflow Alerts",
              "Task Reminders",
              "Mentions",
              "Security Alerts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border p-4"
              >
                <div>
                  <h3 className="font-medium">{item}</h3>
                </div>

                <input type="checkbox" defaultChecked />
              </div>
            ))}
          </div>
        </SettingsSection>
      </div>
    </SettingsLayout>
  );
}
