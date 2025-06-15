"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { useNoteActions } from "@/hooks/use-note-actions";
import { type ReactNode, useRef, useState } from "react";

interface SaveNoteModalProps {
  children: ReactNode;
  value: string;
}

export function SaveNoteModal({ children, value }: SaveNoteModalProps) {
  const [title, setTitle] = useState("Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const { onCreate } = useNoteActions();

  const onSave = () => {
    if (title.trim() === "") {
      return;
    }

    onCreate({ title: title.trim(), content: value });
  };

  console.log("value", value);

  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>
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
          <ModalClose asChild>
            <Button variant="ghost">Cancel</Button>
          </ModalClose>
          <Button onClick={onSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
