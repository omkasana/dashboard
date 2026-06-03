"use client";

import Link from "next/link";
import Image from "next/image";

import { AlertTriangle, RefreshCcw, ShieldX } from "lucide-react";

export default function EmailVerificationFailedPage() {
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
              <div className="mb-8 inline-flex items-center rounded-full border border-red-500/10 bg-red-500/5 px-3 py-1 text-xs font-medium text-red-500">
                Verification Failed
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  This verification link is no longer valid.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  The verification link may have expired, already been used, or
                  is invalid. Request a new verification email to continue
                  securely.
                </p>
              </div>

              {/* FEATURES */}
              <div className="mt-10 grid gap-4">
                {[
                  "Expired links automatically become inactive",
                  "Verification links can only be used once",
                  "Secure authentication protects your account",
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              Verification requires attention
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
              {/* ICON */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5">
                <ShieldX className="h-7 w-7 text-red-500" />
              </div>

              {/* HEADER */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Verification failed
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  The email verification link is invalid or has expired.
                </p>
              </div>

              {/* INFO CARD */}
              <div className="rounded-2xl border border-border/60 bg-muted/[0.25] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Verification unsuccessful
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Request a fresh verification email and continue the signup
                      process securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="space-y-3">
                <Link
                  href="/account-created"
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Resend verification email
                </Link>

                <Link
                  href="/sign-in"
                  className="flex h-11 w-full items-center justify-center rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground transition-all hover:bg-muted/40"
                >
                  Back to sign in
                </Link>
              </div>

              {/* FOOTER */}
              <p className="text-center text-sm leading-6 text-muted-foreground">
                Still facing issues? Contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
