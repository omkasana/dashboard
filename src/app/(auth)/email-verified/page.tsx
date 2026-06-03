"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface VerifyResponse {
  success: boolean;
  message: string;
}

export default function VerifyEmailPage() {
  const router = useRouter();

  // const searchParams = useSearchParams();

  // const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(true);

  const [message, setMessage] = useState(
    "Your email has been verified successfully. You can now securely access your Gleefix dashboard.",
  );

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
              <div
                className={`mb-8 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                  loading
                    ? "border-border/60 bg-background/80 text-muted-foreground"
                    : "border-emerald-500/10 bg-emerald-500/5 text-emerald-600"
                }`}
              >
                {loading
                  ? "Verification in progress"
                  : "Email verified successfully"}
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  {loading
                    ? "Verifying your email securely."
                    : "Your account is now verified."}
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  {loading
                    ? "Please wait while we securely verify your email address and activate your account."
                    : "Your email has been verified successfully. You can now securely access your dashboard and continue using the platform."}
                </p>
              </div>

              {/* FEATURES */}
              <div className="mt-10 grid gap-4">
                {[
                  "Enterprise-grade authentication",
                  "Secure verification infrastructure",
                  "Protected account access",
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
              <div
                className={`h-2 w-2 rounded-full ${
                  loading ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />

              {loading
                ? "Verification processing"
                : "Verification completed securely"}
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
              {/* STATUS ICON */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                  loading
                    ? "border-border/60 bg-muted/40"
                    : "border-emerald-500/10 bg-emerald-500/5"
                }`}
              >
                {loading ? (
                  <Loader2 className="h-7 w-7 animate-spin text-foreground" />
                ) : (
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                )}
              </div>

              {/* HEADER */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  {loading ? "Verifying email" : "Email verified"}
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  {loading
                    ? "Please wait while we securely verify your account."
                    : message}
                </p>
              </div>

              {/* STATUS CARD */}
              <div className="rounded-2xl border border-border/60 bg-muted/[0.25] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background">
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-foreground" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {loading
                        ? "Verification in progress"
                        : "Verification successful"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {loading
                        ? "We’re securely validating your account information."
                        : "Your account has been verified and is ready to use."}
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              {!loading && (
                <button
                  onClick={() => router.push("/sign-in")}
                  className="group flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90"
                >
                  Continue to sign in
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
