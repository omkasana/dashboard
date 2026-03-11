import { usersConfig } from "@/config/users/users.config";
import { chatConfig } from "@/config/ai-tools/chat.config";
import type { ModuleConfig } from "@/types/module";
import { blogsConfig } from "../content/blogs.config";
import { modelsConfig } from "../users/model.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  models: modelsConfig,
};
