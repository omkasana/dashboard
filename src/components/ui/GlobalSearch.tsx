"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { navigationLinks } from "@/config/navigation.config";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  // Flatten navigation
  const allItems = useMemo(() => {
    const items: { name: string; href: string }[] = [];

    navigationLinks.forEach((item) => {
      if (item.href) {
        items.push({ name: item.name, href: item.href });
      }

      item.children?.forEach((child) => {
        if (child.href) {
          items.push({ name: child.name, href: child.href });
        }
      });
    });

    return items;
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    if (!query) return [];

    return allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, allItems]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div
        className="
          flex items-center gap-3
          w-full px-4 py-2
          rounded-xl
          border border-border
          bg-muted/40
          focus-within:bg-muted
          transition
        "
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search anything..."
          className="
    w-full
    bg-transparent
    outline-none
    text-sm
    text-foreground
    placeholder:text-muted-foreground
  "
        />
      </div>

      {/* Dropdown Results */}
      {focused && query && filtered.length > 0 && (
        <div
          className="
          absolute mt-2 w-full
          bg-background
          border border-border
          rounded-xl
          shadow-lg
          max-h-80 overflow-y-auto
          z-50
        "
        >
          {filtered.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(item.href);
                setQuery("");
              }}
              className="
                px-4 py-3
                hover:bg-muted
                cursor-pointer
                text-sm
              "
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
