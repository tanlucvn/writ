import { IconRenderer } from "@/components/icon-renderer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const SidebarPagesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarGroupLabel
          className={cn(
            "h-6 w-fit cursor-pointer select-none font-medium hover:bg-sidebar-accent",
            isOpen && "!bg-sidebar-primary !text-sidebar-primary-foreground",
          )}
        >
          Pages
        </SidebarGroupLabel>
      </CollapsibleTrigger>

      <CollapsibleContent className="my-2 space-y-1">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/sign-in" className="flex w-full items-center gap-2">
              <IconRenderer name="User" />
              Sign In
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/about" className="flex w-full items-center gap-2">
              <IconRenderer name="Info" />
              About
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/privacy" className="flex w-full items-center gap-2">
              <IconRenderer name="Lock" />
              Privacy
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              href="https://github.com/tanlucvn/miniwrit"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-2"
            >
              <IconRenderer name="Github" />
              GitHub
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarPagesMenu;
