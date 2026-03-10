import DynamicModule from "@/components/Model/DynamicModule";
import { modulesRegistry } from "@/config/modules/index";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ model: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { model } = await params;

  const config = modulesRegistry[model];

  if (!config) {
    redirect("/404"); // or any fallback page
  }

  // redirect to /model/view
  redirect(`${model}/view`);

  return <DynamicModule config={config} />;
}
