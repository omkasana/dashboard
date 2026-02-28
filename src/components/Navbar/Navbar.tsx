"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../UI/Sheet";
import Sidebar from "../UI/Sidebar";
import { Breadcrumb } from "./Breadcrumb";
import GlobalSearch from "@/components/GlobalSearch";
import { NotificationsDropdown } from "./NotificationDropDown";
import { ProfileDropdown } from "./ProfileDropDown";

export default function Navbar() {
  return (
    <header className="h-16 border-b bg-background flex items-center px-6">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <Link href="/dashboard">
          <Image src="/images/logo.svg" alt="Logo" width={120} height={32} />
        </Link>

        <Breadcrumb />
      </div>

      {/* CENTER */}
      <div className="flex-1 flex justify-center">
        <div className="w-[500px] max-w-full">
          <GlobalSearch />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
}
