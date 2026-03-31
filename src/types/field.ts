export type FieldType =
  | "text"
  | "number"
  | "decimal"
  | "email"
  | "password"
  | "phone"
  | "url"
  | "slug"
  | "radio"
  | "checkbox"
  | "boolean"
  | "select"
  | "multiselect"
  | "search-select"
  | "tags"
  | "textarea"
  | "editor"
  | "markdown"
  | "code"
  | "file"
  | "image"
  | "avatar"
  | "date"
  | "time"
  | "datetime"
  | "range"
  | "slider"
  | "rating"
  | "currency"
  | "color"
  | "relation"
  | "lookup"
  | "json"
  | "key-value"
  | "map"
  | "location"
  | "object"
  | "array"
  | "divider"
  | "heading"
  | "html"
  | "email-builder";

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldSchema {
  name: string;
  label?: string;
  type: FieldType;

  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];

  multiple?: boolean;
  accept?: string;

  defaultValue?: any;

  span?: number;
  columns?: number;

  info?: string;
  errorMessage?: string;

  min?: number;
  max?: number;

  minLength?: number;
  maxLength?: number;

  minItems?: number;
  maxItems?: number;

  fields?: FieldSchema[];
}
