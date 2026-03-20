"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "./Breadcrumb";
import GlobalSearch from "@/components/UI/GlobalSearch";
import { NotificationsDropdown } from "./NotificationDropDown";
import { ProfileDropdown } from "./ProfileDropDown";
import { Sheet, SheetContent, SheetTrigger } from "../UI/sheet";
import { uiConfig } from "@/config/ui.config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isRight = uiConfig.sidebarPosition === "right";

  // ✅ Close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="relative h-16 border-b bg-background flex items-center px-6">
      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-6 z-10">
        {/* ✅ Hamburger — only show on left when sidebar is left */}
        {!isRight && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-muted">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}

        <Link href="/dashboard">
          <Image src="/images/logo.svg" alt="Logo" width={120} height={32} />
        </Link>

        <Breadcrumb />
      </div>

      {/* ================= CENTER ================= */}
      <div className="absolute left-1/2 -translate-x-1/2 w-130 max-w-[60%] hidden md:block">
        <GlobalSearch />
      </div>

      {/* ================= RIGHT ================= */}
      <div className="ml-auto flex items-center gap-4 z-10">
        <NotificationsDropdown />
        <ProfileDropdown />

        {/* ✅ Hamburger on right when sidebar position is right */}
        {isRight && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-muted">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
