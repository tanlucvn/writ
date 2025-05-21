import { ClientProviders } from "@/components/client-providers";
import { OpenGraph } from "@/lib/og";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/writer.css";
import { Settings } from "luxon";
import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

Settings.defaultLocale = "en";

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
          "flex h-screen max-h-screen w-full items-center justify-center overflow-hidden p-0",
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
