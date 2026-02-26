"use client";

import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
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

        <span className="font-semibold">Dashboard</span>
      </div>

      <div>Profile</div>
    </header>
  );
}
