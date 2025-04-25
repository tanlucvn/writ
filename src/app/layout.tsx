import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import AppLayout from "@/components/layout/app-layout";
import { ThemeProvider } from "@/components/theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OpenGraph } from "@/lib/og";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/writer.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
          `${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`,
          "font-sans antialiased",
          "h-screen w-screen p-0",
        )}
      >
        <ThemeProvider>
          <TooltipProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
