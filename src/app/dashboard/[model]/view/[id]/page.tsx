import { modulesRegistry } from "@/config/modules";
import { getUserById } from "@/dummy/user.data";
import { RecordEngine } from "@/components/viewpage/RecordEngine";

interface Props {
  params: Promise<{ model: string; id: string }>;
}

export default async function ViewRecordPage({ params }: Props) {
  const { model, id } = await params;

  const module = modulesRegistry[model];

  // Module not found → real 404
  if (!module?.view) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Module not found</h2>
      </div>
    );
  }

  const data = getUserById(id);

  // Record not found → UI state instead of 404
  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
        <h2 className="text-xl font-semibold">Record not found</h2>
        <p className="text-muted-foreground">
          The record you are trying to view does not exist.
        </p>
      </div>
    );
  }

  return (
    <RecordEngine
      config={module.view}
      data={data as Record<string, unknown>}
      model={model}
      id={id}
    />
  );
}
