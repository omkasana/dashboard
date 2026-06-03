"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, PanelLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "./Breadcrumb";
import GlobalSearch from "@/components/UI/GlobalSearch";
import { NotificationsDropdown } from "./NotificationDropDown";
import { ProfileDropdown } from "./ProfileDropDown";
import { Sheet, SheetContent, SheetTrigger } from "../UI/sheet";
import { uiConfig } from "@/config/ui.config";
import { cn } from "@/lib/utils";

interface NavbarProps {
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export default function Navbar({
  sidebarCollapsed,
  onSidebarToggle,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const position = uiConfig.sidebarPosition;
  const isLeft = position === "left";
  const isRight = position === "right";

  const showNavbarToggle =
    uiConfig.sidebar.collapsible &&
    uiConfig.sidebar.togglePosition === "navbar" &&
    (isLeft || isRight);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* 🔹 DESKTOP (lg+) */}
      <div className="hidden lg:flex h-16 items-center px-6 gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-2 shrink-0">
          {showNavbarToggle && isLeft && (
            <button
              onClick={onSidebarToggle}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted"
            >
              <PanelLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  sidebarCollapsed && "rotate-180",
                )}
              />
            </button>
          )}

          <Link href="/dashboard">
            <Image src="/images/logo.svg" alt="Logo" width={110} height={28} />
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex items-center flex-1 min-w-0 gap-6">
          <div className="flex-1 min-w-0">
            <Breadcrumb />
          </div>

          <div className="w-full max-w-sm">
            <GlobalSearch />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 ml-auto">
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>

      {/* 🔹 TABLET (md only) */}
      <div className="hidden md:flex lg:hidden flex-col">
        {/* Row 1 */}
        <div className="h-16 flex items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            {showNavbarToggle && isLeft && (
              <button
                onClick={onSidebarToggle}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}

            <Link href="/dashboard">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={100}
                height={26}
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1">
            <GlobalSearch />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <ProfileDropdown />
          </div>
        </div>

        {/* Row 2 (breadcrumb full width) */}
        <div className="px-4 pb-2">
          <Breadcrumb />
        </div>
      </div>

      {/* 🔹 MOBILE */}
      <div className="flex md:hidden h-16 items-center px-4 gap-3">
        {isLeft && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-muted">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar forceRender />
            </SheetContent>
          </Sheet>
        )}

        <Link href="/dashboard">
          <Image src="/images/logo.svg" alt="Logo" width={100} height={26} />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-muted">
                <Search className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4">
              <GlobalSearch />
            </SheetContent>
          </Sheet>

          <NotificationsDropdown />
        </div>
      </div>
    </header>
  );
}
