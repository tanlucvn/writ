"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/dialog-store";
import { useFoldersStore } from "@/store/folders-store";
import { toast } from "sonner";

const FolderDeleteConfirmDialog = () => {
  const { currentEditFolder, refreshFolders, setCurrentFolder } =
    useFoldersStore();
  const {
    isFolderDeleteDialogOpen,
    setIsFolderDeleteDialogOpen,
    setIsFolderEditingDialogOpen,
  } = useDialogStore();

  const handleConfirm = async () => {
    if (!currentEditFolder) return;
    try {
      await dexie.deleteFolder(currentEditFolder.id);
      toast.success("Folder deleted.");
      setCurrentFolder(null);
      await refreshFolders();
      setIsFolderDeleteDialogOpen(false);
      setIsFolderEditingDialogOpen(false);
    } catch (error) {
      console.error("Delete folder failed:", error);
      toast.error("Failed to delete folder. Please try again.");
    }
  };

  return (
    <Modal
      open={isFolderDeleteDialogOpen}
      onOpenChange={setIsFolderDeleteDialogOpen}
    >
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Are you sure you want to delete this folder? This cannot be undone.
          </ModalDescription>
          <ModalTitle>Confirm Delete</ModalTitle>
        </ModalHeader>

        <ModalFooter className="mt-2 flex gap-2">
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="w-full"
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsFolderDeleteDialogOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FolderDeleteConfirmDialog;
