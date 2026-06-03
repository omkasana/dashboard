"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Check, ChevronDown, Search, ShieldCheck, X } from "lucide-react";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import Input from "@/components/ui/Input";

import { countryCodes } from "@/lib/countries";

import { AUTH_ROUTES } from "@/lib/route";
import { postRequest } from "@/lib/APIGeneric";

type SignupResponse = {
  success: boolean;
  message: string;
  link?: string;
};

export function SignupForm() {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const [countrySearch, setCountrySearch] = useState("");

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.name === "India")!,
  );

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // =========================
  // CLOSE DROPDOWN OUTSIDE
  // =========================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // VALIDATIONS
  // =========================

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const phoneRegex = /^[0-9]{7,15}$/;

  const passwordChecks = useMemo(
    () => ({
      minLength: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password),
    }),
    [formData.password],
  );

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const validateForm = () => {
    const newErrors = {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid phone number";
    }

    if (!isPasswordValid) {
      newErrors.password = "Password is too weak";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validateForm();

    if (!valid) return;

    try {
      setLoading(true);

      const response = await postRequest<SignupResponse>(AUTH_ROUTES.SIGNUP, {
        userName: formData.userName,
        email: formData.email,
        phone: `${selectedCountry.code}${formData.phone}`,
        password: formData.password,
      });

      if (response.success) {
        router.push(
          `/verify-email-pending?email=${encodeURIComponent(formData.email)}`,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER COUNTRIES
  // =========================

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.includes(countrySearch),
  );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSignup}
        className="
          mx-auto
          w-full
          max-w-[520px]
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          p-5
          shadow-2xl
          backdrop-blur-xl

          sm:p-8
        "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div
            className="
              mx-auto mb-4
              flex h-16 w-16
              items-center justify-center
              rounded-3xl
              bg-primary/10
            "
          >
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Securely create your account to continue
          </p>
        </div>

        <div className="space-y-5">
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <Input
              id="userName"
              placeholder="John Doe"
              value={formData.userName}
              onChange={handleChange}
              className="
                h-12 rounded-2xl border-border/60
                bg-background/50
                px-4
                transition-all
                focus-visible:ring-2
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={cn(
                `
                h-12 rounded-2xl border-border/60
                bg-background/50
                px-4
              `,
                errors.email && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <div className="flex gap-3">
              {/* COUNTRY */}
              <div ref={dropdownRef} className="relative w-[130px]">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="
                    flex h-12 w-full items-center justify-between
                    rounded-2xl border border-border/60
                    bg-background/50
                    px-3
                    text-sm
                  "
                >
                  <div className="flex items-center gap-2">
                    <span>{selectedCountry.flag}</span>

                    <span>{selectedCountry.code}</span>
                  </div>

                  <ChevronDown className="h-4 w-4 opacity-60" />
                </button>

                {/* DROPDOWN */}
                {showCountryDropdown && (
                  <div
                    className="
                      absolute left-0 top-14 z-50
                      w-[300px]
                      rounded-3xl
                      border border-border/60
                      bg-background
                      p-3
                      shadow-2xl
                    "
                  >
                    {/* SEARCH */}
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />

                      <input
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="
                          h-11 w-full rounded-2xl border
                          bg-background
                          pl-10 pr-4 text-sm outline-none
                        "
                      />
                    </div>

                    {/* LIST */}
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.name}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                          className="
                            flex w-full items-center justify-between
                            rounded-2xl px-3 py-3
                            text-sm transition-all
                            hover:bg-muted
                          "
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{country.flag}</span>

                            <div className="text-left">
                              <p className="font-medium">{country.name}</p>

                              <p className="text-xs text-muted-foreground">
                                {country.code}
                              </p>
                            </div>
                          </div>

                          {selectedCountry.name === country.name && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* PHONE INPUT */}
              <div className="flex-1">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={cn(
                    `
                    h-12 rounded-2xl border-border/60
                    bg-background/50
                    px-4
                  `,
                    errors.phone && "border-red-500 focus-visible:ring-red-500",
                  )}
                />
              </div>
            </div>

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <Input
              id="password"
              type="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={handleChange}
              className={cn(
                `
                h-12 rounded-2xl border-border/60
                bg-background/50
                px-4
              `,
                errors.password && "border-red-500 focus-visible:ring-red-500",
              )}
            />

            {/* PASSWORD CHECKLIST */}
            {formData.password.length > 0 && !isPasswordValid && (
              <div
                className="
                    mt-3 rounded-3xl border
                    border-border/60
                    bg-muted/30
                    p-4
                  "
              >
                <div className="space-y-2">
                  <PasswordRule
                    valid={passwordChecks.minLength}
                    text="At least 8 characters"
                  />

                  <PasswordRule
                    valid={passwordChecks.uppercase}
                    text="One uppercase letter"
                  />

                  <PasswordRule
                    valid={passwordChecks.lowercase}
                    text="One lowercase letter"
                  />

                  <PasswordRule
                    valid={passwordChecks.number}
                    text="One number"
                  />

                  <PasswordRule
                    valid={passwordChecks.special}
                    text="One special character"
                  />
                </div>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={cn(
                `
                h-12 rounded-2xl border-border/60
                bg-background/50
                px-4
              `,
                errors.confirmPassword &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <Button
            disabled={loading}
            className="
              h-12 w-full rounded-2xl
              text-sm font-semibold
              shadow-lg
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* LOGIN */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

function PasswordRule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm",
        valid ? "text-green-500" : "text-muted-foreground",
      )}
    >
      {valid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}

      <span>{text}</span>
    </div>
  );
}
