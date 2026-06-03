import api from "./axios";
import { Assessment } from "../types/assessment";
import { API_BASE_URL } from "@/util/APIGeneric";
export interface SignupPayload {
  userName: string;
  email: string;
  phone: string;
  password: string;
}
export interface SigninPayload {
  email: string;
  password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ResetPasswordPayload {
  password: string;
}

export const authService = {
  signup: async (payload: SignupPayload) => {
    const response = await api.post(`${API_BASE_URL}/auth/signup`, payload);

    return response.data;
  },

  signin: async (payload: SigninPayload) => {
    const response = await api.post(`${API_BASE_URL}/auth/login`, payload);

    return response.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const response = await api.post(
      `${API_BASE_URL}/auth/forgot-password`,
      payload,
    );

    return response.data;
  },
  resetPassword: async (token: string, payload: ResetPasswordPayload) => {
    const response = await api.post(
      `${API_BASE_URL}/auth/reset-password/${token}`,
      payload,
    );

    return response.data;
  },

  assessment: async () => {
    const response = await api.get(`${API_BASE_URL}/assessment`);

    return response.data;
  },
};
