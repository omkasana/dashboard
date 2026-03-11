"use client";

import { FormField } from "@/types/module";

import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import PhoneField from "./fields/PhoneField";
import SelectField from "./fields/SelectField";
import TextAreaField from "./fields/TextAreaField";
import TagsField from "./fields/TagsField";
import FileUploadField from "./fields/FileUploadField";
import DateField from "./fields/DateField";

import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import BooleanField from "./fields/BooleanField";
import ArrayField from "./fields/ArrayField";
import ObjectField from "./fields/ObjectField";

interface Props {
  field: FormField;
  error?: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
}

export default function FieldRenderer({
  field,
  error,
  value,
  onChange,
}: Props) {
  switch (field.type) {
    case "text":
    case "number":
    case "decimal":
      return (
        <TextField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "email":
      return (
        <EmailField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "phone":
      return (
        <PhoneField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "select":
    case "multiselect":
    case "search-select":
      return (
        <SelectField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "radio":
      return (
        <RadioField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "checkbox":
      return (
        <CheckboxField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "boolean":
      return (
        <BooleanField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "textarea":
      return (
        <TextAreaField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "tags":
      return (
        <TagsField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "file":
      return (
        <FileUploadField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "date":
    case "time":
    case "datetime":
      return (
        <DateField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );
    case "array":
      return (
        <ArrayField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    case "object":
      return (
        <ObjectField
          field={field}
          error={error}
          value={value}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
