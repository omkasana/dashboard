import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ========================================
// AXIOS INSTANCE
// ========================================

const api = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// ========================================
// TOKEN REFRESH LOCK
// ========================================

let isRefreshing = false;

let failedQueue: any[] = [];

// ========================================
// PROCESS QUEUE
// ========================================

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    // ========================================
    // SKIP IF NO RESPONSE
    // ========================================

    if (!error.response) {
      return Promise.reject(error);
    }

    // ========================================
    // HANDLE 401
    // ========================================

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      // ========================================
      // ALREADY REFRESHING
      // ========================================

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        // ========================================
        // REFRESH TOKEN API
        // ========================================

        const response = await api.post("/auth/refresh-token");

        const newAccessToken = response.data.data.accessToken;

        // ========================================
        // SAVE NEW ACCESS TOKEN
        // ========================================

        localStorage.setItem("accessToken", newAccessToken);

        // ========================================
        // UPDATE DEFAULT HEADER
        // ========================================

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        // ========================================
        // RETRY ORIGINAL REQUEST
        // ========================================

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // ========================================
        // CLEAR SESSION
        // ========================================

        localStorage.removeItem("accessToken");

        localStorage.removeItem("user");

        // ========================================
        // REDIRECT LOGIN
        // ========================================

        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
