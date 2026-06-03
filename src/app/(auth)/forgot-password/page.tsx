"use client";

import { useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import { FiMail, FiShield, FiArrowRight } from "react-icons/fi";

import { useForgotPassword } from "@/hooks/useSignup";

export default function ForgotPasswordPage() {
  const [value, setValue] = useState("");

  const [error, setError] = useState("");

  const forgotPasswordMutation = useForgotPassword();

  // ========================================
  // HANDLE FORGOT PASSWORD
  // ========================================

  const handleForgotPassword = async () => {
    try {
      if (!value) {
        setError("Please enter your email");

        return;
      }

      setError("");

      const response = await forgotPasswordMutation.mutateAsync({
        email: value,
      });

      toast.success(
        response.message || "Password reset link sent successfully",
      );

      // TEST ONLY
      console.log(response.link);
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
                Secure Account Recovery
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  Reset your password securely.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  Recover access to your account through secure email
                  verification and protected password reset workflows.
                </p>
              </div>

              {/* INFO CARDS */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="text-2xl font-semibold text-foreground">
                    256-bit
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Encryption
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="text-2xl font-semibold text-foreground">
                    15 Min
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Secure reset link
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Password recovery protection enabled
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
                  <FiShield className="text-xl text-foreground" />
                </div>

                <div className="pt-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                    Forgot password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Enter your email address and we’ll send you a secure
                    password reset link.
                  </p>
                </div>
              </div>

              {/* FORM */}
              <div className="space-y-5">
                {/* INPUT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email address</label>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="h-11 w-full rounded-lg border border-border/60 bg-background pl-11 pr-4 text-sm outline-none transition-all focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleForgotPassword}
                  disabled={forgotPasswordMutation.isPending}
                  className="group flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
                >
                  {forgotPasswordMutation.isPending
                    ? "Sending reset link..."
                    : "Send reset link"}

                  <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                {/* SUCCESS */}
                {forgotPasswordMutation.isSuccess && (
                  <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-600">
                    Password reset link has been sent successfully.
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
