"use client";

import Link from "next/link";

import { Button } from "@/components/UI/button";

export default function EmailVerifiedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
            ✅
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Email Verified</h1>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Your email has been verified successfully.
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            You can now login using your registered email and password.
          </p>

          <div className="mt-8 w-full">
            <Link href="/login">
              <Button className="h-11 w-full rounded-xl">
                Login to your account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
