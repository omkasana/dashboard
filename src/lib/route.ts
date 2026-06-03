const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://platform-backend-v8zh.onrender.com/api";

// ==============================
// AUTH ROUTES
// ==============================

export const AUTH_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh-token`,
  ME: `${API_BASE_URL}/auth/me`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
};

// ==============================
// USER ROUTES
// ==============================

export const USER_ROUTES = {
  GET_ALL: `${API_BASE_URL}/users`,
  GET_ONE: (id: string) => `${API_BASE_URL}/users/${id}`,

  CREATE: `${API_BASE_URL}/users`,

  UPDATE: (id: string) => `${API_BASE_URL}/users/${id}`,

  DELETE: (id: string) => `${API_BASE_URL}/users/${id}`,
};

// ==============================
// ROLE ROUTES
// ==============================

export const ROLE_ROUTES = {
  GET_ALL: `${API_BASE_URL}/roles`,

  GET_ONE: (id: string) => `${API_BASE_URL}/roles/${id}`,

  CREATE: `${API_BASE_URL}/roles`,

  UPDATE: (id: string) => `${API_BASE_URL}/roles/${id}`,

  DELETE: (id: string) => `${API_BASE_URL}/roles/${id}`,
};

// ==============================
// PERMISSION ROUTES
// ==============================

export const PERMISSION_ROUTES = {
  GET_ALL: `${API_BASE_URL}/permissions`,

  GET_ONE: (id: string) => `${API_BASE_URL}/permissions/${id}`,

  CREATE: `${API_BASE_URL}/permissions`,

  UPDATE: (id: string) => `${API_BASE_URL}/permissions/${id}`,

  DELETE: (id: string) => `${API_BASE_URL}/permissions/${id}`,
};

// ==============================
// ORGANIZATION ROUTES
// ==============================

export const ORGANIZATION_ROUTES = {
  GET_ALL: `${API_BASE_URL}/organizations`,

  GET_ONE: (id: string) => `${API_BASE_URL}/organizations/${id}`,

  CREATE: `${API_BASE_URL}/organizations`,

  UPDATE: (id: string) => `${API_BASE_URL}/organizations/${id}`,

  DELETE: (id: string) => `${API_BASE_URL}/organizations/${id}`,
};

// ==============================
// MODEL ROUTES
// ==============================

export const MODEL_ROUTES = {
  GET_ALL: `${API_BASE_URL}/models`,

  GET_ONE: (id: string) => `${API_BASE_URL}/models/${id}`,

  CREATE: `${API_BASE_URL}/models`,

  UPDATE: (id: string) => `${API_BASE_URL}/models/${id}`,

  DELETE: (id: string) => `${API_BASE_URL}/models/${id}`,
};

// ==============================
// DYNAMIC RECORD ROUTES
// ==============================

export const RECORD_ROUTES = {
  GET_ALL: (model: string) => `${API_BASE_URL}/${model}`,

  GET_ONE: (model: string, id: string) => `${API_BASE_URL}/${model}/${id}`,

  CREATE: (model: string) => `${API_BASE_URL}/${model}`,

  UPDATE: (model: string, id: string) => `${API_BASE_URL}/${model}/${id}`,

  DELETE: (model: string, id: string) => `${API_BASE_URL}/${model}/${id}`,
};

// ==============================
// NOTIFICATION ROUTES
// ==============================

export const NOTIFICATION_ROUTES = {
  GET_ALL: `${API_BASE_URL}/notifications`,

  MARK_AS_READ: (id: string) => `${API_BASE_URL}/notifications/${id}/read`,

  MARK_ALL_AS_READ: `${API_BASE_URL}/notifications/read-all`,
};

// ==============================
// BILLING ROUTES
// ==============================

export const BILLING_ROUTES = {
  GET_PLANS: `${API_BASE_URL}/billing/plans`,

  GET_SUBSCRIPTION: `${API_BASE_URL}/billing/subscription`,

  CREATE_CHECKOUT: `${API_BASE_URL}/billing/checkout`,

  CANCEL_SUBSCRIPTION: `${API_BASE_URL}/billing/cancel`,
};

// ==============================
// FILE UPLOAD ROUTES
// ==============================

export const FILE_ROUTES = {
  UPLOAD: `${API_BASE_URL}/upload`,
};

// ==============================
// SEARCH ROUTES
// ==============================

export const SEARCH_ROUTES = {
  GLOBAL: `${API_BASE_URL}/search`,
};

// ==============================
// DASHBOARD ROUTES
// ==============================

export const DASHBOARD_ROUTES = {
  STATS: `${API_BASE_URL}/dashboard/stats`,
  ANALYTICS: `${API_BASE_URL}/dashboard/analytics`,
};

// ==============================
// EXPORT BASE URL
// ==============================

export { API_BASE_URL };
