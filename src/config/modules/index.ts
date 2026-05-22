import { usersConfig } from "@/config/temp/users.config";
import { userOrganizationsConfig } from "@/config/temp/user-organizations.config";

import type { ModuleConfig } from "@/types/module";

import { modelsConfig } from "./model.config";
import { organizationConfig } from "./organization.config";
import { billingConfig } from "./billing.config";
import { suspendedConfig } from "./suspended.config";
import { rolesConfig } from "./roles.config";
import { permissionsConfig } from "./permissions.config";
import { databaseConfig } from "./database.config";
import { allUsersConfig } from "../temp/allusers.config";

export const modulesRegistry: Record<string, ModuleConfig> = {
  users: usersConfig,
  "all-users": allUsersConfig,

  models: modelsConfig,
  organizations: organizationConfig,
  billing: billingConfig,
  suspended: suspendedConfig,
  roles: rolesConfig,
  permissions: permissionsConfig,
  database: databaseConfig,
};
