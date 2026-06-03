"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

import { useSignin } from "@/hooks/useSignup";

export default function SigninPage() {
  const router = useRouter();

  const signinMutation = useSignin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================================
  // SIGN IN
  // ========================================

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await signinMutation.mutateAsync(formData);

      const token = response?.data?.accessToken;

      const user = response?.data?.user;

      // SAVE ACCESS TOKEN
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      // SAVE USER
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // SAVE EMAIL
      localStorage.setItem("signinEmail", formData.email);

      // REDIRECT
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password";

      setError(message);
    } finally {
      setLoading(false);
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
                  width={120}
                  height={22}
                  priority
                  className="opacity-90"
                />
              </div>
            </div>

            {/* HERO */}
            <div className="max-w-lg">
              <div className="mb-8 inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                Enterprise Recruitment Platform
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  Welcome back to your workspace.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  Continue managing candidates, assessments, interviews, and
                  enterprise hiring workflows from one unified platform.
                </p>
              </div>

              {/* STATS */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="text-2xl font-semibold text-foreground">
                    12K+
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Candidates
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="text-2xl font-semibold text-foreground">
                    98%
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">Accuracy</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="text-2xl font-semibold text-foreground">
                    350+
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Companies
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure infrastructure enabled
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
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Sign in
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  Access your dashboard and continue your workflow.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSignin} className="space-y-5">
                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email address</label>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-border/60 bg-background pl-11 pr-4 text-sm outline-none transition-all focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-border/60 bg-background pl-11 pr-4 text-sm outline-none transition-all focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in
                      <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
