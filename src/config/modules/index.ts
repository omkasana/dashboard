import { usersConfig } from "@/config/users/users.config";
import { chatConfig } from "@/config/ai-tools/chat.config";
import type { ModuleConfig } from "@/types/module";
import { blogsConfig } from "../content/blogs.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  chat: chatConfig,
  blog: blogsConfig,
};
