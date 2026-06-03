// src/app/dashboard/settings/appearance/page.tsx

"use client";

import { useState } from "react";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

import ColorField from "@/components/Form/fields/ColorField";

export default function AppearancePage() {
  const [primaryColor, setPrimaryColor] = useState("#dc2626");

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Appearance</h1>

          <p className="text-muted-foreground">
            Customize the visual experience of your workspace.
          </p>
        </div>

        {/* Theme */}
        <SettingsSection
          title="Theme"
          description="Configure colors and appearance"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Primary Color */}
            <div className="space-y-2">
              {/* <label className="text-sm font-medium">Primary Color</label> */}

              <ColorField
                field={{
                  name: "primaryColor",
                  label: "Primary Color",
                  type: "color",
                }}
                value={primaryColor}
                onChange={(value: string) => setPrimaryColor(value)}
              />
            </div>

            {/* Sidebar Style */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sidebar Style</label>

              <select
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4 outline-none
                "
              >
                <option>Vertical</option>
                <option>Horizontal</option>
                <option>Floating</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Typography */}
        <SettingsSection
          title="Typography"
          description="Manage font preferences"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Font Family */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Family</label>

              <select
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4 outline-none
                "
              >
                <option>Inter</option>
                <option>Poppins</option>
                <option>Roboto</option>
                <option>Manrope</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>

              <select
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4 outline-none
                "
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Layout */}
        <SettingsSection
          title="Layout"
          description="Control spacing and density"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Border Radius</label>

                <span className="text-xs text-muted-foreground">16px</span>
              </div>

              <input
                type="range"
                min={0}
                max={30}
                defaultValue={16}
                className="w-full"
              />
            </div>

            {/* Shadow */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Shadow Level</label>

              <select
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4 outline-none
                "
              >
                <option>None</option>
                <option>Soft</option>
                <option>Medium</option>
                <option>Strong</option>
              </select>
            </div>

            {/* Table Density */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Table Density</label>

              <select
                className="
                  h-11 w-full rounded-xl border
                  bg-background px-4 outline-none
                "
              >
                <option>Compact</option>
                <option>Default</option>
                <option>Comfortable</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex justify-end">
          <button
            className="
              rounded-2xl bg-primary px-6 py-3
              text-sm font-medium text-primary-foreground
              shadow-lg transition-all hover:opacity-90
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
