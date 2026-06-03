// src/app/dashboard/settings/communication/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function CommunicationPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Communication</h1>

          <p className="text-muted-foreground">
            Configure communication providers and integrations.
          </p>
        </div>

        <SettingsSection
          title="SMTP Configuration"
          description="Email provider settings"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="SMTP Host"
              className="h-11 rounded-xl border px-4"
            />

            <input
              placeholder="SMTP Port"
              className="h-11 rounded-xl border px-4"
            />

            <input
              placeholder="Username"
              className="h-11 rounded-xl border px-4"
            />

            <input
              type="password"
              placeholder="Password"
              className="h-11 rounded-xl border px-4"
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="SMS Gateway"
          description="SMS provider configuration"
        >
          <div className="grid gap-5">
            <input
              placeholder="API Key"
              className="h-11 rounded-xl border px-4"
            />

            <input
              placeholder="Sender ID"
              className="h-11 rounded-xl border px-4"
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="WhatsApp API"
          description="Meta or Twilio WhatsApp configuration"
        >
          <div className="grid gap-5">
            <input
              placeholder="Access Token"
              className="h-11 rounded-xl border px-4"
            />

            <input
              placeholder="Webhook URL"
              className="h-11 rounded-xl border px-4"
            />
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
