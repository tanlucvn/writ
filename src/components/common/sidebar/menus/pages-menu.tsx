import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SidebarPagesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      className="my-2 space-y-2"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="sticky top-0 z-[1] m-0 flex items-center gap-2 bg-sidebar">
        <CollapsibleTrigger asChild>
          <div className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-muted">
            <div className="flex items-center gap-2">
              <Button
                variant={isOpen ? "default" : "outline"}
                size="icon"
                className="cursor-pointer"
              >
                <GlobeIcon />
              </Button>

              <span className="select-none space-y-1">
                <h4 className="font-medium text-sm leading-none">Pages</h4>
                <p className="text-muted-foreground text-xs">
                  Explore app pages and links.
                </p>
              </span>
            </div>

            <IconRenderer
              name={isOpen ? "ChevronDown" : "ChevronRight"}
              className="size-4"
            />
          </div>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-1 px-2">
        <div className="flex flex-col gap-1">
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

          <Separator className="my-0.5" />

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
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarPagesMenu;
