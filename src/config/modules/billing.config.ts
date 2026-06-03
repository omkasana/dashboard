import type { ModuleConfig } from "@/types/module";
import {
  currencyOptions,
  organizationOptions,
} from "@/config/options/organisations";
import { subscriptionPlan } from "../options/subscriptionPlan";
import { billingCycle } from "../options/billingCycle";
import { paymentMethods } from "../options/paymentMethod";
import { paymentStatuses } from "../options/paymentStatus";

export const billingConfig: ModuleConfig = {
  id: "billing",
  title: "Billing",
  description: "Manage subscriptions, invoices, and payments",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "invoiceNumber", label: "Invoice Number", type: "text" },
      { key: "organization", label: "Organization", type: "text" },

      { key: "plan", label: "Plan", type: "badge" },
      { key: "billingCycle", label: "Billing Cycle", type: "text" },

      { key: "amount", label: "Amount", type: "text" },
      { key: "currency", label: "Currency", type: "text" },

      { key: "paymentStatus", label: "Payment Status", type: "badge" },
      { key: "paymentMethod", label: "Payment Method", type: "text" },

      { key: "invoiceDate", label: "Invoice Date", type: "date" },
      { key: "dueDate", label: "Due Date", type: "date" },
      { key: "paidAt", label: "Paid At", type: "date" },

      { key: "createdAt", label: "Created At", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "1rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        titleField: "invoiceNumber",
        subtitleField: "organization",
        badgeFields: ["paymentStatus", "plan"],

        sections: [
          {
            id: "invoice",
            title: "Invoice Information",
            colSpan: 2,
            columns: 2,
            fields: ["invoiceNumber", "organization", "invoiceDate", "dueDate"],
          },

          {
            id: "subscription",
            title: "Subscription",
            colSpan: 1,
            columns: 1,
            fields: ["plan", "billingCycle"],
          },

          {
            id: "payment",
            title: "Payment Details",
            colSpan: 3,
            columns: 3,
            fields: [
              "amount",
              "currency",
              "paymentMethod",
              "paymentStatus",
              "paidAt",
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

    viewRoute: "/dashboard/billing/view/:id",
    editRoute: "/dashboard/billing/update/:id",
    deleteEndpoint: "/billing/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search invoices or payments...",
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
        key: "invoiceNumber",
        label: "Invoice",
        type: "text",
        strong: true,
      },
      { key: "organization", label: "Organization", type: "text" },
      { key: "plan", label: "Plan", type: "badge" },
      { key: "amount", label: "Amount", type: "text" },
      { key: "paymentStatus", label: "Status", type: "badge" },
      { key: "paymentMethod", label: "Method", type: "text" },
      { key: "invoiceDate", label: "Invoice Date", type: "date" },
      { key: "dueDate", label: "Due Date", type: "date" },
    ],
  },

  // ================= FORM
  form: {
    add: [
      {
        id: "invoice",
        title: "Invoice Information",
        fields: [
          {
            name: "invoiceNumber",
            label: "Invoice Number",
            type: "text",
            required: true,
          },
          {
            name: "organization",
            label: "Organization",
            type: "search-select",
            required: true,
            options: organizationOptions,
          },
          {
            name: "invoiceDate",
            label: "Invoice Date",
            type: "date",
            required: true,
          },
          {
            name: "dueDate",
            label: "Due Date",
            type: "date",
          },
        ],
      },

      {
        id: "subscription",
        title: "Subscription Details",
        fields: [
          {
            name: "plan",
            label: "Plan",
            type: "select",
            options: subscriptionPlan,
          },
          {
            name: "billingCycle",
            label: "Billing Cycle",
            type: "select",
            options: billingCycle,
          },
        ],
      },

      {
        id: "payment",
        title: "Payment Details",
        fields: [
          {
            name: "amount",
            label: "Amount",
            type: "text",
            required: true,
          },
          {
            name: "currency",
            label: "Currency",
            type: "search-select",
            options: currencyOptions,
          },
          {
            name: "paymentMethod",
            label: "Payment Method",
            type: "select",
            options: paymentMethods,
          },
          {
            name: "paymentStatus",
            label: "Payment Status",
            type: "select",
            options: paymentStatuses,
          },
          {
            name: "paidAt",
            label: "Paid At",
            type: "date",
          },
        ],
      },
    ],

    edit: [],
  },
};
