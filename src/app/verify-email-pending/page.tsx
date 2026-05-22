"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/UI/button";

export default function VerifyEmailPendingPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-5xl">📩</div>

          <h1 className="text-2xl font-bold">Verify your email</h1>

          <p className="mt-3 text-sm text-muted-foreground">
            We have sent a verification link to:
          </p>

          <p className="mt-1 font-medium">{email}</p>

          <p className="mt-6 text-sm text-muted-foreground">
            Please open your inbox and click the verification link to activate
            your account.
          </p>
        </div>
      </div>
    </div>
  );
}
