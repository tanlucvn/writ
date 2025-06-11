"use client";

import { cleanContent } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "../../ui/modal";

const SummaryItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col gap-1 rounded-md border bg-card p-2 shadow-xs">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium text-foreground text-lg">{value}</span>
  </div>
);

const NoteSummaryModal = () => {
  const { isWriteSummaryOpen, setIsWriteSummaryOpen } = useDialogStore();
  const { currentEditNote } = useAppStore();

  const [summary, setSummary] = useState({
    letters: 0,
    words: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!currentEditNote?.id) return;

    const raw = currentEditNote.content || "";
    const text = cleanContent(raw);

    const letters = text.length;
    const wordsArr = text.split(/\s+/).filter(Boolean);
    const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim());
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const readingTime = Math.ceil(wordsArr.length / 200);

    setSummary({
      letters,
      words: wordsArr.length,
      paragraphs: paragraphs.length,
      sentences: sentences.length,
      readingTime,
    });
  }, [currentEditNote]);

  return (
    <Modal open={isWriteSummaryOpen} onOpenChange={setIsWriteSummaryOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className="text-base">Write Summary</ModalTitle>
          <ModalDescription>
            A quick overview of your current note.
          </ModalDescription>
        </ModalHeader>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <SummaryItem label="Letters" value={summary.letters} />
          <SummaryItem label="Words" value={summary.words} />
          <SummaryItem label="Paragraphs" value={summary.paragraphs} />
          <SummaryItem label="Sentences" value={summary.sentences} />
          <SummaryItem
            label="Reading Time"
            value={`${summary.readingTime} min`}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default NoteSummaryModal;
