/* ================================
FIELD TYPES
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
VIEW TYPES
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

  /* UX */
  placeholder?: string;
  info?: string;

  /* Validation */
  required?: boolean;
  errorMessage?: string;

  minLength?: number;
  maxLength?: number;

  min?: number;
  max?: number;

  pattern?: string;

  /* Select / Options */
  options?: FieldOption[];

  /* File */
  accept?: string;
  multiple?: boolean;

  /* Default value */
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

  /* list views */
  views?: {
    enabled?: boolean;
    defaultView?: ViewType;
    available?: ViewType[];
  };

  table?: any;

  grid?: any;

  kanban?: any;

  calendar?: any;

  /* form engine */
  form?: {
    add?: FormSection[];
    edit?: FormSection[];
  };

  /* detail record page */
  view?: ViewConfig;

  data?: any[];
}

//more types for view detail page vgeifevws
export interface ViewSection {
  id: string;
  title?: string;
  fields: string[];
  colSpan?: number;
}

export interface ViewLayout {
  type: "grid" | "cards" | "sidebar" | "compact";
  columns?: number;
  sections?: ViewSection[];
  fields?: string[];
  main?: string[];
  side?: string[];
}

export interface ViewToolbar {
  search?: boolean;
  export?: boolean;
  layoutSwitch?: boolean;
  actions?: ("edit" | "delete")[];
}

export interface ViewConfig {
  defaultLayout: string;
  layouts: Record<string, ViewLayout>;
  toolbar?: ViewToolbar;
}
