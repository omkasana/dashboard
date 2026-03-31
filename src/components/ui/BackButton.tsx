"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  variant?: "icon" | "default";
}

export default function BackButton({ variant = "default" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    const segments = pathname.split("/").filter(Boolean);

    // Case 1: /update/:id
    if (segments.includes("update")) {
      return router.push(`/dashboard/${segments[1]}`);
    }

    // Case 2: /add
    if (["add", "create", "new"].includes(segments.at(-1)!)) {
      return router.push(`/dashboard/${segments[1]}`);
    }

    // Case 3: /:id (view page)
    if (segments.length >= 3) {
      return router.push(`/dashboard/${segments[1]}`);
    }

    // fallback
    router.push("/dashboard");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
    >
      <ArrowLeft size={24} />
      {variant === "default" && <span>Back</span>}
    </button>
  );
}
