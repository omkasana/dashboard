import { modulesRegistry } from "@/config/modules";
import RecordEngine from "@/components/viewpage/RecordEngine";
import ViewHeader from "@/components/viewpage/ViewHeader";

interface Props {
  params: Promise<{
    model: string;
    id: string;
  }>;
}

export default async function ViewPage({ params }: Props) {
  const { model, id } = await params;

  const module = modulesRegistry[model];

  if (!module) {
    return <div className="p-6">Module "{model}" not found</div>;
  }

  const data = module.data?.find((item: any) => String(item.id) === id);

  if (!data) {
    return <div className="p-6">Record "{id}" not found</div>;
  }

  if (!module.view) {
    return <div className="p-6">View config missing for "{model}"</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <ViewHeader model={model} id={id} />

      <RecordEngine config={module.view} data={data} model={model} id={id} />
    </div>
  );
}
