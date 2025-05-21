"use client";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
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
    <Credenza
      open={isFolderDeleteDialogOpen}
      onOpenChange={setIsFolderDeleteDialogOpen}
    >
      <CredenzaContent className="mx-auto max-w-lg border bg-background p-1 shadow-none">
        <CredenzaHeader>
          <CredenzaDescription>
            Are you sure you want to delete this folder? This cannot be undone.
          </CredenzaDescription>
          <CredenzaTitle>Confirm Delete</CredenzaTitle>
        </CredenzaHeader>

        <CredenzaFooter className="mt-2 flex gap-2">
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
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default FolderDeleteConfirmDialog;
