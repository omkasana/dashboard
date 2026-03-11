import FormEngine from "@/components/Form/FormEngine";
import { modulesRegistry } from "@/config/modules";

export default async function AddPage({ params }: any) {
  const { model } = await params;

  const config = modulesRegistry[model];

  if (!config?.form?.add) {
    return <p>No form schema found</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add {config.title}</h1>
      <FormEngine schema={config.form.add} />
    </div>
  );
}
