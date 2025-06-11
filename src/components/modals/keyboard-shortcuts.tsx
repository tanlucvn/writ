import { Kbd } from "@/components/ui/kbd";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useDialogStore } from "@/store/use-dialog-store";

const KeyboardShortcutsModal = () => {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = useDialogStore();

  return (
    <Modal open={isShortcutsModalOpen} onOpenChange={setIsShortcutsModalOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Quickly navigate and operate using your keyboard.
          </ModalDescription>
          <ModalTitle>Keyboard Shortcuts</ModalTitle>
        </ModalHeader>

        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+H" />
            <span>Show help</span>
          </li>
          <li className="flex items-center gap-4">
            <Kbd keys="Alt+N" />
            <span>Create new write</span>
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

export default KeyboardShortcutsModal;
