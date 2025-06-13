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
import { useState } from "react";

const SidebarSessionsMenu = () => {
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
          Sessions
        </SidebarGroupLabel>
      </CollapsibleTrigger>

      <CollapsibleContent className="my-2 space-y-1">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconRenderer name="Plus" />
            New Session
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconRenderer name="LibraryBig" />
            View History
          </SidebarMenuButton>
        </SidebarMenuItem>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSessionsMenu;
