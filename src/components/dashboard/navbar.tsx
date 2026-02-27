"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationLinks } from "@/config/navigation.config";
import Image from "next/image";
export default function Navbar() {
  const pathname = usePathname();

  let currentPage = "Dashboard";
  let parentName: string | null = null;

  for (const item of navigationLinks) {
    // 🔹 Top-level match
    if (item.href === pathname) {
      currentPage = item.name;
      break;
    }

    // 🔹 Check children
    if (item.children) {
      const child = item.children.find((child) => child.href === pathname);

      if (child) {
        currentPage = child.name;
        parentName = item.name;
        break;
      }
    }
  }

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={32}
            priority
            className="object-contain"
          />
        </Link>

        {/* Title + Breadcrumb */}
        <div className="flex flex-col ml-4">
          <span className="text-xl font-semibold leading-tight">
            {currentPage}
          </span>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/dashboard"
              className="hover:text-foreground transition"
            >
              Dashboard
            </Link>

            {parentName && (
              <>
                <span className="opacity-50">›</span>
                <span>{parentName}</span>
              </>
            )}

            {pathname !== "/dashboard" && (
              <>
                <span className="opacity-50">›</span>
                <span className="text-foreground font-medium">
                  {currentPage}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div>Profile</div>
    </header>
  );
}
