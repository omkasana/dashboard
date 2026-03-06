"use client";

import { useState } from "react";
import FormContainer from "./FormContainer";
import FormSection from "./FormSection";
import { validateForm } from "@/lib/formValidator";

interface Props {
  schema: any[];
}

export default function FormEngine({ schema }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    const { errors: validationErrors, firstError } = validateForm(
      schema,
      formData,
    );

    setErrors(validationErrors);

    /* scroll to first invalid field */

    if (firstError) {
      const element = form.querySelector(
        `[name="${firstError}"]`,
      ) as HTMLElement;

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element?.focus();
    }

    const values = Object.fromEntries(formData.entries());

    console.log("Form submitted:", values);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-8">
          {schema.map((section: any) => (
            <FormSection
              key={section.title}
              section={section}
              errors={errors}
            />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="h-11 px-6 rounded-xl bg-primary text-white font-medium shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:brightness-110 transition"
          >
            Save
          </button>
        </div>
      </form>
    </FormContainer>
  );
}
