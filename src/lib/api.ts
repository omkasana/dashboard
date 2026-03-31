const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchModuleData(module: string) {
  const res = await fetch(`${API}/${module}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
export async function fetchModuleDataById(module: string, id: string) {
  const res = await fetch(`${API}/${module}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
export async function deleteModel(slug: string) {
  const res = await fetch(`${API}/models/${slug}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");

  return res.json();
}

export async function deleteItem(endpoint: string) {
  const res = await fetch(endpoint, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Delete failed");
  }

  return res.json();
}

export async function updateModel(slug: string, data: any) {
  const res = await fetch(`${API}/models/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
