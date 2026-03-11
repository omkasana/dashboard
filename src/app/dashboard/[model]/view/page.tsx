import DynamicModule from "@/components/Model/DynamicModule";
import { modulesRegistry } from "@/config/modules/index";

interface Props {
  params: Promise<{ model: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { model } = await params;

  const config = modulesRegistry[model];
  console.log("Module config for model:", model, config);

  if (!config) {
    return <div className="p-2">Module not found — param: {model}</div>;
  }

  return <DynamicModule config={config} />;
}
