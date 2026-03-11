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

import EmailBuilderField from "./fields/EmailBuilder";
import NumberField from "./fields/NumberField";
import DecimalField from "./fields/DecimalField";
import PasswordField from "./fields/PasswordField";
import UrlField from "./fields/UrlField";
import RangeField from "./fields/RangeField";
import ColorField from "./fields/ColorField";
import DividerField from "./fields/DividerField";
import HeadingField from "./fields/HeadingField";
import SlugField from "./fields/SlugField";

const fieldMap: Record<string, any> = {
  text: TextField,
  number: NumberField,
  decimal: DecimalField,
  password: PasswordField,
  slug: SlugField,
  url: UrlField,
  textarea: TextAreaField,
  select: SelectField,
  checkbox: CheckboxField,
  file: FileUploadField,
  image: FileUploadField,
  date: DateField,
  range: RangeField,
  color: ColorField,
  divider: DividerField,
  heading: HeadingField,
  "email-builder": EmailBuilderField,
  radio: RadioField,
  boolean: BooleanField,
  tags: TagsField,
  object: ObjectField,
  array: ArrayField,
  email: EmailField,
  phone: PhoneField,
};

interface Props {
  field: FormField;
  error?: string;
  value?: any;
  formValues?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
}

export default function FieldRenderer({
  field,
  error,
  value,
  formValues,
  onChange,
}: Props) {
  const Component = fieldMap[field.type];

  if (!Component) {
    return <div>Unsupported field: {field.type}</div>;
  }

  return (
    <Component
      field={field}
      error={error}
      value={value}
      onChange={onChange}
      formValues={formValues}
    />
  );
}
