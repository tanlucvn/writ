"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FolderEditDialog = () => {
  const { currentEditFolder, refreshFolders } = useFoldersStore();
  const {
    isFolderEditingDialogOpen,
    setIsFolderEditingDialogOpen,
    setIsFolderDeleteDialogOpen,
  } = useDialogStore();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isFolderEditingDialogOpen && currentEditFolder) {
      setTitle(currentEditFolder.title || "");
    } else {
      setTitle("");
    }
  }, [isFolderEditingDialogOpen, currentEditFolder]);

  if (!currentEditFolder) return null;

  const handleSave = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      toast.error("Title cannot be empty.");
      return;
    }

    try {
      await dexie.updateFolderTitle(currentEditFolder.id, trimmed);
      toast.success("Folder title updated!");
      await refreshFolders();
      setIsFolderEditingDialogOpen(false);
    } catch (error) {
      console.error("Failed to update folder:", error);
      toast.error("Failed to update folder. Please try again.");
    }
  };

  const handleDeleteClick = () => {
    setIsFolderDeleteDialogOpen(true);
  };

  return (
    <Modal
      open={isFolderEditingDialogOpen}
      onOpenChange={setIsFolderEditingDialogOpen}
    >
      <ModalContent>
        <ModalHeader>
          <ModalDescription>
            Change the folder name or remove it permanently.
          </ModalDescription>
          <ModalTitle>Edit Folder</ModalTitle>
        </ModalHeader>

        <div className="mt-4 flex flex-col gap-4 text-xs">
          <div className="space-y-2">
            <Label htmlFor="folder-title" className="text-xs">
              Title
            </Label>
            <Input
              id="folder-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Folder title"
              className="h-8"
              autoFocus
            />
          </div>
        </div>

        <ModalFooter className="mt-4 flex flex-col gap-2 px-0">
          <Button
            variant="outline"
            onClick={handleDeleteClick}
            className="w-full text-destructive hover:text-destructive"
          >
            Delete Folder
          </Button>

          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FolderEditDialog;
