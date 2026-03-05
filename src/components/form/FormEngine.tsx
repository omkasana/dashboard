"use client";

import FormContainer from "./FormContainer";
import FormSection from "./FormSection";

export default function FormEngine({ schema }: any) {
  return (
    <FormContainer>
      <div className="flex flex-col gap-8">
        {schema.map((section: any) => (
          <FormSection key={section.title} section={section} />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button className="h-11 px-6 rounded-xl bg-primary text-white font-medium shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:brightness-110 transition">
          Save
        </button>
      </div>
    </FormContainer>
  );
}
