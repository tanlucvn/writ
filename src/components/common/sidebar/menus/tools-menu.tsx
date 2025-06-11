import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useDialogStore } from "@/store/use-dialog-store";
import { useState } from "react";

const SidebarToolsMenu = () => {
  const { setSettingsOpen, setStatisticsOpen, setIsShortcutsModalOpen } =
    useDialogStore();

  const [isOpen, setIsOpen] = useState(true);

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
                <IconRenderer name="Wrench" />
              </Button>

              <span className="select-none space-y-1">
                <h4 className="font-medium text-sm leading-none">Tools</h4>
                <p className="truncate text-muted-foreground text-xs">
                  Customize your workspace.
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
            <SidebarMenuButton onClick={() => setSettingsOpen(true)}>
              <IconRenderer name="Settings" />
              Open Settings
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setStatisticsOpen(true)}>
              <IconRenderer name="ChartPie" />
              Statistics
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setIsShortcutsModalOpen(true)}>
              <IconRenderer name="Keyboard" />
              Keyboard Shortcuts
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarToolsMenu;
