import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import {
  LibraryBigIcon,
  PlusIcon,
  ScrollTextIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import MenuItemButton from "../components/menu-item-button";

const WritesMenu = () => {
  const {
    setWritesHistoryOpen,
    setWritingSessionHistoryOpen,
    setIsNewWritingSessionDialogOpen,
    setIsWriteSummaryOpen,
    setIsWritesTrashViewOpen,
  } = useDialogStore();
  const { setCurrentMenu } = useAppStore();
  const { createNewWrite } = useWritesStore();

  return (
    <div className="mb-2 rounded-2xl border bg-background p-1">
      <DashedContainer className="relative flex flex-col gap-2 rounded-xl p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMenu("menu")}
          className="absolute top-2 right-2 size-fit text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <XIcon />
        </Button>
        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Writes
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<PlusIcon />}
              label="New Write"
              onClick={createNewWrite}
            />
            <MenuItemButton
              icon={<LibraryBigIcon />}
              label="View History"
              onClick={() => setWritesHistoryOpen(true)}
            />
            <MenuItemButton
              icon={<ScrollTextIcon />}
              label="View Summary"
              onClick={() => setIsWriteSummaryOpen(true)}
            />
            <MenuItemButton
              icon={<TrashIcon />}
              label="Trash"
              onClick={() => setIsWritesTrashViewOpen(true)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="select-none font-medium font-mono text-muted-foreground text-xs">
            Writing sessions
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <MenuItemButton
              icon={<PlusIcon />}
              label="New Session"
              onClick={() => setIsNewWritingSessionDialogOpen(true)}
            />
            <MenuItemButton
              icon={<LibraryBigIcon />}
              label="View History"
              onClick={() => setWritingSessionHistoryOpen(true)}
            />
          </div>
        </div>
      </DashedContainer>
    </div>
  );
};

export default WritesMenu;
