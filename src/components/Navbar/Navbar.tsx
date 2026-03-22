"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
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

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="h-16 border-b bg-background flex items-center px-4 md:px-6 gap-4">
      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3 shrink-0">
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
          <Image src="/images/logo.svg" alt="Logo" width={110} height={28} />
        </Link>
      </div>

      {/* ================= BREADCRUMB ================= */}
      <div className="hidden md:flex items-center min-w-0 flex-1 overflow-hidden">
        <Breadcrumb />
      </div>

      {/* ================= SEARCH ================= */}
      <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg">
        <GlobalSearch />
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-3 ml-auto shrink-0">
        {/* 🔍 Mobile Search */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md hover:bg-muted">
              <Search className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="p-4">
            <GlobalSearch />
          </SheetContent>
        </Sheet>

        <NotificationsDropdown />
        <ProfileDropdown />

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
