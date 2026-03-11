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
    id: "models",
    name: "Models",
    icon: Bot,
    href: "/dashboard/models/view",
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
];
