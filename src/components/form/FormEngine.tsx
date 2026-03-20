"use client";

import { useState } from "react";
import FormContainer from "./FormContainer";
import FormSection from "./FormSection";
import { validateForm } from "@/lib/formValidator";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  schema: any[];
}

export default function FormEngine({ schema }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* handle input change */

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    /* clear error when user edits */

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  /* form submit */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { errors: validationErrors, firstError } = validateForm(
      schema,
      values,
    );

    setErrors(validationErrors);

    if (firstError) {
      const element = document.querySelector(
        `[name="${firstError}"]`,
      ) as HTMLElement;

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element?.focus();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create");
      }

      console.log("API response:", data);

      // ✅ DYNAMIC REDIRECT LOGIC
      const segments = pathname.split("/").filter(Boolean);
      segments.pop(); // removes "add"

      const redirectTo = "/" + segments.join("/");

      router.push(redirectTo);
    } catch (err) {
      console.error("Submit error", err);
    } finally {
      setLoading(false);
    }
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
              values={values}
              formValues={values}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={loading}
            className="
            h-11 px-6 rounded-xl
            bg-primary text-white font-medium
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            hover:brightness-110 transition
            disabled:opacity-60
            "
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
}
