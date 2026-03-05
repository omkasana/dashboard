"use client";

import FieldRenderer from "./FieldRenderer";
import { FormField } from "@/types/module";

interface Props {
  schema: FormField[];
}

export default function FormEngine({ schema }: Props) {
  return (
    <form className="grid md:grid-cols-2 gap-6">
      {schema.map((field) => (
        <FieldRenderer key={field.name} field={field} />
      ))}

      <button
        type="submit"
        className="col-span-full h-11 rounded-xl bg-primary text-white hover:opacity-90"
      >
        Save
      </button>
    </form>
  );
}
