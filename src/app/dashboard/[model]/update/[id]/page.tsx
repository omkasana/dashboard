"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormEngine from "@/components/Form/FormEngine";
import { modulesRegistry } from "@/config/modules";
import BackButton from "@/components/UI/BackButton";

export default function UpdateModelPage() {
  const params = useParams();
  const id = params.id as string;

  const config = modulesRegistry["models"];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/models/${id}`);

        const result = await res.json();

        console.log("Fetched model:", result);

        // adjust based on backend response
        setData(result.data || result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (id) fetchModel();
  }, [id]);

  if (!config?.form?.add) {
    return <p>No form schema found</p>;
  }

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <BackButton />
      </div>

      <h1 className="text-2xl font-semibold">Update {config.title}</h1>

      <FormEngine
        schema={config.form.add} // reuse schema
        endpoint="http://localhost:4000/api/models"
        mode="update"
        id={id}
        initialValues={data}
      />
    </div>
  );
}
