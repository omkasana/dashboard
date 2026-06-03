"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

import { useResetPassword } from "@/hooks/useSignup";

export default function ResetPasswordPage() {
  const router = useRouter();

  const params = useParams();

  const token = params?.token as string;

  const resetPasswordMutation = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // ========================================
  // HANDLE RESET PASSWORD
  // ========================================

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");

      // ========================================
      // VALIDATION
      // ========================================

      if (!password || !confirmPassword) {
        setError("All fields are required");

        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");

        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");

        return;
      }

      // ========================================
      // API CALL
      // ========================================

      const response = await resetPasswordMutation.mutateAsync({
        token,

        payload: {
          password,
        },
      });

      toast.success(response.message || "Password reset successful");

      // ========================================
      // REDIRECT LOGIN
      // ========================================

      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT SECTION */}
        <div className="relative hidden overflow-hidden border-r border-border/40 bg-muted/[0.18] lg:flex">
          {/* GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12">
            {/* LOGO */}
            <div className="flex items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={22}
                  height={22}
                  priority
                  className="opacity-90"
                />
              </div>
            </div>

            {/* HERO */}
            <div className="max-w-lg">
              <div className="mb-8 inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                Secure Password Reset
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  Create a new secure password.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  Your new password should be secure, easy to remember, and
                  protect access to your account across devices.
                </p>
              </div>

              {/* SECURITY POINTS */}
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 px-5 py-4 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                    <FiCheckCircle className="text-emerald-600" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Minimum 8 characters required
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 px-5 py-4 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                    <FiCheckCircle className="text-emerald-600" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Use uppercase, numbers & special characters
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure password protection enabled
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[420px]">
            {/* MOBILE LOGO */}
            <div className="mb-10 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={22}
                  height={22}
                  priority
                  className="opacity-90"
                />
              </div>
            </div>

            <div className="space-y-8">
              {/* HEADER */}
              <div className="space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-muted/[0.3]">
                  <FiLock className="text-xl text-foreground" />
                </div>

                <div className="pt-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                    Reset password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Create a new password to securely access your account.
                  </p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleResetPassword} className="space-y-5">
                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">New password</label>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 w-full rounded-lg border border-border/60 bg-background pl-11 pr-12 text-sm outline-none transition-all focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm password
                  </label>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 w-full rounded-lg border border-border/60 bg-background pl-11 pr-12 text-sm outline-none transition-all focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* PASSWORD REQUIREMENTS */}
                <div className="rounded-2xl border border-border/60 bg-muted/[0.25] p-5">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Password requirements
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-600" />
                      Minimum 8 characters
                    </div>

                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-600" />
                      Include uppercase & lowercase
                    </div>

                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-600" />
                      Include number & special character
                    </div>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="group flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
                >
                  {resetPasswordMutation.isPending
                    ? "Resetting password..."
                    : "Reset password"}

                  <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>

              {/* FOOTER */}
              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Back to sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
