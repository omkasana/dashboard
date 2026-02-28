import DynamicModule from "@/components/Model/DynamicModule";
import { modulesRegistry } from "@/config/modules/index";

interface Props {
  params: Promise<{ model: string }>;
}

export default async function AddPage({ params }: Props) {
  const { model } = await params;

  const config = modulesRegistry[model];

  if (!config) {
    return <div className="p-6">Module not found — param: {model}</div>;
  }

  return <> Add {model}</>;
}
