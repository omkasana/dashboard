export const API_BASE_URL =
  "https://platform-backend-v8zh.onrender.com/api";


// =======================
// GET REQUEST
// =======================

export const getRequest = async <T>(
  url: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> => {
  try {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();

    const finalUrl = queryString
      ? `${url}?${queryString}`
      : url;

    const response = await fetch(finalUrl, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// =======================
// POST REQUEST
// =======================

export const postRequest = async <T>(
  url: string,
  data: unknown
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return response.json();

  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};


// =======================
// PUT REQUEST
// =======================

export const putRequest = async <T>(
  url: string,
  data: unknown
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return response.json();

  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
};


// =======================
// DELETE REQUEST
// =======================

export const deleteRequest = async <T>(
  url: string,
  data?: unknown
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: data
        ? JSON.stringify(data)
        : undefined,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    return response.json();

  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};