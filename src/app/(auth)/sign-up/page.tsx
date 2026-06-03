"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight } from "react-icons/fi";

import { useSignup } from "@/hooks/useSignup";

export default function SignupPage() {
  const router = useRouter();

  const signupMutation = useSignup();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ========================================
  // VALIDATION
  // ========================================

  const validateFields = () => {
    let isValid = true;

    const errors = {
      userName: "",
      email: "",
      phone: "",
      password: "",
    };

    const trimmedName = formData.userName.trim();

    if (!trimmedName) {
      errors.userName = "Full name is required";

      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";

      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";

      isValid = false;
    }

    const phoneRegex = /^[6-9][0-9]{9}$/;

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";

      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Enter valid 10-digit number";

      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";

      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";

      isValid = false;
    }

    setValidationErrors(errors);

    return isValid;
  };

  // ========================================
  // HANDLE SIGNUP
  // ========================================

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      await signupMutation.mutateAsync(formData);

      localStorage.setItem("signupEmail", formData.email);

      router.push(
        `/account-created?email=${encodeURIComponent(formData.email)}`,
      );
    } catch (error) {}
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
            <div className="flex items-center gap-3">
              <div className="">
                <Image
                  src="/images/logo.svg"
                  alt="Gleefix"
                  width={120}
                  height={60}
                  priority
                  className="opacity-90"
                />
              </div>
            </div>

            {/* HERO */}
            <div className="max-w-lg">
              <div className="mb-8 inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                AI Powered Recruitment
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  Hire smarter with AI-driven workflows.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  Streamline assessments, candidate evaluation, proctoring, and
                  enterprise hiring workflows through one unified platform.
                </p>
              </div>

              {/* FEATURES */}
              <div className="mt-10 grid gap-4">
                {[
                  "AI-powered candidate assessments",
                  "Enterprise-grade proctoring system",
                  "Fast & secure recruitment workflows",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground/70" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Trusted by hiring teams worldwide
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[420px]">
            {/* MOBILE LOGO */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm">
                <Image
                  src="/images/logo.svg"
                  alt="Gleefix"
                  width={22}
                  height={22}
                  priority
                  className="opacity-90"
                />
              </div>

              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold tracking-tight">
                  Gleefix
                </h2>

                <p className="text-xs text-muted-foreground">
                  AI Hiring Platform
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* HEADER */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Create account
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  Start your AI hiring journey with Gleefix.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSignup} className="space-y-5" noValidate>
                {/* NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full name</label>

                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="text"
                      name="userName"
                      placeholder="John Doe"
                      value={formData.userName}
                      onChange={handleChange}
                      className={`h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:ring-1 ${
                        validationErrors.userName
                          ? "border-red-500/60 focus:ring-red-500/20"
                          : "border-border/60 focus:ring-ring/30"
                      }`}
                    />
                  </div>

                  {validationErrors.userName && (
                    <p className="text-xs text-red-500">
                      {validationErrors.userName}
                    </p>
                  )}
                </div>

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
                      className={`h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:ring-1 ${
                        validationErrors.email
                          ? "border-red-500/60 focus:ring-red-500/20"
                          : "border-border/60 focus:ring-ring/30"
                      }`}
                    />
                  </div>

                  {validationErrors.email && (
                    <p className="text-xs text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone number</label>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:ring-1 ${
                        validationErrors.phone
                          ? "border-red-500/60 focus:ring-red-500/20"
                          : "border-border/60 focus:ring-ring/30"
                      }`}
                    />
                  </div>

                  {validationErrors.phone && (
                    <p className="text-xs text-red-500">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="password"
                      name="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:ring-1 ${
                        validationErrors.password
                          ? "border-red-500/60 focus:ring-red-500/20"
                          : "border-border/60 focus:ring-ring/30"
                      }`}
                    />
                  </div>

                  {validationErrors.password && (
                    <p className="text-xs text-red-500">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="group flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {signupMutation.isPending ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create account
                      <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
