import type { ModuleConfig } from "@/types/module";

export const blogsConfig: ModuleConfig = {
  id: "blog",
  title: "Blog Posts",
  description: "Manage blog articles and drafts",

  actions: {
    add: true,
    import: false,
    export: true,
  },

  search: {
    enabled: true,
    placeholder: "Search posts...",
  },

  views: {
    enabled: true,
    defaultView: "grid",
    available: ["table", "grid"],
  },

  table: {
    enabled: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "author", label: "Author" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "publishedAt", label: "Published Date" },
    ],
  },

  grid: {
    enabled: true,
    type: "simple",
    fields: ["title", "author", "category", "status"],
  },
};
