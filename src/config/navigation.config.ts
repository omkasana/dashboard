import {
  LayoutDashboard,
  Bot,
  Users,
  Building2,
  BarChart3,
  Settings,
  Shield,
  User,
  FileText,
  CreditCard,
  Activity,
  Database,
  Bell,
  Folder,
  Layers,
} from "lucide-react";

export const navigationLinks = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  // 🏢 ORGANIZATION (IMPORTANT)
  {
    id: "organization",
    name: "Organization",
    icon: Building2,
    children: [
      {
        id: "all-orgs",
        name: "All Orgs",
        href: "/dashboard/organizations", // ✅ FIXED
      },
      {
        id: "billing",
        name: "Billing",
        href: "/dashboard/billing",
      },
      {
        id: "suspended",
        name: "Suspended",
        href: "/dashboard/suspended",
      },
    ],
  },

  // 👥 USERS
  {
    id: "allusers",
    name: "All Users",
    icon: Users,
    children: [
      { id: "all-users", name: "All Users", href: "/dashboard/all-users" },

      { id: "roles", name: "Roles", href: "/dashboard/roles" },
      {
        id: "permissions",
        name: "Permissions",
        href: "/dashboard/permissions",
      },
    ],
  },
  {
    id: "users",
    name: "Users",
    icon: Users,
    children: [
      { id: "all-users", name: "All Users", href: "/dashboard/users" },

      { id: "roles", name: "Roles", href: "/dashboard/roles" },
      {
        id: "permissions",
        name: "Permissions",
        href: "/dashboard/permissions",
      },
    ],
  },

  // 🤖 MODELS
  {
    id: "models",
    name: "Models",
    icon: Bot,
    href: "/dashboard/models/view",
  },

  // 📊 ANALYTICS
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics/view",
  },

  // 💳 PAYMENTS
  {
    id: "payments",
    name: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments/view",
  },

  // 📄 REPORTS
  {
    id: "reports",
    name: "Reports",
    icon: FileText,
    href: "/dashboard/reports/view",
  },

  // 🔔 NOTIFICATIONS
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
  },

  // 📁 FILES
  {
    id: "files",
    name: "Files",
    icon: Folder,
    href: "/dashboard/files/view",
  },

  // 🧱 MODULES
  {
    id: "modules",
    name: "Modules",
    icon: Layers,
    href: "/dashboard/modules/view",
  },

  // 🗄 DATABASE
  {
    id: "database",
    name: "Database",
    icon: Database,
    href: "/dashboard/database/view",
  },

  // ⚡ ACTIVITY
  {
    id: "activity",
    name: "Activity",
    icon: Activity,
    href: "/dashboard/activity/view",
  },

  // 🔐 SECURITY
  {
    id: "security",
    name: "Security",
    icon: Shield,
    href: "/dashboard/security/view",
  },

  // 👤 PROFILE
  {
    id: "profile",
    name: "Profile",
    icon: User,
    href: "/dashboard/profile/view",
  },

  // ⚙️ SETTINGS
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings/",
  },
];
