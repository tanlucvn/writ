import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/theme";
import { Analytics } from "@vercel/analytics/react";

import AppLayout from "@/components/layout/app-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OpenGraph } from "@/lib/og";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spacegrotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
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
          `${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable}`,
          "font-sans antialiased",
        )}
      >
        <ThemeProvider>
          <TooltipProvider>
            <AppLayout>{children}</AppLayout>
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
