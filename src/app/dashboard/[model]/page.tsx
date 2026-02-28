import DynamicModule from "@/components/DynamicModule";
import { modulesRegistry } from "@/config/modules/index";

interface Props {
  params: Promise<{ model: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { model } = await params;

  const config = modulesRegistry[model];

  if (!config) {
    return <div className="p-6">Module not found — param: {model}</div>;
  }

  return <DynamicModule config={config} />;
}
