"use client";

import { AppLayout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster position="bottom-center" />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
