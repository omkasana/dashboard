import { userData } from "@/dummy/user.data";
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
      { key: "id", label: "ID", type: "number" },
      { key: "name", label: "Full Name", type: "text", strong: true },
      { key: "email", label: "Email Address", type: "text" },
      { key: "phone", label: "Phone Number", type: "text" },

      {
        key: "department",
        label: "Department",
        type: "badge",
        variant: "info",
      },
      { key: "region", label: "Region", type: "badge", variant: "neutral" },
      { key: "planType", label: "Plan", type: "badge", variant: "primary" },

      { key: "tier", label: "Tier", type: "badge", variant: "neutral" },
      { key: "role", label: "Role", type: "badge", variant: "neutral" },

      { key: "status", label: "Status", type: "status" },
      { key: "riskLevel", label: "Risk Level", type: "risk" },

      { key: "accountValue", label: "Account Value", type: "currency" },

      { key: "createdAt", label: "Created", type: "date" },
      { key: "lastLogin", label: "Last Login", type: "date" },
    ],
  },

  grid: {
    enabled: true,
    type: "card",

    layout: {
      header: {
        title: "name",
        subtitle: "email",
        badge: "status",
      },
      meta: ["role", "department", "region"],
      stats: ["accountValue", "riskLevel"],
      footer: ["createdAt", "lastLogin"],
    },
  },
  kanban: {
    enabled: true,

    groupBy: "region",

    columns: [
      {
        key: "India",
        label: "India",
        color: "success",
      },
      {
        key: "US",
        label: "US",
        color: "neutral",
      },
      {
        key: "Europe",
        label: "EMEA",
        color: "info",
      },
      {
        key: "APAC",
        label: "APAC",
        color: "warning",
      },
    ],

    card: {
      title: "name",
      subtitle: "role",
      meta: ["department", "region"],
      highlight: "accountValue",
      badge: "riskLevel",
    },
  },
  calendar: {
    enabled: true,
    dateField: "createdAt",

    layout: {
      title: "name",
      subtitle: "role",
      badge: "status",
    },
  },

  form: {
    add: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter full name",
      },

      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
      },

      {
        name: "phone",
        label: "Phone Number",
        type: "phone",
      },

      {
        name: "role",
        label: "Role",
        type: "select",
        options: [
          { label: "Operative", value: "Operative" },
          { label: "CEO", value: "CEO" },
          { label: "Chairman", value: "Chairman" },
        ],
      },

      {
        name: "status",
        label: "Status",
        type: "radio",
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
      },

      {
        name: "department",
        label: "Department",
        type: "text",
      },

      {
        name: "region",
        label: "Region",
        type: "select",
        options: [
          { label: "India", value: "India" },
          { label: "US", value: "US" },
          { label: "Europe", value: "Europe" },
          { label: "APAC", value: "APAC" },
        ],
      },

      {
        name: "accountValue",
        label: "Account Value",
        type: "decimal",
      },

      {
        name: "tags",
        label: "Tags",
        type: "tags",
      },

      {
        name: "avatar",
        label: "Avatar",
        type: "file",
        accept: "image/*",
      },

      {
        name: "bio",
        label: "Bio",
        type: "editor",
      },

      {
        name: "createdAt",
        label: "Created At",
        type: "datetime",
      },
    ],
  },

  data: userData,
};
