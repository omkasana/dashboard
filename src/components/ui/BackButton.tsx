"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    const segments = pathname.split("/").filter(Boolean);

    // remove add/create/new
    if (["add", "create", "new"].includes(segments.at(-1)!)) {
      segments.pop();
    }

    // handle update/:id
    if (segments.at(-2) === "update") {
      segments.pop(); // id
      segments.pop(); // update
    }

    const redirectTo = "/" + segments.join("/");

    router.push(redirectTo);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center gap-2 text-md font-medium text-muted-foreground hover:text-foreground transition"
    >
      <ArrowLeft size={24} />
      Back
    </button>
  );
}
