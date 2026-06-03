"use client";

import Image from "next/image";

import { useSearchParams } from "next/navigation";

import { CheckCircle2, Mail } from "lucide-react";

export default function AccountCreatedPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

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
                Account Created Successfully
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
                  Verify your email to continue.
                </h1>

                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  Your account has been created successfully. Verify your email
                  address to activate your account and continue using the
                  platform securely.
                </p>
              </div>

              {/* FEATURES */}
              <div className="mt-10 grid gap-4">
                {[
                  "Secure account verification",
                  "Enterprise-grade authentication",
                  "Fast onboarding experience",
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
              Verification email sent successfully
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
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
                <Mail className="h-7 w-7 text-emerald-600" />
              </div>

              {/* HEADER */}
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Check your inbox
                </h1>

                <p className="text-sm leading-6 text-muted-foreground">
                  We've sent a verification link to your registered email
                  address.
                </p>
              </div>

              {/* EMAIL CARD */}
              <div className="rounded-2xl border border-border/60 bg-muted/[0.25] p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification email sent to
                </p>

                <h3 className="mt-3 break-all text-sm font-medium text-foreground">
                  {email || "your-email@example.com"}
                </h3>
              </div>

              {/* INFO */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    Click the verification link inside your email to activate
                    your account.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    If you don't receive the email, check your spam or
                    promotions folder.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    Verification links usually expire after 15-30 minutes.
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                  <p className="text-sm text-emerald-700 dark:text-emerald-500">
                    Account created successfully
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
