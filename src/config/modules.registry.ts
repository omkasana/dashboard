import type { ModuleConfig } from "@/types/module";
import { usersConfig } from "./users/users.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
};
