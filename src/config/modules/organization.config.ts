import type { ModuleConfig } from "@/types/module";
import { Building2 } from "lucide-react";

export const organizationConfig: ModuleConfig = {
  id: "organizations",
  title: "Organizations",
  description: "Manage all client organizations",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "name", label: "Organization Name", type: "text" },
      { key: "subdomain", label: "Subdomain", type: "text" },
      { key: "status", label: "Status", type: "badge" },

      { key: "plan", label: "Plan", type: "badge" },
      { key: "billingCycle", label: "Billing Cycle", type: "text" },
      { key: "planPrice", label: "Price", type: "text" },
      { key: "paymentStatus", label: "Payment Status", type: "badge" },

      { key: "createdAt", label: "Created At", type: "date" },
      { key: "lastActive", label: "Last Active", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "1rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        titleField: "name",
        subtitleField: "subdomain",
        badgeFields: ["status", "plan"],

        sections: [
          {
            id: "basic",
            title: "Organization Info",
            colSpan: 2,
            columns: 2,
            fields: ["name", "subdomain", "status"],
          },

          {
            id: "subscription",
            title: "Plan & Subscription",
            colSpan: 1,
            columns: 1,
            fields: ["plan", "billingCycle", "planPrice", "paymentStatus"],
          },

          {
            id: "meta",
            title: "Metadata",
            colSpan: 3,
            columns: 3,
            fields: ["createdAt", "lastActive"],
          },
        ],
      },
    },
  },

  // ================= ACTIONS
  actions: {
    add: true,
    export: true,
    import: true,

    viewRoute: "/dashboard/organizations/view/:id",
    editRoute: "/dashboard/organizations/update/:id",
    deleteEndpoint: "/organizations/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search organizations...",
  },

  // ================= VIEWS
  views: {
    enabled: true,
    defaultView: "table",
    available: [
      "table",
      "grid",

      "calendar",
      "timeline",
      "analytics",
      "map",
      "gallery",
    ],
  },

  // ================= TABLE (LIST PAGE)
  table: {
    enabled: true,

    columns: [
      { key: "name", label: "Organization", type: "text", strong: true },
      { key: "subdomain", label: "Subdomain", type: "text" },
      { key: "status", label: "Status", type: "badge" },
      { key: "plan", label: "Plan", type: "badge" },
      { key: "paymentStatus", label: "Payment", type: "badge" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
  },

  // ================= FORM (FIXED)
  form: {
    add: [
      {
        id: "basic",
        title: "Organization Info",
        fields: [
          {
            name: "name",
            label: "Organization Name",
            type: "text",
            required: true,
          },
          {
            name: "subdomain",
            label: "Subdomain",
            type: "text",
            required: true,
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Active", value: "active" },
              { label: "Trial", value: "trial" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ],
      },

      {
        id: "plan",
        title: "Plan & Billing",
        fields: [
          {
            name: "plan",
            label: "Plan",
            type: "select",
            options: [
              { label: "Free", value: "free" },
              { label: "Pro", value: "pro" },
              { label: "Enterprise", value: "enterprise" },
            ],
          },
          {
            name: "billingCycle",
            label: "Billing Cycle",
            type: "select",
            options: [
              { label: "Monthly", value: "monthly" },
              { label: "Annual", value: "annual" },
            ],
          },
          {
            name: "planPrice",
            label: "Price",
            type: "text",
          },
        ],
      },

      {
        id: "owner",
        title: "Owner Info",
        fields: [
          {
            name: "owner.name",
            label: "Owner Name",
            type: "text",
          },
          {
            name: "owner.email",
            label: "Owner Email",
            type: "email",
          },
          {
            name: "owner.phone",
            label: "Phone",
            type: "phone",
          },
        ],
      },
    ],

    edit: [], // optional (you can reuse add later)
  },
};
