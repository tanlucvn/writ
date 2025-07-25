"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";
import { useEffect, useRef, useState } from "react";

const EditNoteTitleModal = () => {
  const { isEditNoteTitleOpen, setIsEditNoteTitleOpen } = useDialogStore();
  const { currentEditNote } = useAppStore();
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { onRenameNote } = useNoteActions();

  useEffect(() => {
    if (isEditNoteTitleOpen && currentEditNote) {
      setTitle(currentEditNote.title);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isEditNoteTitleOpen, currentEditNote]);

  if (!currentEditNote) return null;

  const onSave = () => {
    if (title.trim() === "") {
      return;
    }

    onRenameNote(currentEditNote.id, title.trim());
    setIsEditNoteTitleOpen(false);
  };

  return (
    <Modal open={isEditNoteTitleOpen} onOpenChange={setIsEditNoteTitleOpen}>
      <ModalContent className="md:max-w-md">
        <ModalHeader>
          <ModalTitle>Rename note</ModalTitle>
          <ModalDescription>
            Give your note a clear and meaningful title.
          </ModalDescription>
        </ModalHeader>
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
        <ModalFooter className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsEditNoteTitleOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditNoteTitleModal;
