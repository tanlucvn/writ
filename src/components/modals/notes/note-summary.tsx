"use client";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  cleanContent,
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
} from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const SummaryItem = ({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) => (
  <div className="flex flex-col gap-1 rounded-md border bg-card p-2 shadow-xs">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="flex items-baseline gap-1 font-medium text-foreground text-lg">
      <NumberFlow format={{ notation: "compact" }} value={value} />
      {suffix && <span className="text-xs">{suffix}</span>}
    </span>
  </div>
);

const NoteSummaryModal = () => {
  const { isNoteSummaryOpen, setIsNoteSummaryOpen } = useDialogStore();
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

    const timeout = setTimeout(() => {
      setSummary({
        letters: countCharacters(text),
        words: countWords(text),
        paragraphs: countParagraphs(text),
        sentences: countSentences(text),
        readingTime: Math.ceil(countWords(text) / 200),
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentEditNote]);

  return (
    <Modal open={isNoteSummaryOpen} onOpenChange={setIsNoteSummaryOpen}>
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
            value={summary.readingTime}
            suffix={summary.readingTime === 1 ? "minute" : "minutes"}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default NoteSummaryModal;
