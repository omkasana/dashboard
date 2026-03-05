"use client";

import { FormSection } from "@/types/module";
import FormSectionComponent from "./FormSection";

interface Props {
  schema: FormSection[];
}

export default function FormEngine({ schema }: Props) {
  return (
    <form className="space-y-8">
      {schema.map((section) => (
        <FormSectionComponent key={section.id} section={section} />
      ))}

      <button
        type="submit"
        className="h-11 px-6 rounded-xl bg-primary text-white hover:opacity-90"
      >
        Save
      </button>
    </form>
  );
}
