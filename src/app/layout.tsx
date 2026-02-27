import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { uiConfig } from "@/config/ui.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = uiConfig.themeMode === "dark" ? uiConfig.dark : uiConfig.light;

  return (
    <html
      lang="en"
      className={uiConfig.themeMode === "dark" ? "dark" : ""}
      style={
        {
          "--primary": theme.primary,
          "--primary-foreground": theme.primaryForeground,

          "--secondary": theme.secondary,
          "--secondary-foreground": theme.secondaryForeground,

          "--background": theme.background,
          "--foreground": theme.foreground,

          "--muted": theme.muted,
          "--border": theme.border,
        } as React.CSSProperties
      }
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
