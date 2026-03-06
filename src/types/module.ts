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

  views?: any;

  table?: any;

  grid?: any;

  kanban?: any;

  calendar?: any;

  form?: {
    add?: FormSection[];
    edit?: FormSection[];
  };

  data?: any[];
}
