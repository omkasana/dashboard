import { modulesRegistry } from "@/config/modules";
import { getUserById } from "@/dummy/user.data";
import { RecordEngine } from "@/components/viewpage/RecordEngine";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ model: string; id: string }>;
}

export default async function ViewRecordPage({ params }: PageProps) {
  const { model, id } = await params;

  const module = modulesRegistry[model];
  if (!module?.view) notFound();

  const data = getUserById(id);
  if (!data) notFound();

  return (
    <RecordEngine
      config={module.view}
      data={data as Record<string, unknown>}
      model={model}
      id={id}
    />
  );
}
