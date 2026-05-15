import { usersConfig } from "@/config/temp/users.config";

import type { ModuleConfig } from "@/types/module";

import { modelsConfig } from "./model.config";
import { organizationConfig } from "./organization.config";
import { billingConfig } from "./billing.config";
import { suspendedConfig } from "./suspended.config";
import { rolesConfig } from "./roles.config";
import { permissionsConfig } from "./permissions.config";
import { databaseConfig } from "./database.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  models: modelsConfig,
  organizations: organizationConfig,
  billing: billingConfig,
  suspended: suspendedConfig,
  roles: rolesConfig,
  permissions: permissionsConfig,
  database: databaseConfig,
};
