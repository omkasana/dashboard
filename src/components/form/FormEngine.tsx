"use client";

import { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import FormSection from "./FormSection";
import { validateForm } from "@/lib/formValidator";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  schema?: any[]; // ✅ allow undefined safely
  endpoint: string;
  initialValues?: Record<string, any>;
  mode?: "create" | "update";
  id?: string;
}

export default function FormEngine({
  schema = [], // ✅ fallback
  endpoint,
  initialValues,
  mode = "create",
  id,
}: Props) {
  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {},
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  /* sync values when editing */
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  /* handle input change */
  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  /* submit */
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

      const method = mode === "update" ? "PUT" : "POST";

      const url = mode === "update" && id ? `${endpoint}/${id}` : endpoint;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Request failed");
      }

      console.log("API response:", data);

      /* ✅ redirect back to list */
      const segments = pathname.split("/").filter(Boolean);

      // remove last parts like add/update/id
      if (["add", "create", "new"].includes(segments.at(-1)!)) {
        segments.pop();
      }

      if (segments.at(-2) === "update") {
        segments.pop(); // id
        segments.pop(); // update
      }

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
            className="h-11 px-6 rounded-xl bg-primary text-white font-medium shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:brightness-110 transition disabled:opacity-60"
          >
            {loading
              ? mode === "update"
                ? "Updating..."
                : "Saving..."
              : mode === "update"
                ? "Update"
                : "Save"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
}
