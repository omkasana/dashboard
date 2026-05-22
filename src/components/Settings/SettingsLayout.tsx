// src/components/Settings/SettingsLayout.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  BrushCleaning,
  CreditCard,
  Database,
  Globe,
  Mail,
  Shield,
  User,
  Workflow,
  Building2,
} from "lucide-react";

const links = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
    icon: BrushCleaning,
  },
  {
    title: "Localization",
    href: "/dashboard/settings/localization",
    icon: Globe,
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
  },
  {
    title: "Communication",
    href: "/dashboard/settings/communication",
    icon: Mail,
  },
  {
    title: "Finance",
    href: "/dashboard/settings/finance",
    icon: CreditCard,
  },
  {
    title: "Team",
    href: "/dashboard/settings/team",
    icon: Building2,
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: Shield,
  },
  {
    title: "Data",
    href: "/dashboard/settings/data-management",
    icon: Database,
  },
  {
    title: "Integrations",
    href: "/dashboard/settings/integrations",
    icon: Workflow,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className="
          hidden w-72 shrink-0 border-r bg-card/40
          lg:block
        "
      >
        <div className="sticky top-0 space-y-6 p-5">
          <div>
            <h2 className="text-lg font-semibold">Settings</h2>

            <p className="text-sm text-muted-foreground">
              Manage organization preferences
            </p>
          </div>

          <nav className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-2xl px-4 py-3
                    text-sm font-medium transition-all
                    ${
                      active
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "hover:bg-muted"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />

                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
