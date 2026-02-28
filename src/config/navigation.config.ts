// navigation.config.ts

import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Users,
  ShoppingCart,
  Wrench,
  BarChart3,
  Settings,
  Shield,
  Users2,
  User,
  Text,
} from "lucide-react";

export const navigationLinks = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "ai",
    name: "AI Tools",
    icon: Bot,
    children: [
      { id: "chat", name: "Chat", href: "/dashboard/chat" },
      { id: "image", name: "Image Generator", href: "/dashboard/image" },
      { id: "voice", name: "Voice AI", href: "/dashboard/voice" },
    ],
  },

  {
    id: "content",
    name: "Content",
    icon: BookOpen,
    children: [
      { id: "blog", name: "Blog", href: "/dashboard/blog" },
      { id: "pages", name: "Pages", href: "/dashboard/pages" },
      { id: "media", name: "Media Library", href: "/dashboard/media" },
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

  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: ShoppingCart,
    children: [
      { id: "products", name: "Products", href: "/dashboard/products" },
      { id: "orders", name: "Orders", href: "/dashboard/orders" },
      { id: "customers", name: "Customers", href: "/dashboard/customers" },
    ],
  },

  {
    id: "tools",
    name: "Tools",
    icon: Wrench,
    children: [
      { id: "import", name: "Import Data", href: "/dashboard/import" },
      { id: "export", name: "Export Data", href: "/dashboard/export" },
    ],
  },

  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    children: [
      { id: "traffic", name: "Traffic", href: "/dashboard/traffic" },
      { id: "sales", name: "Sales", href: "/dashboard/sales" },
    ],
  },

  {
    id: "security",
    name: "Security",
    icon: Shield,
    children: [
      { id: "audit", name: "Audit Logs", href: "/dashboard/audit-logs" },
      { id: "sessions", name: "Sessions", href: "/dashboard/sessions" },
    ],
  },

  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    children: [
      { id: "general", name: "General", href: "/dashboard/general-settings" },
      {
        id: "appearance",
        name: "Appearance",
        href: "/dashboard/appearance-settings",
      },
      {
        id: "integrations",
        name: "Integrations",
        href: "/dashboard/integrations",
      },
    ],
  },
];
