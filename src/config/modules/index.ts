import { usersConfig } from "@/config/temp/users.config";

import type { ModuleConfig } from "@/types/module";

import { modelsConfig } from "./model.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  models: modelsConfig,
};
