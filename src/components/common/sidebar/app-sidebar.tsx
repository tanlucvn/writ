"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SignOutButton, useUser } from "@clerk/nextjs";

import { ChevronDownIcon, GithubIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme";
import type React from "react";
import {
  SidebarNotesMenu,
  SidebarPagesMenu,
  SidebarSessionsMenu,
  SidebarToolsMenu,
} from "./menus";
import { SidebarBanner } from "./sidebar-banner";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar variant="floating" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link
                href={"/"}
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Logo className="size-4" />
              </Link>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Miniwrit</span>
                <span className="text-muted-foreground text-xs">
                  Version 1.0.0
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="relative">
            <SidebarToolsMenu />

            <Separator className="my-0.5" />

            <SidebarNotesMenu />
            <SidebarSessionsMenu />
            <SidebarPagesMenu />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer: UI user, sign out, theme switcher, ... */}
      {user === null ? (
        <SidebarFooter>
          <div className="p-1">
            <SidebarBanner />
          </div>
        </SidebarFooter>
      ) : (
        <SidebarFooter>
          <div className="space-y-2 p-1">
            <Card className="py-0 shadow-none hover:cursor-pointer">
              <Collapsible className="data-[state=open]:[&_svg.opacity-50]:rotate-180 [&_svg]:transition-all [&_svg]:duration-300">
                <CollapsibleTrigger asChild>
                  <CardHeader className="gap-0 p-4">
                    <CardTitle className="flex items-center justify-between gap-4 font-medium text-sm">
                      <div className="grid flex-1 grid-cols-1">
                        <span className="truncate" suppressHydrationWarning>
                          {user?.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                      <ChevronDownIcon className="!size-3.5 opacity-50" />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-1 gap-2 p-0.5 pt-0">
                    <SignOutButton>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 rounded-xl"
                      >
                        <LogOutIcon className="!size-4 !text-red-400" />
                        Logout
                      </Button>
                    </SignOutButton>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
            <div className="flex items-center justify-between gap-4">
              <ThemeSwitcher />

              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-xs hover:text-primary"
              >
                <GithubIcon className="size-4" />
              </Link>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
