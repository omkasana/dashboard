"use client";

import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import Input from "@/components/UI/Input";
import { useState } from "react";

export default function DividerField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [show, setShow] = useState(false);
  return <hr className="my-4 border-border" />;
}
