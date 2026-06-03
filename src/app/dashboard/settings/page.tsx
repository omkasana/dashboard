// src/app/dashboard/settings/page.tsx

"use client";

import {
  Bell,
  BrushCleaning,
  Building2,
  CreditCard,
  Database,
  Globe,
  Lock,
  Mail,
  Settings2,
  Shield,
  User,
  Workflow,
} from "lucide-react";

import Link from "next/link";

const settingGroups = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        description: "Manage your profile and personal information",
        href: "/dashboard/settings/profile",
        icon: User,
      },
      {
        title: "Notifications",
        description: "Configure alerts and notification preferences",
        href: "/dashboard/settings/notifications",
        icon: Bell,
      },
      {
        title: "Security",
        description: "Password, sessions, and authentication",
        href: "/dashboard/settings/security",
        icon: Shield,
      },
    ],
  },

  {
    title: "Workspace",
    items: [
      {
        title: "Appearance",
        description: "Theme, fonts, layout, and UI preferences",
        href: "/dashboard/settings/appearance",
        icon: BrushCleaning,
      },
      {
        title: "Localization",
        description: "Timezone, language, currency, and formats",
        href: "/dashboard/settings/localization",
        icon: Globe,
      },
      {
        title: "Team & Permissions",
        description: "Manage users, roles, and access controls",
        href: "/dashboard/settings/team",
        icon: Building2,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        title: "Communication",
        description: "SMTP, SMS, WhatsApp, and push notifications",
        href: "/dashboard/settings/communication",
        icon: Mail,
      },
      {
        title: "Finance",
        description: "Currencies, tax rules, invoice settings",
        href: "/dashboard/settings/finance",
        icon: CreditCard,
      },
      {
        title: "Data Management",
        description: "Backups, audit logs, retention, and versioning",
        href: "/dashboard/settings/data-management",
        icon: Database,
      },
      {
        title: "Integrations",
        description: "Connect APIs, webhooks, and third-party apps",
        href: "/dashboard/settings/integrations",
        icon: Workflow,
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border bg-card p-3 shadow-sm">
            <Settings2 className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <p className="text-muted-foreground">
              Manage your workspace, preferences, integrations, and organization
              settings.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {settingGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{group.title}</h2>

                <div className="mt-2 h-px w-full bg-border" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="
                        group rounded-3xl border bg-card p-5
                        transition-all duration-200
                        hover:-translate-y-1
                        hover:border-primary/40
                        hover:shadow-xl
                      "
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="
                            rounded-2xl border bg-muted/40 p-3
                            transition-colors
                            group-hover:bg-primary/10
                          "
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-semibold">{item.title}</h3>

                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
