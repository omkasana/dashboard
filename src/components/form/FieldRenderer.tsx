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
}

export default function FieldRenderer({ field }: Props) {
  switch (field.type) {
    case "text":
    case "number":
    case "decimal":
      return <TextField field={field} />;

    case "email":
      return <EmailField field={field} />;

    case "phone":
      return <PhoneField field={field} />;

    case "select":
    case "multiselect":
    case "search-select":
      return <SelectField field={field} />;

    case "radio":
      return <RadioField field={field} />;

    case "checkbox":
      return <CheckboxField field={field} />;

    case "boolean":
      return <BooleanField field={field} />;

    case "textarea":
      return <TextAreaField field={field} />;

    case "tags":
      return <TagsField field={field} />;

    case "file":
      return <FileUploadField field={field} />;

    case "date":
    case "time":
    case "datetime":
      return <DateField field={field} />;

    default:
      return null;
  }
}
