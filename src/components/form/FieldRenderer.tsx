"use client";

import { FormField } from "@/types/module";

import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import PhoneField from "./fields/PhoneField";
import SelectField from "./fields/SelectField";
import TextAreaField from "./fields/TextAreaField";
import TagsField from "./fields/TagsField";
import FileUploadField from "./fields/FileUpload";
import DateField from "./fields/DateField";

import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import BooleanField from "./fields/BooleanField";

interface Props {
  field: FormField;
  error?: string;
}

export default function FieldRenderer({ field, error }: Props) {
  switch (field.type) {
    case "text":
    case "number":
    case "decimal":
      return <TextField field={field} error={error} />;

    case "email":
      return <EmailField field={field} error={error} />;

    case "phone":
      return <PhoneField field={field} error={error} />;

    case "select":
    case "multiselect":
    case "search-select":
      return <SelectField field={field} error={error} />;

    case "radio":
      return <RadioField field={field} error={error} />;

    case "checkbox":
      return <CheckboxField field={field} error={error} />;

    case "boolean":
      return <BooleanField field={field} error={error} />;

    case "textarea":
      return <TextAreaField field={field} error={error} />;

    case "tags":
      return <TagsField field={field} error={error} />;

    case "file":
      return <FileUploadField field={field} error={error} />;

    case "date":
    case "time":
    case "datetime":
      return <DateField field={field} error={error} />;

    default:
      return null;
  }
}
