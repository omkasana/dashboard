"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Menu, Bell, User, Settings, CreditCard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import GlobalSearch from "./global-search";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationLinks } from "@/config/navigation.config";
import { profileData } from "@/config/profile.config";
import { notifications } from "@/config/notifications.config";
import { Moon, Sun } from "lucide-react";
import { uiConfig, ThemeMode } from "@/config/ui.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const pathname = usePathname();

  /* 🔹 Breadcrumb Logic */
  let currentPage = "Dashboard";
  let parentName: string | null = null;

  for (const item of navigationLinks) {
    if (item.href === pathname) {
      currentPage = item.name;
      break;
    }

    if (item.children) {
      const child = item.children.find((c) => c.href === pathname);
      if (child) {
        currentPage = child.name;
        parentName = item.name;
        break;
      }
    }
  }
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored =
      (localStorage.getItem("crm-theme") as ThemeMode) || uiConfig.themeMode;

    setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";

    const themeConfig = newTheme === "dark" ? uiConfig.dark : uiConfig.light;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(newTheme);

    Object.entries({
      "--primary": themeConfig.primary,
      "--primary-foreground": themeConfig.primaryForeground,
      "--background": themeConfig.background,
      "--foreground": themeConfig.foreground,
      "--secondary": themeConfig.secondary,
      "--secondary-foreground": themeConfig.secondaryForeground,
      "--border": themeConfig.border,
      "--muted": themeConfig.muted,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    localStorage.setItem("crm-theme", newTheme);
    setTheme(newTheme); // 👈 THIS is what re-renders UI
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6">
      {/* ========================= */}
      {/* 1️⃣ LEFT SECTION */}
      {/* ========================= */}
      <div className="flex items-center gap-6 shrink-0 min-w-0">
        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md hover:bg-muted transition">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/dashboard" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={32}
            priority
          />
        </Link>

        {/* Breadcrumb */}
        <div className="hidden md:flex flex-col min-w-0">
          <span className="text-lg font-semibold truncate">{currentPage}</span>

          <div className="flex items-center gap-3 text-sm text-muted-foreground truncate">
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

      {/* ========================= */}
      {/* 2️⃣ CENTER SECTION */}
      {/* ========================= */}
      <div className="flex-1 flex justify-center">
        <div className="w-[500px] max-w-full">
          <GlobalSearch />
        </div>
      </div>

      {/* ========================= */}
      {/* 3️⃣ RIGHT SECTION */}
      {/* ========================= */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted transition">
              <Bell className="h-5 w-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 rounded-2xl shadow-xl p-0"
          >
            <div className="p-4 border-b border-border font-semibold">
              Notifications
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-border hover:bg-muted/40 transition cursor-pointer"
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>

                  <span className="text-[11px] text-muted-foreground mt-2 block">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 text-center text-sm hover:bg-muted transition cursor-pointer">
              View all
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted transition">
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
                <span className="text-sm font-medium leading-none">
                  {profileData.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {profileData.role}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl shadow-xl p-2"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback>
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {profileData.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {profileData.email}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={toggleTheme}
              className="gap-2 cursor-pointer"
            >
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

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500 cursor-pointer">
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
