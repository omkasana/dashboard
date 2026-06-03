import type { ModuleConfig } from "@/types/module";
import { Ban } from "lucide-react";

export const suspendedConfig: ModuleConfig = {
  id: "suspended",
  title: "Suspended Organizations",
  description: "Manage suspended or blocked organizations",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "organization", label: "Organization", type: "text" },
      { key: "subdomain", label: "Subdomain", type: "text" },

      { key: "status", label: "Status", type: "badge" },
      { key: "reason", label: "Suspension Reason", type: "text" },

      { key: "plan", label: "Plan", type: "badge" },
      { key: "paymentStatus", label: "Payment Status", type: "badge" },

      { key: "suspendedAt", label: "Suspended At", type: "date" },
      { key: "suspendedBy", label: "Suspended By", type: "text" },

      { key: "reactivationDate", label: "Reactivation Date", type: "date" },
      { key: "lastActive", label: "Last Active", type: "date" },

      { key: "createdAt", label: "Created At", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "1rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        titleField: "organization",
        subtitleField: "subdomain",
        badgeFields: ["status", "plan"],

        sections: [
          {
            id: "basic",
            title: "Organization Information",
            colSpan: 2,
            columns: 2,
            fields: ["organization", "subdomain", "status", "reason"],
          },

          {
            id: "subscription",
            title: "Subscription Info",
            colSpan: 1,
            columns: 1,
            fields: ["plan", "paymentStatus"],
          },

          {
            id: "suspension",
            title: "Suspension Details",
            colSpan: 3,
            columns: 3,
            fields: [
              "suspendedAt",
              "suspendedBy",
              "reactivationDate",
              "lastActive",
              "createdAt",
            ],
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

    viewRoute: "/dashboard/suspended/view/:id",
    editRoute: "/dashboard/suspended/update/:id",
    deleteEndpoint: "/suspended/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search suspended organizations...",
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
      {
        key: "organization",
        label: "Organization",
        type: "text",
        strong: true,
      },
      { key: "subdomain", label: "Subdomain", type: "text" },
      { key: "status", label: "Status", type: "badge" },
      { key: "reason", label: "Reason", type: "text" },
      { key: "plan", label: "Plan", type: "badge" },
      { key: "paymentStatus", label: "Payment", type: "badge" },
      { key: "suspendedAt", label: "Suspended At", type: "date" },
      { key: "lastActive", label: "Last Active", type: "date" },
    ],
  },

  // ================= FORM
  form: {
    add: [
      {
        id: "organization",
        title: "Organization Information",
        fields: [
          {
            name: "organization",
            label: "Organization",
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
              { label: "Suspended", value: "suspended" },
              { label: "Blocked", value: "blocked" },
              { label: "Under Review", value: "under_review" },
            ],
          },
          {
            name: "reason",
            label: "Suspension Reason",
            type: "textarea",
          },
        ],
      },

      {
        id: "subscription",
        title: "Subscription Information",
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
            name: "paymentStatus",
            label: "Payment Status",
            type: "select",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Paid", value: "paid" },
              { label: "Failed", value: "failed" },
              { label: "Overdue", value: "overdue" },
            ],
          },
        ],
      },

      {
        id: "suspension",
        title: "Suspension Details",
        fields: [
          {
            name: "suspendedAt",
            label: "Suspended At",
            type: "date",
          },
          {
            name: "suspendedBy",
            label: "Suspended By",
            type: "text",
          },
          {
            name: "reactivationDate",
            label: "Reactivation Date",
            type: "date",
          },
          {
            name: "lastActive",
            label: "Last Active",
            type: "date",
          },
        ],
      },
    ],

    edit: [],
  },
};
