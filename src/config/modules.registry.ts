import type { ModuleConfig } from "@/types/module";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: {
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
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ],
    },

    grid: {
      enabled: true,
      type: "card",
    },
  },
};
