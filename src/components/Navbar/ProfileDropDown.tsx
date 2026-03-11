"use client";

import { User, Settings, CreditCard, LogOut, Moon, Sun } from "lucide-react";
import { profileData } from "@/config/profile.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

import Link from "next/link";

import { useTheme } from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProfileDropdown() {
  const { theme, toggleTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profileData.avatar} />
            <AvatarFallback>
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium">{profileData.name}</span>
            <span className="text-xs text-muted-foreground">
              {profileData.role}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CreditCard className="h-4 w-4" />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-500">
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
