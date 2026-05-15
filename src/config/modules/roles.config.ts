import type { ModuleConfig } from "@/types/module";

export const rolesConfig: ModuleConfig = {
  id: "roles",
  title: "Roles",
  description: "Manage organization roles and permissions",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "name", label: "Role Name", type: "text" },
      { key: "slug", label: "Slug", type: "text" },

      { key: "status", label: "Status", type: "badge" },
      { key: "level", label: "Access Level", type: "badge" },

      { key: "usersCount", label: "Assigned Users", type: "number" },
      { key: "isDefault", label: "Default Role", type: "badge" },

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
        subtitleField: "slug",
        badgeFields: ["status", "level"],

        sections: [
          {
            id: "basic",
            title: "Role Information",
            colSpan: 2,
            columns: 2,
            fields: ["name", "slug", "status", "level", "description"],
          },

          {
            id: "stats",
            title: "Role Statistics",
            colSpan: 1,
            columns: 1,
            fields: ["usersCount", "isDefault"],
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

    viewRoute: "/dashboard/roles/view/:id",
    editRoute: "/dashboard/roles/update/:id",
    deleteEndpoint: "/roles/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search roles...",
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
        label: "Role",
        type: "text",
        strong: true,
      },
      { key: "slug", label: "Slug", type: "text" },
      { key: "level", label: "Access Level", type: "badge" },
      { key: "status", label: "Status", type: "badge" },
      { key: "usersCount", label: "Users", type: "number" },
      { key: "isDefault", label: "Default", type: "badge" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
  },

  // ================= FORM
  form: {
    add: [
      {
        id: "basic",
        title: "Role Information",
        fields: [
          {
            name: "name",
            label: "Role Name",
            type: "text",
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "text",
            required: true,
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
            name: "level",
            label: "Access Level",
            type: "select",
            options: [
              { label: "Owner", value: "owner" },
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "User", value: "user" },
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
        id: "permissions",
        title: "Permission Settings",
        fields: [
          {
            name: "permissions.modules",
            label: "Module Access",
            type: "tags",
          },
          {
            name: "permissions.actions",
            label: "Allowed Actions",
            type: "checkbox",
            options: [
              { label: "View", value: "view" },
              { label: "Create", value: "create" },
              { label: "Edit", value: "edit" },
              { label: "Delete", value: "delete" },
              { label: "Export", value: "export" },
            ],
          },
          {
            name: "isDefault",
            label: "Default Role",
            type: "checkbox",
          },
        ],
      },
    ],

    edit: [],
  },
};
