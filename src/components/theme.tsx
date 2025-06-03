"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

import { Monitor, Moon, Sun } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs value={theme} onValueChange={setTheme} className="w-fit">
      <TabsList className="h-fit rounded-md bg-muted">
        <TabsTrigger value="light" className="h-6 w-6 p-0">
          <Sun className="size-3.5" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="h-6 w-6 p-0">
          <Moon className="size-3.5" />
        </TabsTrigger>
        <TabsTrigger value="system" className="h-6 w-6 p-0">
          <Monitor className="size-3.5" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      enableSystem={true}
      attribute="class"
      storageKey="theme"
      defaultTheme="system"
    >
      {children}
    </NextThemeProvider>
  );
};
