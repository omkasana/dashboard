"use client";

import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Moon,
  Sun,
  Palette,
} from "lucide-react";

import { profileData } from "@/config/profile.config";
import { palettes, PaletteName } from "@/config/palettes";
import { uiConfig } from "@/config/ui.config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/UI/DropdownMenu";

import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import { useState } from "react";

export function ProfileDropdown() {
  const { theme, toggleTheme, palette, changePalette } = useTheme();

  const paletteNames = Object.keys(palettes) as PaletteName[];

  const [showPalette, setShowPalette] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    uiConfig.theme.paletteSelector.defaultView,
  );

  if (!uiConfig.theme.paletteSelector.enabled) {
    return null;
  }

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

      <DropdownMenuContent align="end" className="w-72">
        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        {/* Theme Toggle */}
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

        <DropdownMenuSeparator />

        {/* 🎨 Palette Header (toggle) */}
        <div
          onClick={() => setShowPalette((p) => !p)}
          className="px-2 py-1.5 text-xs text-muted-foreground flex items-center gap-2 cursor-pointer hover:bg-muted rounded"
        >
          <Palette className="h-3.5 w-3.5" />
          Theme Colors
        </div>

        {/* 🎯 Palette Content */}
        {showPalette && (
          <div className="mt-2">
            {/* View toggle */}
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] text-muted-foreground">
                Choose Palette
              </span>

              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-2 py-1 text-[11px] ${
                    viewMode === "grid" ? "bg-muted" : ""
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-2 py-1 text-[11px] ${
                    viewMode === "list" ? "bg-muted" : ""
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* GRID VIEW */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 gap-2 px-2 pb-2 max-h-60 overflow-y-auto">
                {paletteNames.map((p) => {
                  const colors = palettes[p].light;

                  return (
                    <button
                      key={p}
                      onClick={() => changePalette(p)}
                      className={`
                        p-2 rounded-lg border text-left
                        transition-all hover:scale-[1.02]
                        ${
                          palette === p
                            ? "border-primary ring-1 ring-primary"
                            : "border-border"
                        }
                      `}
                    >
                      <div className="flex gap-1 mb-1">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: colors.primary }}
                        />
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: colors.secondary }}
                        />
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: colors.background }}
                        />
                      </div>

                      <span className="text-[11px] truncate block">{p}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* LIST VIEW */}
            {viewMode === "list" && (
              <div className="max-h-60 overflow-y-auto px-2 pb-2">
                {paletteNames.map((p) => {
                  const colors = palettes[p].light;

                  return (
                    <div
                      key={p}
                      onClick={() => changePalette(p)}
                      className={`
                        flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer
                        hover:bg-muted
                        ${palette === p ? "bg-muted font-medium" : ""}
                      `}
                    >
                      <span className="text-sm truncate">{p}</span>

                      <div className="flex gap-1 shrink-0">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ background: colors.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ background: colors.secondary }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <DropdownMenuSeparator />

        {/* Other Items */}
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
