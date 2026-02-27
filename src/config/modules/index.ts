import { usersConfig } from "@/config/users/users.config";
import { chatConfig } from "@/config/chat/chat.config";
import type { ModuleConfig } from "@/types/module";
import { blogsConfig } from "../blogs/blogs.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  chat: chatConfig,
  blog: blogsConfig,
};
