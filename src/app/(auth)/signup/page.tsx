import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/Auth/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-8 flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span>Acme Inc.</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src="/images/home/placeholder.svg"
          alt="Signup preview"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
