/* ================================
   FIELD TYPES (Form Engine)
================================ */
export type FieldType =
  | "text"
  | "number"
  | "decimal"
  | "email"
  | "phone"
  | "radio"
  | "checkbox"
  | "boolean"
  | "select"
  | "multiselect"
  | "search-select"
  | "tags"
  | "textarea"
  | "editor"
  | "file"
  | "date"
  | "time"
  | "datetime";

/* ================================
   VIEW FIELD TYPES (Record Engine)
================================ */
export type ViewFieldType =
  | "text"
  | "email"
  | "phone"
  | "url"
  | "textarea"
  | "number"
  | "decimal"
  | "currency"
  | "date"
  | "time"
  | "datetime"
  | "status"
  | "badge"
  | "boolean"
  | "tags"
  | "multiselect"
  | "avatar"
  | "image"
  | "file";

/* ================================
   VIEW FIELD SCHEMA
================================ */
export interface ViewField {
  key: string;
  label: string;
  type: ViewFieldType;
  prefix?: string;
  suffix?: string;
  dateFormat?: string;
  badgeColors?: Record<string, string>;
  span?: number; // how many columns this field takes inside a section
}

/* ================================
   VIEW SECTIONS
================================ */
export interface ViewSection {
  id: string;
  title: string;
  description?: string;
  colSpan?: number; // how many grid columns this section spans
  columns?: number; // internal field columns inside this section (default 2)
  fields: string[];
}

/* ================================
   VIEW LAYOUT CONFIGS
================================ */
export interface GridLayoutConfig {
  type: "grid";
  columns: number; // total grid columns e.g. 3
  sections: ViewSection[];
}

export interface CardsLayoutConfig {
  type: "cards";
  columns?: number; // cards per row (default 3)
  fields: string[];
}

export interface SidebarLayoutConfig {
  type: "sidebar";
  sidePosition?: "left" | "right"; // default "right"
  sideWidth?: string; // e.g. "280px" default "260px"
  mainSections: ViewSection[]; // sections in main area
  sideSections: ViewSection[]; // sections in sidebar
}

export interface CompactLayoutConfig {
  type: "compact";
  columns?: number; // 1 or 2 column rows (default 1)
  fields: string[];
}

export interface ProfileLayoutConfig {
  type: "profile";
  coverField?: string; // field key for cover image
  avatarField?: string; // field key for avatar
  titleField?: string; // field key for title/name
  subtitleField?: string; // field key for subtitle
  badgeFields?: string[]; // field keys shown as badges in header
  sections: ViewSection[];
}

export type LayoutConfig =
  | GridLayoutConfig
  | CardsLayoutConfig
  | SidebarLayoutConfig
  | CompactLayoutConfig
  | ProfileLayoutConfig;

/* ================================
   VIEW CONFIG
================================ */
export interface ViewConfig {
  defaultLayout: string;
  fields: ViewField[];
  layouts: Record<string, LayoutConfig>;
}

/* ================================
   VIEW TYPES (List Engine)
================================ */
export type ViewType =
  | "table"
  | "list"
  | "grid"
  | "kanban"
  | "calendar"
  | "timeline"
  | "analytics"
  | "map"
  | "gallery";

/* ================================
   FIELD OPTIONS
================================ */
export interface FieldOption {
  label: string;
  value: string | number;
}

/* ================================
   FORM FIELD
================================ */
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  info?: string;
  required?: boolean;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: FieldOption[];
  accept?: string;
  multiple?: boolean;
  defaultValue?: any;
}

/* ================================
   FORM SECTION
================================ */
export interface FormSection {
  id: string;
  title: string;
  description?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  columns?: number;
  fields: FormField[];
}

/* ================================
   MODULE CONFIG
================================ */
export interface ModuleConfig {
  id: string;
  title: string;
  description?: string;
  actions?: any;
  search?: any;
  filters?: any;
  views?: {
    enabled?: boolean;
    defaultView?: ViewType;
    available?: ViewType[];
  };
  table?: any;
  grid?: any;
  kanban?: any;
  calendar?: any;
  form?: {
    add?: FormSection[];
    edit?: FormSection[];
  };
  view?: ViewConfig;
  data?: any[];
}

export interface ProfileLayoutConfig {
  type: "profile";
  columns?: number; // ✅ outer grid columns — default 3
  coverField?: string;
  avatarField?: string;
  titleField?: string;
  subtitleField?: string;
  badgeFields?: string[];
  sections: ViewSection[];
}
