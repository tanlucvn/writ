import { ClientProviders } from "@/components/layout/client-providers";
import { OpenGraph } from "@/lib/og";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/themes.css";
import { Settings } from "luxon";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

Settings.defaultLocale = "en";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

export const metadata: Metadata = {
  ...OpenGraph,
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geist.variable} ${geistMono.variable}`,
          "font-sans antialiased",
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
