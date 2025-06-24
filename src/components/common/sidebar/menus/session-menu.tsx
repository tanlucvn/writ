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
import { useCurrentNote } from "@/hooks/use-current-note";
import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/use-dialog-store";
import { useState } from "react";
import { toast } from "sonner";

const SidebarSessionsMenu = () => {
  const { setIsNewSessionOpen, setIsSessionHistoryOpen } = useDialogStore();
  const currentNote = useCurrentNote();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSession = () => {
    if (!currentNote) return toast.error("Open a note to start a session.");
    setIsNewSessionOpen(true);
  };

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
          <SidebarMenuButton onClick={handleOpenSession}>
            <IconRenderer name="Plus" />
            New Session
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setIsSessionHistoryOpen(true)}>
            <IconRenderer name="History" />
            View History
          </SidebarMenuButton>
        </SidebarMenuItem>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSessionsMenu;
