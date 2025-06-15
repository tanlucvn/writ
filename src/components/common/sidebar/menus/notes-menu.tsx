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
import { useNoteActions } from "@/hooks/use-note-actions";
import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/use-dialog-store";
import { Trash } from "lucide-react";
import { useState } from "react";

const SidebarNotesMenu = () => {
  const { setIsAllNotesOpen, setIsTrashOpen } = useDialogStore();

  const [isOpen, setIsOpen] = useState(true);

  const { onCreate } = useNoteActions();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarGroupLabel
          className={cn(
            "h-6 w-fit cursor-pointer select-none font-medium hover:bg-sidebar-accent",
            isOpen && "!bg-sidebar-primary !text-sidebar-primary-foreground",
          )}
        >
          Notes
        </SidebarGroupLabel>
      </CollapsibleTrigger>

      <CollapsibleContent className="my-2 space-y-1">
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => onCreate()}>
            <IconRenderer name="Plus" />
            Quick Create
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setIsAllNotesOpen(true)}>
            <IconRenderer name="LibraryBig" />
            All Notes
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="cursor-pointer text-destructive"
            onClick={() => setIsTrashOpen(true)}
          >
            <Trash className="h-4 w-4" />
            Trash
          </SidebarMenuButton>
        </SidebarMenuItem>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarNotesMenu;
