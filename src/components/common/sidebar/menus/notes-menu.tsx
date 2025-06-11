import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useDialogStore } from "@/store/use-dialog-store";
import { FileIcon, Trash } from "lucide-react";
import { useState } from "react";

const SidebarNotesMenu = () => {
  const { setIsAllNotesModalOpen, setIsTrashModalOpen } = useDialogStore();

  const [isOpen, setIsOpen] = useState(true);

  const { onCreate } = useNoteActions();

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
                <FileIcon />
              </Button>

              <span className="select-none space-y-1">
                <h4 className="font-medium text-sm leading-none">Notes</h4>
                <p className="text-muted-foreground text-xs">
                  Create and manage your note.
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
            <SidebarMenuButton onClick={() => onCreate()}>
              <IconRenderer name="Plus" />
              Quick Create
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setIsAllNotesModalOpen(true)}>
              <IconRenderer name="LibraryBig" />
              All Notes
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Separator className="my-0.5" />

          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer text-destructive"
              onClick={() => setIsTrashModalOpen(true)}
            >
              <Trash className="h-4 w-4" />
              Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarNotesMenu;
