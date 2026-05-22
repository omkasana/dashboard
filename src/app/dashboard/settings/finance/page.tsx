// src/app/dashboard/settings/finance/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function FinancePage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Finance Settings</h1>

          <p className="text-muted-foreground">
            Manage taxes, currencies, invoices, and financial rules.
          </p>
        </div>

        <SettingsSection
          title="Currency"
          description="Base currency configuration"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <select className="h-11 rounded-xl border px-4">
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>

            <input
              placeholder="Exchange Rate API"
              className="h-11 rounded-xl border px-4"
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Tax Rules"
          description="Configure GST/VAT rules"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="GST Number"
              className="h-11 rounded-xl border px-4"
            />

            <select className="h-11 rounded-xl border px-4">
              <option>Inclusive</option>
              <option>Exclusive</option>
            </select>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Invoices"
          description="Invoice numbering and rules"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="Invoice Prefix"
              className="h-11 rounded-xl border px-4"
            />

            <input
              placeholder="Invoice Number Format"
              className="h-11 rounded-xl border px-4"
            />

            <textarea
              placeholder="Credit Note Rules"
              className="min-h-30 rounded-xl border p-4 md:col-span-2"
            />
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <button className="rounded-2xl bg-primary px-6 py-3 text-primary-foreground">
            Save Changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
