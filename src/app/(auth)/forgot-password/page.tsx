"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
} from "lucide-react";

type Step =
  | "forgot-password"
  | "check-email"
  | "reset-password"
  | "password-reset";

export default function PasswordResetPage() {
  const [step, setStep] = useState<Step>("forgot-password");

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid =
    hasMinLength &&
    hasSpecialCharacter &&
    password === confirmPassword &&
    password.length > 0;

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f8] px-4">
      <div className="w-full max-w-105">
        {/* FORGOT PASSWORD */}
        {step === "forgot-password" && (
          <div className="flex flex-col items-center text-center">
            <AuthIcon icon={<KeyRound className="h-6 w-6" />} />

            <h1 className="mt-8 text-[42px] font-semibold tracking-[-0.03em] text-neutral-900">
              Forgot password?
            </h1>

            <p className="mt-3 text-[18px] text-neutral-500">
              No worries, we&apos;ll send you reset instructions.
            </p>

            <div className="mt-10 w-full text-left">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[16px] outline-none transition focus:border-violet-500"
              />
            </div>

            <button
              onClick={() => setStep("check-email")}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-violet-600 text-[17px] font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              Reset password
            </button>

            <BackToLogin />
          </div>
        )}

        {/* OTP VERIFICATION */}
        {step === "check-email" && (
          <div className="flex flex-col items-center text-center">
            <AuthIcon icon={<Mail className="h-6 w-6" />} />

            <h1 className="mt-8 text-[42px] font-semibold tracking-[-0.03em] text-neutral-900">
              Verify OTP
            </h1>

            <p className="mt-3 max-w-90 text-[18px] leading-8 text-neutral-500">
              We sent a 6-digit verification code to
              <span className="font-medium text-neutral-800"> {email}</span>
            </p>

            {/* OTP INPUTS */}
            <div className="mt-10 flex items-center justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    const newOtp = [...otp];
                    newOtp[index] = value;
                    setOtp(newOtp);

                    if (value && index < 5) {
                      const nextInput = document.getElementById(
                        `otp-${index + 1}`,
                      ) as HTMLInputElement;

                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      const prevInput = document.getElementById(
                        `otp-${index - 1}`,
                      ) as HTMLInputElement;

                      prevInput?.focus();
                    }
                  }}
                  id={`otp-${index}`}
                  className="h-14 w-14 rounded-xl border border-neutral-300 bg-white text-center text-xl font-semibold outline-none transition focus:border-violet-500"
                />
              ))}
            </div>

            <button
              disabled={!isOtpComplete}
              onClick={() => setStep("reset-password")}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-violet-600 text-[17px] font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify OTP
            </button>

            <p className="mt-8 text-[16px] text-neutral-500">
              Didn&apos;t receive the code?{" "}
              <button className="font-semibold text-violet-600 hover:text-violet-700">
                Resend OTP
              </button>
            </p>

            <BackToLogin />
          </div>
        )}

        {/* RESET PASSWORD */}
        {step === "reset-password" && (
          <div className="flex flex-col items-center text-center">
            <AuthIcon icon={<Lock className="h-6 w-6" />} />

            <h1 className="mt-8 text-[42px] font-semibold tracking-[-0.03em] text-neutral-900">
              Set new password
            </h1>

            <p className="mt-3 max-w-90 text-[18px] leading-8 text-neutral-500">
              Your new password must be different to previously used passwords.
            </p>

            <div className="mt-10 w-full space-y-6 text-left">
              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 pr-12 text-[16px] outline-none transition focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 pr-12 text-[16px] outline-none transition focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* RULES */}
              <div className="space-y-3">
                <PasswordRule
                  valid={hasMinLength}
                  label="Must be at least 8 characters"
                />

                <PasswordRule
                  valid={hasSpecialCharacter}
                  label="Must contain one special character"
                />
              </div>

              <button
                onClick={() => {
                  if (isPasswordValid) {
                    setStep("password-reset");
                  }
                }}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-violet-600 text-[17px] font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isPasswordValid}
              >
                Reset password
              </button>
            </div>

            <BackToLogin />
          </div>
        )}

        {/* SUCCESS */}
        {step === "password-reset" && (
          <div className="flex flex-col items-center text-center">
            <AuthIcon icon={<CheckCircle2 className="h-6 w-6" />} />

            <h1 className="mt-8 text-[42px] font-semibold tracking-[-0.03em] text-neutral-900">
              Password reset
            </h1>

            <p className="mt-3 max-w-90 text-[18px] leading-8 text-neutral-500">
              Your password has been successfully reset. Click below to log in
              magically.
            </p>

            <button className="mt-10 flex h-14 w-full items-center justify-center rounded-xl bg-violet-600 text-[17px] font-semibold text-white shadow-sm transition hover:bg-violet-700">
              Continue
            </button>

            <BackToLogin />
          </div>
        )}
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   ICON                                     */
/* -------------------------------------------------------------------------- */

function AuthIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-300 bg-white text-neutral-700 shadow-sm">
      {icon}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              PASSWORD RULE                                 */
/* -------------------------------------------------------------------------- */

function PasswordRule({ valid, label }: { valid: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-white transition ${
          valid
            ? "border-green-500 bg-green-500"
            : "border-neutral-300 bg-neutral-200"
        }`}
      >
        <CheckCircle2 className="h-4 w-4" />
      </div>

      <span
        className={`text-[15px] ${
          valid ? "text-neutral-800" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              BACK TO LOGIN                                 */
/* -------------------------------------------------------------------------- */

function BackToLogin() {
  return (
    <Link
      href="/login"
      className="mt-10 inline-flex items-center gap-2 text-[16px] font-medium text-neutral-500 transition hover:text-neutral-800"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to log in
    </Link>
  );
}
