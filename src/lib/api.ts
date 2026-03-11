export async function fetchModuleData(module: string) {
  const res = await fetch(`http://localhost:4000/api/${module}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch module data");
  }

  return res.json();
}
