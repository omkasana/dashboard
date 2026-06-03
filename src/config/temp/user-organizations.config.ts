import { userOrganizationData } from "@/dummy/user-organization.data";
import type { ModuleConfig } from "@/types/module";

export const userOrganizationsConfig: ModuleConfig = {
  id: "user-organizations",
  title: "User Organizations",
  description: "View organizations and user distribution across each org",

  actions: {
    export: true,
  },

  search: {
    enabled: true,
    placeholder: "Search organizations...",
  },

  filters: {
    enabled: true,
    fields: [
      {
        key: "regions",
        label: "Region",
        options: ["India", "US", "Europe", "APAC"],
      },
      {
        key: "plans",
        label: "Plan",
        options: ["Free", "Starter", "Pro", "Enterprise"],
      },
    ],
  },

  views: {
    enabled: true,
    defaultView: "table",
    available: ["table"],
  },

  table: {
    enabled: true,
    columns: [
      {
        key: "organization",
        label: "Organization",
        type: "text",
        strong: true,
      },
      { key: "usersCount", label: "Users", type: "number" },
      { key: "activeUsers", label: "Active", type: "number" },
      { key: "inactiveUsers", label: "Inactive", type: "number" },
      { key: "adminUsers", label: "Admins", type: "number" },
      { key: "memberUsers", label: "Members", type: "number" },
      { key: "regions", label: "Regions", type: "text" },
      { key: "departments", label: "Departments", type: "text" },
      { key: "plans", label: "Plans", type: "text" },
      { key: "totalAccountValue", label: "Total Value", type: "currency" },
      { key: "avgAccountValue", label: "Avg Value", type: "currency" },
      { key: "lastActive", label: "Last Active", type: "date" },
    ],
  },

  data: userOrganizationData,
};
