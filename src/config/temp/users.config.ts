import { userData } from "@/dummy/user.data";
import type { ModuleConfig } from "@/types/module";
import { usersViewConfig } from "./user.view.config";
import { organizationOptions } from "@/config/options/organisations";

export const usersConfig: ModuleConfig = {
  id: "users",
  title: "Users",
  description: "Manage system users",

  view: usersViewConfig,

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
        key: "organization",
        label: "Organization",
        options: organizationOptions.map((option) => option.label),
      },
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
      { key: "organization", label: "Organization", type: "badge" },
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
      { key: "India", label: "India", color: "success" },
      { key: "US", label: "US", color: "neutral" },
      { key: "Europe", label: "EMEA", color: "info" },
      { key: "APAC", label: "APAC", color: "warning" },
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

  /*
  ================================
  FORM CONFIG WITH SECTIONS
  ================================
  */

  form: {
    add: [
      /* =========================
       BASIC
    ========================= */
      {
        id: "basic",
        title: "Basic Information",
        columns: 3,
        fields: [
          {
            name: "name",
            label: "Full Name",
            type: "text",
            required: true,
            placeholder: "Enter full name",
            minLength: 3,
            info: "Enter the user's legal full name.",
            errorMessage: "Name must be at least 3 characters long",
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            info: "Used for login and system notifications.",
            errorMessage: "Please enter a valid email address",
          },
          {
            name: "phone",
            label: "Phone Number",
            type: "phone",
            info: "Include country code when entering phone number.",
          },
          {
            name: "avatar",
            label: "Avatar",
            type: "file",
            accept: "image/*",
            multiple: false,
            info: "Upload profile image (PNG or JPG recommended).",
          },
        ],
      },

      /* =========================
       ACCOUNT
    ========================= */
      {
        id: "account",
        title: "Account Details",
        columns: 3,
        collapsible: true,

        fields: [
          {
            name: "organizationId",
            label: "Organization",
            type: "search-select",
            required: true,
            options: organizationOptions,
            info: "Assign this user to an organization.",
          },
          {
            name: "role",
            label: "Role",
            type: "search-select",
            required: true,
            errorMessage: "Please select a role",
            options: [
              { label: "Operative", value: "Operative" },
              { label: "CEO", value: "CEO" },
              { label: "Chairman", value: "Chairman" },
              { label: "Managing Director", value: "Managing Director" },
              { label: "Chief Technology Officer", value: "CTO" },
              { label: "Chief Financial Officer", value: "CFO" },
              { label: "Chief Operating Officer", value: "COO" },
              { label: "Vice President", value: "Vice President" },
              { label: "Director", value: "Director" },
              { label: "Senior Manager", value: "Senior Manager" },
              { label: "Manager", value: "Manager" },
              { label: "Team Lead", value: "Team Lead" },
              { label: "Senior Analyst", value: "Senior Analyst" },
              { label: "Analyst", value: "Analyst" },
              { label: "Associate", value: "Associate" },
              { label: "Intern", value: "Intern" },
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "radio",
            required: true,
            errorMessage: "Please choose a status",
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
            required: true,
            errorMessage: "Region selection is required",
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
            min: 0,
            errorMessage: "Account value cannot be negative",
          },
        ],
      },

      /* =========================
       ADDITIONAL
    ========================= */
      {
        id: "additional",
        title: "Additional Info",
        columns: 3,
        collapsible: true,

        fields: [
          {
            name: "tags",
            label: "Tags",
            type: "tags",
          },
          {
            name: "bio",
            label: "Bio",
            type: "textarea",
            maxLength: 500,
          },
          {
            name: "createdAt",
            label: "Created At",
            type: "email-builder",
            span: 3,
          },

          /* nested object */

          {
            name: "address",
            label: "Address",
            type: "object",
            columns: 3,

            fields: [
              {
                name: "street",
                label: "Street",
                type: "text",

                required: true,
              },
              {
                name: "city",
                label: "City",
                type: "text",
              },
              {
                name: "country",
                label: "Country",
                type: "select",
                options: [
                  { label: "India", value: "india" },
                  { label: "US", value: "us" },
                ],
              },
            ],
          },

          /* array */

          {
            name: "directors",
            label: "Directors",
            type: "array",
            span: 3,

            minItems: 1,
            maxItems: 4,

            fields: [
              {
                name: "name",
                label: "Director Name",
                type: "text",
                span: 3,
                required: true,
              },
              {
                name: "email",
                label: "Director Email",
                type: "email",
              },
            ],
          },
        ],
      },

      /* =========================
       COMPANY
    ========================= */

      {
        id: "company",
        title: "Company Info",
        columns: 2,

        fields: [
          {
            name: "companyName",
            label: "Company Name",
            type: "text",
            required: true,
          },

          {
            name: "companyAddress",
            label: "Address",
            type: "object",

            fields: [
              { name: "street", label: "Street", type: "text" },
              { name: "city", label: "City", type: "text" },
              { name: "country", label: "Country", type: "text" },
            ],
          },

          {
            name: "companyDirectors",
            label: "Directors",
            type: "array",

            fields: [
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ],
          },
        ],
      },
      {
        id: "all-fields-test",
        title: "All Fields Test",
        columns: 3,
        collapsible: true,

        fields: [
          {
            name: "testText",
            label: "Text Field",
            type: "text",
            placeholder: "Sample text",
          },
          {
            name: "testNumber",
            label: "Number Field",
            type: "number",
            min: 0,
            max: 100,
          },
          {
            name: "testDecimal",
            label: "Decimal Field",
            type: "decimal",
            min: 0,
            max: 9999,
          },
          {
            name: "testEmail",
            label: "Email Field",
            type: "email",
          },
          {
            name: "testPassword",
            label: "Password Field",
            type: "password",
          },
          {
            name: "testPhone",
            label: "Phone Field",
            type: "phone",
          },
          {
            name: "testUrl",
            label: "URL Field",
            type: "url",
            placeholder: "https://example.com",
          },
          {
            name: "testTextarea",
            label: "Textarea Field",
            type: "textarea",
            maxLength: 300,
          },

          {
            name: "testSelect",
            label: "Select Field",
            type: "select",
            options: [
              { label: "Option A", value: "a" },
              { label: "Option B", value: "b" },
              { label: "Option C", value: "c" },
            ],
          },

          {
            name: "testSearchSelect",
            label: "Search Select",
            type: "search-select",
            options: [
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Orange", value: "orange" },
            ],
          },

          {
            name: "testRadio",
            label: "Radio Field",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },

          {
            name: "testCheckbox",
            label: "Checkbox Field",
            type: "checkbox",
          },

          {
            name: "testBoolean",
            label: "Boolean Toggle",
            type: "boolean",
          },

          {
            name: "testTags",
            label: "Tags Field",
            type: "tags",
          },

          {
            name: "testFile",
            label: "File Upload",
            type: "file",
            multiple: true,
          },

          {
            name: "testImage",
            label: "Image Upload",
            type: "image",
            accept: "image/*",
          },

          {
            name: "testDate",
            label: "Date Field",
            type: "datetime",
          },

          {
            name: "testRange",
            label: "Range Slider",
            type: "range",
            min: 0,
            max: 100,
          },

          {
            name: "testColor",
            label: "Color Picker",
            type: "color",
          },

          {
            name: "testDivider",
            label: "Divider",
            type: "divider",
            span: 3,
          },

          {
            name: "testHeading",
            label: "Heading Component",
            type: "heading",
            span: 3,
          },

          {
            name: "testEmailBuilder",
            label: "Email Builder",
            type: "email-builder",
            span: 3,
          },

          {
            name: "testObject",
            label: "Object Field",
            type: "object",
            columns: 2,
            span: 3,

            fields: [
              {
                name: "street",
                label: "Street",
                type: "text",
              },
              {
                name: "city",
                label: "City",
                type: "text",
              },
            ],
          },

          {
            name: "testArray",
            label: "Array Field",
            type: "array",
            span: 3,
            minItems: 1,
            maxItems: 3,

            fields: [
              {
                name: "itemName",
                label: "Item Name",
                type: "text",
              },
              {
                name: "itemEmail",
                label: "Item Email",
                type: "email",
              },
            ],
          },
        ],
      },
    ],
  },
  data: userData,
};
