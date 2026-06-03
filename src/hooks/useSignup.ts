"use client";

import { authService } from "@/service/auth.service";

import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: authService.signup,
  });
};
export const useSignin = () => {
  return useMutation({
    mutationFn: authService.signin,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      payload,
    }: {
      token: string;
      payload: {
        password: string;
      };
    }) => authService.resetPassword(token, payload),
  });
};

// export const useAssessment = () => {
//   return useMutation({
//     mutationFn: authService.assessment,
//   });
// };
