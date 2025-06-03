import { useDialogStore } from "@/store/dialog-store";
import { Kbd } from "../ui/kbd";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "../ui/modal";

const HelpDialog = () => {
  const { isHelpDialogOpen, setIsHelpDialogOpen } = useDialogStore();
  return (
    <Modal open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Quickly navigate and operate using your keyboard.
          </ModalDescription>
          <ModalTitle>Keyboard Shortcuts</ModalTitle>
        </ModalHeader>

        <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+H" />
            <span>Show help</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+N" />
            <span>Create new write</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+Z" />
            <span>Toggle zen mode</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+M" />
            <span>Open music player</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+S" />
            <span>Open settings</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Esc" />
            <span>Close dialog</span>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  );
};

export default HelpDialog;
