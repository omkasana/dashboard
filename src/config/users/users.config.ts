import type { ModuleConfig } from "@/types/module";

export const usersConfig: ModuleConfig = {
  id: "users",
  title: "Users",
  description: "Manage system users",

  actions: {
    add: true,
    import: true,
    export: true,
  },

  search: {
    enabled: true,
    placeholder: "Search users...",
  },

  views: {
    enabled: true,
    defaultView: "table",
    available: ["table", "grid"],
  },

  table: {
    enabled: true,
    columns: [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email Address" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status" },
    ],
  },

  grid: {
    enabled: true,
    type: "card",
    fields: ["name", "email", "role"],
  },
};
