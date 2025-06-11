import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";

const SidebarSessionsMenu = () => {
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
                <IconRenderer name="Timer" />
              </Button>

              <span className="select-none space-y-1">
                <h4 className="font-medium text-sm leading-none">Sessions</h4>
                <p className="text-muted-foreground text-xs">
                  Manage your focused writing time.
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSessionsMenu;
