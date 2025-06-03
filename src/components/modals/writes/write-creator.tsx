import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WritePreview } from "@/components/writes/write-content-preview";
import { explorerTemplates } from "@/lib/templates";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import type { Write } from "@/types";

const WriteCreatorDialog = () => {
  const { isNewWriteDialogOpen, setIsNewWriteDialogOpen } = useDialogStore();
  const { setCurrentWrite, createNewWriteFromTemplate } = useWritesStore();

  const handleUseTemplate = async (template: Write) => {
    const newWrite = await createNewWriteFromTemplate(template);
    setIsNewWriteDialogOpen(false);
    setCurrentWrite(newWrite);
  };

  return (
    <Modal open={isNewWriteDialogOpen} onOpenChange={setIsNewWriteDialogOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Start with a structure and make it yours.
          </ModalDescription>
          <ModalTitle>Choose a Template</ModalTitle>
        </ModalHeader>

        <div className="mt-4">
          <ScrollArea className="size-full max-w-md">
            <div className="flex items-center gap-4 px-1 pt-1 pb-4">
              {explorerTemplates.map((template) => (
                <WritePreview
                  key={template.id}
                  write={template}
                  onClick={() => handleUseTemplate(template)}
                />
              ))}
            </div>

            <ScrollBar orientation="horizontal" className="h-2.5" />
          </ScrollArea>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default WriteCreatorDialog;
