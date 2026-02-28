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
  filters: {
    enabled: true,
    fields: [
      {
        key: "role",
        label: "Role",
        options: ["Operative", "CEO", "Chairman"],
      },
      {
        key: "status",
        label: "Status",
        options: ["Active", "Inactive"],
      },
    ],
  },

  views: {
    enabled: true,
    defaultView: "table",
    available: [
      "table",
      "list",
      "grid",
      "kanban",
      "calendar",
      "timeline",
      "analytics",
      "map",
      "gallery",
    ],
  },

  table: {
    enabled: true,
    columns: [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email Address" },
      { key: "phone", label: "Phone Number" },
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
