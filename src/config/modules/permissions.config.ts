import type { ModuleConfig } from "@/types/module";

export const permissionsConfig: ModuleConfig = {
  id: "permissions",
  title: "Permissions",
  description: "Manage module, action, and field-level permissions",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "name", label: "Permission Name", type: "text" },
      { key: "key", label: "Permission Key", type: "text" },

      { key: "module", label: "Module", type: "badge" },
      { key: "action", label: "Action", type: "badge" },

      { key: "role", label: "Assigned Role", type: "text" },
      { key: "scope", label: "Permission Scope", type: "badge" },

      { key: "status", label: "Status", type: "badge" },

      { key: "description", label: "Description", type: "textarea" },

      { key: "createdAt", label: "Created At", type: "date" },
      { key: "updatedAt", label: "Updated At", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "1rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        titleField: "name",
        subtitleField: "key",
        badgeFields: ["module", "action", "status"],

        sections: [
          {
            id: "basic",
            title: "Permission Information",
            colSpan: 2,
            columns: 2,
            fields: [
              "name",
              "key",
              "module",
              "action",
              "scope",
              "status",
              "description",
            ],
          },

          {
            id: "assignment",
            title: "Assignment",
            colSpan: 1,
            columns: 1,
            fields: ["role"],
          },

          {
            id: "meta",
            title: "Metadata",
            colSpan: 3,
            columns: 3,
            fields: ["createdAt", "updatedAt"],
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

    viewRoute: "/dashboard/permissions/view/:id",
    editRoute: "/dashboard/permissions/update/:id",
    deleteEndpoint: "/permissions/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search permissions...",
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
        key: "name",
        label: "Permission",
        type: "text",
        strong: true,
      },
      { key: "module", label: "Module", type: "badge" },
      { key: "action", label: "Action", type: "badge" },
      { key: "role", label: "Role", type: "text" },
      { key: "scope", label: "Scope", type: "badge" },
      { key: "status", label: "Status", type: "badge" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
  },

  // ================= FORM
  form: {
    add: [
      {
        id: "basic",
        title: "Permission Information",
        fields: [
          {
            name: "name",
            label: "Permission Name",
            type: "text",
            required: true,
          },
          {
            name: "key",
            label: "Permission Key",
            type: "text",
            required: true,
          },
          {
            name: "module",
            label: "Module",
            type: "select",
            options: [
              { label: "Users", value: "users" },
              { label: "Organizations", value: "organizations" },
              { label: "Billing", value: "billing" },
              { label: "Roles", value: "roles" },
              { label: "Permissions", value: "permissions" },
            ],
          },
          {
            name: "action",
            label: "Action",
            type: "select",
            options: [
              { label: "View", value: "view" },
              { label: "Create", value: "create" },
              { label: "Edit", value: "edit" },
              { label: "Delete", value: "delete" },
              { label: "Export", value: "export" },
            ],
          },
          {
            name: "scope",
            label: "Permission Scope",
            type: "select",
            options: [
              { label: "Module Level", value: "module" },
              { label: "Action Level", value: "action" },
              { label: "Field Level", value: "field" },
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
          },
        ],
      },

      {
        id: "assignment",
        title: "Role Assignment",
        fields: [
          {
            name: "role",
            label: "Assign Role",
            type: "select",
            options: [
              { label: "Owner", value: "owner" },
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "User", value: "user" },
            ],
          },
          {
            name: "fieldAccess",
            label: "Field Access",
            type: "tags",
          },
        ],
      },
    ],

    edit: [],
  },
};
