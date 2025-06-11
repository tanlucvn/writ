"use client";

import { Button } from "@/components/ui/button";
import {} from "@/components/ui/dialog";
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
import { useRef, useState } from "react";

export function SaveNoteModal() {
  const { editor } = useAppStore();
  const { isSaveNoteModalOpen, setIsSaveNoteModalOpen } = useDialogStore();

  const [title, setTitle] = useState("Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const { onCreate } = useNoteActions();

  const onSave = () => {
    if (title.trim() === "") {
      return;
    }

    const content = editor?.getHTML();

    onCreate({ title: title.trim(), content: content });
    setIsSaveNoteModalOpen(false);
  };

  return (
    <Modal open={isSaveNoteModalOpen} onOpenChange={setIsSaveNoteModalOpen}>
      <ModalContent className="md:max-w-md">
        <ModalHeader>
          <ModalTitle>Save Note</ModalTitle>
          <ModalDescription>
            Give your note a clear and meaningful title.
          </ModalDescription>
        </ModalHeader>
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          autoFocus
        />
        <ModalFooter className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsSaveNoteModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
