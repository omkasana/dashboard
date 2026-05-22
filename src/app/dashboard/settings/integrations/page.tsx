// src/app/dashboard/settings/integrations/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

import { Globe, Github, Slack, Webhook, Mail, Chrome } from "lucide-react";

const integrations = [
  {
    name: "Google Workspace",
    description: "Connect Gmail, Calendar, and Drive services",
    icon: Chrome,
    connected: true,
  },

  {
    name: "Slack",
    description: "Receive workflow and activity notifications",
    icon: Slack,
    connected: false,
  },

  {
    name: "GitHub",
    description: "Sync repositories and deployment events",
    icon: Github,
    connected: false,
  },

  {
    name: "SMTP Mail",
    description: "Use your custom SMTP provider",
    icon: Mail,
    connected: true,
  },

  {
    name: "Webhook API",
    description: "Send events to external systems",
    icon: Webhook,
    connected: false,
  },

  {
    name: "Public API",
    description: "Enable API access for integrations",
    icon: Globe,
    connected: true,
  },
];

export default function IntegrationsPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>

          <p className="text-muted-foreground">
            Connect external apps, APIs, and automation services to your
            workspace.
          </p>
        </div>

        {/* Connected Apps */}
        <SettingsSection
          title="Connected Applications"
          description="Manage third-party integrations"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => {
              const Icon = integration.icon;

              return (
                <div
                  key={integration.name}
                  className="
                    rounded-3xl border bg-card p-5
                    transition-all duration-200
                    hover:shadow-lg
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div
                        className="
                          rounded-2xl border bg-muted/40 p-3
                        "
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold">{integration.name}</h3>

                        <p
                          className="
                            text-sm leading-relaxed
                            text-muted-foreground
                          "
                        >
                          {integration.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`
                        rounded-full border px-3 py-1
                        text-xs font-medium
                        ${
                          integration.connected
                            ? "border-green-500/30 bg-green-500/10 text-green-600"
                            : "border-border bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {integration.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      className="
                        rounded-xl border px-4 py-2
                        text-sm font-medium
                        transition-colors
                        hover:bg-muted
                      "
                    >
                      {integration.connected ? "Manage" : "Connect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SettingsSection>

        {/* API Settings */}
        <SettingsSection
          title="API Configuration"
          description="Manage API access and webhook settings"
        >
          <div className="grid gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Base URL</label>

              <input
                placeholder="https://api.escalecrm.com"
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4
                "
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook Endpoint</label>

              <input
                placeholder="https://example.com/webhook"
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4
                "
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Secret Key</label>

              <div className="flex gap-3">
                <input
                  type="password"
                  value="sk_live_83hshs7sh..."
                  readOnly
                  className="
                    h-11 flex-1 rounded-xl border
                    bg-background px-4
                  "
                />

                <button
                  className="
                    rounded-xl border px-4
                    text-sm font-medium
                  "
                >
                  Regenerate
                </button>
              </div>
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
