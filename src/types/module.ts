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
  | "datetime"
  | "object"
  | "array";

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
  span?: number;
}

/* ================================
   VIEW SECTIONS
================================ */
export interface ViewSection {
  id: string;
  title?: string;
  description?: string;
  colSpan?: number;
  columns?: number;
  fields: string[];
}

/* ================================
   VIEW LAYOUT CONFIGS
================================ */
export interface GridLayoutConfig {
  type: "grid";
  columns: number;
  sections: ViewSection[];
}

export interface CardsLayoutConfig {
  type: "cards";
  columns?: number;
  fields: string[];
}

export interface SidebarLayoutConfig {
  type: "sidebar";
  sidePosition?: "left" | "right";
  sideWidth?: string;
  mainSections: ViewSection[];
  sideSections: ViewSection[];
}

export interface CompactLayoutConfig {
  type: "compact";
  columns?: number;
  fields: string[];
}

export interface ProfileLayoutConfig {
  type: "profile";

  // Outer grid
  columns?: number; // desktop outer cols — default 3
  sectionGap?: string; // gap between sections — default "0.75rem"
  mobileBreakpoint?: number; // px when outer grid activates — default 768
  maxFieldColsMobile?: number; // max inner cols on tablet — default 2
  fieldBreakpoint?: number; // px when inner cols activate — default 480

  // Section cards
  sectionPadding?: string; // card padding — default "1rem"
  fieldGap?: string; // gap inside fields grid — default "0.625rem 1.25rem"

  // Header
  avatarField?: string;
  avatarSize?: string; // css size e.g. "64px" — default "64px"
  titleField?: string;
  subtitleField?: string;
  badgeFields?: string[];
  coverField?: string;

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

  /* =========================
     NESTED / ARRAY SUPPORT
  ========================= */

  fields?: FormField[];      // for object & array

  minItems?: number;         // for array
  maxItems?: number;

  columns?: number;          // nested layout
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
