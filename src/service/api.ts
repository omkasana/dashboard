import { API_BASE_URL } from "@/util/APIGeneric";




type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: RequestMethod;
  body?: any;
  headers?: HeadersInit;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export async function api<T = any>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {}, token } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Something went wrong");
  }
}
