import { navigationLinks } from "@/config/navigation.config";
import type { FieldOption } from "@/types/module";

type NavigationItem = {
  id: string;
  name: string;
  children?: NavigationItem[];
};

function flattenNavigation(items: NavigationItem[]): FieldOption[] {
  return items.flatMap((item) => [
    { label: item.name, value: item.id },
    ...(item.children ? flattenNavigation(item.children) : []),
  ]);
}

export const moduleAccessOptions: FieldOption[] =
  flattenNavigation(navigationLinks);
